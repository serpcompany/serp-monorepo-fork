import { getDb } from '@serp/db/server/database';
import {
  category,
  entity,
  featuredSubscription
} from '@serp/db/server/database/schema';
import { and, eq, sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const userId = session?.user?.siteId;
  if (!userId) return { status: 401, message: 'Unauthorized' };

  const { placement, id, categorySlug } = getQuery(event);

  if (!placement || !id) {
    return { error: 'Missing required parameters: placement, id' };
  }

  const placementNum = Number(placement);
  if (isNaN(placementNum) || placementNum < 1 || placementNum > 5) {
    return { error: 'Invalid placement value' };
  }

  // Query the entity by id. If categorySlug is provided, ensure the entity has that category.
  const whereConditions = [eq(entity.id, id)];
  let entityQuery = getDb()
    .select({
      id: entity.id,
      module: entity.module
    })
    .from(entity);

  if (categorySlug) {
    whereConditions.push(
      sql`
        jsonb_path_exists(
          ${entity.categories},
          '$[*] ? (@.slug == $slug)'::jsonpath,
          jsonb_build_object('slug', ${categorySlug}::text)
        )
      `
    );
  }

  entityQuery = entityQuery.where(and(...whereConditions));

  const entityRecords = await entityQuery.execute();
  if (!entityRecords.length) {
    return { error: 'Entity not found or invalid category' };
  }

  // Use the first entity record
  const entityId = entityRecords[0].id;
  const entityModule = entityRecords[0].module;
  let categoryId = null;
  if (categorySlug) {
    const categoryQuery = getDb()
      .select({
        id: category.id
      })
      .from(category)
      .where(
        and(eq(category.slug, categorySlug), eq(category.module, entityModule))
      )
      .limit(1);

    const categoryResults = await categoryQuery.execute();
    if (!categoryResults.length) {
      return { error: 'Invalid category slug' };
    }
    categoryId = categoryResults[0].id;
  }

  // Set the reservation to expire in 15 minutes
  const now = new Date();
  const reservationExpiresAt = new Date(now.getTime() + 15 * 60 * 1000);

  try {
    // Run a transaction to ensure atomicity
    const reservation = await getDb().transaction(async (trx) => {
      // 1. Check for any active reservation or active subscription.
      const activeReservation = await trx
        .select()
        .from(featuredSubscription)
        .where(
          and(
            eq(featuredSubscription.entity, Number(entityId)),
            eq(featuredSubscription.placement, placementNum),
            categoryId
              ? eq(featuredSubscription.category, categoryId)
              : sql`${featuredSubscription.category} IS NULL`,
            // Consider active if either marked active or the reservation hasn't expired
            sql`(is_active = true OR (reservation_expires_at IS NOT NULL AND reservation_expires_at > NOW()))`
          )
        )
        .execute();

      if (activeReservation.length > 0) {
        throw new Error('Spot already reserved or active.');
      }

      // 2. Check for an expired reservation we can reuse.
      const expiredReservation = await trx
        .select()
        .from(featuredSubscription)
        .where(
          and(
            eq(featuredSubscription.entity, Number(entityId)),
            eq(featuredSubscription.placement, placementNum),
            categoryId
              ? eq(featuredSubscription.category, categoryId)
              : sql`${featuredSubscription.category} IS NULL`,
            // Expired if not active and reservation_expires_at is null or in the past
            sql`(is_active = false AND (reservation_expires_at IS NULL OR reservation_expires_at <= NOW()))`
          )
        )
        .limit(1)
        .execute();

      if (expiredReservation.length > 0) {
        // Update the expired reservation with the new user and expiration.
        await trx
          .update(featuredSubscription)
          .set({
            user: userId,
            reservationExpiresAt: reservationExpiresAt,
            isActive: false,
            lastPayment: null
          })
          .where(eq(featuredSubscription.id, expiredReservation[0].id))
          .execute();

        // Retrieve the updated reservation.
        const updatedReservation = await trx
          .select()
          .from(featuredSubscription)
          .where(eq(featuredSubscription.id, expiredReservation[0].id))
          .execute();
        return updatedReservation[0];
      } else {
        // 3. No existing reservation found: insert a new one.
        const result = await trx
          .insert(featuredSubscription)
          .values({
            entity: Number(entityId),
            category: categoryId,
            placement: placementNum,
            user: userId,
            isActive: false, // Will be set to active upon payment confirmation.
            reservationExpiresAt: reservationExpiresAt,
            lastPayment: null
          })
          .returning({
            id: featuredSubscription.id,
            reservationExpiresAt: featuredSubscription.reservationExpiresAt
          })
          .execute();
        return result[0];
      }
    });

    return { reservationId: reservation.id, reservationExpiresAt };
  } catch (error: unknown) {
    return { error: error.message || 'Failed to reserve spot.' };
  }
});
