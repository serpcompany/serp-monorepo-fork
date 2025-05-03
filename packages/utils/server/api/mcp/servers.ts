import { useDataCache } from '#nuxt-multi-cache/composables';
import type { MCPServerIndex, MCPServers, Pagination } from '@serp/types/types';
import { db } from '@serp/utils/server/api/db';
import {
  mcpServerCache,
  mcpServerCategoryCache
} from '@serp/utils/server/api/db/schema';
import { and, desc, eq, sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const {
    page = 1,
    limit = 100,
    tag,
    topic,
    owner,
    categorySlug
  } = getQuery(event) as {
    page?: string;
    limit?: string;
    tag?: string;
    topic?: string;
    owner?: string;
    categorySlug?: string;
  };

  const cacheKey = `mcp-servers-${tag}-${topic}-${owner}-${categorySlug}-${page}-${limit}`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) return value;

  const pageNumber = Number(page);
  const limitNumber = Math.min(Number(limit), 100);
  if (isNaN(pageNumber) || pageNumber < 1 || !Number.isInteger(pageNumber))
    throw createError({
      statusCode: 400,
      message: 'Page must be a positive integer.'
    });
  if (isNaN(limitNumber) || limitNumber < 1 || !Number.isInteger(limitNumber))
    throw createError({
      statusCode: 400,
      message: 'Limit must be a positive integer.'
    });

  const offset = (pageNumber - 1) * limitNumber;

  const filters = [] as unknown[];
  if (tag) {
    filters.push(sql`
      jsonb_path_exists(
        ${mcpServerCache.tags},
        '$[*] ? (@ == $tag)'::jsonpath,
        jsonb_build_object('tag', ${tag}::text)
      )
    `);
  }
  if (topic) {
    filters.push(sql`
      jsonb_path_exists(
        ${mcpServerCache.topics},
        '$[*] ? (@ == $topic)'::jsonpath,
        jsonb_build_object('topic', ${topic}::text)
      )
    `);
  }
  if (owner) {
    filters.push(eq(mcpServerCache.owner, owner));
  }
  if (categorySlug) {
    filters.push(
      sql`
        jsonb_path_exists(
          ${mcpServerCache.categories},
          '$[*] ? (@.slug == $slug)'::jsonpath,
          jsonb_build_object('slug', ${categorySlug}::text)
        )
      `
    );
  }

  let baseQuery = db
    .select({
      id: mcpServerCache.id,
      slug: mcpServerCache.slug,
      url: mcpServerCache.url,
      serplyLink: mcpServerCache.serplyLink,
      categories: mcpServerCache.categories,
      description: mcpServerCache.description,
      tags: mcpServerCache.tags,
      contributors: mcpServerCache.contributors,
      owner: mcpServerCache.owner,
      repo: mcpServerCache.repo,
      stars: mcpServerCache.stars,
      forks: mcpServerCache.forks,
      topics: mcpServerCache.topics,
      languages: mcpServerCache.languages,
      repoCreatedAt: mcpServerCache.repoCreatedAt,
      repoUpdatedAt: mcpServerCache.repoUpdatedAt
    })
    .from(mcpServerCache);

  if (filters.length) {
    baseQuery = baseQuery.where(and(...filters));
  }

  baseQuery = baseQuery
    .orderBy(desc(mcpServerCache.stars), desc(mcpServerCache.repoUpdatedAt))
    .limit(limitNumber)
    .offset(offset);

  let totalQuery = db
    .select({ count: sql<number>`count(*)` })
    .from(mcpServerCache);

  if (filters.length) {
    totalQuery = totalQuery.where(and(...filters));
  }

  const categoryPromise = categorySlug
    ? db
        .select({
          id: mcpServerCategoryCache.id,
          name: mcpServerCategoryCache.name,
          slug: mcpServerCategoryCache.slug,
          buyersGuide: mcpServerCategoryCache.buyersGuide,
          faqs: mcpServerCategoryCache.faqs
        })
        .from(mcpServerCategoryCache)
        .where(eq(mcpServerCategoryCache.slug, categorySlug))
        .execute()
    : Promise.resolve([]);

  const [results, [{ count: total }], categoryResults] = await Promise.all([
    baseQuery.execute(),
    totalQuery.execute(),
    categoryPromise
  ]);

  if (!results.length) {
    throw createError({ statusCode: 404, message: 'Not found' });
  }

  const servers = results.map((r) => r as MCPServerIndex);
  const pagination: Pagination = {
    currentPage: pageNumber,
    pageSize: limitNumber,
    totalItems: Number(total)
  };

  const category = categoryResults.length ? categoryResults[0] : null;

  const response: MCPServers = { servers, pagination, category };

  addToCache(response, [], 60 * 60 * 10);
  return response;
});
