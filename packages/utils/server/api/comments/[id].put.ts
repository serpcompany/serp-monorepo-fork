import { db } from '@serp/utils/server/api/db';
import { user } from '@serp/utils/server/api/db/schema';
import { getTableAndPKForModule } from '@serp/utils/server/utils/getTableAndPKForModule';
import { and, eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    const session = await requireUserSession(event);
    const email = session.user?.email;
    if (!email) return { status: 401, message: 'Unauthorized' };

    // Assuming `id` refers to the company id the comment belongs to.
    const { id } = getRouterParams(event);
    if (!id) return { status: 400, message: 'ID is required' };

    const { commentId, comment, timestamp, parentIds, module } =
      await readBody(event);
    if (!commentId || !comment || !timestamp || !module) {
      return {
        status: 400,
        message:
          '`commentId`, `comment`, `module`, and `timestamp` are required'
      };
    }

    const userResult = await db
      .select()
      .from(user)
      .where(eq(user.email, email))
      .limit(1);
    if (!userResult || userResult.length === 0) {
      return { status: 404, message: 'User not found' };
    }
    const userId = userResult[0].id;

    const { commentsTable, commentsField } = getTableAndPKForModule(module);

    const updatedComment = await db
      .update(commentsTable)
      .set({
        content: comment,
        updatedAt: new Date()
      })
      .where(
        and(
          eq(commentsTable.id, commentId),
          eq(commentsTable.user, userId),
          eq(commentsTable.company, id)
        )
      )
      .returning();

    if (!updatedComment || updatedComment.length === 0) {
      return { status: 500, message: 'Failed to update comment' };
    }

    return { status: 200, message: 'success', id: updatedComment[0].id };
  } catch (error: unknown) {
    return { status: 500, message: error.message };
  }
});
