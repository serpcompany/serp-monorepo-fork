import { useDataCache } from '#nuxt-multi-cache/composables';
import { db } from '@serp/utils/server/api/db';
import { serviceProviderCache } from '@serp/utils/server/api/db/schema';

export default defineEventHandler(async (event) => {
  const cacheKey = `service-provider-sitemap`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }

  const serviceProviders = await db
    .select({
      slug: serviceProviderCache.slug
    })
    .from(serviceProviderCache)
    .execute();

  const response = serviceProviders.map(
    (serviceProvider) => `/service-providers/${serviceProvider.slug}/`
  );

  addToCache(response, [], 60 * 60 * 10); // 10 hours
  return response;
});
