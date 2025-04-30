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
      return { status: 400, message: 'ID is required in the URL' };
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

    // Check if review already exists for this user for the given service provider
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

    if (existingReview.length > 0) {
      return {
        status: 400,
        message: 'Review already exists, use PUT to update'
      };
    }

    const userResult = await db
      .select()
      .from(user)
      .where(eq(user.email, email))
      .limit(1);
    if (!userResult || userResult.length === 0) {
      return { status: 404, message: 'User not found' };
    }
    const userId = userResult[0].id;

    // Insert the new review record
    await db.insert(serviceProviderReview).values({
      title,
      content,
      rating: ratingInt,
      dateOfExperience: new Date(dateOfExperience),
      createdAt: new Date(),
      user: userId,
      serviceProvider: id
    });

    return { message: 'success' };
  } catch (error: unknown) {
    return { status: 500, message: error.message };
  }
});
