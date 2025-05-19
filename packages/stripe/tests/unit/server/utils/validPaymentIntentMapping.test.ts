import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mockDb } from '../../../setup';
import { getDb } from '@serp/db/server/database';
import { eq, and, isNull } from 'drizzle-orm';
import { sendSlackNotification } from '@serp/notifications/server';

// Mock test data
const mockEntityResult = {
  id: 'entity-123',
  name: 'Test Entity',
  slug: 'test-entity',
  module: 'test-module'
};
const mockCategoryResult = { id: 'category-123', name: 'Test Category' };
const mockPaymentResult = { id: 'payment-123' };

describe('Valid Payment Intent Mapping Utils', () => {
  let processSuccessfulPayment;

  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();

    // Import the module fresh for each test
    const module = await import(
      '../../../../server/utils/validPaymentIntentMapping'
    );
    processSuccessfulPayment = module.processSuccessfulPayment;
  });

  describe('getIsValidOnly mode', () => {
    it('should return true for valid payment types with environment variables set', async () => {
      expect(await processSuccessfulPayment('priority-queue', true)).toBe(true);
      expect(await processSuccessfulPayment('featured-1', true)).toBe(true);
      expect(await processSuccessfulPayment('featured-2', true)).toBe(true);
      expect(await processSuccessfulPayment('featured-3', true)).toBe(true);
      expect(await processSuccessfulPayment('featured-4', true)).toBe(true);
      expect(await processSuccessfulPayment('featured-5', true)).toBe(true);
    });

    it('should return false for invalid payment types', async () => {
      expect(await processSuccessfulPayment('invalid-type', true)).toBe(false);
    });

    it('should return false when environment variables are not set', async () => {
      // Temporarily unset the environment variable
      const originalValue = process.env.COMPANY_FEATURED_1_PRICE_ID;
      delete process.env.COMPANY_FEATURED_1_PRICE_ID;

      expect(await processSuccessfulPayment('featured-1', true)).toBe(false);

      // Restore the environment variable
      process.env.COMPANY_FEATURED_1_PRICE_ID = originalValue;
    });
  });

  describe('getInfo mode', () => {
    it('should return payment info for priority-queue', async () => {
      const info = await processSuccessfulPayment(
        'priority-queue',
        false,
        true
      );

      expect(info).toEqual({
        amount: process.env.COMPANY_PRIORITY_QUEUE_PRICE,
        currency: 'usd',
        recurring: false,
        description: 'Priority queue listing'
      });
    });

    it('should return payment info for featured-1', async () => {
      const info = await processSuccessfulPayment('featured-1', false, true);

      expect(info).toEqual({
        amount: process.env.COMPANY_FEATURED_1_PRICE,
        currency: 'usd',
        recurring: true,
        paymentId: process.env.COMPANY_FEATURED_1_PRICE_ID,
        description: 'Featured listing (spot 1)'
      });
    });

    it('should throw for invalid payment types', async () => {
      await expect(
        processSuccessfulPayment('invalid-type', false, true)
      ).rejects.toThrow('Invalid payment type');
    });
  });

  describe('priority queue processing', () => {
    it('should update submitForm and create a payment record', async () => {
      // Customize mock responses for this test
      mockDb.execute.mockReset();
      mockDb.execute
        .mockResolvedValueOnce([mockPaymentResult]) // First call - payment insert
        .mockImplementationOnce(() => Promise.resolve([])) // submitForm update
        .mockImplementationOnce(() =>
          Promise.resolve([{ entity: 'entity-123' }])
        ); // submitForm select

      const mockPaymentData = {
        metadata: {
          customerId: 'cus_test123',
          id: 'test-uuid-123',
          email: 'test@example.com'
        }
      };

      await processSuccessfulPayment(
        'priority-queue',
        false,
        false,
        mockPaymentData
      );

      // Check that payment was inserted
      expect(mockDb.insert).toHaveBeenCalled();
      expect(mockDb.values).toHaveBeenCalledWith({
        customer: 'cus_test123',
        type: 'priority-queue',
        data: JSON.stringify(mockPaymentData)
      });

      // Check that submitForm was updated
      expect(mockDb.update).toHaveBeenCalled();
      expect(mockDb.set).toHaveBeenCalledWith({
        isPriority: true,
        priorityPaymentFk: 'payment-123'
      });

      // Check that Slack notification was sent
      expect(sendSlackNotification).toHaveBeenCalled();
    });
  });

  describe('featured listing processing', () => {
    it('should create a new featured subscription', async () => {
      // Customize mock responses for this test
      mockDb.execute.mockReset();
      mockDb.execute
        .mockResolvedValueOnce([mockEntityResult]) // Entity select
        .mockResolvedValueOnce([mockCategoryResult]) // Category select
        .mockResolvedValueOnce([mockPaymentResult]) // Payment insert
        .mockResolvedValueOnce([]) // Existing subscription check
        .mockResolvedValueOnce([]); // Insert subscription result

      const mockSubscriptionData = {
        metadata: {
          customerId: 'cus_test123',
          id: 'entity-123',
          secondaryId: 'category-123',
          email: 'test@example.com',
          type: 'featured-1'
        },
        status: 'active',
        cancel_at_period_end: false,
        current_period_end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
        current_period_start: Math.floor(Date.now() / 1000)
      };

      await processSuccessfulPayment(
        'featured-1',
        false,
        false,
        mockSubscriptionData
      );

      // Should be called twice: once for payment, once for subscription
      expect(mockDb.insert).toHaveBeenCalledTimes(2);

      // Check that insert was called with a values method for subscription
      expect(mockDb.values).toHaveBeenCalledWith(
        expect.objectContaining({
          entity: mockEntityResult.id,
          category: mockCategoryResult.id,
          lastPayment: mockPaymentResult.id
        })
      );

      // Check that Slack notification was sent
      expect(sendSlackNotification).toHaveBeenCalled();
    });

    it('should update an existing featured subscription', async () => {
      // Customize mock responses for this test
      mockDb.execute.mockReset();
      mockDb.execute
        .mockResolvedValueOnce([mockEntityResult]) // Entity select
        .mockResolvedValueOnce([mockCategoryResult]) // Category select
        .mockResolvedValueOnce([mockPaymentResult]) // Payment insert
        .mockResolvedValueOnce([{ id: 'subscription-123' }]) // Existing subscription
        .mockResolvedValueOnce([]); // Update result

      const mockSubscriptionData = {
        metadata: {
          customerId: 'cus_test123',
          id: 'entity-123',
          secondaryId: 'category-123',
          email: 'test@example.com',
          type: 'featured-1'
        },
        status: 'active',
        cancel_at_period_end: false,
        current_period_end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
        current_period_start: Math.floor(Date.now() / 1000)
      };

      await processSuccessfulPayment(
        'featured-1',
        false,
        false,
        mockSubscriptionData
      );

      // Verify update was called
      expect(mockDb.update).toHaveBeenCalled();
      expect(mockDb.set).toHaveBeenCalledWith(
        expect.objectContaining({
          lastPayment: mockPaymentResult.id,
          isActive: true
        })
      );

      // Check that Slack notification was sent
      expect(sendSlackNotification).toHaveBeenCalled();
    });

    it('should handle subscriptions without a category', async () => {
      // Customize mock responses for this test
      mockDb.execute.mockReset();
      mockDb.execute
        .mockResolvedValueOnce([mockEntityResult]) // Entity select
        .mockResolvedValueOnce([mockPaymentResult]) // Payment insert
        .mockResolvedValueOnce([]) // Existing subscription check
        .mockResolvedValueOnce([]); // Insert result

      const mockSubscriptionData = {
        metadata: {
          customerId: 'cus_test123',
          id: 'entity-123',
          secondaryId: '0', // No category
          email: 'test@example.com',
          type: 'featured-1'
        },
        status: 'active',
        cancel_at_period_end: false,
        current_period_end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
        current_period_start: Math.floor(Date.now() / 1000)
      };

      await processSuccessfulPayment(
        'featured-1',
        false,
        false,
        mockSubscriptionData
      );

      // Should call insert twice: once for payment, once for subscription
      expect(mockDb.insert).toHaveBeenCalledTimes(2);

      // Check that values has null category
      expect(mockDb.values).toHaveBeenCalledWith(
        expect.objectContaining({
          entity: mockEntityResult.id,
          category: null
        })
      );

      // Verify isNull was called for category when checking existing subscriptions
      expect(isNull).toHaveBeenCalled();

      // Check that Slack notification was sent
      expect(sendSlackNotification).toHaveBeenCalled();
    });
  });

  it('should throw an error for invalid payment types', async () => {
    await expect(processSuccessfulPayment('invalid-type')).rejects.toThrow(
      'Invalid payment type'
    );
  });
});
