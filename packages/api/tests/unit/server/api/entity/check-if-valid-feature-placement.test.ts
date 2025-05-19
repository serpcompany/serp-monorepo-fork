import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mockDb, mockGetQuery } from '../../../../setup';
import { getDb } from '@serp/db/server/database';
import { and, eq, isNull, sql } from 'drizzle-orm';

describe('Entity Check If Valid Feature Placement API', () => {
  let handler;
  let mockCreateError;

  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();

    // Setup create error mock
    mockCreateError = vi.fn().mockImplementation((options) => {
      const error = new Error(options.message);
      error.statusCode = options.statusCode;
      throw error;
    });
    globalThis.createError = mockCreateError;

    // Import handler
    handler = (
      await import(
        '../../../../../server/api/entity/check-if-valid-feature-placement'
      )
    ).default;
  });

  it('should throw an error if placement is missing', async () => {
    mockGetQuery.mockReturnValue({ id: '123' });

    await expect(handler({})).rejects.toThrow(
      'Both "placement" and "id" are required query parameters'
    );
  });

  it('should throw an error if id is missing', async () => {
    mockGetQuery.mockReturnValue({ placement: '1' });

    await expect(handler({})).rejects.toThrow(
      'Both "placement" and "id" are required query parameters'
    );
  });

  it('should return available: false for invalid placement values', async () => {
    // Test with non-numeric placement
    mockGetQuery.mockReturnValueOnce({ placement: 'abc', id: '123' });
    let result = await handler({});
    expect(result).toEqual({ available: false });

    // Test with placement < 1
    mockGetQuery.mockReturnValueOnce({ placement: '0', id: '123' });
    result = await handler({});
    expect(result).toEqual({ available: false });

    // Test with placement > 5
    mockGetQuery.mockReturnValueOnce({ placement: '6', id: '123' });
    result = await handler({});
    expect(result).toEqual({ available: false });
  });

  it('should return available: false if entity does not exist', async () => {
    mockGetQuery.mockReturnValue({ placement: '1', id: '123' });

    // Entity not found
    mockDb.execute.mockResolvedValueOnce([]);

    const result = await handler({});

    expect(result).toEqual({ available: false });
    expect(mockDb.where).toHaveBeenCalledWith(eq(expect.anything(), '123'));
  });

  it('should return available: false if entity does not have the specified category', async () => {
    mockGetQuery.mockReturnValue({
      placement: '1',
      id: '123',
      categorySlug: 'test-category'
    });

    // Entity not found with the specified category
    mockDb.execute.mockResolvedValueOnce([]);

    const result = await handler({});

    expect(result).toEqual({ available: false });
    expect(mockDb.where).toHaveBeenCalledWith(eq(expect.anything(), '123'));
    expect(mockDb.where).toHaveBeenCalledWith(expect.anything());
  });

  it('should return available: false if entity already has an active featured subscription in the category', async () => {
    mockGetQuery.mockReturnValue({
      placement: '1',
      id: '123',
      categorySlug: 'test-category'
    });

    // Entity exists
    mockDb.execute.mockResolvedValueOnce([{ id: 123, categories: [] }]);

    // Entity already has active feature in this category
    mockDb.execute.mockResolvedValueOnce([{ id: 'existing-feature' }]);

    const result = await handler({});

    expect(result).toEqual({ available: false });
    expect(mockDb.innerJoin).toHaveBeenCalled();
    expect(mockDb.where).toHaveBeenCalledWith(
      and(
        eq(expect.anything(), true),
        eq(expect.anything(), '123'),
        eq(expect.anything(), 'test-category')
      )
    );
  });

  it('should return available: false if the placement is already used in the category', async () => {
    mockGetQuery.mockReturnValue({
      placement: '1',
      id: '123',
      categorySlug: 'test-category'
    });

    // Entity exists
    mockDb.execute.mockResolvedValueOnce([{ id: 123, categories: [] }]);

    // Entity doesn't have active feature in this category
    mockDb.execute.mockResolvedValueOnce([]);

    // Placement is already used
    mockDb.execute.mockResolvedValueOnce([{ id: 'existing-placement' }]);

    const result = await handler({});

    expect(result).toEqual({ available: false });
    expect(mockDb.where).toHaveBeenCalledWith(
      and(
        eq(expect.anything(), true),
        eq(expect.anything(), 1), // Converted to number
        eq(expect.anything(), 'test-category')
      )
    );
  });

  it('should return available: true if all checks pass', async () => {
    mockGetQuery.mockReturnValue({
      placement: '2',
      id: '123',
      categorySlug: 'test-category'
    });

    // Entity exists
    mockDb.execute.mockResolvedValueOnce([{ id: 123, categories: [] }]);

    // Entity doesn't have active feature in this category
    mockDb.execute.mockResolvedValueOnce([]);

    // Placement is not used
    mockDb.execute.mockResolvedValueOnce([]);

    const result = await handler({});

    expect(result).toEqual({ available: true });
  });

  it('should handle null categorySlug correctly', async () => {
    mockGetQuery.mockReturnValue({ placement: '3', id: '123' });

    // Entity exists
    mockDb.execute.mockResolvedValueOnce([{ id: 123, categories: [] }]);

    // Entity doesn't have active feature in this category
    mockDb.execute.mockResolvedValueOnce([]);

    // Placement is not used
    mockDb.execute.mockResolvedValueOnce([]);

    const result = await handler({});

    expect(result).toEqual({ available: true });

    // Verify that the correct isNull condition was used
    expect(mockDb.where).toHaveBeenCalledWith(
      and(
        eq(expect.anything(), true),
        eq(expect.anything(), '123'),
        isNull(expect.anything())
      )
    );
  });
});
