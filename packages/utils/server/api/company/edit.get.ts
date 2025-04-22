import { db } from '@serp/utils/server/api/db';
import {
  companyEdit,
  user
} from '@serp/utils/server/api/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    const session = await requireUserSession(event);
    const email = session.user?.email;
    if (!email) {
      return { status: 401, message: 'Unauthorized' };
    }

    const userResult = await db
      .select({ id: user.id })
      .from(user)
      .where(eq(user.email, email))
      .limit(1)
      .execute();
    if (!userResult.length) {
      return { status: 404, message: 'User not found' };
    }
    const userId = userResult[0].id;

    const { id } = getQuery(event);

    let edits;
    if (id) {
      // if id, show all edits for that company
      const companyId = parseInt(id as string, 10);
      if (isNaN(companyId)) {
        return { status: 400, message: 'Invalid company ID' };
      }
      edits = await db
        .select()
        .from(companyEdit)
        .where(eq(companyEdit.company, companyId))
        .execute();
    } else {
      // otherwise, show all edits the user has made
      edits = await db
        .select()
        .from(companyEdit)
        .where(eq(companyEdit.user, userId))
        .execute();
    }

    return { edits };
  } catch (error: any) {
    return {
      status: error.statusCode || 500,
      message: error.message || 'Oops, something went wrong'
    };
  }
});
