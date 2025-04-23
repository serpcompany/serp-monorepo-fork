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
    if (!email) return { status: 401, message: 'Unauthorized' };

    const userResult = await db
      .select()
      .from(user)
      .where(eq(user.email, email))
      .limit(1)
      .execute();
    if (!userResult || userResult.length === 0) {
      return { status: 404, message: 'User not found' };
    }
    const userId = userResult[0].id;

    const verificationResults = await db
      .select({
        id: companyCache.id,
        domain: companyCache.domain
      })
      .from(companyCache)
      .innerJoin(
        companyVerification,
        eq(companyVerification.company, companyCache.id)
      )
      .where(eq(companyVerification.user, userId))
      .execute();

    return verificationResults.length > 0 ? verificationResults : [];
  } catch (error) {
    console.error('Error in claim company:', error.message);
    return { status: 500, message: error.message };
  }
});
