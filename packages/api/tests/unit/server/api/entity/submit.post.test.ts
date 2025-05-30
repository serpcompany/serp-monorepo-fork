import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mockGetQuery, mockDb, mockReadBody } from '../../../../setup';
import { getDb } from '@serp/db/server/database';
import { and, eq, inArray } from 'drizzle-orm';

// Mock the notifications module
vi.mock('@serp/notifications/server', () => ({
  sendSlackNotification: vi.fn().mockResolvedValue(true)
}));

describe('Entity Submit Post API', () => {
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

    // Reset mocks to prevent test leakage
    mockGetQuery.mockReset();
    mockReadBody.mockReset();

    // Import handler
    handler = (await import('../../../../../server/api/entity/submit.post'))
      .default;
  });

  it('should return 401 if user is not authenticated', async () => {
    mockRequireUserSession.mockResolvedValueOnce({ user: null });
    mockGetQuery.mockReturnValue({ module: 'test-module' });

    const result = await handler({});

    expect(result).toEqual({ status: 401, message: 'Unauthorized' });
  });

  it('should return 400 if categories is not an array', async () => {
    mockGetQuery.mockReturnValue({ module: 'test-module' });
    mockReadBody.mockResolvedValueOnce({
      name: 'Test Entity',
      slug: 'test-entity',
      categories: {} // Invalid categories format
    });

    const result = await handler({});

    expect(result).toEqual({
      status: 400,
      message: 'Categories must be an array'
    });
  });

  it('should return 400 if invalid categories are provided', async () => {
    mockGetQuery.mockReturnValue({ module: 'test-module' });
    mockReadBody.mockResolvedValueOnce({
      name: 'Test Entity',
      slug: 'test-entity',
      categories: ['cat1', 'cat2', 'cat3']
    });

    // Only 2 of 3 categories exist
    mockDb.execute.mockResolvedValueOnce([{ id: 'cat1' }, { id: 'cat2' }]);

    const result = await handler({});

    expect(result).toEqual({
      status: 400,
      message: 'Invalid categories'
    });
    expect(mockDb.where).toHaveBeenCalledWith(expect.anything());
  });

  it('should return 400 if topics is not an array', async () => {
    mockGetQuery.mockReturnValue({ module: 'test-module' });
    mockReadBody.mockResolvedValueOnce({
      name: 'Test Entity',
      slug: 'test-entity',
      topics: {} // Invalid topics format
    });

    const result = await handler({});

    expect(result).toEqual({
      status: 400,
      message: 'Topics must be an array'
    });
  });

  it('should return 400 if invalid topics are provided', async () => {
    mockGetQuery.mockReturnValue({ module: 'test-module' });
    mockReadBody.mockResolvedValueOnce({
      name: 'Test Entity',
      slug: 'test-entity',
      topics: ['topic1', 'topic2', 'topic3']
    });

    // Only 2 of 3 topics exist
    mockDb.execute.mockResolvedValueOnce([{ id: 'topic1' }, { id: 'topic2' }]);

    const result = await handler({});

    expect(result).toEqual({
      status: 400,
      message: 'Invalid topics'
    });
    expect(mockDb.where).toHaveBeenCalledWith(expect.anything());
  });

  it('should return 400 if entity already exists', async () => {
    mockGetQuery.mockReturnValue({ module: 'test-module' });
    mockReadBody.mockResolvedValueOnce({
      name: 'Existing Entity',
      slug: 'existing-entity'
    });

    // Mock entity existence check
    mockDb.execute.mockResolvedValueOnce([{ id: 1 }]);

    const result = await handler({});

    expect(result).toEqual({
      status: 400,
      message: 'Entity already exists'
    });
  });

  it('should return 400 if entity has already been submitted', async () => {
    mockGetQuery.mockReturnValue({ module: 'test-module' });
    mockReadBody.mockResolvedValueOnce({
      name: 'New Entity',
      slug: 'new-entity'
    });

    // Mock entity doesn't exist
    mockDb.execute.mockResolvedValueOnce([]);

    // Mock form already exists
    mockDb.execute.mockResolvedValueOnce([{ id: 1 }]);

    const result = await handler({});

    expect(result).toEqual({
      status: 400,
      message: 'Entity already submitted'
    });
  });

  it('should process string tags into an array', async () => {
    mockGetQuery.mockReturnValue({ module: 'test-module' });
    mockReadBody.mockResolvedValueOnce({
      name: 'New Entity',
      slug: 'new-entity',
      tags: 'tag1, tag2, tag3'
    });

    // Mock entity doesn't exist
    mockDb.execute.mockResolvedValueOnce([]);

    // Mock form doesn't exist
    mockDb.execute.mockResolvedValueOnce([]);

    // Mock insert success
    mockDb.execute.mockResolvedValueOnce([{ id: 'new-form-id' }]);

    const result = await handler({});

    expect(result).toEqual({ message: 'success' });
    expect(mockDb.insert).toHaveBeenCalled();
    expect(mockDb.values).toHaveBeenCalledWith(
      expect.objectContaining({
        formData: expect.stringContaining('tag1'),
        identifier: 'new-entity',
        module: 'test-module',
        status: 'pending'
      })
    );
  });

  it('should update an existing submission when ID is provided', async () => {
    mockGetQuery.mockReturnValue({ module: 'test-module' });
    mockReadBody.mockResolvedValueOnce({
      id: 123,
      name: 'Updated Entity',
      slug: 'updated-entity'
    });

    const result = await handler({});

    expect(result).toEqual({ message: 'success' });
    expect(mockDb.update).toHaveBeenCalled();
    expect(mockDb.set).toHaveBeenCalledWith(
      expect.objectContaining({
        formData: expect.any(String),
        identifier: 'updated-entity',
        user: 'user-123'
      })
    );
  });

  it('should create a new submission successfully', async () => {
    mockGetQuery.mockReturnValue({ module: 'test-module' });
    const submissionData = {
      name: 'Brand New Entity',
      slug: 'brand-new-entity',
      uuid: 'test-uuid-123',
      categories: ['cat1'],
      topics: ['topic1']
    };
    mockReadBody.mockResolvedValueOnce(submissionData);

    // Mock categories exist
    mockDb.execute.mockResolvedValueOnce([{ id: 'cat1' }]);

    // Mock topics exist
    mockDb.execute.mockResolvedValueOnce([{ id: 'topic1' }]);

    // Mock entity doesn't exist
    mockDb.execute.mockResolvedValueOnce([]);

    // Mock form doesn't exist
    mockDb.execute.mockResolvedValueOnce([]);

    // Mock insert success
    mockDb.execute.mockResolvedValueOnce([{ id: 'new-form-id' }]);

    const result = await handler({});

    expect(result).toEqual({ message: 'success' });
    expect(mockDb.insert).toHaveBeenCalled();
    expect(mockDb.values).toHaveBeenCalledWith(
      expect.objectContaining({
        formData: expect.any(String),
        user: 'user-123',
        module: 'test-module',
        identifier: 'brand-new-entity',
        status: 'pending',
        uuid: 'test-uuid-123'
      })
    );
  });

  it('should handle domain for domain-based entities', async () => {
    mockGetQuery.mockReturnValue({ module: 'test-module' });
    const submissionData = {
      name: 'Domain Entity',
      domain: 'example.com',
      uuid: 'test-uuid-456'
    };
    mockReadBody.mockResolvedValueOnce(submissionData);

    // Mock entity doesn't exist
    mockDb.execute.mockResolvedValueOnce([]);

    // Mock form doesn't exist
    mockDb.execute.mockResolvedValueOnce([]);

    // Mock insert success
    mockDb.execute.mockResolvedValueOnce([{ id: 'new-form-id' }]);

    const result = await handler({});

    expect(result).toEqual({ message: 'success' });
    expect(mockDb.values).toHaveBeenCalledWith(
      expect.objectContaining({
        identifier: 'example.com'
      })
    );
  });

  it('should handle database errors gracefully', async () => {
    mockGetQuery.mockReturnValue({ module: 'test-module' });
    mockReadBody.mockResolvedValueOnce({
      name: 'Error Entity',
      slug: 'error-entity'
    });

    // Simulate a database error
    const dbError = new Error('Database error');
    mockDb.execute.mockRejectedValueOnce(dbError);

    const result = await handler({});

    expect(result).toEqual({
      status: 500,
      message: 'Database error'
    });
  });
});
