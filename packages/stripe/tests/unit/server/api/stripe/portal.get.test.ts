import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

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

describe('Portal Get API', () => {
  let handler;
  let mockRequireUserSession;
  let mockDb;

  // Create local mock for Stripe functionality
  const mockCustomersCreate = vi.fn();
  const mockBillingPortalSessionsCreate = vi.fn();

  // Create a local Stripe mock we control
  const localMockStripe = {
    customers: {
      create: mockCustomersCreate
    },
    billingPortal: {
      sessions: {
        create: mockBillingPortalSessionsCreate
      }
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

    // Import handler
    handler = (await import('../../../../../server/api/stripe/portal.get'))
      .default;
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

  describe('Customer lookup or creation', () => {
    it('should use existing customer if found in database', async () => {
      // Mock existing customer in DB
      mockDb.execute.mockResolvedValueOnce([{ id: 'cus_existing_123' }]);

      // Mock portal sessions creation response
      mockBillingPortalSessionsCreate.mockResolvedValueOnce({
        url: 'https://billing.stripe.com/session/test_123'
      });

      const result = await handler({});

      // Check that database was queried for customer
      expect(mockDb.select).toHaveBeenCalled();
      expect(mockDb.from).toHaveBeenCalledWith(mockCustomer);
      expect(mockDb.where).toHaveBeenCalled();

      // Check Stripe.customers.create was NOT called
      expect(mockCustomersCreate).not.toHaveBeenCalled();

      // Check billing portal session was created with correct customer
      expect(mockBillingPortalSessionsCreate).toHaveBeenCalledWith({
        customer: 'cus_existing_123'
      });

      // Should return the URL
      expect(result).toBe('https://billing.stripe.com/session/test_123');
    });

    it('should create a new customer if not found in database', async () => {
      // Mock no existing customer in DB
      mockDb.execute.mockResolvedValueOnce([]);

      // Mock Stripe customer creation response
      mockCustomersCreate.mockResolvedValueOnce({
        id: 'cus_new_123',
        email: 'test@example.com'
      });

      // Mock portal sessions creation response
      mockBillingPortalSessionsCreate.mockResolvedValueOnce({
        url: 'https://billing.stripe.com/session/test_123'
      });

      const result = await handler({});

      // Check that customer creation was attempted
      expect(mockCustomersCreate).toHaveBeenCalledWith({
        email: 'test@example.com'
      });

      // Check new customer was inserted into database
      expect(mockDb.insert).toHaveBeenCalled();
      expect(mockDb.values).toHaveBeenCalled();

      // Check billing portal session was created with correct customer
      expect(mockBillingPortalSessionsCreate).toHaveBeenCalledWith({
        customer: 'cus_new_123'
      });

      // Should return the URL
      expect(result).toBe('https://billing.stripe.com/session/test_123');
    });

    it('should throw error when customer lookup/creation fails', async () => {
      // Mock database error
      mockDb.execute.mockRejectedValueOnce(new Error('Database error'));

      // Should throw the right error
      await expect(handler({})).rejects.toThrow(
        'Failed to retrieve or create customer'
      );
    });
  });

  describe('Portal session creation', () => {
    beforeEach(() => {
      // Setup to return an existing customer
      mockDb.execute.mockResolvedValueOnce([{ id: 'cus_existing_123' }]);
    });

    it('should throw error when portal session creation fails', async () => {
      // Mock Stripe error
      mockBillingPortalSessionsCreate.mockRejectedValueOnce(
        new Error('Stripe error')
      );

      // Should throw the right error
      await expect(handler({})).rejects.toThrow(
        'Failed to create billing portal session'
      );
    });
  });
});
