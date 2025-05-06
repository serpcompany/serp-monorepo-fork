import { db } from '@serp/utils/server/api/db';
import {
  companyCache,
  companyCategoryCache,
  companyEdit,
  user
} from '@serp/utils/server/api/db/schema';
import { eq, getTableColumns, inArray } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    const session = await requireUserSession(event);

    const email = session.user?.email;
    if (!email) {
      return {
        status: 401,
        message: 'Unauthorized'
      };
    }

    const { id } = getQuery(event);
    if (!id) {
      return { status: 400, message: 'Missing edit ID in query' };
    }
    const editId = parseInt(id as string, 10);
    if (isNaN(editId)) {
      return { status: 400, message: 'Invalid edit ID' };
    }

    const data = await readBody(event);

    // Filter data to only include fields that exist in companyCache
    const columnNames: string[] = Object.values(
      getTableColumns(companyCache)
    ).map((col) => col.name);

    const companyEditData = {};
    for (const col of columnNames) {
      if (
        col === 'id' ||
        col === 'createdAt' ||
        col === 'updatedAt' ||
        col === 'numReviews' ||
        col === 'numOneStarReviews' ||
        col === 'numTwoStarReviews' ||
        col === 'numThreeStarReviews' ||
        col === 'numFourStarReviews' ||
        col === 'numFiveStarReviews' ||
        col === 'averageRating' ||
        col === 'verified' ||
        col === 'alternatives' ||
        col === 'content' ||
        col === 'serplyLink' ||
        col === 'verifiedEmail' ||
        col === 'screenshots' ||
        col === 'videoId'
      ) {
        continue; // Skip these columns
      }
      if (data[col] !== undefined) {
        companyEditData[col] = data[col];
      }
    }

    if (Object.keys(companyEditData).length === 0) {
      return { status: 400, message: 'No valid fields to update' };
    }

    // Ensure categories is an array of ids and that all exist in companyCategoryCache
    if (data.categories) {
      if (typeof data.categories === 'string') {
        data.categories = data.categories
          .split(',')
          .map((cat: string) => cat.trim());
      }
      if (!Array.isArray(data.categories)) {
        return {
          status: 400,
          message: 'Categories must be an array'
        };
      }

      const categories = await db
        .select()
        .from(companyCategoryCache)
        .where(inArray(companyCategoryCache.id, data.categories))
        .limit(data.categories.length)
        .execute();

      if (categories.length !== data.categories.length) {
        return {
          status: 400,
          message: 'Invalid categories'
        };
      }
    }

    // Ensure company exists
    const existingCompany = await db
      .select({
        id: companyCache.id
      })
      .from(companyCache)
      .where(eq(companyCache.id, editId))
      .limit(1)
      .execute();

    if (!existingCompany.length) {
      return {
        status: 400,
        message: "Company with given id doesn't exists"
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

    await db
      .insert(companyEdit)
      .values({
        user: userId,
        company: existingCompany[0].id,
        proposedChanges: JSON.stringify(companyEditData),
        status: 'pending'
      })
      .onConflictDoNothing()
      .execute();

    return {
      message: 'success'
    };
  } catch (error) {
    return {
      status: error.statusCode || 500,
      message: error.message
    };
  }
});
