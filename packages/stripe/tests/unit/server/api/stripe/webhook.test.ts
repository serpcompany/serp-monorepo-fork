import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mockGetHeader, mockReadRawBody } from '../../../../setup';

const originalMockServer = vi.hoisted(() => ({
  useServerStripe: vi.fn()
}));

vi.mock('#stripe/server', () => originalMockServer);

const mockProcessSuccessfulPayment = vi.fn();
vi.mock('../../../../../server/utils/validPaymentIntentMapping', () => ({
  processSuccessfulPayment: mockProcessSuccessfulPayment
}));

describe('Stripe Webhook API', () => {
  let handler;
  let mockEventResponse;
  let localMockStripe;
  let mockWebhooksConstructEvent;

  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();

    // Set up response mock
    mockEventResponse = {
      statusCode: 200
    };

    // Set up webhooks.constructEvent mock
    mockWebhooksConstructEvent = vi.fn();

    // Create a local Stripe mock we control
    localMockStripe = {
      webhooks: {
        constructEvent: mockWebhooksConstructEvent
      }
    };

    // Setup our local Stripe mock to return consistent known values
    originalMockServer.useServerStripe.mockResolvedValue(localMockStripe);

    // Mock the request event object
    const mockEvent = {
      node: {
        res: mockEventResponse
      }
    };

    // Mock header and body
    mockGetHeader.mockReturnValue('stripe-signature-123');
    mockReadRawBody.mockResolvedValue(Buffer.from('{}'));

    // Set up environment variable
    process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test_secret';

    // Import handler
    handler = (await import('../../../../../server/api/stripe/webhook'))
      .default;

    // Bind the event to the handler so it's available during the test
    handler = handler.bind(null, mockEvent);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Stripe initialization', () => {
    it('should return error if Stripe is not initialized', async () => {
      // Mock useServerStripe to return null for this one test
      originalMockServer.useServerStripe.mockResolvedValueOnce(null);

      const result = await handler();

      expect(mockEventResponse.statusCode).toBe(500);
      expect(result).toBe('Stripe not initialized');
    });
  });

  describe('Webhook signature verification', () => {
    it('should return error if signature verification fails', async () => {
      // Mock constructEvent to throw an error
      mockWebhooksConstructEvent.mockImplementationOnce(() => {
        throw new Error('Invalid signature');
      });

      const result = await handler();

      expect(mockEventResponse.statusCode).toBe(400);
      expect(result).toBe('Webhook signature verification failed');
    });
  });

  describe('Event handling', () => {
    it('should ignore events without metadata', async () => {
      // Mock constructEvent to return event without metadata
      mockWebhooksConstructEvent.mockReturnValueOnce({
        type: 'customer.subscription.created',
        data: {
          object: {}
        }
      });

      const result = await handler();

      expect(mockEventResponse.statusCode).toBe(200);
      expect(result).toBe('Webhook received');
      expect(mockProcessSuccessfulPayment).not.toHaveBeenCalled();
    });

    it('should ignore events without metadata.type', async () => {
      // Mock constructEvent to return event with empty metadata
      mockWebhooksConstructEvent.mockReturnValueOnce({
        type: 'customer.subscription.created',
        data: {
          object: {
            metadata: {}
          }
        }
      });

      const result = await handler();

      expect(mockEventResponse.statusCode).toBe(200);
      expect(result).toBe('Webhook received');
      expect(mockProcessSuccessfulPayment).not.toHaveBeenCalled();
    });

    it('should process subscription created events', async () => {
      // Mock constructEvent to return subscription created event
      mockWebhooksConstructEvent.mockReturnValueOnce({
        type: 'customer.subscription.created',
        data: {
          object: {
            metadata: {
              type: 'featured-1',
              id: 'entity-123',
              customerId: 'cus_123'
            },
            status: 'active',
            current_period_start: 1626307000,
            current_period_end: 1628985400
          }
        }
      });

      const result = await handler();

      // Check process payment was called with the right arguments
      expect(mockProcessSuccessfulPayment).toHaveBeenCalledWith(
        'featured-1',
        false,
        false,
        expect.objectContaining({
          metadata: {
            type: 'featured-1',
            id: 'entity-123',
            customerId: 'cus_123'
          },
          mode: 'customer.subscription.created'
        })
      );

      expect(mockEventResponse.statusCode).toBe(200);
      expect(result).toBe('Webhook received');
    });

    it('should process subscription updated events', async () => {
      // Mock constructEvent to return subscription updated event
      mockWebhooksConstructEvent.mockReturnValueOnce({
        type: 'customer.subscription.updated',
        data: {
          object: {
            metadata: {
              type: 'featured-1',
              id: 'entity-123',
              customerId: 'cus_123'
            },
            status: 'active',
            current_period_start: 1626307000,
            current_period_end: 1628985400
          }
        }
      });

      const result = await handler();

      // Check process payment was called with the right arguments
      expect(mockProcessSuccessfulPayment).toHaveBeenCalledWith(
        'featured-1',
        false,
        false,
        expect.objectContaining({
          metadata: {
            type: 'featured-1',
            id: 'entity-123',
            customerId: 'cus_123'
          },
          mode: 'customer.subscription.updated'
        })
      );

      expect(mockEventResponse.statusCode).toBe(200);
      expect(result).toBe('Webhook received');
    });

    it('should process payment intent succeeded events', async () => {
      // Mock constructEvent to return payment intent succeeded event
      mockWebhooksConstructEvent.mockReturnValueOnce({
        type: 'payment_intent.succeeded',
        data: {
          object: {
            metadata: {
              type: 'priority-queue',
              id: 'entity-123',
              customerId: 'cus_123'
            },
            amount: 4900,
            currency: 'usd'
          }
        }
      });

      const result = await handler();

      // Check process payment was called with the right arguments
      expect(mockProcessSuccessfulPayment).toHaveBeenCalledWith(
        'priority-queue',
        false,
        false,
        expect.objectContaining({
          metadata: {
            type: 'priority-queue',
            id: 'entity-123',
            customerId: 'cus_123'
          },
          mode: 'payment_intent.succeeded'
        })
      );

      expect(mockEventResponse.statusCode).toBe(200);
      expect(result).toBe('Webhook received');
    });

    it('should skip payment intent succeeded events with invoice', async () => {
      // Mock constructEvent to return payment intent succeeded event with invoice
      // (these come from subscriptions and are handled by subscription events)
      mockWebhooksConstructEvent.mockReturnValueOnce({
        type: 'payment_intent.succeeded',
        data: {
          object: {
            metadata: {
              type: 'featured-1',
              id: 'entity-123',
              customerId: 'cus_123'
            },
            invoice: 'inv_123' // This indicates it's from a subscription
          }
        }
      });

      const result = await handler();

      // Should not process the payment
      expect(mockProcessSuccessfulPayment).not.toHaveBeenCalled();

      expect(mockEventResponse.statusCode).toBe(200);
      expect(result).toBe('Webhook received');
    });

    it('should log unhandled event types', async () => {
      // Mock console.log
      const consoleLogSpy = vi
        .spyOn(console, 'log')
        .mockImplementation(() => {});

      // Mock constructEvent to return unhandled event type
      mockWebhooksConstructEvent.mockReturnValueOnce({
        type: 'unhandled.event.type',
        data: {
          object: {
            metadata: {
              type: 'featured-1'
            }
          }
        }
      });

      const result = await handler();

      // Check it logs unhandled event type
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          'Unhandled Stripe webhook event type unhandled.event.type'
        )
      );

      expect(mockEventResponse.statusCode).toBe(200);
      expect(result).toBe('Webhook received');
    });
  });
});
