import { drizzle } from 'drizzle-orm/postgres-js';
import type { Sql } from 'postgres';
import postgres from 'postgres';
import * as schema from './schema';

let clientInstance: Sql | undefined;
let dbInstance: ReturnType<typeof drizzle> | undefined;

export function getClient(): Sql | undefined {
  if (clientInstance) {
    return clientInstance;
  }

  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    return undefined;
  }
  
  clientInstance = postgres(connectionString);
  return clientInstance;
}

export function getDb(): ReturnType<typeof drizzle> | undefined {
  if (dbInstance) {
    return dbInstance;
  }

  const client = getClient();
  
  if (!client) {
    return undefined;
  }
  
  dbInstance = drizzle(client, { schema });
  return dbInstance;
}