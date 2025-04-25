import { db } from '@serp/utils/server/api/db';
import { authDb } from '@serp/utils/server/api/db/auth';
import {
  user as authUserModel,
  domain,
  lDomainUser
} from '@serp/utils/server/api/db/auth/schema';
import { user } from '@serp/utils/server/api/db/schema';
import { eq, sql } from 'drizzle-orm';

export interface OAuthUserData {
  email: string;
  name: string;
  image: string;
  provider: 'google' | 'github';
  providerUserId: string;
}

export const handleOAuthSuccess = async (event, oauthUser: OAuthUserData) => {
  if (!oauthUser || !oauthUser.email) {
    // eslint-disable-next-line no-console
    console.error('No user data returned from OAuth provider');
    return sendRedirect(event, '/login?error=invalidUserData');
  }

  const now = sql`now()`;
  const domainName = process.env.NUXT_PUBLIC_DOMAIN;
  await authDb.transaction(async (tx) => {
    const [domainRow] = await tx
      .insert(domain)
      .values({ name: domainName, created_at: now, updated_at: now })
      .onConflictDoNothing()
      .returning({ id: domain.id });

    const domainId =
      domainRow?.id ??
      (
        await tx
          .select({ id: domain.id })
          .from(domain)
          .where(eq(domain.name, domainName))
      )[0].id;

    const [authUser] = await tx
      .insert(authUserModel)
      .values({
        email: oauthUser.email,
        name: oauthUser.name,
        image: oauthUser.image,
        createdAt: now,
        updatedAt: now
      })
      .onConflictDoUpdate({
        target: authUserModel.email,
        set: {
          name: oauthUser.name,
          image: oauthUser.image,
          updatedAt: now
        }
      })
      .returning({ id: user.id });

    const userId = authUser.id;

    await tx
      .insert(lDomainUser)
      .values({ userId, domainId })
      .onConflictDoNothing();
  });

  await db
    .insert(user)
    .values({
      email: oauthUser.email,
      name: oauthUser.name,
      image: oauthUser.image,
      createdAt: now
    })
    .onConflictDoUpdate({
      target: user.email,
      set: {
        name: oauthUser.name,
        image: oauthUser.image,
        updatedAt: now
      }
    });

  await setUserSession(event, { user: oauthUser });
  return sendRedirect(event, '/');
};
