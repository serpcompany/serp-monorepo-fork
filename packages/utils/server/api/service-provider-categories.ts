import { useDataCache } from '#nuxt-multi-cache/composables';
import type { Category } from '@serp/types/types';
import { db } from '@serp/utils/server/api/db';
import { serviceProviderCategoryCache } from '@serp/utils/server/api/db/schema';

export default defineEventHandler(async (event) => {
  const cacheKey = 'service-provider-categories';
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }

  const query = db.select().from(serviceProviderCategoryCache);

  const results = await query.execute();

  const categories = results.map((cat) => {
    return cat as Category;
  });

  const response = categories;
  addToCache(response, [], 60 * 60 * 10); // 10 hours
  return response;
});
