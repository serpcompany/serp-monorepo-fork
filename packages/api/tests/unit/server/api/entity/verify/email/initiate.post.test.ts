import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mockReadBody, mockDb } from '../../../../../../setup';
import { getDb } from '@serp/db/server/database';
import { eq, and } from 'drizzle-orm';
import crypto from 'crypto';

// Mock the mail module
vi.mock('@serp/mail/server', () => ({
  sendEmail: vi.fn().mockResolvedValue({})
}));

// Mock crypto for consistent behavior
vi.mock('crypto', () => ({
  default: {
    randomBytes: vi.fn().mockReturnValue({
      toString: vi.fn().mockReturnValue('mock-random-code')
    })
  },
  randomBytes: vi.fn().mockReturnValue({
    toString: vi.fn().mockReturnValue('mock-random-code')
  })
}));

describe('Entity Verify Email Initiate Post API', () => {
  let handler;
  let mockRequireUserSession;
  let mockSendEmail;

  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();

    // Setup mock user session
    mockRequireUserSession = vi.fn().mockResolvedValue({
      user: { siteId: 'user-123', id: 'user-123' }
    });
    globalThis.requireUserSession = mockRequireUserSession;

    // Import the handler
    const { sendEmail } = await import('@serp/mail/server');
    mockSendEmail = sendEmail;

    // Mock environment variables
    process.env.APP_URL = 'https://test.example.com';

    // Mock Date for consistent tests
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2023-01-01T12:00:00Z'));

    // Import handler
    handler = (
      await import(
        '../../../../../../../server/api/entity/verify/email/initiate.post'
      )
    ).default;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return 401 if user is not authenticated', async () => {
    mockRequireUserSession.mockResolvedValueOnce({ user: null });

    const result = await handler({});

    expect(result).toEqual({ status: 401, message: 'Unauthorized' });
  });

  it('should validate company id is required', async () => {
    mockReadBody.mockResolvedValueOnce({ email: 'test@example.com' });

    const result = await handler({});

    expect(result).toEqual({ error: 'company id is required' });
  });

  it('should validate email is required', async () => {
    mockReadBody.mockResolvedValueOnce({ id: 123 });

    const result = await handler({});

    expect(result).toEqual({ error: 'email is required' });
  });

  it('should return error if entity is not found', async () => {
    mockReadBody.mockResolvedValueOnce({
      id: 123,
      email: 'test@example.com'
    });

    // Entity not found
    mockDb.execute.mockResolvedValueOnce([]);

    const result = await handler({});

    expect(result).toEqual({ error: 'Entity not found' });
    expect(mockDb.where).toHaveBeenCalledWith(eq(expect.anything(), 123));
  });

  it('should return error if user is already verified', async () => {
    mockReadBody.mockResolvedValueOnce({
      id: 123,
      email: 'test@example.com'
    });

    // Entity found
    mockDb.execute.mockResolvedValueOnce([
      {
        slug: 'example'
      }
    ]);

    // User already verified
    mockDb.execute.mockResolvedValueOnce([
      {
        id: 'verification-123'
      }
    ]);

    const result = await handler({});

    expect(result).toEqual({ error: 'user already verified' });
    expect(mockDb.where).toHaveBeenCalledWith(
      and(eq(expect.anything(), 123), eq(expect.anything(), 'user-123'))
    );
  });

  it('should return error if email domain does not match entity slug', async () => {
    mockReadBody.mockResolvedValueOnce({
      id: 123,
      email: 'test@wrong-domain.com'
    });

    // Entity found with slug 'example'
    mockDb.execute.mockResolvedValueOnce([
      {
        slug: 'example'
      }
    ]);

    // User not verified
    mockDb.execute.mockResolvedValueOnce([]);

    const result = await handler({});

    expect(result).toEqual({ error: 'use an email at @example' });
  });

  it('should successfully initiate email verification', async () => {
    const entityId = 123;
    // Use email that matches entity slug
    const userEmail = 'test@example.com';
    const requestId = 'verification-request-123';

    // Create mock event with node.res property
    const mockEvent = {
      node: {
        res: { statusCode: 200 }
      }
    };

    mockReadBody.mockResolvedValueOnce({
      id: entityId,
      email: userEmail
    });

    // Entity found with matching slug
    mockDb.execute.mockResolvedValueOnce([
      {
        slug: 'example.com' // Match the email domain
      }
    ]);

    // User not verified
    mockDb.execute.mockResolvedValueOnce([]);

    // Mock verification request creation
    mockDb.returning.mockResolvedValueOnce([{ id: requestId }]);

    const result = await handler(mockEvent);

    expect(result).toEqual({ ok: true, requestId });

    // Verify data inserted correctly
    expect(mockDb.insert).toHaveBeenCalled();
    expect(mockDb.values).toHaveBeenCalledWith({
      entity: entityId,
      user: 'user-123',
      email: userEmail,
      code: 'mock-random-code',
      createdAt: expect.any(Date),
      expiresAt: expect.any(Date)
    });

    // Verify email was sent
    expect(mockSendEmail).toHaveBeenCalledWith({
      to: userEmail,
      subject: '🔒 Verify your company email',
      html: expect.stringContaining(
        `requestId=${requestId}&code=mock-random-code`
      )
    });
  });

  it('should handle errors gracefully', async () => {
    mockReadBody.mockResolvedValueOnce({
      id: 123,
      email: 'test@example.com'
    });

    // Mock event.node.res for statusCode setting
    const mockEvent = {
      node: {
        res: {
          statusCode: 200
        }
      }
    };

    // Simulate a database error
    mockDb.execute.mockImplementationOnce(() => {
      throw new Error('Database error');
    });

    const result = await handler(mockEvent);

    expect(mockEvent.node.res.statusCode).toBe(500);
    expect(result).toEqual({ error: 'Database error' });
  });
});
