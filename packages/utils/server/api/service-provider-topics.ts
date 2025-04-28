import { useDataCache } from '#nuxt-multi-cache/composables';
import type { Topic } from '@serp/types/types';
import { db } from '@serp/utils/server/api/db';
import { serviceProviderTopicCache } from '@serp/utils/server/api/db/schema';

export default defineEventHandler(async (event) => {
  const cacheKey = 'service-provider-categories';
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }

  const query = db.select().from(serviceProviderTopicCache);

  const results = await query.execute();

  const topics = results.map((cat) => {
    return cat as Topic;
  });

  const response = topics;
  addToCache(response, [], 60 * 60 * 10); // 10 hours
  return response;
});
