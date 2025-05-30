import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mockDb, mockGetQuery } from '../../../../setup';

describe('Entity Featured Subscriptions API', () => {
  let handler;
  let mockRequireUserSession;

  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();

    mockRequireUserSession = vi.fn().mockResolvedValue({
      user: { siteId: 'user-123', id: 'user-123' }
    });
    globalThis.requireUserSession = mockRequireUserSession;

    mockGetQuery.mockReturnValue({
      activeOnly: true,
      module: 'test-module'
    });

    handler = (
      await import(
        '../../../../../server/api/entity/featured-subscriptions.get'
      )
    ).default;
  });

  it('should return 401 if user is not authenticated', async () => {
    mockRequireUserSession.mockResolvedValueOnce({ user: null });

    const result = await handler({});

    expect(result).toEqual({ status: 401, message: 'Unauthorized' });
  });

  it('should return empty array if no subscriptions found', async () => {
    mockDb.execute.mockResolvedValueOnce([]);

    const result = await handler({});

    expect(result).toEqual([]);
    expect(mockDb.innerJoin).toHaveBeenCalled();
    expect(mockDb.leftJoin).toHaveBeenCalled();
  });

  it('should return subscriptions for the user', async () => {
    const mockSubscriptions = [
      {
        id: 'sub-1',
        createdAt: new Date(),
        placement: 'top',
        categoryId: 'cat-1',
        entityId: 'entity-1',
        entityName: 'Test Entity',
        entitySlug: 'test-entity',
        entityData: { description: 'Test description' },
        categoryName: 'Test Category',
        categorySlug: 'test-category',
        isActive: true
      }
    ];

    mockDb.execute.mockResolvedValueOnce(mockSubscriptions);

    const result = await handler({});

    expect(result).toEqual(mockSubscriptions);

    // Get the first argument to where
    const whereArg = mockDb.where.mock.calls[0][0];

    // Test AND operator
    expect(whereArg.operator).toBe('and');

    // Check user condition
    const userCondition = whereArg.conditions[0];
    expect(userCondition.operator).toBe('eq');
    expect(userCondition.value).toBe('user-123');

    // Check isActive condition
    const isActiveCondition = whereArg.conditions[1];
    expect(isActiveCondition.operator).toBe('eq');
    expect(isActiveCondition.value).toBe(true);

    // Check module condition (OR with single module)
    const moduleCondition = whereArg.conditions[2];
    expect(moduleCondition.operator).toBe('or');
    expect(moduleCondition.conditions[0].value).toBe('test-module');
  });

  it('should handle multiple modules', async () => {
    mockGetQuery.mockReturnValueOnce({
      activeOnly: true,
      module: 'module1,module2,module3'
    });

    mockDb.execute.mockResolvedValueOnce([]);

    await handler({});

    const whereArg = mockDb.where.mock.calls[0][0];
    const moduleCondition = whereArg.conditions[2];

    // Check OR condition with multiple modules
    expect(moduleCondition.operator).toBe('or');
    expect(moduleCondition.conditions).toHaveLength(3);
    expect(moduleCondition.conditions[0].value).toBe('module1');
    expect(moduleCondition.conditions[1].value).toBe('module2');
    expect(moduleCondition.conditions[2].value).toBe('module3');
  });

  it('should respect activeOnly parameter when false', async () => {
    mockGetQuery.mockReturnValueOnce({
      activeOnly: false,
      module: 'test-module'
    });

    mockDb.execute.mockResolvedValueOnce([]);

    await handler({});

    const whereArg = mockDb.where.mock.calls[0][0];

    // Find the isActive condition (index might vary)
    const isActiveCondition = whereArg.conditions.find(
      (condition) => condition?.field === 'isActive'
    );

    // Check that no isActive condition exists
    expect(isActiveCondition).toBeUndefined();
  });

  it('should work without module parameter', async () => {
    // Define the mock to return activeOnly only, with no module property
    mockGetQuery.mockReturnValueOnce({ activeOnly: true });

    // Mock the database response
    mockDb.execute.mockResolvedValueOnce([]);

    // Execute the handler
    await handler({});

    // Make sure the where method was called
    expect(mockDb.where).toHaveBeenCalled();

    // Get the condition that was passed to where
    const whereArg = mockDb.where.mock.calls[0][0];

    // The third condition should be undefined since no module is provided
    expect(whereArg.conditions.some((c) => c?.operator === 'or')).toBe(false);
  });

  it('should handle errors gracefully', async () => {
    mockRequireUserSession.mockImplementationOnce(() => {
      throw new Error('Database error');
    });

    const result = await handler({});

    expect(result).toEqual({
      status: 500,
      message: 'Database error'
    });
  });
});
