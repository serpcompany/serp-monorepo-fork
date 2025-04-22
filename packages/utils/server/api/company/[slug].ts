import { useDataCache } from '#nuxt-multi-cache/composables';
import { db } from '@serp/utils/server/api/db';
import {
  companyCache,
  companyReviewAggregate,
  companyVerification,
  user
} from '@serp/utils/server/api/db/schema';
import { eq } from 'drizzle-orm';

import type { Company } from '@serp/types/types';

export default defineEventHandler(async (event) => {
  try {
    const slug = getRouterParam(event, 'slug');
    const cacheKey = `company-${slug}`;
    const { value, addToCache } = await useDataCache(cacheKey, event);
    if (value) {
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
      }
      return value;
    }

    let query = db
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

    let results = await query
      .where(eq(companyCache.slug, slug as string))
      .limit(1)
      .execute();

    if (!results.length) {
      results = await query
        .where(
          eq(companyCache.id, slug as string)
        )
        .limit(1)
        .execute();
      if (!results.length) {
        throw createError({
          statusCode: 404,
          message: 'Company not found'
        });
      }
    }

    const company = results[0] as Company;
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
