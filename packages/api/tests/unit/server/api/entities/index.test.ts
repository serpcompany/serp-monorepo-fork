import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  mockCreateError,
  mockDb,
  mockGetQuery,
  mockGetUserSession
} from '../../../../setup';

const mockAddToCache = vi.fn();
let cacheValue = null;
vi.mock('#nuxt-multi-cache/composables', () => ({
  useDataCache: vi.fn().mockImplementation(() => ({
    value: cacheValue,
    addToCache: mockAddToCache
  }))
}));

describe('Entities Index API', () => {
  let handler;

  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();
    cacheValue = null;

    mockCreateError.mockImplementation((options) => {
      const error = new Error(options.message);
      error.statusCode = options.statusCode;
      return error;
    });

    mockDb.execute.mockReset();
    mockDb.execute.mockImplementation(() => []);

    handler = (await import('../../../../../server/api/entities/index'))
      .default;
  });

  it('should handle invalid page parameter', async () => {
    mockGetQuery.mockReturnValue({
      module: 'test-module',
      page: 'invalid',
      limit: 10
    });

    try {
      await handler({});
      expect(true).toBe(false);
    } catch (error) {
      expect(mockCreateError).toHaveBeenCalledWith({
        statusCode: 400,
        message: 'Page must be a positive integer.'
      });
    }
  });

  it('should handle invalid limit parameter', async () => {
    mockGetQuery.mockReturnValue({
      module: 'test-module',
      page: 1,
      limit: 'invalid'
    });

    try {
      await handler({});
      expect(true).toBe(false);
    } catch (error) {
      expect(mockCreateError).toHaveBeenCalledWith({
        statusCode: 400,
        message: 'Limit must be a positive integer.'
      });
    }
  });

  it('should handle invalid filter keys', async () => {
    mockGetQuery.mockReturnValue({
      module: 'test-module',
      filters: 'invalid-key$:value',
      page: 1,
      limit: 10
    });

    try {
      await handler({});
      expect(true).toBe(false);
    } catch (error) {
      expect(mockCreateError).toHaveBeenCalledWith({
        statusCode: 400,
        message: 'Bad filter key'
      });
    }
  });

  it('should handle not found scenario', async () => {
    mockGetQuery.mockReturnValue({
      module: 'test-module',
      page: 1,
      limit: 10
    });

    mockDb.execute.mockImplementation(() => []);

    try {
      await handler({});
      expect(true).toBe(false);
    } catch (error) {
      expect(mockCreateError).toHaveBeenCalledWith({
        statusCode: 500,
        message: 'Internal Server Error'
      });
    }
  });

  it('should handle database errors', async () => {
    mockGetQuery.mockReturnValue({
      module: 'test-module',
      page: 1,
      limit: 10
    });

    mockDb.execute.mockRejectedValueOnce(new Error('Database error'));

    try {
      await handler({});
      expect(true).toBe(false);
    } catch (error) {
      expect(mockCreateError).toHaveBeenCalledWith({
        statusCode: 500,
        message: 'Internal Server Error'
      });
    }
  });

  it('should return entities from cache when available', async () => {
    mockGetQuery.mockReturnValue({ module: 'test-module' });
    mockGetUserSession.mockResolvedValue({ user: { siteId: 'user-123' } });

    cacheValue = {
      entities: [
        { id: 1, name: 'Entity 1', slug: 'entity-1' },
        { id: 2, name: 'Entity 2', slug: 'entity-2' }
      ],
      pagination: { currentPage: 1, pageSize: 10, totalItems: 2 },
      category: null
    };

    mockDb.execute.mockReset();

    // Mock freshAggs query
    mockDb.execute.mockResolvedValueOnce([
      { entityId: 1, numUpvotes: 10, numDownvotes: 2, averageRating: 4.5 },
      { entityId: 2, numUpvotes: 5, numDownvotes: 1, averageRating: 4.0 }
    ]);

    // Mock freshVotes query
    mockDb.execute.mockResolvedValueOnce([{ entityId: 1, direction: 'up' }]);

    const result = await handler({});

    expect(result.entities).toHaveLength(2);

    const entity1 = result.entities.find((e) => e.id === 1);
    expect(entity1.name).toBe('Entity 1');
    expect(entity1.numUpvotes).toBe(10);
    expect(entity1.usersCurrentVote).toBe('up');

    const entity2 = result.entities.find((e) => e.id === 2);
    expect(entity2.name).toBe('Entity 2');
    expect(entity2.numUpvotes).toBe(5);
    expect(entity2.usersCurrentVote).toBeUndefined();

    expect(mockDb.execute).toHaveBeenCalledTimes(2);
  });

  it('should return entities without cache', async () => {
    mockGetQuery.mockReturnValue({
      module: 'test-module',
      page: 1,
      limit: 10
    });
    mockGetUserSession.mockResolvedValue({ user: { siteId: 'user-123' } });

    // Mock baseQuery.execute
    mockDb.execute.mockResolvedValueOnce([
      {
        id: 1,
        name: 'Entity 1',
        slug: 'entity-1',
        data: { key: 'value' },
        numUpvotes: 5,
        usersCurrentVote: 'up'
      },
      {
        id: 2,
        name: 'Entity 2',
        slug: 'entity-2',
        data: { key: 'value2' },
        numUpvotes: 3,
        usersCurrentVote: null
      }
    ]);

    // Mock totalQuery.execute
    mockDb.execute.mockResolvedValueOnce([{ count: 2 }]);

    // Mock categoryQuery.execute
    mockDb.execute.mockResolvedValueOnce([]);

    const result = await handler({});

    expect(result.entities).toHaveLength(2);
    expect(result.pagination).toEqual({
      currentPage: 1,
      pageSize: 10,
      totalItems: 2
    });

    expect(result.entities[0].id).toBe(1);
    expect(result.entities[0].name).toBe('Entity 1');
    expect(result.entities[0].key).toBe('value');

    expect(mockDb.execute).toHaveBeenCalledTimes(3);
    expect(mockAddToCache).toHaveBeenCalledTimes(1);
  });

  it('should filter entities by categorySlug', async () => {
    mockGetQuery.mockReturnValue({
      module: 'test-module',
      categorySlug: 'test-category'
    });
    mockGetUserSession.mockResolvedValue({ user: { siteId: 'user-123' } });

    mockDb.execute.mockResolvedValueOnce([
      {
        id: 1,
        name: 'Entity 1',
        slug: 'entity-1',
        data: { key: 'value' },
        categories: [{ id: 10, slug: 'test-category' }]
      }
    ]);

    mockDb.execute.mockResolvedValueOnce([{ count: 1 }]);

    mockDb.execute.mockResolvedValueOnce([
      { id: 10, name: 'Test Category', slug: 'test-category', data: {} }
    ]);

    const result = await handler({});

    expect(result.entities).toHaveLength(1);
    expect(result.entities[0].id).toBe(1);
    expect(result.category).toBeDefined();
    expect(result.category.id).toBe(10);
    expect(result.category.slug).toBe('test-category');

    expect(mockDb.execute).toHaveBeenCalledTimes(3);
  });

  it('should handle pagination correctly', async () => {
    mockGetQuery.mockReturnValue({
      module: 'test-module',
      page: 2,
      limit: 5
    });
    mockGetUserSession.mockResolvedValue({ user: { siteId: 'user-123' } });

    mockDb.execute.mockResolvedValueOnce([
      { id: 6, name: 'Entity 6', slug: 'entity-6', data: {} },
      { id: 7, name: 'Entity 7', slug: 'entity-7', data: {} }
    ]);

    mockDb.execute.mockResolvedValueOnce([{ count: 7 }]);
    mockDb.execute.mockResolvedValueOnce([]);

    const result = await handler({});

    expect(result.pagination).toEqual({
      currentPage: 2,
      pageSize: 5,
      totalItems: 7
    });

    expect(result.entities).toHaveLength(2);
    expect(result.entities[0].id).toBe(6);
    expect(result.entities[1].id).toBe(7);

    expect(mockDb.execute).toHaveBeenCalledTimes(3);
  });

  it('should apply custom filters', async () => {
    mockGetQuery.mockReturnValue({
      module: 'test-module',
      filters: 'year:2023,platform:web'
    });
    mockGetUserSession.mockResolvedValue({ user: { siteId: 'user-123' } });

    mockDb.execute.mockResolvedValueOnce([
      {
        id: 1,
        name: 'Entity 1',
        slug: 'entity-1',
        data: { year: '2023', platform: 'web' }
      }
    ]);

    mockDb.execute.mockResolvedValueOnce([{ count: 1 }]);
    mockDb.execute.mockResolvedValueOnce([]);

    const result = await handler({});

    expect(result.entities).toHaveLength(1);
    expect(result.entities[0].id).toBe(1);
    expect(result.entities[0].year).toBe('2023');
    expect(result.entities[0].platform).toBe('web');

    expect(mockDb.execute).toHaveBeenCalledTimes(3);
  });
});
