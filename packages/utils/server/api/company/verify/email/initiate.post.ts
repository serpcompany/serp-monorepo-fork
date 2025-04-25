import crypto from 'crypto';
import { and, eq } from 'drizzle-orm';
import { defineEventHandler, readBody } from 'h3';
import { sendEmail } from '../../../../utils/mailGun';
import { db } from '../../../db';
import {
  companyCache,
  companyVerification,
  companyVerificationRequests,
  user
} from '../../../db/schema';

export default defineEventHandler(async (event) => {
  try {
    const session = await requireUserSession(event);
    const userEmail = session.user?.email;
    if (!userEmail) return { error: 'Unauthorized, sign in first' };

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

    // fetch the company’s domain
    const [company] = await db
      .select({ domain: companyCache.domain })
      .from(companyCache)
      .where(eq(companyCache.id, id))
      .limit(1)
      .execute();

    if (!company) {
      return { error: 'company not found' };
    }

    const userResult = await db
      .select()
      .from(user)
      .where(eq(user.email, userEmail))
      .limit(1);
    if (!userResult || userResult.length === 0) {
      return { error: 'User not found' };
    }
    const userId = userResult[0].id;
    if (!userId) {
      return { error: 'user not found' };
    }

    // check if the user is already verified
    const [verification] = await db
      .select({ id: companyVerification.id })
      .from(companyVerification)
      .where(
        and(
          eq(companyVerification.company, id),
          eq(companyVerification.user, userId)
        )
      )
      .limit(1)
      .execute();
    if (verification) {
      return { error: 'user already verified' };
    }

    // domain must match
    if (!email.toLowerCase().endsWith(`@${company.domain.toLowerCase()}`)) {
      return { error: `use an email at @${company.domain}` };
    }

    // generate code + expiry
    const code = crypto.randomBytes(16).toString('hex'); // 16 bytes = 32 hex chars
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 1000 * 60 * 60); // 1h

    // insert request
    const [req] = await db
      .insert(companyVerificationRequests)
      .values({
        company: id,
        user: userId,
        email,
        code,
        createdAt: now,
        expiresAt
      })
      .returning();

    // send the email
    const link = `${process.env.APP_URL}/users/manage/company/confirm?requestId=${req.id}&code=${code}`;
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
