import { useDataCache } from '#nuxt-multi-cache/composables';
import { db } from '@serp/utils/server/api/db';
import {
  serviceProviderCache,
  serviceProviderReviewAggregate,
  serviceProviderVerification,
  user
} from '@serp/utils/server/api/db/schema';
import { eq } from 'drizzle-orm';

import type { ServiceProvider } from '@serp/types/types';

export default defineEventHandler(async (event) => {
  try {
    const slug = getRouterParam(event, 'slug');
    const cacheKey = `service-provider-${slug}`;
    const { value, addToCache } = await useDataCache(cacheKey, event);
    if (value) {
      // refresh serviceProviderReviewAggregate info and verification info
      const refreshQuery = db
        .select({
          numReviews: serviceProviderReviewAggregate.numReviews,
          numOneStarReviews: serviceProviderReviewAggregate.numOneStarReviews,
          numTwoStarReviews: serviceProviderReviewAggregate.numTwoStarReviews,
          numThreeStarReviews:
            serviceProviderReviewAggregate.numThreeStarReviews,
          numFourStarReviews: serviceProviderReviewAggregate.numFourStarReviews,
          numFiveStarReviews: serviceProviderReviewAggregate.numFiveStarReviews,
          averageRating: serviceProviderReviewAggregate.averageRating,
          verified: serviceProviderVerification.id,
          verifiedEmail: user.email
        })
        .from(serviceProviderCache)
        .leftJoin(
          serviceProviderReviewAggregate,
          eq(
            serviceProviderReviewAggregate.serviceProviderId,
            serviceProviderCache.id
          )
        )
        .leftJoin(
          serviceProviderVerification,
          eq(
            serviceProviderVerification.serviceProvider,
            serviceProviderCache.id
          )
        )
        .leftJoin(user, eq(user.id, serviceProviderVerification.user))
        .where(eq(serviceProviderCache.id, value.id));
      const refreshResults = await refreshQuery.execute();
      if (refreshResults.length) {
        const refreshData = refreshResults[0];
        value.numReviews = refreshData.numReviews;
        value.numOneStarReviews = refreshData.numOneStarReviews;
        value.numTwoStarReviews = refreshData.numTwoStarReviews;
        value.numThreeStarReviews = refreshData.numThreeStarReviews;
        value.numFourStarReviews = refreshData.numFourStarReviews;
        value.numFiveStarReviews = refreshData.numFiveStarReviews;
        value.averageRating = refreshData.averageRating;
        value.verified = refreshData.verified;
        value.verifiedEmail = refreshData.verifiedEmail;
      }
      return value;
    }

    const query = db
      .select({
        id: serviceProviderCache.id,
        name: serviceProviderCache.name,
        slug: serviceProviderCache.slug,
        logoUrl: serviceProviderCache.logoUrl,
        excerpt: serviceProviderCache.excerpt,
        content: serviceProviderCache.content,
        basicInfo: serviceProviderCache.basicInfo,
        contracts: serviceProviderCache.contracts,
        pricing: serviceProviderCache.pricing,
        services: serviceProviderCache.services,
        industries: serviceProviderCache.industries,
        businessesServed: serviceProviderCache.businessesServed,
        supportSetup: serviceProviderCache.supportSetup,
        ratings: serviceProviderCache.ratings,
        serplyLink: serviceProviderCache.serplyLink,
        categories: serviceProviderCache.categories,
        topics: serviceProviderCache.topics,
        numReviews: serviceProviderReviewAggregate.numReviews,
        numOneStarReviews: serviceProviderReviewAggregate.numOneStarReviews,
        numTwoStarReviews: serviceProviderReviewAggregate.numTwoStarReviews,
        numThreeStarReviews: serviceProviderReviewAggregate.numThreeStarReviews,
        numFourStarReviews: serviceProviderReviewAggregate.numFourStarReviews,
        numFiveStarReviews: serviceProviderReviewAggregate.numFiveStarReviews,
        averageRating: serviceProviderReviewAggregate.averageRating,
        verified: serviceProviderVerification.id,
        verifiedEmail: user.email
      })
      .from(serviceProviderCache)
      .leftJoin(
        serviceProviderReviewAggregate,
        eq(
          serviceProviderReviewAggregate.serviceProviderId,
          serviceProviderCache.id
        )
      )
      .leftJoin(
        serviceProviderVerification,
        eq(serviceProviderVerification.serviceProvider, serviceProviderCache.id)
      )
      .leftJoin(user, eq(user.id, serviceProviderVerification.user));

    let results = await query
      .where(eq(serviceProviderCache.slug, slug as string))
      .limit(1)
      .execute();

    if (!results.length) {
      results = await query
        .where(eq(serviceProviderCache.id, slug as string))
        .limit(1)
        .execute();
      if (!results.length) {
        throw createError({
          statusCode: 404,
          message: 'Service Provider not found'
        });
      }
    }

    const company = results[0] as ServiceProvider;
    const response = company;

    addToCache(response, [], 60 * 60 * 10); // 10 hours
    return response;
  } catch (error: unknown) {
    throw createError({
      statusCode: 500,
      message: (error as Error).message
    });
  }
});
