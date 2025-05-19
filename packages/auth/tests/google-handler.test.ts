// @vitest-environment nuxt
import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockHandleOAuthSuccess = vi.fn();
vi.mock('../server/utils/oauth', () => ({
  handleOAuthSuccess: mockHandleOAuthSuccess
}));

// Interceptor pattern to capture the handler for testing
const mockHandler = { onSuccess: null };
globalThis.defineOAuthGoogleEventHandler = vi.fn((config) => {
  mockHandler.onSuccess = config.onSuccess;
  return config;
});

describe('Google OAuth Handler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should correctly map Google user data with first and last name', async () => {
    await import('../server/api/auth/google');
    expect(mockHandler.onSuccess).toBeDefined();

    const googleUser = {
      sub: '12345',
      given_name: 'Test',
      family_name: 'User',
      picture: 'https://example.com/avatar.jpg',
      email: 'test@example.com'
    };

    await mockHandler.onSuccess({}, { user: googleUser });

    expect(mockHandleOAuthSuccess).toHaveBeenCalledWith(
      {},
      {
        email: 'test@example.com',
        name: 'Test User',
        image: 'https://example.com/avatar.jpg',
        provider: 'google',
        providerUserId: '12345'
      }
    );
  });

  it('should correctly map Google user data with only given name', async () => {
    await import('../server/api/auth/google');

    const googleUser = {
      sub: '12345',
      given_name: 'Test',
      family_name: '',
      picture: 'https://example.com/avatar.jpg',
      email: 'test@example.com'
    };

    await mockHandler.onSuccess({}, { user: googleUser });

    expect(mockHandleOAuthSuccess).toHaveBeenCalledWith(
      {},
      {
        email: 'test@example.com',
        name: 'Test',
        image: 'https://example.com/avatar.jpg',
        provider: 'google',
        providerUserId: '12345'
      }
    );
  });

  it('should handle errors properly', async () => {
    await import('../server/api/auth/google');
    mockHandleOAuthSuccess.mockRejectedValueOnce(new Error('Test error'));

    const googleUser = {
      sub: '12345',
      given_name: 'Test',
      family_name: 'User',
      picture: 'https://example.com/avatar.jpg',
      email: 'test@example.com'
    };

    await expect(async () => {
      await mockHandler.onSuccess({}, { user: googleUser });
    }).rejects.toThrow('Authentication failed');

    expect(console.error).toHaveBeenCalledWith(
      'GoogleOAuthUser:',
      'Test error'
    );
  });
});
