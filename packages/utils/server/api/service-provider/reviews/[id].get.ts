import { db } from '@serp/utils/server/api/db';
import { serviceProviderReview, user } from '@serp/utils/server/api/db/schema';
import { and, eq, not, sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    const session = await getUserSession(event);
    const email = session?.user?.email;

    const { id } = getRouterParams(event);
    const { page = '1', pageSize = '10' } = getQuery(event);

    if (!id) {
      return { status: 400, message: 'ID is required' };
    }

    const pageInt = parseInt(page, 10);
    const pageSizeInt = parseInt(pageSize, 10);
    const offset = (pageInt - 1) * pageSizeInt;

    const reviews = await db
      .select({
        id: serviceProviderReview.id,
        createdAt: serviceProviderReview.createdAt,
        updatedAt: serviceProviderReview.updatedAt,
        content: serviceProviderReview.content,
        rating: serviceProviderReview.rating,
        dateOfExperience: serviceProviderReview.dateOfExperience,
        user: {
          id: user.id,
          name: user.name,
          image: user.image
        },
        isFlagged: serviceProviderReview.isFlagged,
        flaggedAt: serviceProviderReview.flaggedAt,
        flaggedReason: serviceProviderReview.flaggedReason,
        flaggedBy: serviceProviderReview.flaggedBy
      })
      .from(serviceProviderReview)
      .leftJoin(user, eq(serviceProviderReview.user, user.id))
      .where(
        and(
          eq(serviceProviderReview.serviceProvider, id),
          email ? not(eq(user.email, email)) : true
        )
      )
      .orderBy(serviceProviderReview.createdAt)
      .limit(pageSizeInt)
      .offset(offset);

    const totalCountResult = await db
      .select({ total: sql`COUNT(*)` })
      .from(serviceProviderReview)
      .where(eq(serviceProviderReview.serviceProvider, id));
    const totalCount = totalCountResult[0]?.total || 0;

    let userReview = null;
    if (email) {
      const usersReview = await db
        .select()
        .from(serviceProviderReview)
        .leftJoin(user, eq(serviceProviderReview.user, user.id))
        .where(
          and(
            eq(serviceProviderReview.serviceProvider, id),
            eq(user.email, email)
          )
        )
        .limit(1);
      if (usersReview.length > 0) {
        userReview = {
          ...usersReview[0],
          user: {
            id: usersReview[0].user,
            name: session.user?.name || null,
            image: session.user?.image || null
          }
        };
      }
    }

    return {
      reviews,
      pagination: {
        currentPage: pageInt,
        pageSize: pageSizeInt,
        totalItems: totalCount
      },
      userReview
    };
  } catch (error) {
    return { status: 500, message: error.message };
  }
});
