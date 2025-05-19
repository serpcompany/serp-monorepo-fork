import { useDataCache } from '#nuxt-multi-cache/composables';
import { getDb } from '@serp/db/server/database';
import { category } from '@serp/db/server/database/schema';
import type { Category } from '@serp/types/types';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const { module = '' } = getQuery(event);
  const cacheKey = `categories-${module}`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }

  const query = getDb()
    .select()
    .from(category)
    .where(eq(category.module, module));

  const results = await query.execute();

  const categories = results.map((cat) => {
    return cat as Category;
  });

  const response = categories;
  addToCache(response, [], 60 * 60 * 10); // 10 hours
  return response;
});
