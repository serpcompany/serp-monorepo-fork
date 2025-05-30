import { getDb } from '@serp/db/server/database';
import {
  entity,
  verification,
  verificationRequest
} from '@serp/db/server/database/schema';
import { sendEmail } from '@serp/mail/server';
import crypto from 'crypto';
import { and, eq } from 'drizzle-orm';
import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    const session = await requireUserSession(event);
    const userId = session?.user?.siteId;
    if (!userId) return { status: 401, message: 'Unauthorized' };

    const { id, email } = (await readBody(event)) as {
      id?: number;
      email?: string;
    };

    if (!id) {
      return { error: 'company id is required' };
    }
    if (!email) {
      return { error: 'email is required' };
    }

    // fetch the entity's domain
    const [entity_] = await getDb()
      .select({ slug: entity.slug })
      .from(entity)
      .where(eq(entity.id, id))
      .limit(1)
      .execute();

    if (!entity_) {
      return { error: 'Entity not found' };
    }

    // check if the user is already verified
    const [ver] = await getDb()
      .select({ id: verification.id })
      .from(verification)
      .where(and(eq(verification.entity, id), eq(verification.user, userId)))
      .limit(1)
      .execute();
    if (ver) {
      return { error: 'user already verified' };
    }

    // domain must match
    if (!email.toLowerCase().endsWith(`@${entity_.slug.toLowerCase()}`)) {
      return { error: `use an email at @${entity_.slug}` };
    }

    // generate code + expiry
    const code = crypto.randomBytes(16).toString('hex'); // 16 bytes = 32 hex chars
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 1000 * 60 * 60); // 1h

    // insert request
    const [req] = await getDb()
      .insert(verificationRequest)
      .values({
        entity: id,
        user: userId,
        email,
        code,
        createdAt: now,
        expiresAt
      })
      .returning();

    // send the email
    const link = `${process.env.APP_URL}/users/manage/confirm?requestId=${req.id}&code=${code}`;
    await sendEmail({
      to: email,
      subject: '🔒 Verify your company email',
      html: `
        <p><a href="${link}">click here to verify your company</a>. (expires in 1 hour)</p>
      `.trim()
    });

    return { ok: true, requestId: req.id };
  } catch (error) {
    event.node.res.statusCode = 500;
    return { error: error.message };
  }
});
