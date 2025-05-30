import { getDb } from '@serp/db/server/database';
import { submitForm } from '@serp/db/server/database/schema';
import { and, eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    const session = await requireUserSession(event);
    const userId = session?.user?.siteId;
    if (!userId) return { status: 401, message: 'Unauthorized' };

    const { id, module = '' } = getQuery(event);

    if (!id) {
      const results = await getDb()
        .select({
          id: submitForm.id,
          uuid: submitForm.uuid,
          isPriority: submitForm.isPriority,
          status: submitForm.status,
          createdAt: submitForm.createdAt,
          reviewedAt: submitForm.reviewedAt,
          reviewedBy: submitForm.reviewedBy,
          reviewNotes: submitForm.reviewNotes,
          backlinkVerified: submitForm.backlinkVerified,
          backlinkVerifiedAt: submitForm.backlinkVerifiedAt
        })
        .from(submitForm)
        .where(and(eq(submitForm.user, userId), eq(submitForm.module, module)))
        .execute();

      return results;
    } else {
      const results = await getDb()
        .select({
          id: submitForm.id,
          uuid: submitForm.uuid,
          isPriority: submitForm.isPriority,
          status: submitForm.status,
          formData: submitForm.formData,
          createdAt: submitForm.createdAt,
          reviewedAt: submitForm.reviewedAt,
          reviewedBy: submitForm.reviewedBy,
          reviewNotes: submitForm.reviewNotes,
          backlinkVerified: submitForm.backlinkVerified,
          backlinkVerifiedAt: submitForm.backlinkVerifiedAt
        })
        .from(submitForm)
        .where(
          and(
            eq(submitForm.user, userId),
            eq(submitForm.id, id),
            eq(submitForm.module, module)
          )
        )
        .execute();

      return results.length ? results[0] : null;
    }
  } catch (error) {
    return {
      status: error.statusCode || 500,
      message: error.message
    };
  }
});
