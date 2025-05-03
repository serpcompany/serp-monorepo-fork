import { db } from '@serp/utils/server/api/db';
import { serviceProviderReview, user } from '@serp/utils/server/api/db/schema';
import { and, eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    const session = await requireUserSession(event);
    const email = session.user?.email;
    if (!email) return { status: 401, message: 'Unauthorized' };

    const { id } = getRouterParams(event);
    if (!id) {
      return {
        status: 400,
        message: 'Service Provider ID is required in the URL'
      };
    }

    // Find the existing review by this user for the given service provider
    const existingReview = await db
      .select({ id: serviceProviderReview.id })
      .from(serviceProviderReview)
      .leftJoin(user, eq(serviceProviderReview.user, user.id))
      .where(
        and(
          eq(serviceProviderReview.serviceProvider, id),
          eq(user.email, email)
        )
      )
      .limit(1);

    if (existingReview.length === 0) {
      return { status: 404, message: 'Review not found for deletion' };
    }

    // Delete the review
    await db
      .delete(serviceProviderReview)
      .where(eq(serviceProviderReview.id, existingReview[0].id));

    return { message: 'success' };
  } catch (error: unknown) {
    return { status: 500, message: error.message };
  }
});
