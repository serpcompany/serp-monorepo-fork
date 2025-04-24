import { useDataCache } from '#nuxt-multi-cache/composables';
import type { MCPServer } from '@serp/types/types';
import { db } from '@serp/utils/server/api/db';
import { mcpServerCache } from '@serp/utils/server/api/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    const raw = getRouterParam(event, 'slug');
    const cacheKey = `mcp-server-${raw}`;
    const { value, addToCache } = await useDataCache(cacheKey, event);

    if (value) {
      return value;
    }

    const query = db
      .select({
        id: mcpServerCache.id,
        slug: mcpServerCache.slug,
        url: mcpServerCache.url,
        description: mcpServerCache.description,
        tags: mcpServerCache.tags,
        contributors: mcpServerCache.contributors,
        readme: mcpServerCache.readme,
        owner: mcpServerCache.owner,
        repo: mcpServerCache.repo,
        stars: mcpServerCache.stars,
        forks: mcpServerCache.forks,
        topics: mcpServerCache.topics,
        languages: mcpServerCache.languages,
        categories: mcpServerCache.categories,
        serplyLink: mcpServerCache.serplyLink,
        repoCreatedAt: mcpServerCache.repoCreatedAt,
        repoUpdatedAt: mcpServerCache.repoUpdatedAt
      })
      .from(mcpServerCache);

    // first try matching by slug
    let results = await query
      .where(eq(mcpServerCache.slug, raw as string))
      .limit(1)
      .execute();

    // if not found and raw is numeric, try by ID
    if (!results.length) {
      const maybeId = Number(raw);
      if (!isNaN(maybeId)) {
        results = await query
          .where(eq(mcpServerCache.id, maybeId))
          .limit(1)
          .execute();
      }
    }

    if (!results.length) {
      throw createError({
        statusCode: 404,
        message: 'MCP server not found'
      });
    }

    const server = results[0] as MCPServer;

    addToCache(server, [], 60 * 60 * 10);
    return server;
  } catch (err: unknown) {
    throw createError({
      statusCode: err.statusCode || 500,
      message: err.message || 'Unknown error'
    });
  }
});
