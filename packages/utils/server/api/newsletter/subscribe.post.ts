import { authDb } from '@serp/utils/server/api/db/auth';
import {
  domain,
  lDomainNewsletter,
  newsletterSubscription
} from '@serp/utils/server/api/db/auth/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    const { email } = await readBody<{ email?: string }>(event);

    if (!email) return { status: 400, message: 'Email is required' };
    if (!email.includes('@')) return { status: 400, message: 'Invalid email' };

    const domainName = process.env.NUXT_PUBLIC_DOMAIN!;

    await authDb.transaction(async (tx) => {
      const subInsert = await tx
        .insert(newsletterSubscription)
        .values({ email })
        .onConflictDoNothing()
        .returning({ id: newsletterSubscription.id });

      const newsletterId =
        subInsert.length > 0
          ? subInsert[0].id
          : (
              await tx
                .select({ id: newsletterSubscription.id })
                .from(newsletterSubscription)
                .where(eq(newsletterSubscription.email, email))
            )[0].id;

      const domInsert = await tx
        .insert(domain)
        .values({ name: domainName })
        .onConflictDoNothing()
        .returning({ id: domain.id });

      const domainId =
        domInsert.length > 0
          ? domInsert[0].id
          : (
              await tx
                .select({ id: domain.id })
                .from(domain)
                .where(eq(domain.name, domainName))
            )[0].id;

      await tx
        .insert(lDomainNewsletter)
        .values({ domainId, newsletterId })
        .onConflictDoNothing();
    });

    return { status: 200, message: 'success' };
  } catch (error) {
    return {
      status: error.statusCode || 500,
      message: error.message
    };
  }
});
