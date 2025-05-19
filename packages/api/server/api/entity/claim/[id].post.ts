import { getDb } from '@serp/db/server/database';
import { entity, verification } from '@serp/db/server/database/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    const session = await requireUserSession(event);
    const userId = session.user?.siteId;
    const email = session.user?.email;
    if (!userId) return { status: 401, message: 'Unauthorized' };
    if (!email) return { status: 401, message: 'Email is required' };

    const { id } = getRouterParams(event);
    if (!id) return { status: 400, message: 'ID is required' };

    // Verify entity exists and grab slug/domain
    const entityResult = await getDb()
      .select({
        slug: entity.slug
      })
      .from(entity)
      .where(eq(entity.id, id))
      .limit(1)
      .execute();
    if (!entityResult || entityResult.length === 0) {
      return { status: 404, message: 'Entity not found' };
    }

    // Check if already verified
    const verificationResult = await getDb()
      .select({
        id: verification.id,
        user: verification.user
      })
      .from(verification)
      .where(eq(verification.entity, id))
      .limit(1)
      .execute();
    if (verificationResult && verificationResult.length > 0) {
      // Check if verified with the same user
      if (verificationResult[0].user === userId) {
        return { status: 400, message: 'Entity already verified by you' };
      }
      return {
        status: 400,
        message: 'Entity already verified by another user'
      };
    }

    // Finally assert that the domain is in the user's email
    const emailSplit = email.split('@');
    const emailDomain = emailSplit[emailSplit.length - 1];
    const domain =
      process.env.NODE_ENV === 'production'
        ? entityResult[0].slug
        : emailDomain;
    if (emailDomain !== domain) {
      return {
        status: 400,
        message:
          "Domain does not match user email, please create an account using an email with your entity's domain"
      };
    }

    // Insert verification request
    const newVerification = {
      entity: id,
      user: userId
    };

    const inserted = await getDb()
      .insert(verification)
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
