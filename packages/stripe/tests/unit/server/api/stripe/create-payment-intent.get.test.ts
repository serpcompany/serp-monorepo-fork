import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mockGetQuery } from '../../../../setup';

const mockDbModule = {
  getDb: vi.fn()
};
vi.mock('@serp/db/server/database', () => mockDbModule);

const mockCustomer = { id: 'id', email: 'email', user: 'user' };
vi.mock('@serp/db/server/database/schema', () => ({
  customer: mockCustomer
}));

const originalMockServer = vi.hoisted(() => ({
  useServerStripe: vi.fn()
}));

vi.mock('#stripe/server', () => originalMockServer);

const mockProcessSuccessfulPayment = vi.fn();
vi.mock('../../../../../server/utils/validPaymentIntentMapping', () => ({
  processSuccessfulPayment: mockProcessSuccessfulPayment
}));

describe('Create Payment Intent Get API', () => {
  let handler;
  let mockRequireUserSession;
  let mockDb;

  const mockCustomersCreate = vi.fn();
  const mockPaymentIntentsCreate = vi.fn();
  const mockSubscriptionsCreate = vi.fn();

  const localMockStripe = {
    customers: {
      create: mockCustomersCreate
    },
    paymentIntents: {
      create: mockPaymentIntentsCreate
    },
    subscriptions: {
      create: mockSubscriptionsCreate
    }
  };

  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();

    originalMockServer.useServerStripe.mockResolvedValue(localMockStripe);

    // Create DB mock with chainable methods
    mockDb = {
      select: vi.fn().mockReturnThis(),
      from: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      execute: vi.fn(),
      insert: vi.fn().mockReturnThis(),
      values: vi.fn().mockReturnThis()
    };

    // Setup the database mock
    mockDbModule.getDb.mockReturnValue(mockDb);

    // Setup mock user session
    mockRequireUserSession = vi.fn().mockResolvedValue({
      user: { siteId: 'user-123', id: 'user-123', email: 'test@example.com' }
    });
    globalThis.requireUserSession = mockRequireUserSession;

    // Mock the query parameters
    mockGetQuery.mockReturnValue({
      type: 'featured-1',
      id: 'entity-123',
      secondaryId: 'category-123'
    });

    // Import handler
    handler = (
      await import('../../../../../server/api/stripe/create-payment-intent.get')
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

  describe('One-time payment intent creation', () => {
    beforeEach(() => {
      // Mock processSuccessfulPayment to return non-recurring payment info
      mockProcessSuccessfulPayment.mockResolvedValue({
        amount: 4900,
        currency: 'usd',
        description: 'Priority queue listing',
        recurring: false
      });

      // Mock existing customer in DB
      mockDb.execute.mockResolvedValueOnce([{ id: 'cus_existing_123' }]);
    });

    it('should create a payment intent for a one-time payment', async () => {
      // Mock payment intent creation
      mockPaymentIntentsCreate.mockResolvedValueOnce({
        id: 'pi_test_123',
        client_secret: 'pi_test_secret_123'
      });

      const result = await handler({});

      // Verify payment intent creation
      expect(mockPaymentIntentsCreate).toHaveBeenCalledWith({
        customer: 'cus_existing_123',
        currency: 'usd',
        amount: 4900,
        description: 'Priority queue listing',
        automatic_payment_methods: { enabled: true },
        metadata: expect.objectContaining({
          email: 'test@example.com',
          type: 'featured-1',
          id: 'entity-123',
          customerId: 'cus_existing_123',
          secondaryId: 'category-123'
        })
      });

      // Should return client secret
      expect(result).toEqual({
        clientSecret: 'pi_test_secret_123',
        error: null
      });
    });

    it('should handle payment intent creation errors', async () => {
      // Mock Stripe error
      mockPaymentIntentsCreate.mockRejectedValueOnce(new Error('Stripe error'));

      const result = await handler({});

      // Should return error
      expect(result).toEqual({
        clientSecret: null,
        error: expect.any(Error)
      });
    });
  });

  describe('Subscription payment intent creation', () => {
    beforeEach(() => {
      // Mock processSuccessfulPayment to return recurring payment info
      mockProcessSuccessfulPayment.mockResolvedValue({
        amount: 9900,
        currency: 'usd',
        description: 'Featured listing (spot 1)',
        recurring: true,
        paymentId: 'price_test_featured_1'
      });

      // Mock existing customer in DB
      mockDb.execute.mockResolvedValueOnce([{ id: 'cus_existing_123' }]);
    });

    it('should create a subscription with payment intent for a recurring payment', async () => {
      // Mock subscription creation with payment intent
      mockSubscriptionsCreate.mockResolvedValueOnce({
        id: 'sub_test_123',
        latest_invoice: {
          payment_intent: {
            client_secret: 'pi_test_secret_123'
          }
        }
      });

      const result = await handler({});

      // Verify subscription creation
      expect(mockSubscriptionsCreate).toHaveBeenCalledWith({
        customer: 'cus_existing_123',
        items: [{ price: 'price_test_featured_1' }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
        collection_method: 'charge_automatically',
        description: 'Featured listing (spot 1)',
        metadata: expect.objectContaining({
          email: 'test@example.com',
          type: 'featured-1',
          id: 'entity-123',
          customerId: 'cus_existing_123',
          secondaryId: 'category-123'
        })
      });

      // Should return client secret
      expect(result).toEqual({
        clientSecret: 'pi_test_secret_123',
        error: null
      });
    });

    it('should handle subscription creation errors', async () => {
      // Mock Stripe error
      mockSubscriptionsCreate.mockRejectedValueOnce(new Error('Stripe error'));

      const result = await handler({});

      // Should return error
      expect(result).toEqual({
        clientSecret: null,
        error: expect.any(Error)
      });
    });
  });

  describe('Customer lookup or creation', () => {
    beforeEach(() => {
      // Mock processSuccessfulPayment
      mockProcessSuccessfulPayment.mockResolvedValue({
        amount: 4900,
        currency: 'usd',
        description: 'Priority queue listing',
        recurring: false
      });

      // Mock payment intent creation (for both tests)
      mockPaymentIntentsCreate.mockResolvedValue({
        id: 'pi_test_123',
        client_secret: 'pi_test_secret_123'
      });
    });

    it('should create a new customer if not found in database', async () => {
      // Mock no existing customer in DB
      mockDb.execute.mockResolvedValueOnce([]);

      // Mock Stripe customer creation response
      mockCustomersCreate.mockResolvedValueOnce({
        id: 'cus_new_123',
        email: 'test@example.com'
      });

      await handler({});

      // Check that customer creation was attempted
      expect(mockCustomersCreate).toHaveBeenCalledWith({
        email: 'test@example.com'
      });

      // Check new customer was inserted into database
      expect(mockDb.insert).toHaveBeenCalled();
      expect(mockDb.values).toHaveBeenCalled();

      // Should use new customer ID for payment intent
      expect(mockPaymentIntentsCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          customer: 'cus_new_123'
        })
      );
    });

    it('should handle database errors', async () => {
      // Mock database error
      mockDb.execute.mockRejectedValueOnce(new Error('Database error'));

      const result = await handler({});

      // Should return error
      expect(result).toEqual({
        clientSecret: null,
        error: expect.any(Error)
      });
    });
  });
});
