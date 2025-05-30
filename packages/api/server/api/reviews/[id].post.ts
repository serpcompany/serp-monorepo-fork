import { getDb } from '@serp/db/server/database';
import { review } from '@serp/db/server/database/schema';
import { and, eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    const session = await requireUserSession(event);
    const userId = session?.user?.siteId;
    if (!userId) return { status: 401, message: 'Unauthorized' };

    const { id } = getRouterParams(event);
    if (!id) {
      return { status: 400, message: 'ID is required' };
    }

    const body = await readBody(event);
    const { title, content, rating, dateOfExperience } = body;

    if (!title || !content || !rating || !dateOfExperience) {
      return { status: 400, message: 'Missing required fields' };
    }

    const ratingInt = parseInt(rating, 10);
    if (isNaN(ratingInt) || ratingInt < 1 || ratingInt > 5) {
      return {
        status: 400,
        message: 'Rating must be an integer between 1 and 5'
      };
    }

    // Check if review already exists for this user for the given entity
    const existingReview = await getDb()
      .select({ id: review.id })
      .from(review)
      .where(and(eq(review.entity, id), eq(review.user, userId)))
      .limit(1)
      .execute();

    if (existingReview.length > 0) {
      return {
        status: 400,
        message: 'Review already exists, use PUT to update'
      };
    }

    // Insert the new review record
    await getDb()
      .insert(review)
      .values({
        title,
        content,
        rating: ratingInt,
        dateOfExperience: new Date(dateOfExperience),
        createdAt: new Date(),
        user: userId,
        entity: id
      })
      .execute();

    return { message: 'success' };
  } catch (error: unknown) {
    return { status: 500, message: error.message };
  }
});
