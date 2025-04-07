// server/api/reserve-spot.ts
import { db } from '@serp/utils/server/api/db';
import {
  companyCache,
  companyFeaturedSubscription
} from '@serp/utils/server/api/db/schema';
import { and, eq, sql } from 'drizzle-orm';
import { companyCategoryCache } from '../db/schema';

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const email = session.user?.email;
  if (!email) {
    return { status: 401, message: 'Unauthorized' };
  }

  const { placement, domain, categorySlug } = getQuery(event);

  console.log('Query parameters:', { placement, domain, categorySlug });

  if (!placement || !domain) {
    return { error: 'Missing required parameters: placement, domain' };
  }

  const placementNum = Number(placement);
  if (isNaN(placementNum) || placementNum < 1 || placementNum > 5) {
    return { error: 'Invalid placement value' };
  }

  // Query the company by domain. If categorySlug is provided, ensure the company has that category.
  const whereConditions = [eq(companyCache.domain, domain)];
  let companyQuery = db
    .select({
      id: companyCache.id,
      domain: companyCache.domain,
      categories: companyCache.categories
    })
    .from(companyCache);

  if (categorySlug) {
    whereConditions.push(
      sql`
        jsonb_path_exists(
          ${companyCache.categories},
          '$[*] ? (@.slug == $slug)'::jsonpath,
          jsonb_build_object('slug', ${categorySlug}::text)
        )
      `
    );
  }

  companyQuery = companyQuery.where(and(...whereConditions));

  const companyRecords = await companyQuery.execute();
  if (!companyRecords.length) {
    return { error: 'Domain not found or invalid category' };
  }

  console.log('Company records:', companyRecords);

  // Use the first company record
  const companyId = companyRecords[0].id;
  let categoryId = null;
  if (categorySlug) {
    const categoryQuery = db
      .select({
        id: companyCategoryCache.id
      })
      .from(companyCategoryCache)
      .where(eq(companyCategoryCache.slug, categorySlug))
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
    const reservation = await db.transaction(async (trx) => {
      // 1. Check for any active reservation or active subscription.
      const activeReservation = await trx
        .select()
        .from(companyFeaturedSubscription)
        .where(
          and(
            eq(companyFeaturedSubscription.companyFk, Number(companyId)),
            eq(companyFeaturedSubscription.placement, placementNum),
            categoryId
              ? eq(companyFeaturedSubscription.categoryFk, categoryId)
              : sql`${companyFeaturedSubscription.categoryFk} IS NULL`,
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
        .from(companyFeaturedSubscription)
        .where(
          and(
            eq(companyFeaturedSubscription.companyFk, Number(companyId)),
            eq(companyFeaturedSubscription.placement, placementNum),
            categoryId
              ? eq(companyFeaturedSubscription.categoryFk, categoryId)
              : sql`${companyFeaturedSubscription.categoryFk} IS NULL`,
            // Expired if not active and reservation_expires_at is null or in the past
            sql`(is_active = false AND (reservation_expires_at IS NULL OR reservation_expires_at <= NOW()))`
          )
        )
        .limit(1)
        .execute();

      if (expiredReservation.length > 0) {
        // Update the expired reservation with the new email and expiration.
        await trx
          .update(companyFeaturedSubscription)
          .set({
            email: email,
            reservationExpiresAt: reservationExpiresAt,
            isActive: false,
            lastPaymentFk: null
          })
          .where(eq(companyFeaturedSubscription.id, expiredReservation[0].id))
          .execute();

        // Retrieve the updated reservation.
        const updatedReservation = await trx
          .select()
          .from(companyFeaturedSubscription)
          .where(eq(companyFeaturedSubscription.id, expiredReservation[0].id))
          .execute();
        return updatedReservation[0];
      } else {
        // 3. No existing reservation found: insert a new one.
        const result = await trx
          .insert(companyFeaturedSubscription)
          .values({
            companyFk: Number(companyId),
            categoryFk: categoryId,
            placement: placementNum,
            email: email,
            isActive: false, // Will be set to active upon payment confirmation.
            reservationExpiresAt: reservationExpiresAt,
            lastPaymentFk: null
          })
          .returning({
            id: companyFeaturedSubscription.id,
            reservationExpiresAt:
              companyFeaturedSubscription.reservationExpiresAt
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
