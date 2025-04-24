import { useDataCache } from '#nuxt-multi-cache/composables';
import { db } from '@serp/utils/server/api/db';
import { mcpServerCache } from '@serp/utils/server/api/db/schema';

export default defineEventHandler(async (event) => {
  const cacheKey = `mcp-servers-sitemap`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }

  const servers = await db
    .select({
      slug: mcpServerCache.slug
    })
    .from(mcpServerCache)
    .execute();

  const response = servers.map((server) => `/mcp/servers/${server.slug}/`);

  addToCache(response, [], 60 * 60 * 10); // 10 hours
  return response;
});
