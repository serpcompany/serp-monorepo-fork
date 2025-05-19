import { drizzle } from 'drizzle-orm/postgres-js';
import type { Sql } from 'postgres';
import postgres from 'postgres';
import * as schema from './schema';

let authClientInstance: Sql | undefined;
let authDbInstance: ReturnType<typeof drizzle> | undefined;

export function getAuthClient(): Sql | undefined {
  if (authClientInstance) {
    return authClientInstance;
  }

  const connectionString = process.env.AUTH_DATABASE_URL;

  if (!connectionString) {
    return undefined;
  }

  try {
    authClientInstance = postgres(connectionString);
    return authClientInstance;
  } catch (error) {
    console.error('Failed to create auth database client', error);
    return undefined;
  }
}

export function getAuthDb(): ReturnType<typeof drizzle> | undefined {
  if (authDbInstance) {
    return authDbInstance;
  }

  const client = getAuthClient();

  if (!client) {
    return undefined;
  }

  try {
    authDbInstance = drizzle(client, { schema });
    return authDbInstance;
  } catch (error) {
    console.error('Failed to create auth drizzle instance', error);
    return undefined;
  }
}
