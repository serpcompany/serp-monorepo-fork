import { getDb } from '@serp/db/server/database';
import { comment } from '@serp/db/server/database/schema';
import { sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    const session = await requireUserSession(event);
    const userId = session?.user?.siteId;
    if (!userId) return { status: 401, message: 'Unauthorized' };

    const { id } = getRouterParams(event);
    const { module } = getQuery(event);
    if (!id) return { status: 400, message: 'ID is required' };

    const {
      comment: bodyComment,
      parentIds,
      module: bodyModule
    } = await readBody(event);

    const newComment = {
      entity: id,
      user: userId,
      content: bodyComment,
      parentId:
        (Array.isArray(parentIds)
          ? parentIds[parentIds.length - 1]
          : parentIds) || null,
      createdAt: sql`now()`
    };

    const inserted = await getDb()
      .insert(comment)
      .values(newComment)
      .returning();

    if (!inserted || inserted.length === 0) {
      return { status: 500, message: 'Failed to insert comment' };
    }
    const newCommentId = inserted[0].id;

    return { status: 200, message: 'success', id: newCommentId };
  } catch (error) {
    return { status: 500, message: error.message };
  }
});
