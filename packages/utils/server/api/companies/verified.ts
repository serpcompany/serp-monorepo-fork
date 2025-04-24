import { db } from '@serp/utils/server/api/db';
import {
  companyCache,
  companyVerification,
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

    const verifiedCompanies = await db
      .select({
        id: companyCache.id,
        name: companyCache.name,
        domain: companyCache.domain,
        verifiedAt: companyVerification.createdAt
      })
      .from(companyVerification)
      .innerJoin(companyCache, eq(companyVerification.company, companyCache.id))
      .where(eq(companyVerification.user, userId))
      .execute();

    return { companies: verifiedCompanies };
  } catch (err: unknown) {
    return {
      status: err.statusCode || 500,
      message: err.message || 'Something went wrong'
    };
  }
});
