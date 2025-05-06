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

    const { id } = getRouterParams(event);
    if (!id) return { status: 400, message: 'ID is required' };

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

    // Verify company exists and grab domain
    const companyResult = await db
      .select({
        domain: companyCache.domain
      })
      .from(companyCache)
      .where(eq(companyCache.id, id))
      .limit(1)
      .execute();
    if (!companyResult || companyResult.length === 0) {
      return { status: 404, message: 'Company not found' };
    }
    const domain = companyResult[0].domain;

    // Check if already verified
    const verificationResult = await db
      .select({
        id: companyVerification.id,
        user: companyVerification.user
      })
      .from(companyVerification)
      .where(eq(companyVerification.company, id))
      .limit(1)
      .execute();
    if (verificationResult && verificationResult.length > 0) {
      // Check if verified with the same user
      if (verificationResult[0].user === userId) {
        return { status: 400, message: 'Company already verified by you' };
      }
      return {
        status: 400,
        message: 'Company already verified by another user'
      };
    }

    // Finally assert that the domain is in the user's email
    const emailSplit = email.split('@');
    const emailDomain = emailSplit[emailSplit.length - 1];
    if (emailDomain !== domain) {
      return {
        status: 400,
        message:
          "Domain does not match user email, please create an account using an email with your company's domain"
      };
    }

    // Insert verification request
    const newVerification = {
      company: id,
      user: userId
    };

    const inserted = await db
      .insert(companyVerification)
      .values(newVerification)
      .returning();
    if (!inserted || inserted.length === 0) {
      return { status: 500, message: 'Failed to insert verification request' };
    }

    return { status: 200, message: 'success', id: inserted[0].id };
  } catch (error) {
    return { status: 500, message: error.message };
  }
});
