import { getDb } from '@serp/db/server/database';
import { getAuthDb } from '@serp/db/server/database/auth';
import {
  user as authUserModel,
  domain,
  lDomainUser
} from '@serp/db/server/database/auth/schema';
import { user } from '@serp/db/server/database/schema';
import { eq, sql } from 'drizzle-orm';

export interface OAuthUserData {
  email: string;
  name: string;
  image: string;
  provider: 'google' | 'github';
  providerUserId: string;
  centralAuthId?: number;
  siteId?: number;
}

// @todo - improve the typesafety of this after implementing zod  
export const handleOAuthSuccess = async (event: H3Event, oauthUser: OAuthUserData) => {
  if (!oauthUser || !oauthUser.email) {
    // eslint-disable-next-line no-console
    console.error('No user data returned from OAuth provider');
    return sendRedirect(event, '/login?error=invalidUserData');
  }

  const now = sql`now()`;
  const domainName = process.env.NUXT_PUBLIC_DOMAIN;
  await getAuthDb().transaction(async (tx) => {
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

    oauthUser.centralAuthId = userId;

    await tx
      .insert(lDomainUser)
      .values({ userId, domainId })
      .onConflictDoNothing();
  });

  const [dbUser] = await getDb()
    .insert(user)
    .values({
      email: oauthUser.email,
      name: oauthUser.name,
      image: oauthUser.image,
      createdAt: now,
      updatedAt: now
    })
    .onConflictDoUpdate({
      target: user.email,
      set: {
        name: oauthUser.name,
        image: oauthUser.image,
        updatedAt: now
      }
    })
    .returning({ id: user.id });

  const dbUserId = dbUser.id;
  oauthUser.siteId = dbUserId;

  await setUserSession(event, { user: oauthUser });
  return sendRedirect(event, '/');
};
