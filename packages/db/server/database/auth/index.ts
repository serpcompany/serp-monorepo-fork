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
  
  authClientInstance = postgres(connectionString);
  return authClientInstance;
}

export function getAuthDb(): ReturnType<typeof drizzle> | undefined {
  if (authDbInstance) {
    return authDbInstance;
  }

  const client = getAuthClient();
  
  if (!client) {
    return undefined;
  }
  
  authDbInstance = drizzle(client, { schema });
  return authDbInstance;
}