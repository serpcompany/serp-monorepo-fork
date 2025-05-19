import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mockGetQuery } from '../../../../setup';

// We need to mock the database module
const mockDbModule = {
  getDb: vi.fn()
};
vi.mock('@serp/db/server/database', () => mockDbModule);

// We need to mock the schema
const mockCustomer = { id: 'id', email: 'email', user: 'user' };
vi.mock('@serp/db/server/database/schema', () => ({
  customer: mockCustomer
}));

const originalMockServer = vi.hoisted(() => ({
  useServerStripe: vi.fn()
}));

vi.mock('#stripe/server', () => originalMockServer);

describe('Purchase History Get API', () => {
  let handler;
  let mockRequireUserSession;
  let mockDb;

  // Create local mock for Stripe payment intents
  const mockPaymentIntentsList = vi.fn();
  const mockCustomersCreate = vi.fn();

  // Create a local Stripe mock we control
  const localMockStripe = {
    paymentIntents: {
      list: mockPaymentIntentsList
    },
    customers: {
      create: mockCustomersCreate
    }
  };

  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();

    // Setup our local Stripe mock to return consistent known values
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
      limit: '10',
      starting_after: 'pi_last_123'
    });

    // Import handler
    handler = (
      await import('../../../../../server/api/stripe/purchase-history.get')
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
        error: 'Stripe not initialized',
        purchases: []
      });
    });
  });

  describe('Customer lookup or creation', () => {
    it('should use existing customer if found in database', async () => {
      // Mock existing customer in DB
      mockDb.execute.mockResolvedValueOnce([{ id: 'cus_existing_123' }]);

      // Mock payment intents list response
      mockPaymentIntentsList.mockResolvedValueOnce({
        data: [],
        has_more: false
      });

      await handler({});

      // Check that database was queried for customer
      expect(mockDb.select).toHaveBeenCalled();
      expect(mockDb.from).toHaveBeenCalledWith(mockCustomer);
      expect(mockDb.where).toHaveBeenCalled();

      // Check Stripe.customers.create was NOT called
      expect(mockCustomersCreate).not.toHaveBeenCalled();

      // Check payment intents were listed for existing customer
      expect(mockPaymentIntentsList).toHaveBeenCalledWith({
        customer: 'cus_existing_123',
        limit: 10,
        starting_after: 'pi_last_123'
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

      // Mock payment intents list response
      mockPaymentIntentsList.mockResolvedValueOnce({
        data: [],
        has_more: false
      });

      await handler({});

      // Check that customer creation was attempted
      expect(mockCustomersCreate).toHaveBeenCalledWith({
        email: 'test@example.com'
      });

      // Check new customer was inserted into database
      expect(mockDb.insert).toHaveBeenCalled();
      expect(mockDb.values).toHaveBeenCalled();

      // Check payment intents were listed for new customer
      expect(mockPaymentIntentsList).toHaveBeenCalledWith(
        expect.objectContaining({
          customer: 'cus_new_123'
        })
      );
    });

    it('should handle database errors', async () => {
      // Mock database error
      mockDb.execute.mockRejectedValueOnce(new Error('Database error'));

      const result = await handler({});

      // Check proper error response
      expect(result).toEqual({
        error: expect.any(Error),
        purchases: []
      });
    });
  });

  describe('Purchase listing', () => {
    beforeEach(() => {
      // Setup to return an existing customer
      mockDb.execute.mockResolvedValueOnce([{ id: 'cus_existing_123' }]);
    });

    it('should return formatted purchase history', async () => {
      // Mock payment intents list response
      const paymentIntents = {
        data: [
          {
            id: 'pi_123',
            amount: 9900,
            currency: 'usd',
            status: 'succeeded',
            description: 'Featured listing (spot 1)',
            created: 1626307100
          },
          {
            id: 'pi_456',
            amount: 4900,
            currency: 'usd',
            status: 'succeeded',
            description: 'Priority queue listing',
            created: 1626307000
          }
        ],
        has_more: true
      };
      mockPaymentIntentsList.mockResolvedValueOnce(paymentIntents);

      const result = await handler({});

      // Check response format - since we're looking for expected field structure
      expect(result).toEqual({
        purchases: expect.arrayContaining([
          expect.objectContaining({
            id: 'pi_123',
            amount: 9900
          }),
          expect.objectContaining({
            id: 'pi_456',
            amount: 4900
          })
        ]),
        pagination: expect.objectContaining({
          hasMore: true,
          limit: expect.any(Number)
        }),
        error: null
      });
    });

    it('should handle empty payment history', async () => {
      // Mock empty payment intents list response
      mockPaymentIntentsList.mockResolvedValueOnce({
        data: [],
        has_more: false
      });

      const result = await handler({});

      // Check response format for empty history - with less strict assertions
      expect(result).toEqual(
        expect.objectContaining({
          purchases: [],
          pagination: expect.objectContaining({
            hasMore: false
          }),
          error: null
        })
      );
    });

    it('should handle Stripe payment intents list errors', async () => {
      // Mock Stripe error
      mockPaymentIntentsList.mockRejectedValueOnce(new Error('Stripe error'));

      const result = await handler({});

      // Check proper error response
      expect(result).toEqual(
        expect.objectContaining({
          error: expect.any(Error),
          purchases: []
        })
      );
    });
  });
});
