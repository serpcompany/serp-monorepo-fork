import { db } from '@serp/utils/server/api/db';
import {
    companyCache,
    companyCategoryCache,
    companyEdit,
    companyVerification,
    user
} from '@serp/utils/server/api/db/schema';
import { and, eq, getTableColumns, inArray, sql } from 'drizzle-orm';

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
    if (!id) {
      return { status: 400, message: 'Missing edit ID in query' };
    }
    const editId = parseInt(id as string, 10);
    if (isNaN(editId)) {
      return { status: 400, message: 'Invalid edit ID' };
    }

    const [editRow] = await db
      .select({
        company: companyEdit.company,
      })
      .from(companyEdit)
      .where(eq(companyEdit.id, editId))
      .limit(1)
      .execute();
    if (!editRow) {
      return { status: 404, message: 'Edit not found' };
    }
    const companyId = editRow.company;

    // Check verification: only the verified user for that company may update
    const [verif] = await db
      .select({ id: companyVerification.id })
      .from(companyVerification)
      .where(
        and(
          eq(companyVerification.company, companyId),
          eq(companyVerification.user, userId),
        )
      )
      .limit(1)
      .execute();
    if (!verif) {
      return { status: 403, message: 'You are not verified to review edits for this company' };
    }

    // Pull in the body and only allow status + reviewNotes
    const body = await readBody(event);
    const updateData: Partial<typeof companyEdit> = {};
    if (body.status !== undefined) {
      updateData.status = body.status;
    }
    if (body.reviewNotes !== undefined) {
      updateData.reviewNotes = body.reviewNotes;
    }
    if (Object.keys(updateData).length === 0) {
      return { status: 400, message: 'Nothing to update; allowed fields: status, reviewNotes' };
    }

    updateData.reviewedBy = userId;
    updateData.reviewedAt = sql`now()`;

    await db
      .update(companyEdit)
      .set(updateData)
      .where(eq(companyEdit.id, editId))
      .execute();

    if (updateData.status === 'approved') {
        // If approved, update the company cache with the new data (main table will be updated in the next cron job)
        const updateData = await db
            .select({ proposedChanges: companyEdit.proposedChanges })
            .from(companyEdit)
            .where(eq(companyEdit.id, editId))
            .limit(1)
            .execute();
        if (!updateData.length) {
            return { status: 404, message: 'Edit not found' };
        }
        const raw = updateData[0].proposedChanges;
        const proposedChanges = 
        typeof raw === 'string' 
            ? JSON.parse(raw)
            : raw;
    
      const columnNames: string[] = Object.values(getTableColumns(companyCache)).map((col) => col.name);
        console.log('columnNames', columnNames)
        const companyEditData = {}
        for (const col of columnNames) {
            console.log('col', col)
            console.log('proposedChanges[col]', proposedChanges[col])
          if (proposedChanges[col] !== undefined && col !== 'id' && col !== 'createdAt' && col !== 'updatedAt' && col !== 'categories') {
            companyEditData[col] = proposedChanges[col]
          }
        }

        if (Object.keys(companyEditData).length === 0) {
          return { status: 400, message: 'No valid fields to update' }
        }

        // Ensure categories is an array of ids and that all exist in companyCategoryCache
        if (body.categories) {
          if (typeof body.categories === 'string') {
            body.categories = body.categories.split(',').map((cat: string) => cat.trim());
          }
          if (!Array.isArray(body.categories)) {
            return {
              status: 400,
              message: 'Categories must be an array'
            };
          }

          const categories = await db
            .select()
            .from(companyCategoryCache)
            .where(inArray(companyCategoryCache.id, body.categories))
            .limit(body.categories.length)
            .execute();

          if (categories.length !== body.categories.length) {
            return {
              status: 400,
              message: 'Invalid categories'
            };
          }

          companyEditData['categories'] = JSON.stringify(categories);
        }

        // Ensure company exists
        const existingCompany = await db
            .select({
                id: companyCache.id,
            })
            .from(companyCache)
            .where(eq(companyCache.id, companyId))
            .limit(1)
            .execute();

        if (!existingCompany.length) {
            return {
                status: 400,
                message: 'Company with given id doesn\'t exists'
            };
        }

        if (Object.keys(companyEditData).length !== 0) {
            // // Update the company cache with the new data
            // await db
            //     .update(companyCache)
            //     .set(companyEditData)
            //     .where(eq(companyCache.id, companyId))
            //     .execute();
        }
    }

    return { message: 'success' };
  } catch (err) {
    return {
      status: err.statusCode || 500,
      message: err.message || 'Internal server error',
    };
  }
});
