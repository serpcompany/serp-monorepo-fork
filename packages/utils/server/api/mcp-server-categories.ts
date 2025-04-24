import { useDataCache } from '#nuxt-multi-cache/composables';
import type { Category } from '@serp/types/types';
import { db } from '@serp/utils/server/api/db';
import { mcpServerCategoryCache } from '@serp/utils/server/api/db/schema';

export default defineEventHandler(async (event) => {
  const cacheKey = 'mcp-server-categories';
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }

  const query = db.select().from(mcpServerCategoryCache);

  const results = await query.execute();

  const categories = results.map((cat) => {
    return cat as Category;
  });

  const response = categories;
  addToCache(response, [], 60 * 60 * 10); // 10 hours
  return response;
});
