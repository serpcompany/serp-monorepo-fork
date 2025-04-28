import { db } from '@serp/utils/server/api/db';
import {
  serviceProviderCache,
  serviceProviderVerification,
  user
} from '@serp/utils/server/api/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    const session = await requireUserSession(event);
    const email = session.user?.email;
    if (!email) {
      return { status: 401, message: 'Unauthorized' };
    }

    const userResult = await db
      .select({ id: user.id })
      .from(user)
      .where(eq(user.email, email))
      .limit(1)
      .execute();
    if (!userResult.length) {
      return { status: 404, message: 'User not found' };
    }
    const userId = userResult[0].id;

    const verifiedServiceProviders = await db
      .select({
        id: serviceProviderCache.id,
        name: serviceProviderCache.name,
        slug: serviceProviderCache.slug,
        verifiedAt: serviceProviderVerification.createdAt
      })
      .from(serviceProviderVerification)
      .innerJoin(
        serviceProviderCache,
        eq(serviceProviderVerification.serviceProvider, serviceProviderCache.id)
      )
      .where(eq(serviceProviderVerification.user, userId))
      .execute();

    return { serviceProviders: verifiedServiceProviders };
  } catch (err: unknown) {
    return {
      status: err.statusCode || 500,
      message: err.message || 'Something went wrong'
    };
  }
});
