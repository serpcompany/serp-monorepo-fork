import { db } from '@serp/utils/server/api/db';
import { user } from '@serp/utils/server/api/db/schema';
import { getTableAndPKForModule } from '@serp/utils/server/utils/getTableAndPKForModule';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    const session = await requireUserSession(event);
    const email = session.user?.email;
    if (!email) return { status: 401, message: 'Unauthorized' };

    const { id } = getRouterParams(event);
    const { module } = getQuery(event);
    if (!id) return { status: 400, message: 'ID is required' };

    const {
      comment,
      timestamp,
      parentIds,
      module: bodyModule
    } = await readBody(event);

    const module_ = bodyModule || module;
    if (!module_) return { status: 400, message: 'Module is required' };

    const userResult = await db
      .select()
      .from(user)
      .where(eq(user.email, email))
      .limit(1);
    if (!userResult || userResult.length === 0) {
      return { status: 404, message: 'User not found' };
    }
    const userId = userResult[0].id;

    const { commentsTable, commentsField } = getTableAndPKForModule(module_);

    const newComment = {
      company: id,
      user: userId,
      content: comment,
      parentId:
        (Array.isArray(parentIds)
          ? parentIds[parentIds.length - 1]
          : parentIds) || null,
      createdAt: new Date()
    };

    const inserted = await db
      .insert(commentsTable)
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
