import { getDb } from '@serp/db/server/database';
import {
  category,
  entity,
  featuredSubscription
} from '@serp/db/server/database/schema';
import { and, eq, or, sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    const session = await requireUserSession(event);
    const userId = session?.user?.siteId;
    if (!userId) return { status: 401, message: 'Unauthorized' };

    const { activeOnly = true, module = '' } = getQuery(event);

    // @todo - improve the typesafety of this after implementing zod
    const modules = module
      .split(',')
      .map((mod: string) => mod.trim())
      .filter(Boolean);

    const results = await getDb()
      .select({
        id: featuredSubscription.id,
        createdAt: featuredSubscription.createdAt,
        placement: featuredSubscription.placement,
        categoryId: featuredSubscription.category,
        entityId: featuredSubscription.entity,
        entityName: entity.name,
        entitySlug: entity.slug,
        entityData: entity.data,
        categoryName: category.name,
        categorySlug: category.slug,
        isActive: featuredSubscription.isActive
      })
      .from(featuredSubscription)
      .innerJoin(entity, eq(featuredSubscription.entity, entity.id))
      .leftJoin(category, eq(featuredSubscription.category, category.id))
      .where(
        and(
          eq(featuredSubscription.user, userId),
          activeOnly ? eq(featuredSubscription.isActive, true) : sql`true`,
          modules.length
            ? or(...modules.map((mod: string) => eq(entity.module, mod)))
            : sql`true`
        )
      )
      .execute();

    return results.length ? results : [];
  } catch (error) {
    return {
      status: error.statusCode || 500,
      message: error.message
    };
  }
});
