import { eq } from 'drizzle-orm';
import { defineEventHandler, readBody } from 'h3';
import { db } from '../../db';
import {
  companyVerification,
  companyVerificationRequests,
  user
} from '../../db/schema';

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const email = session.user?.email;
  if (!email) return { error: 'Unauthorized' };

  const { requestId, code } = (await readBody(event)) as {
    requestId?: number;
    code?: string;
  };
  if (!requestId || !code) {
    return { error: 'requestId and code are required' };
  }

  // grab the pending request
  const [req] = await db
    .select()
    .from(companyVerificationRequests)
    .where(eq(companyVerificationRequests.id, requestId))
    .limit(1)
    .execute();

  if (!req) {
    return { error: 'verification request not found' };
  }

  const userResult = await db
    .select()
    .from(user)
    .where(eq(user.email, email))
    .limit(1);
  if (!userResult || userResult.length === 0) {
    return { error: 'User not found' };
  }
  const userId = userResult[0].id;

  // only the creator can verify it
  if (req.user !== userId) {
    return { error: 'forbidden' };
  }

  // check if already used
  if (req.verification) {
    return { ok: true, error: 'already verified' };
  }

  // code match + expiry
  if (req.code !== code) {
    return { error: 'invalid code' };
  }
  if (new Date(req.expiresAt) < new Date()) {
    return { error: 'code expired' };
  }

  // insert into your actual verification table
  const [ver] = await db
    .insert(companyVerification)
    .values({
      company: req.company,
      user: userId
    })
    .returning();

  // mark the request as verified
  await db
    .update(companyVerificationRequests)
    .set({ verification: ver.id })
    .where(eq(companyVerificationRequests.id, requestId))
    .execute();

  return { ok: true, verificationId: ver.id };
});
