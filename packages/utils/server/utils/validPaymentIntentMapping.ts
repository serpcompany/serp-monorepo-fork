import { db } from '@serp/utils/server/api/db';
import {
  companyCache,
  companyCategoryCache,
  companyFeaturedSubscription,
  companySubmitForm,
  payment
} from '@serp/utils/server/api/db/schema';
import { and, eq, isNull } from 'drizzle-orm';
import { sendSlackNotification } from './slack';

async function processCompanyFeatured(type: string, data?: unknown) {
  const companyResults = await db
    .select({
      domain: companyCache.domain,
      id: companyCache.id
    })
    .from(companyCache)
    .where(eq(companyCache.id, data.metadata.id))
    .limit(1)
    .execute();
  const company = companyResults[0];

  const categoryResults =
    data.metadata.secondaryId != '0'
      ? await db
          .select({
            id: companyCategoryCache.id,
            name: companyCategoryCache.name
          })
          .from(companyCategoryCache)
          .where(eq(companyCategoryCache.id, data.metadata.secondaryId))
          .limit(1)
          .execute()
      : [];
  const category = data.metadata.secondaryId != '0' ? categoryResults[0] : {};

  const result = await db
    .insert(payment)
    .values({
      customer: data.metadata.customerId,
      type: data.metadata.type,
      data: JSON.stringify(data)
    })
    .returning({
      id: payment.id
    })
    .execute();

  const paymentId = result[0].id;

  // Check if the company already has a subscription for the category
  const existingSubscription = await db
    .select()
    .from(companyFeaturedSubscription)
    .where(
      and(
        eq(companyFeaturedSubscription.companyFk, company.id),
        data.metadata.secondaryId != '0'
          ? eq(companyFeaturedSubscription.categoryFk, category.id)
          : isNull(companyFeaturedSubscription.categoryFk)
      )
    )
    .execute();

  if (existingSubscription.length > 0) {
    // Update existing subscription
    await db
      .update(companyFeaturedSubscription)
      .set({
        lastPaymentFk: paymentId,
        isActive: data.status === 'active',
        reservationExpiresAt: null,
        cancelAtPeriodEnd: data.cancel_at_period_end,
        currentPeriodEnd: new Date(data.current_period_end * 1000),
        currentPeriodStart: new Date(data.current_period_start * 1000),
        endedAt: data.ended_at ? new Date(data.ended_at * 1000) : null,
        cancelAt: data.cancel_at ? new Date(data.cancel_at * 1000) : null
      })
      .where(
        and(
          eq(companyFeaturedSubscription.companyFk, company.id),
          data.metadata.secondaryId != '0'
            ? eq(companyFeaturedSubscription.categoryFk, category.id)
            : isNull(companyFeaturedSubscription.categoryFk)
        )
      )
      .execute();

    // Ping slack
    const placement = type.split('-')[2];
    await sendSlackNotification(
      `💸 Featured listing updated for category '${category.name}' (spot ${placement}) made by ${data.metadata.email} for domain ${company.domain}`
    );
  } else {
    // Insert new subscription
    await db
      .insert(companyFeaturedSubscription)
      .values({
        companyFk: company.id,
        categoryFk: data.metadata.secondaryId != '0' ? category.id : null,
        lastPaymentFk: paymentId,
        placement: type.split('-')[2],
        isActive: data.status === 'active',
        email: data.metadata.email,
        cancelAtPeriodEnd: data.cancel_at_period_end,
        currentPeriodEnd: new Date(data.current_period_end * 1000),
        currentPeriodStart: new Date(data.current_period_start * 1000),
        endedAt: data.ended_at ? new Date(data.ended_at * 1000) : null,
        cancelAt: data.cancel_at ? new Date(data.cancel_at * 1000) : null
      })
      .execute();

    // Ping slack
    const placement = type.split('-')[2];
    await sendSlackNotification(
      `💸 New featured listing for category '${category.name}' (spot ${placement}) made by ${data.metadata.email} for domain ${company.domain}`
    );
  }
}

export async function processSuccessfulPayment(
  type: string,
  getIsValidOnly = false,
  getInfo = false,
  data?: unknown
) {
  if (type === 'company-priority-queue') {
    if (getIsValidOnly) {
      return process.env.COMPANY_PRIORITY_QUEUE_PRICE ? true : false;
    } else if (getInfo) {
      return {
        amount: process.env.COMPANY_PRIORITY_QUEUE_PRICE,
        currency: 'usd',
        recurring: false,
        description: 'Priority queue listing'
      };
    }
    // Update database
    const result = await db
      .insert(payment)
      .values({
        customer: data.metadata.customerId,
        type: 'company-priority-queue',
        data: JSON.stringify(data)
      })
      .returning({
        id: payment.id
      })
      .execute();

    await db
      .update(companySubmitForm)
      .set({
        isPriority: true,
        priorityPaymentFk: result[0].id
      })
      .where(eq(companySubmitForm.uuid, data.metadata.id));

    const results = await db
      .select({
        domain: companySubmitForm.domain
      })
      .from(companySubmitForm)
      .where(eq(companySubmitForm.uuid, data.metadata.id));
    const domain = results[0].domain;

    // Ping slack
    await sendSlackNotification(
      `💸 New priority queue listing made by ${data.metadata.email} for domain ${domain} (companySubmitForm.uuid: ${data.metadata.id})`
    );
  } else if (type === 'company-featured-1') {
    if (getIsValidOnly) {
      return process.env.COMPANY_FEATURED_1_PRICE_ID ? true : false;
    } else if (getInfo && process.env.COMPANY_FEATURED_1_PRICE_ID) {
      return {
        amount: process.env.COMPANY_FEATURED_1_PRICE,
        currency: 'usd',
        recurring: true,
        paymentId: process.env.COMPANY_FEATURED_1_PRICE_ID,
        description: 'Featured listing (spot 1)'
      };
    }

    await processCompanyFeatured(type, data);
  } else if (type === 'company-featured-2') {
    if (getIsValidOnly) {
      return process.env.COMPANY_FEATURED_2_PRICE_ID ? true : false;
    } else if (getInfo && process.env.COMPANY_FEATURED_2_PRICE_ID) {
      return {
        amount: process.env.COMPANY_FEATURED_2_PRICE,
        currency: 'usd',
        recurring: true,
        paymentId: process.env.COMPANY_FEATURED_2_PRICE_ID,
        description: 'Featured listing (spot 2)'
      };
    }

    await processCompanyFeatured(type, data);
  } else if (type === 'company-featured-3') {
    if (getIsValidOnly) {
      return process.env.COMPANY_FEATURED_3_PRICE_ID ? true : false;
    } else if (getInfo && process.env.COMPANY_FEATURED_3_PRICE_ID) {
      return {
        amount: process.env.COMPANY_FEATURED_3_PRICE,
        currency: 'usd',
        recurring: true,
        paymentId: process.env.COMPANY_FEATURED_3_PRICE_ID,
        description: 'Featured listing (spot 3)'
      };
    }

    await processCompanyFeatured(type, data);
  } else if (type === 'company-featured-4') {
    if (getIsValidOnly) {
      return process.env.COMPANY_FEATURED_4_PRICE_ID ? true : false;
    } else if (getInfo && process.env.COMPANY_FEATURED_4_PRICE_ID) {
      return {
        amount: process.env.COMPANY_FEATURED_4_PRICE,
        currency: 'usd',
        recurring: true,
        paymentId: process.env.COMPANY_FEATURED_4_PRICE_ID,
        description: 'Featured listing (spot 4)'
      };
    }

    await processCompanyFeatured(type, data);
  } else if (type === 'company-featured-5') {
    if (getIsValidOnly) {
      return process.env.COMPANY_FEATURED_5_PRICE_ID ? true : false;
    } else if (getInfo && process.env.COMPANY_FEATURED_5_PRICE_ID) {
      return {
        amount: process.env.COMPANY_FEATURED_5_PRICE,
        currency: 'usd',
        recurring: true,
        paymentId: process.env.COMPANY_FEATURED_5_PRICE_ID,
        description: 'Featured listing (spot 5)'
      };
    }

    await processCompanyFeatured(type, data);
  } else {
    if (getIsValidOnly) {
      return false;
    }
    throw new Error('Invalid payment type');
  }
}
