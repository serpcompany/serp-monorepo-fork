import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mockGetQuery } from '../../../../setup';

const originalMockServer = vi.hoisted(() => ({
  useServerStripe: vi.fn()
}));

vi.mock('#stripe/server', () => originalMockServer);

describe('Checkout Session Get API', () => {
  let handler;
  let mockRequireUserSession;

  // Create local mock for Stripe checkout sessions
  const mockCheckoutSessionsRetrieve = vi.fn();

  // Create a local Stripe mock we control
  const localMockStripe = {
    checkout: {
      sessions: {
        retrieve: mockCheckoutSessionsRetrieve
      }
    }
  };

  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();

    // Setup our local Stripe mock to return consistent known values
    originalMockServer.useServerStripe.mockResolvedValue(localMockStripe);

    // Setup mock user session
    mockRequireUserSession = vi.fn().mockResolvedValue({
      user: { siteId: 'user-123', id: 'user-123', email: 'test@example.com' }
    });
    globalThis.requireUserSession = mockRequireUserSession;

    // Mock the query parameters
    mockGetQuery.mockReturnValue({
      sessionId: 'cs_test_123'
    });

    // Import handler
    handler = (
      await import('../../../../../server/api/stripe/checkout-session.get')
    ).default;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Authentication', () => {
    it('should return unauthorized if user is not authenticated', async () => {
      // Mock unauthenticated user
      mockRequireUserSession.mockResolvedValueOnce({ user: {} });

      const result = await handler({});
      expect(result).toEqual({ status: 401, message: 'Unauthorized' });
    });
  });

  describe('Stripe initialization', () => {
    it('should return error if Stripe is not initialized', async () => {
      // Mock useServerStripe to return null for this one test
      originalMockServer.useServerStripe.mockResolvedValueOnce(null);

      const result = await handler({});
      expect(result).toEqual({
        clientSecret: null,
        error: 'Stripe not initialized'
      });
    });
  });

  describe('Session retrieval', () => {
    it('should retrieve checkout session successfully', async () => {
      // Mock Stripe response
      const mockSession = {
        id: 'cs_test_123',
        payment_status: 'paid',
        customer: 'cus_123',
        amount_total: 9900
      };
      mockCheckoutSessionsRetrieve.mockResolvedValueOnce(mockSession);

      const result = await handler({});

      // Check that Stripe was called correctly
      expect(mockCheckoutSessionsRetrieve).toHaveBeenCalledWith('cs_test_123');

      // Check returned result
      expect(result).toEqual(mockSession);
    });

    it('should throw error when session retrieval fails', async () => {
      // Mock Stripe error
      mockCheckoutSessionsRetrieve.mockRejectedValueOnce(
        new Error('Session not found')
      );

      // Test that error is thrown
      await expect(handler({})).rejects.toThrow(
        'Failed to get checkout session'
      );
    });
  });
});
