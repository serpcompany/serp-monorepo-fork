// @vitest-environment nuxt
import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockHandleOAuthSuccess = vi.fn();
vi.mock('../server/utils/oauth', () => ({
  handleOAuthSuccess: mockHandleOAuthSuccess
}));

// Interceptor pattern to capture the handler for testing
const mockHandler = { onSuccess: null };
globalThis.defineOAuthGitHubEventHandler = vi.fn((config) => {
  mockHandler.onSuccess = config.onSuccess;
  return config;
});

describe('GitHub OAuth Handler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should correctly map GitHub user data', async () => {
    await import('../server/api/auth/github');
    expect(mockHandler.onSuccess).toBeDefined();

    const githubUser = {
      email: 'test@example.com',
      name: 'Test User',
      avatar_url: 'https://example.com/avatar.jpg',
      id: '12345'
    };

    await mockHandler.onSuccess({}, { user: githubUser });

    expect(mockHandleOAuthSuccess).toHaveBeenCalledWith(
      {},
      {
        email: 'test@example.com',
        name: 'Test User',
        image: 'https://example.com/avatar.jpg',
        provider: 'github',
        providerUserId: '12345'
      }
    );
  });

  it('should handle errors properly', async () => {
    await import('../server/api/auth/github');
    mockHandleOAuthSuccess.mockRejectedValueOnce(new Error('Test error'));

    const githubUser = {
      email: 'test@example.com',
      name: 'Test User',
      avatar_url: 'https://example.com/avatar.jpg',
      id: '12345'
    };

    await expect(async () => {
      await mockHandler.onSuccess({}, { user: githubUser });
    }).rejects.toThrow('Authentication failed');

    expect(console.error).toHaveBeenCalledWith(
      'GitHubOAuthUser:',
      'Test error'
    );
  });
});
