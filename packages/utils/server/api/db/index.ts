import * as schema from '@serp/utils/server/api/db/schema';
import { drizzle } from 'drizzle-orm/postgres-js';
import type { Sql } from 'postgres';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;

export const client: Sql | undefined = connectionString
  ? postgres(connectionString)
  : undefined;

export const db: ReturnType<typeof drizzle> | undefined = client
  ? drizzle(client, { schema })
  : undefined;
