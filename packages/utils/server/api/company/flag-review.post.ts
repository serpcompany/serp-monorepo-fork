import { db } from '@serp/utils/server/api/db';
import { companyReview, companyVerification, user } from '@serp/utils/server/api/db/schema';
import { and, eq, sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    const session = await requireUserSession(event);
    const email = session.user?.email;
    if (!email) return { status: 401, message: 'Unauthorized' };

    const { id } = getQuery(event);
    if (!id) {
      return { status: 400, message: 'Review ID is required in the query params' };
    }

    const body = await readBody(event);
    const { notes } = body;

    const userResult = await db
      .select()
      .from(user)
      .where(eq(user.email, email))
      .limit(1);
    if (!userResult || userResult.length === 0) {
      return { status: 404, message: 'User not found' };
    }
    const userId = userResult[0].id;

    // Check if review exists to a company the user is verified for
    const existingReview = await db
      .select({ id: companyReview.id })
      .from(companyReview)
      .leftJoin(companyVerification, eq(companyReview.company, companyVerification.company))
      .where(and(eq(companyReview.id, id), eq(companyVerification.user, userId)))
      .limit(1);

    if (existingReview.length === 0) {
        return { status: 404, message: 'Review not found' };
    }

    await db
      .update(companyReview)
      .set({
        updatedAt: sql`now()`,
        isFlagged: true,
        flaggedAt: sql`now()`,
        flaggedReason: notes,
        flaggedBy: userId
      })
      .where(eq(companyReview.id, existingReview[0].id));

    return { message: 'success' };
  } catch (error: unknown) {
    return { status: 500, message: error.message };
  }
});
