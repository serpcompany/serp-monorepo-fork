import { useDataCache } from '#nuxt-multi-cache/composables';
import { db } from '@serp/utils/server/api/db';
import {
  companyCache,
  companyReviewAggregate,
  companyVerification,
  serviceProviderCache,
  serviceProviderReviewAggregate,
  serviceProviderVerification,
  user
} from '@serp/utils/server/api/db/schema';
import { eq, sql } from 'drizzle-orm';

import type { Company, ServiceProvider } from '@serp/types/types';

export default defineEventHandler(async (event) => {
  try {
    const slug = getRouterParam(event, 'slug');
    const cacheKey = `company-${slug}`;
    const { value, addToCache } = await useDataCache(cacheKey, event);
    if (value) {
      if (value.type === 'service-provider') {
        // refresh serviceProviderReviewAggregate info and verification info
        const refreshQuery = db
          .select({
            numReviews: serviceProviderReviewAggregate.numReviews,
            numOneStarReviews: serviceProviderReviewAggregate.numOneStarReviews,
            numTwoStarReviews: serviceProviderReviewAggregate.numTwoStarReviews,
            numThreeStarReviews:
              serviceProviderReviewAggregate.numThreeStarReviews,
            numFourStarReviews:
              serviceProviderReviewAggregate.numFourStarReviews,
            numFiveStarReviews:
              serviceProviderReviewAggregate.numFiveStarReviews,
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
      } else {
        // refresh companyReviewAggregate info and verification info
        const refreshQuery = db
          .select({
            numReviews: companyReviewAggregate.numReviews,
            numOneStarReviews: companyReviewAggregate.numOneStarReviews,
            numTwoStarReviews: companyReviewAggregate.numTwoStarReviews,
            numThreeStarReviews: companyReviewAggregate.numThreeStarReviews,
            numFourStarReviews: companyReviewAggregate.numFourStarReviews,
            numFiveStarReviews: companyReviewAggregate.numFiveStarReviews,
            averageRating: companyReviewAggregate.averageRating,
            verified: companyVerification.id,
            verifiedEmail: user.email
          })
          .from(companyCache)
          .leftJoin(
            companyReviewAggregate,
            eq(companyReviewAggregate.companyId, companyCache.id)
          )
          .leftJoin(
            companyVerification,
            eq(companyVerification.company, companyCache.id)
          )
          .leftJoin(user, eq(user.id, companyVerification.user))
          .where(eq(companyCache.id, value.id));
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
    }

    let company;
    let results;

    const query = db
      .select({
        id: companyCache.id,
        name: companyCache.name,
        slug: companyCache.slug,
        oneLiner: companyCache.oneLiner,
        excerpt: companyCache.excerpt,
        logo: companyCache.logo,
        serplyLink: companyCache.serplyLink,
        content: companyCache.content,
        features: companyCache.features,
        pros: companyCache.pros,
        cons: companyCache.cons,
        faqs: companyCache.faqs,
        alternatives: companyCache.alternatives,
        categories: companyCache.categories,
        screenshots: companyCache.screenshots,
        videoId: companyCache.videoId,
        numReviews: companyReviewAggregate.numReviews,
        numOneStarReviews: companyReviewAggregate.numOneStarReviews,
        numTwoStarReviews: companyReviewAggregate.numTwoStarReviews,
        numThreeStarReviews: companyReviewAggregate.numThreeStarReviews,
        numFourStarReviews: companyReviewAggregate.numFourStarReviews,
        numFiveStarReviews: companyReviewAggregate.numFiveStarReviews,
        averageRating: companyReviewAggregate.averageRating,
        verified: companyVerification.id,
        verifiedEmail: user.email,
        type: sql`'company'`.as('type')
      })
      .from(companyCache)
      .leftJoin(
        companyReviewAggregate,
        eq(companyReviewAggregate.companyId, companyCache.id)
      )
      .leftJoin(
        companyVerification,
        eq(companyVerification.company, companyCache.id)
      )
      .leftJoin(user, eq(user.id, companyVerification.user));

    results = await query
      .where(eq(companyCache.slug, slug as string))
      .limit(1)
      .execute();

    if (!results.length) {
      try {
        results = await query
          .where(eq(companyCache.id, slug as string))
          .limit(1)
          .execute();
      } catch {
        // Ignore error
        results = [];
      }
      if (results.length) {
        company = results[0] as Company;
      }
    } else {
      company = results[0] as Company;
    }

    if (!results.length) {
      const serviceProviderQuery = db
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
          numThreeStarReviews:
            serviceProviderReviewAggregate.numThreeStarReviews,
          numFourStarReviews: serviceProviderReviewAggregate.numFourStarReviews,
          numFiveStarReviews: serviceProviderReviewAggregate.numFiveStarReviews,
          averageRating: serviceProviderReviewAggregate.averageRating,
          verified: serviceProviderVerification.id,
          verifiedEmail: user.email,
          type: sql`'service-provider'`.as('type')
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
        .leftJoin(user, eq(user.id, serviceProviderVerification.user));

      results = await serviceProviderQuery
        .where(eq(serviceProviderCache.slug, slug as string))
        .limit(1)
        .execute();
      if (!results.length) {
        try {
          results = await serviceProviderQuery
            .where(eq(serviceProviderCache.id, slug as string))
            .limit(1)
            .execute();
        } catch {
          // Ignore error
          results = [];
        }
        if (!results.length) {
          throw createError({
            statusCode: 404,
            message: 'Company not found'
          });
        } else {
          company = results[0] as ServiceProvider;
        }
      } else {
        company = results[0] as ServiceProvider;
      }
    }

    const response = company;

    addToCache(response, [], 60 * 60 * 10); // 10 hours
    return response;
  } catch (error: unknown) {
    console.error('Error fetching company data:', error);
    throw createError({
      statusCode: 500,
      message: (error as Error).message
    });
  }
});
