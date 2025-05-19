import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { mockDb } from '../../../../../setup';
import { getDb } from '@serp/db/server/database';
import { eq } from 'drizzle-orm';

describe('Entity Claim API', () => {
  let handler;
  let mockRequireUserSession;
  let originalEnv;

  beforeEach(async () => {
    originalEnv = process.env.NODE_ENV;
    vi.resetModules();
    vi.clearAllMocks();

    mockRequireUserSession = vi.fn().mockResolvedValue({
      user: { siteId: 'user-123', id: 'user-123', email: 'test@example.com' }
    });
    globalThis.requireUserSession = mockRequireUserSession;
    globalThis.getRouterParams = vi.fn().mockReturnValue({ id: '123' });

    handler = (
      await import('../../../../../../server/api/entity/claim/[id].post')
    ).default;
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
  });

  it('should return 401 if user is not authenticated', async () => {
    mockRequireUserSession.mockResolvedValueOnce({ user: null });

    const result = await handler({});

    expect(result).toEqual({ status: 401, message: 'Unauthorized' });
  });

  it('should return 401 if email is not provided', async () => {
    mockRequireUserSession.mockResolvedValueOnce({
      user: { siteId: 'user-123', id: 'user-123' }
    });

    const result = await handler({});

    expect(result).toEqual({ status: 401, message: 'Email is required' });
  });

  it('should return 400 if ID is not provided', async () => {
    globalThis.getRouterParams = vi.fn().mockReturnValue({});

    const result = await handler({});

    expect(result).toEqual({ status: 400, message: 'ID is required' });
  });

  it('should return 404 if entity does not exist', async () => {
    mockDb.execute.mockResolvedValueOnce([]);

    const result = await handler({});

    expect(result).toEqual({ status: 404, message: 'Entity not found' });
    expect(mockDb.where).toHaveBeenCalledWith(eq(expect.anything(), '123'));
  });

  it('should return 400 if entity is already verified by the same user', async () => {
    mockDb.execute.mockResolvedValueOnce([{ slug: 'example.com' }]);
    mockDb.execute.mockResolvedValueOnce([
      { id: 'verification-1', user: 'user-123' }
    ]);

    const result = await handler({});

    expect(result).toEqual({
      status: 400,
      message: 'Entity already verified by you'
    });
  });

  it('should return 400 if entity is already verified by another user', async () => {
    mockDb.execute.mockResolvedValueOnce([{ slug: 'example.com' }]);
    mockDb.execute.mockResolvedValueOnce([
      { id: 'verification-1', user: 'different-user' }
    ]);

    const result = await handler({});

    expect(result).toEqual({
      status: 400,
      message: 'Entity already verified by another user'
    });
  });

  it('should return 400 if email domain does not match entity domain in production', async () => {
    process.env.NODE_ENV = 'production';
    mockDb.execute.mockResolvedValueOnce([{ slug: 'different.com' }]);
    mockDb.execute.mockResolvedValueOnce([]);

    const result = await handler({});

    expect(result).toEqual({
      status: 400,
      message:
        "Domain does not match user email, please create an account using an email with your entity's domain"
    });
  });

  it('should successfully verify entity in production environment', async () => {
    process.env.NODE_ENV = 'production';
    mockDb.execute.mockResolvedValueOnce([{ slug: 'example.com' }]);
    mockDb.execute.mockResolvedValueOnce([]);

    const result = await handler({});

    expect(result).toEqual({ status: 200, message: 'success', id: 'mock-id' });
    expect(mockDb.insert).toHaveBeenCalled();
    expect(mockDb.values).toHaveBeenCalledWith({
      entity: '123',
      user: 'user-123'
    });
  });

  it('should successfully verify entity in development environment', async () => {
    process.env.NODE_ENV = 'development';
    mockDb.execute.mockResolvedValueOnce([{ slug: 'any-domain.com' }]);
    mockDb.execute.mockResolvedValueOnce([]);

    const result = await handler({});

    expect(result).toEqual({ status: 200, message: 'success', id: 'mock-id' });
  });

  it('should return 500 if verification insert fails', async () => {
    mockDb.execute.mockResolvedValueOnce([{ slug: 'example.com' }]);
    mockDb.execute.mockResolvedValueOnce([]);

    const originalReturning = mockDb.returning;
    mockDb.returning = vi.fn().mockResolvedValueOnce([]);

    const result = await handler({});

    expect(result).toEqual({
      status: 500,
      message: 'Failed to insert verification request'
    });

    mockDb.returning = originalReturning;
  });

  it('should handle errors gracefully', async () => {
    mockRequireUserSession.mockImplementationOnce(() => {
      throw new Error('Database error');
    });

    const result = await handler({});

    expect(result).toEqual({ status: 500, message: 'Database error' });
  });
});
