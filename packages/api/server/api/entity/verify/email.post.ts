import { getDb } from '@serp/db/server/database';
import {
  verification,
  verificationRequest
} from '@serp/db/server/database/schema';
import { eq } from 'drizzle-orm';
import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const userId = session?.user?.siteId;
  if (!userId) return { status: 401, message: 'Unauthorized' };

  const { requestId, code } = (await readBody(event)) as {
    requestId?: number;
    code?: string;
  };
  if (!requestId || !code) {
    return { error: 'requestId and code are required' };
  }

  // grab the pending request
  const [req] = await getDb()
    .select()
    .from(verificationRequest)
    .where(eq(verificationRequest.id, requestId))
    .limit(1)
    .execute();

  if (!req) {
    return { error: 'verification request not found' };
  }

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

  const [ver] = await getDb()
    .insert(verification)
    .values({
      entity: req.entity,
      user: userId
    })
    .returning();

  // mark the request as verified
  await getDb()
    .update(verificationRequest)
    .set({ verification: ver.id })
    .where(eq(verificationRequest.id, requestId))
    .execute();

  return { ok: true, verificationId: ver.id };
});
