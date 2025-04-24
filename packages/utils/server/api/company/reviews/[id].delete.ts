import { db } from '@serp/utils/server/api/db';
import { companyReview, user } from '@serp/utils/server/api/db/schema';
import { and, eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    const session = await requireUserSession(event);
    const email = session.user?.email;
    if (!email) return { status: 401, message: 'Unauthorized' };

    const { id } = getRouterParams(event);
    if (!id) {
      return { status: 400, message: 'Company ID is required in the URL' };
    }

    // Find the existing review by this user for the given company
    const existingReview = await db
      .select({ id: companyReview.id })
      .from(companyReview)
      .leftJoin(user, eq(companyReview.user, user.id))
      .where(and(eq(companyReview.company, id), eq(user.email, email)))
      .limit(1);

    if (existingReview.length === 0) {
      return { status: 404, message: 'Review not found for deletion' };
    }

    // Delete the review
    await db
      .delete(companyReview)
      .where(eq(companyReview.id, existingReview[0].id));

    return { message: 'success' };
  } catch (error: unknown) {
    return { status: 500, message: error.message };
  }
});
