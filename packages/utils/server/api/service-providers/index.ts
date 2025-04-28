import { useDataCache } from '#nuxt-multi-cache/composables';
import { db } from '@serp/utils/server/api/db';
import {
  serviceProviderCache,
  serviceProviderCategoryCache
} from '@serp/utils/server/api/db/schema';
import { and, eq, sql } from 'drizzle-orm';

import type { Pagination, serviceProviderIndex } from '@serp/types/types';

export default defineEventHandler(async (event) => {
  const { page = 1, limit = 100, categorySlug, topicSlug } = getQuery(event);
  const cacheKey = `service-providers-${categorySlug}-${page}-${limit}-${topicSlug}`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) return value;

  const pageNumber = Number(page);
  const limitNumber = Math.min(Number(limit), 100);
  if (isNaN(pageNumber) || pageNumber < 1 || !Number.isInteger(pageNumber)) {
    throw createError({
      statusCode: 400,
      message: 'Page must be a positive integer.'
    });
  }
  if (isNaN(limitNumber) || limitNumber < 1 || !Number.isInteger(limitNumber)) {
    throw createError({
      statusCode: 400,
      message: 'Limit must be a positive integer.'
    });
  }

  const offset = (pageNumber - 1) * limitNumber;

  const whereConditions = [];
  if (topicSlug) {
    whereConditions.push(sql`
      jsonb_path_exists(
        ${serviceProviderCache.topics},
        '$[*] ? (@.slug == $slug)'::jsonpath,
        jsonb_build_object('slug', ${topicSlug}::text)
      )
    `);
  }
  if (categorySlug) {
    whereConditions.push(sql`
      jsonb_path_exists(
        ${serviceProviderCache.categories},
        '$[*] ? (@.slug == $slug)'::jsonpath,
        jsonb_build_object('slug', ${categorySlug}::text)
      )
    `);
  }

  let baseQuery = db
    .select({
      id: serviceProviderCache.id,
      name: serviceProviderCache.name,
      slug: serviceProviderCache.slug,
      logoUrl: serviceProviderCache.logoUrl,
      excerpt: serviceProviderCache.excerpt,
      basicInfo: serviceProviderCache.basicInfo,
      industries: serviceProviderCache.industries,
      ratings: serviceProviderCache.ratings,
      serplyLink: serviceProviderCache.serplyLink,
      categories: serviceProviderCache.categories,
      topics: serviceProviderCache.topics
    })
    .from(serviceProviderCache);

  if (whereConditions.length) {
    baseQuery = baseQuery.where(and(...whereConditions));
  }

  baseQuery = baseQuery.limit(limitNumber).offset(offset);

  let totalQuery = db
    .select({ count: sql<number>`count(*)` })
    .from(serviceProviderCache);

  if (whereConditions.length) {
    totalQuery = totalQuery.where(and(...whereConditions));
  }

  const categoryPromise = categorySlug
    ? db
        .select({
          id: serviceProviderCategoryCache.id,
          name: serviceProviderCategoryCache.name,
          slug: serviceProviderCategoryCache.slug
        })
        .from(serviceProviderCategoryCache)
        .where(eq(serviceProviderCategoryCache.slug, categorySlug))
        .execute()
    : Promise.resolve([] as Array<{ id: number; name: string; slug: string }>);

  const [results, [{ count: total }], categoryResults] = await Promise.all([
    baseQuery.execute(),
    totalQuery.execute(),
    categoryPromise
  ]);

  if (!results.length) {
    throw createError({ statusCode: 404, message: 'Not found' });
  }

  const serviceProviders = results as serviceProviderIndex[];
  const pagination: Pagination = {
    currentPage: pageNumber,
    pageSize: limitNumber,
    totalItems: Number(total)
  };
  const category = categoryResults[0] ?? null;

  const response = { serviceProviders, pagination, category };
  addToCache(response, [], 60 * 60 * 10); // 10 hours
  return response;
});
