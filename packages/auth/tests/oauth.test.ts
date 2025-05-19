import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock DB and schema dependencies
vi.mock('@serp/db/server/database', () => ({
  getDb: () => ({
    insert: vi.fn().mockReturnThis(),
    values: vi.fn().mockReturnThis(),
    onConflictDoUpdate: vi.fn().mockReturnThis(),
    returning: vi.fn().mockReturnValue([{ id: 2 }])
  })
}));

vi.mock('@serp/db/server/database/auth', () => ({
  getAuthDb: () => ({
    transaction: vi.fn(
      async (cb) =>
        await cb({
          insert: vi.fn().mockReturnThis(),
          select: vi.fn().mockReturnThis(),
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          values: vi.fn().mockReturnThis(),
          onConflictDoNothing: vi.fn().mockReturnThis(),
          onConflictDoUpdate: vi.fn().mockReturnThis(),
          returning: vi.fn().mockReturnValue([{ id: 1 }])
        })
    )
  })
}));

vi.mock('@serp/db/server/database/auth/schema', () => ({
  user: { id: Symbol('authUser.id') },
  domain: { id: Symbol('domain.id'), name: Symbol('domain.name') },
  lDomainUser: {}
}));

vi.mock('@serp/db/server/database/schema', () => ({
  user: { id: Symbol('user.id') }
}));

vi.mock('drizzle-orm', () => ({
  eq: vi.fn(),
  sql: vi.fn((query) => query)
}));

describe('OAuth Handler Test', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    process.env.NUXT_PUBLIC_DOMAIN = 'test-domain.com';
  });

  it('should process OAuth user data and set session', async () => {
    const { handleOAuthSuccess } = await import('../server/utils/oauth');

    const mockEvent = {};
    const mockUser = {
      email: 'test@example.com',
      name: 'Test User',
      image: 'https://example.com/avatar.jpg',
      provider: 'github',
      providerUserId: '12345'
    };

    await handleOAuthSuccess(mockEvent, mockUser);

    expect(globalThis.setUserSession).toHaveBeenCalledWith(mockEvent, {
      user: expect.objectContaining({
        email: 'test@example.com',
        name: 'Test User',
        image: 'https://example.com/avatar.jpg',
        centralAuthId: 1,
        siteId: 2
      })
    });

    expect(globalThis.sendRedirect).toHaveBeenCalledWith(mockEvent, '/');
  });

  it('should redirect to login if user data is missing', async () => {
    const { handleOAuthSuccess } = await import('../server/utils/oauth');

    await handleOAuthSuccess({}, null);

    expect(globalThis.sendRedirect).toHaveBeenCalledWith(
      expect.anything(),
      '/login?error=invalidUserData'
    );
  });
});
