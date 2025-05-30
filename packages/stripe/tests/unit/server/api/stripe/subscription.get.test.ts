import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mockGetQuery, mockStripe } from '../../../../setup';

// Create a proper mock for the stripe server
const originalMockServer = vi.hoisted(() => ({
  useServerStripe: vi.fn()
}));

vi.mock('#stripe/server', () => originalMockServer);

describe('Subscription Get API', () => {
  let handler;
  let mockRequireUserSession;

  // Create local mock for Stripe subscriptions
  const mockSubscriptionsRetrieve = vi.fn();

  // Create a local Stripe mock we control
  const localMockStripe = {
    subscriptions: {
      retrieve: mockSubscriptionsRetrieve
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
      subscriptionId: 'sub_test_123'
    });

    // Import handler
    handler = (
      await import('../../../../../server/api/stripe/subscription.get')
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

  describe('Subscription retrieval', () => {
    it('should retrieve subscription successfully', async () => {
      // Mock Stripe response
      const mockSubscription = {
        id: 'sub_test_123',
        status: 'active',
        current_period_end: 1626307200,
        customer: 'cus_test_123',
        items: {
          data: [
            {
              price: { id: 'price_test_featured_1' }
            }
          ]
        }
      };
      mockSubscriptionsRetrieve.mockResolvedValueOnce(mockSubscription);

      const result = await handler({});

      // Check that Stripe was called correctly
      expect(mockSubscriptionsRetrieve).toHaveBeenCalledWith('sub_test_123');

      // Check returned result
      expect(result).toEqual(mockSubscription);
    });

    it('should throw error when subscription retrieval fails', async () => {
      // Mock Stripe error
      mockSubscriptionsRetrieve.mockRejectedValueOnce(
        new Error('Subscription not found')
      );

      // Test that error is thrown
      await expect(handler({})).rejects.toThrow('Failed to get subscription');
    });
  });
});
