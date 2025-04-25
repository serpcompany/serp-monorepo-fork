import { drizzle } from 'drizzle-orm/postgres-js';
import type { Sql } from 'postgres';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.AUTH_DATABASE_URL;

export const authClient: Sql | undefined = connectionString
  ? postgres(connectionString)
  : undefined;

export const authDb: ReturnType<typeof drizzle> | undefined = authClient
  ? drizzle(authClient, { schema })
  : undefined;
