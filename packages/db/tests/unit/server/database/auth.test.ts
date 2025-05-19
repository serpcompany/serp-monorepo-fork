import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mockSqlClient, mockDrizzleInstance } from '../../../setup';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

describe('Auth Database Connection Management', () => {
  const originalEnv = { ...process.env };
  const postgresErrorMessage = 'Auth Connection error';

  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  describe('getAuthClient', () => {
    it('should create a new auth database client when AUTH_DATABASE_URL is present', async () => {
      process.env.AUTH_DATABASE_URL =
        'postgres://user:password@localhost:5432/auth';

      const { getAuthClient } = await import(
        '../../../../server/database/auth'
      );
      const client = getAuthClient();

      expect(postgres).toHaveBeenCalledWith(
        'postgres://user:password@localhost:5432/auth'
      );
      expect(client).toBe(mockSqlClient);
    });

    it('should return undefined when AUTH_DATABASE_URL is not set', async () => {
      delete process.env.AUTH_DATABASE_URL;

      const { getAuthClient } = await import(
        '../../../../server/database/auth'
      );
      const client = getAuthClient();

      expect(postgres).not.toHaveBeenCalled();
      expect(client).toBeUndefined();
    });

    it('should handle empty but non-null AUTH_DATABASE_URL', async () => {
      process.env.AUTH_DATABASE_URL = '';

      const { getAuthClient } = await import(
        '../../../../server/database/auth'
      );
      const client = getAuthClient();

      expect(postgres).not.toHaveBeenCalled();
      expect(client).toBeUndefined();
    });

    it('should handle postgres constructor throwing an error', async () => {
      process.env.AUTH_DATABASE_URL =
        'postgres://user:password@localhost:5432/auth';

      const postgresError = new Error(postgresErrorMessage);
      vi.mocked(postgres).mockImplementationOnce(() => {
        throw postgresError;
      });

      const { getAuthClient } = await import(
        '../../../../server/database/auth'
      );

      expect(() => getAuthClient()).not.toThrow();
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining('Failed to create auth database client'),
        postgresError
      );
    });

    it('should reuse the Auth SQL client instance on subsequent calls', async () => {
      process.env.AUTH_DATABASE_URL =
        'postgres://user:password@localhost:5432/auth';

      const { getAuthClient } = await import(
        '../../../../server/database/auth'
      );

      const client1 = getAuthClient();
      expect(postgres).toHaveBeenCalledTimes(1);

      const client2 = getAuthClient();
      expect(postgres).toHaveBeenCalledTimes(1);
      expect(client1).toBe(client2);
    });
  });

  describe('getAuthDb', () => {
    it('should create a new Drizzle instance when AUTH_DATABASE_URL is present', async () => {
      process.env.AUTH_DATABASE_URL =
        'postgres://user:password@localhost:5432/auth';

      const { getAuthDb } = await import('../../../../server/database/auth');
      const db = getAuthDb();

      expect(drizzle).toHaveBeenCalledWith(
        mockSqlClient,
        expect.objectContaining({ schema: expect.anything() })
      );
      expect(db).toBe(mockDrizzleInstance);
    });

    it('should return undefined when AUTH_DATABASE_URL is not set', async () => {
      delete process.env.AUTH_DATABASE_URL;

      const { getAuthDb } = await import('../../../../server/database/auth');
      const db = getAuthDb();

      expect(drizzle).not.toHaveBeenCalled();
      expect(db).toBeUndefined();
    });

    it('should handle drizzle constructor throwing an error', async () => {
      process.env.AUTH_DATABASE_URL =
        'postgres://user:password@localhost:5432/auth';

      const drizzleError = new Error('Drizzle initialization error');
      vi.mocked(drizzle).mockImplementationOnce(() => {
        throw drizzleError;
      });

      const { getAuthDb } = await import('../../../../server/database/auth');

      expect(() => getAuthDb()).not.toThrow();
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining('Failed to create auth drizzle instance'),
        drizzleError
      );
    });

    it('should reuse the Auth Drizzle instance on subsequent calls', async () => {
      process.env.AUTH_DATABASE_URL =
        'postgres://user:password@localhost:5432/auth';

      const { getAuthDb } = await import('../../../../server/database/auth');

      const db1 = getAuthDb();
      expect(drizzle).toHaveBeenCalledTimes(1);

      const db2 = getAuthDb();
      expect(drizzle).toHaveBeenCalledTimes(1);
      expect(db1).toBe(db2);
    });
  });
});
