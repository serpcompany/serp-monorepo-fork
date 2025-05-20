import { getDb } from '@serp/db/server/database';
import { entity, verification } from '@serp/db/server/database/schema';
import { and, eq, or } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    const session = await requireUserSession(event);
    const userId = session?.user?.siteId;
    if (!userId) return { status: 401, message: 'Unauthorized' };

    const { module } = getQuery(event);

    const modules = module
      .split(',')
      .map((mod) => mod.trim())
      .filter(Boolean);

    const whereConditions = [
      modules.length
        ? or(...modules.map((mod) => eq(entity.module, mod)))
        : sql`true`,
      eq(verification.user, userId)
    ];

    const verificationResults = await getDb()
      .select({
        id: entity.id,
        name: entity.name,
        slug: entity.slug,
        module: entity.module
      })
      .from(entity)
      .innerJoin(verification, eq(verification.entity, entity.id))
      .where(and(...whereConditions))
      .execute();

    return verificationResults.length > 0 ? verificationResults : [];
  } catch (error) {
    return { status: 500, message: error.message };
  }
});
