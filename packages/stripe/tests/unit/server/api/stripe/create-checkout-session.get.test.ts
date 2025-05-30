import { customer } from '@serp/db/server/database/schema';
import { eq } from 'drizzle-orm';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  mockDb,
  mockExecute,
  mockGetQuery,
  mockStripe
} from '../../../../setup';

// Mock the validPaymentIntentMapping module
const mockProcessSuccessfulPayment = vi.fn().mockResolvedValue({
  amount: 9900,
  currency: 'usd',
  description: 'Featured listing (spot 1)',
  recurring: true,
  paymentId: 'price_test_featured_1'
});

vi.mock('../../../../../server/utils/validPaymentIntentMapping', () => ({
  processSuccessfulPayment: mockProcessSuccessfulPayment
}));

describe('Create Checkout Session API', () => {
  let handler;
  let mockRequireUserSession;

  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();

    // Setup mock user session
    mockRequireUserSession = vi.fn().mockResolvedValue({
      user: { siteId: 'user-123', id: 'user-123', email: 'test@example.com' }
    });
    globalThis.requireUserSession = mockRequireUserSession;

    // Mock query parameters
    mockGetQuery.mockReturnValue({
      type: 'featured-1',
      id: 'entity-123',
      secondaryId: 'category-123',
      successRoute: '/users/purchase?success=true',
      cancelRoute: '/users/purchase?cancel=true'
    });

    // Import handler
    handler = (
      await import(
        '../../../../../server/api/stripe/create-checkout-session.get'
      )
    ).default;
  });

  describe('Authentication', () => {
    it('should throw an error if user is not authenticated', async () => {
      // Mock unauthenticated user
      mockRequireUserSession.mockResolvedValueOnce({ user: {} });

      await expect(handler({})).rejects.toThrow('Unauthorized');
    });

    it('should throw an error if user has no email', async () => {
      // Mock user without email
      mockRequireUserSession.mockResolvedValueOnce({
        user: { siteId: 'user-123', id: 'user-123' }
      });

      await expect(handler({})).rejects.toThrow('Unauthorized');
    });

    it('should throw an error if user has no siteId', async () => {
      // Mock user without siteId
      mockRequireUserSession.mockResolvedValueOnce({
        user: { email: 'test@example.com' }
      });

      await expect(handler({})).rejects.toThrow('Unauthorized');
    });
  });

  describe('Customer lookup or creation', () => {
    it('should use existing customer if found', async () => {
      // Mock database to return existing customer
      mockExecute.mockReset();
      mockExecute.mockResolvedValueOnce([{ id: 'cus_existing_123' }]);

      // Mock checkout session creation
      mockStripe.checkout.sessions.create.mockResolvedValueOnce({
        id: 'cs_test_123',
        url: 'https://checkout.stripe.com/test'
      });

      await handler({});

      // Verify customer lookup but no customer creation
      expect(mockDb.select).toHaveBeenCalled();
      expect(mockDb.from).toHaveBeenCalledWith(customer);
      expect(mockDb.where).toHaveBeenCalledWith(eq(customer.user, 'user-123'));
      expect(mockStripe.customers.create).not.toHaveBeenCalled();
    });

    it('should create a new customer if not found', async () => {
      // Mock database to return no existing customer
      mockExecute.mockReset();
      mockExecute.mockResolvedValueOnce([]);

      // Mock Stripe customer creation
      mockStripe.customers.create.mockResolvedValueOnce({
        id: 'cus_new_123',
        email: 'test@example.com'
      });

      // Mock checkout session creation
      mockStripe.checkout.sessions.create.mockResolvedValueOnce({
        id: 'cs_test_123',
        url: 'https://checkout.stripe.com/test'
      });

      await handler({});

      // Verify customer lookup and creation
      expect(mockDb.select).toHaveBeenCalled();
      expect(mockDb.from).toHaveBeenCalledWith(customer);
      expect(mockStripe.customers.create).toHaveBeenCalledWith({
        email: 'test@example.com'
      });
    });

    it('should handle customer lookup/creation errors', async () => {
      // Mock database error
      mockExecute.mockReset();
      mockExecute.mockRejectedValueOnce(new Error('Database error'));

      await expect(handler({})).rejects.toThrow(
        'Failed to retrieve or create customer'
      );
    });
  });

  describe('Checkout session creation for one-time payments', () => {
    beforeEach(() => {
      // Override processSuccessfulPayment for this test suite
      mockProcessSuccessfulPayment.mockReset();
      mockProcessSuccessfulPayment.mockResolvedValue({
        amount: 4900,
        currency: 'usd',
        description: 'Priority queue listing',
        recurring: false
      });

      // Mock customer lookup to return existing customer
      mockExecute.mockReset();
      mockExecute.mockResolvedValue([{ id: 'cus_existing_123' }]);
    });

    it('should create a one-time payment checkout session', async () => {
      // Mock checkout session creation
      mockStripe.checkout.sessions.create.mockResolvedValueOnce({
        id: 'cs_test_123',
        url: 'https://checkout.stripe.com/test'
      });

      const result = await handler({});

      // Verify checkout session was created with correct parameters
      expect(mockStripe.checkout.sessions.create).toHaveBeenCalled();
      const createArgs = mockStripe.checkout.sessions.create.mock.calls[0][0];
      expect(createArgs.mode).toBe('payment');
      expect(createArgs.line_items[0].price_data.unit_amount).toBe(4900);
      expect(createArgs.line_items[0].price_data.currency).toBe('usd');

      // Should return the checkout URL
      expect(result).toBe('https://checkout.stripe.com/test');
    });

    it('should handle checkout session creation errors', async () => {
      // Mock Stripe error
      mockStripe.checkout.sessions.create.mockRejectedValueOnce(
        new Error('Stripe error')
      );

      await expect(handler({})).rejects.toThrow(
        'Failed to create checkout session'
      );
    });
  });

  describe('Checkout session creation for subscriptions', () => {
    beforeEach(() => {
      // Override processSuccessfulPayment for this test suite
      mockProcessSuccessfulPayment.mockReset();
      mockProcessSuccessfulPayment.mockResolvedValue({
        amount: 9900,
        currency: 'usd',
        description: 'Featured listing (spot 1)',
        recurring: true,
        paymentId: 'price_test_featured_1'
      });

      // Mock customer lookup to return existing customer
      mockExecute.mockReset();
      mockExecute.mockResolvedValue([{ id: 'cus_existing_123' }]);
    });

    it('should create a subscription checkout session', async () => {
      // Mock checkout session creation
      mockStripe.checkout.sessions.create.mockResolvedValueOnce({
        id: 'cs_test_123',
        url: 'https://checkout.stripe.com/test'
      });

      const result = await handler({});

      // Verify checkout session was created with correct parameters
      expect(mockStripe.checkout.sessions.create).toHaveBeenCalled();
      const createArgs = mockStripe.checkout.sessions.create.mock.calls[0][0];
      expect(createArgs.mode).toBe('subscription');
      expect(createArgs.line_items[0].price).toBe('price_test_featured_1');

      // Should return the checkout URL
      expect(result).toBe('https://checkout.stripe.com/test');
    });

    it('should handle subscription session creation errors', async () => {
      // Mock Stripe error
      mockStripe.checkout.sessions.create.mockRejectedValueOnce(
        new Error('Stripe error')
      );

      await expect(handler({})).rejects.toThrow(
        'Failed to create checkout session'
      );
    });
  });

  describe('URL construction', () => {
    it('should use the correct base URL for success and cancel routes', async () => {
      // Set custom base URL
      const originalBaseUrl = process.env.BASE_URL;
      process.env.BASE_URL = 'https://example.com';

      // Mock customer lookup and checkout session creation
      mockExecute.mockReset();
      mockExecute.mockResolvedValue([{ id: 'cus_existing_123' }]);
      mockStripe.checkout.sessions.create.mockResolvedValueOnce({
        id: 'cs_test_123',
        url: 'https://checkout.stripe.com/test'
      });

      await handler({});

      // Verify URLs were constructed correctly
      const createArgs = mockStripe.checkout.sessions.create.mock.calls[0][0];
      expect(createArgs.success_url).toBe(
        'https://example.com/users/purchase?success=true'
      );
      expect(createArgs.cancel_url).toBe(
        'https://example.com/users/purchase?cancel=true'
      );

      // Restore original base URL
      process.env.BASE_URL = originalBaseUrl;
    });

    it('should use default routes if not provided', async () => {
      // Mock query parameters without routes
      mockGetQuery.mockReturnValueOnce({
        type: 'featured-1',
        id: 'entity-123',
        secondaryId: 'category-123'
      });

      // Mock customer lookup and checkout session creation
      mockExecute.mockReset();
      mockExecute.mockResolvedValue([{ id: 'cus_existing_123' }]);
      mockStripe.checkout.sessions.create.mockResolvedValueOnce({
        id: 'cs_test_123',
        url: 'https://checkout.stripe.com/test'
      });

      await handler({});

      // Verify default URLs were used
      const createArgs = mockStripe.checkout.sessions.create.mock.calls[0][0];
      expect(createArgs.success_url).toBe(
        'https://test.domain.com/users/purchase?success=true'
      );
      expect(createArgs.cancel_url).toBe(
        'https://test.domain.com/users/purchase?cancel=true'
      );
    });
  });
});
