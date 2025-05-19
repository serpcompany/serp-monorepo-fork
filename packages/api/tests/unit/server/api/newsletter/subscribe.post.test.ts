import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mockReadBody, mockDb } from '../../../../setup';
import { getAuthDb } from '@serp/db/server/database/auth';

describe('Newsletter Subscription API', () => {
  let handler;

  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();
    handler = (
      await import('../../../../../server/api/newsletter/subscribe.post')
    ).default;
  });

  it('should return 400 if email is missing', async () => {
    mockReadBody.mockResolvedValue({});

    const result = await handler({});

    expect(result).toEqual({ status: 400, message: 'Email is required' });
    expect(mockReadBody).toHaveBeenCalled();
    expect(mockDb.transaction).not.toHaveBeenCalled();
  });

  it('should return 400 if email is invalid', async () => {
    mockReadBody.mockResolvedValue({ email: 'invalid-email' });

    const result = await handler({});

    expect(result).toEqual({ status: 400, message: 'Invalid email' });
    expect(mockReadBody).toHaveBeenCalled();
    expect(mockDb.transaction).not.toHaveBeenCalled();
  });

  it('should subscribe a valid email and return success', async () => {
    mockReadBody.mockResolvedValue({ email: 'test@example.com' });

    const result = await handler({});

    expect(result).toEqual({ status: 200, message: 'success' });
    expect(mockReadBody).toHaveBeenCalled();
    expect(getAuthDb).toHaveBeenCalled();
    expect(mockDb.transaction).toHaveBeenCalled();
  });

  it('should handle database errors gracefully', async () => {
    mockReadBody.mockResolvedValue({ email: 'test@example.com' });
    mockDb.transaction.mockRejectedValueOnce(new Error('Database error'));

    const result = await handler({});

    expect(result).toEqual({ status: 500, message: 'Database error' });
    expect(mockReadBody).toHaveBeenCalled();
    expect(mockDb.transaction).toHaveBeenCalled();
  });
});
