import { useServerStripe } from '#stripe/server';
import { getDb } from '@serp/db/server/database';
import { customer } from '@serp/db/server/database/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const email = session?.user?.email;
  if (!email) {
    return { status: 401, message: 'Unauthorized' };
  }

  const stripe = await useServerStripe(event);
  if (!stripe) {
    return {
      clientSecret: null,
      error: 'Stripe not initialized'
    };
  }

  let customer_;
  try {
    // Check if customer exists in the database
    // If not, create a new customer in Stripe and save it to the database
    const results = await getDb()
      .select({ id: customer.id })
      .from(customer)
      .where(eq(customer.email, email))
      .limit(1)
      .execute();
    if (results.length > 0) {
      customer_ = results[0];
    } else {
      customer_ = await stripe.customers.create({
        email
      });
      await getDb()
        .insert(customer)
        .values({
          id: customer_.id,
          user: session?.user?.siteId,
          email
        })
        .execute();
    }
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to retrieve or create customer'
    });
  }

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customer_.id
    });
    return session.url;
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create billing portal session'
    });
  }
});
