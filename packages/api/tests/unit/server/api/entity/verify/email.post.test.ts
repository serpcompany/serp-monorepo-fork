import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mockReadBody, mockDb } from '../../../../../setup';
import { getDb } from '@serp/db/server/database';
import { eq, and } from 'drizzle-orm';

describe('Entity Verify Email Post API', () => {
  let handler;
  let mockRequireUserSession;

  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();

    // Setup mock user session
    mockRequireUserSession = vi.fn().mockResolvedValue({
      user: { siteId: 'user-123', id: 'user-123' }
    });
    globalThis.requireUserSession = mockRequireUserSession;

    // Mock Date to have consistent behavior in tests
    const mockDate = new Date('2023-01-01T12:00:00Z');
    vi.spyOn(global, 'Date').mockImplementation(() => mockDate);

    // Import handler
    handler = (
      await import('../../../../../../server/api/entity/verify/email.post')
    ).default;
  });

  it('should return 401 if user is not authenticated', async () => {
    mockRequireUserSession.mockResolvedValueOnce({ user: null });

    const result = await handler({});

    expect(result).toEqual({ status: 401, message: 'Unauthorized' });
  });

  it('should validate requestId and code are required', async () => {
    // Missing both requestId and code
    mockReadBody.mockResolvedValueOnce({});

    const result = await handler({});

    expect(result).toEqual({ error: 'requestId and code are required' });

    // Missing code
    mockReadBody.mockResolvedValueOnce({ requestId: 123 });

    const result2 = await handler({});

    expect(result2).toEqual({ error: 'requestId and code are required' });

    // Missing requestId
    mockReadBody.mockResolvedValueOnce({ code: 'abc123' });

    const result3 = await handler({});

    expect(result3).toEqual({ error: 'requestId and code are required' });
  });

  it('should return error if verification request is not found', async () => {
    mockReadBody.mockResolvedValueOnce({
      requestId: 123,
      code: 'abc123'
    });

    // Request not found
    mockDb.execute.mockResolvedValueOnce([]);

    const result = await handler({});

    expect(result).toEqual({ error: 'verification request not found' });
    expect(mockDb.where).toHaveBeenCalledWith(eq(expect.anything(), 123));
  });

  it('should return forbidden if user is not request creator', async () => {
    mockReadBody.mockResolvedValueOnce({
      requestId: 123,
      code: 'abc123'
    });

    // Request found but with different user
    mockDb.execute.mockResolvedValueOnce([
      {
        id: 123,
        user: 'different-user',
        entity: 456,
        code: 'abc123',
        expiresAt: new Date('2023-02-01T12:00:00Z').toISOString(), // Future date
        verification: null
      }
    ]);

    const result = await handler({});

    expect(result).toEqual({ error: 'forbidden' });
  });

  it('should return already verified if request has verification', async () => {
    mockReadBody.mockResolvedValueOnce({
      requestId: 123,
      code: 'abc123'
    });

    // Request found but already verified
    mockDb.execute.mockResolvedValueOnce([
      {
        id: 123,
        user: 'user-123',
        entity: 456,
        code: 'abc123',
        expiresAt: new Date('2023-02-01T12:00:00Z').toISOString(), // Future date
        verification: 'verification-abc'
      }
    ]);

    const result = await handler({});

    expect(result).toEqual({ ok: true, error: 'already verified' });
  });

  it('should return invalid code if provided code does not match', async () => {
    mockReadBody.mockResolvedValueOnce({
      requestId: 123,
      code: 'wrong-code'
    });

    // Request found but code doesn't match
    mockDb.execute.mockResolvedValueOnce([
      {
        id: 123,
        user: 'user-123',
        entity: 456,
        code: 'correct-code',
        expiresAt: new Date('2023-02-01T12:00:00Z').toISOString(), // Future date
        verification: null
      }
    ]);

    const result = await handler({});

    expect(result).toEqual({ error: 'invalid code' });
  });

  it('should test other invalid conditions', async () => {
    mockReadBody.mockResolvedValueOnce({
      requestId: 123,
      code: 'abc123'
    });

    // Just check for other validations in the endpoint
    const validRequest = {
      id: 123,
      user: 'wrong-user', // Different user
      entity: 456,
      code: 'abc123',
      expiresAt: new Date('2023-02-01T12:00:00Z').toISOString(),
      verification: null
    };

    mockDb.execute.mockResolvedValueOnce([validRequest]);

    const result = await handler({});

    expect(result).toEqual({ error: 'forbidden' });
  });

  it('should successfully verify an email', async () => {
    const requestId = 123;
    const entityId = 456;
    const verificationId = 'verification-789';

    mockReadBody.mockResolvedValueOnce({
      requestId,
      code: 'abc123'
    });

    // Valid request found
    mockDb.execute.mockResolvedValueOnce([
      {
        id: requestId,
        user: 'user-123',
        entity: entityId,
        code: 'abc123',
        expiresAt: new Date('2023-02-01T12:00:00Z').toISOString(), // Future date
        verification: null
      }
    ]);

    // Insert verification returns
    mockDb.returning.mockResolvedValueOnce([{ id: verificationId }]);

    const result = await handler({});

    expect(result).toEqual({ ok: true, verificationId });

    // Verify verification record created
    expect(mockDb.insert).toHaveBeenCalled();
    expect(mockDb.values).toHaveBeenCalledWith({
      entity: entityId,
      user: 'user-123'
    });

    // Verify request updated
    expect(mockDb.update).toHaveBeenCalled();
    expect(mockDb.set).toHaveBeenCalledWith({
      verification: verificationId
    });
    expect(mockDb.where).toHaveBeenCalledWith(eq(expect.anything(), requestId));
  });
});
