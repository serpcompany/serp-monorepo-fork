import { getDb } from '@serp/db/server/database';
import {
  category,
  entity,
  featuredSubscription
} from '@serp/db/server/database/schema';
import { and, eq, isNull, sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const { placement, id, categorySlug } = getQuery(event);

  if (!placement || !id) {
    throw new Error('Both "placement" and "id" are required query parameters.');
  }

  const placementNum = Number(placement);
  if (isNaN(placementNum) || placementNum < 1 || placementNum > 5) {
    // placement must be between 1 and 5
    return { available: false };
  }

  // Check if the entity exists and, if categorySlug is provided, that it has the proper category
  let entityQuery = getDb()
    .select({
      id: entity.id,
      categories: entity.categories
    })
    .from(entity)
    .where(eq(entity.id, id));

  if (categorySlug) {
    entityQuery = entityQuery.where(
      sql`
        jsonb_path_exists(
          ${entity.categories},
          '$[*] ? (@.slug == $slug)'::jsonpath,
          jsonb_build_object('slug', ${categorySlug}::text)
        )
      `
    );
  }

  const entityRecords = await entityQuery.execute();
  if (!entityRecords.length) {
    // Entity isn't eligible if it doesn't exist or doesn't have the given category
    return { available: false };
  }

  // Check if the entity is already featured in this category
  const entityUsedQuery = getDb()
    .select({ id: featuredSubscription.id })
    .from(featuredSubscription)
    .leftJoin(category, eq(category.id, featuredSubscription.category))
    .innerJoin(entity, eq(entity.id, featuredSubscription.entity))
    .where(
      and(
        eq(featuredSubscription.isActive, true),
        eq(entity.id, id),
        categorySlug ? eq(category.slug, categorySlug) : isNull(category.slug)
      )
    );

  const entityUsed = await entityUsedQuery.execute();
  if (entityUsed.length) {
    // Domain already has an active featured subscription in this category
    return { available: false };
  }

  // Check if the requested placement is already taken in this category
  const placementUsedQuery = getDb()
    .select({ id: featuredSubscription.id })
    .from(featuredSubscription)
    .leftJoin(category, eq(category.id, featuredSubscription.category))
    .where(
      and(
        eq(featuredSubscription.isActive, true),
        eq(featuredSubscription.placement, placementNum),
        categorySlug ? eq(category.slug, categorySlug) : isNull(category.slug)
      )
    );

  const placementUsed = await placementUsedQuery.execute();
  if (placementUsed.length) {
    // The placement is already in use in this category
    return { available: false };
  }

  // Passed all checks—placement is available for the given entity and category.
  return { available: true };
});
