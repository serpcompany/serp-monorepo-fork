import { getDb } from '@serp/db/server/database';
import {
  category,
  entity,
  featuredSubscription,
  payment,
  submitForm
} from '@serp/db/server/database/schema';
import { sendSlackNotification } from '@serp/notifications/server';
import { and, eq, isNull } from 'drizzle-orm';

async function processFeatured(type: string, data?: unknown) {
  const entityResults = await getDb()
    .select({
      name: entity.name,
      slug: entity.slug,
      module: entity.module,
      id: entity.id
    })
    .from(entity)
    .where(eq(entity.id, data.metadata.id))
    .limit(1)
    .execute();
  const entity_ = entityResults[0];

  const categoryResults =
    data.metadata.secondaryId != '0'
      ? await getDb()
          .select({
            id: category.id,
            name: category.name
          })
          .from(category)
          .where(eq(category.id, data.metadata.secondaryId))
          .limit(1)
          .execute()
      : [];
  const category_ = data.metadata.secondaryId != '0' ? categoryResults[0] : {};

  const result = await getDb()
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

  // Check if the entity already has a subscription for the category
  const existingSubscription = await getDb()
    .select()
    .from(featuredSubscription)
    .where(
      and(
        eq(featuredSubscription.entity, entity_.id),
        data.metadata.secondaryId != '0'
          ? eq(featuredSubscription.category, category_.id)
          : isNull(featuredSubscription.category)
      )
    )
    .execute();

  if (existingSubscription.length > 0) {
    // Update existing subscription
    await getDb()
      .update(featuredSubscription)
      .set({
        lastPayment: paymentId,
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
          eq(featuredSubscription.entity, entity_.id),
          data.metadata.secondaryId != '0'
            ? eq(featuredSubscription.category, category_.id)
            : isNull(featuredSubscription.category)
        )
      )
      .execute();

    // Ping slack
    const placement = type.split('-')[2];
    await sendSlackNotification({
      message: `💸 Featured listing updated for ${entity_.module} category '${category_.name}' (spot ${placement}) made by ${data.metadata.email} for entity ${entity_.name} (${entity_.id})`
    });
  } else {
    // Insert new subscription
    await getDb()
      .insert(featuredSubscription)
      .values({
        entity: entity_.id,
        category: data.metadata.secondaryId != '0' ? category_.id : null,
        lastPayment: paymentId,
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
    await sendSlackNotification({
      message: `💸 New featured listing for ${entity_.module} category '${category_.name}' (spot ${placement}) made by ${data.metadata.email} for entity ${entity_.name} (${entity_.id})`
    });
  }
}

export async function processSuccessfulPayment(
  type: string,
  getIsValidOnly = false,
  getInfo = false,
  data?: unknown
) {
  if (type === 'priority-queue') {
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
    const result = await getDb()
      .insert(payment)
      .values({
        customer: data.metadata.customerId,
        type: 'priority-queue',
        data: JSON.stringify(data)
      })
      .returning({
        id: payment.id
      })
      .execute();

    await getDb()
      .update(submitForm)
      .set({
        isPriority: true,
        priorityPaymentFk: result[0].id
      })
      .where(eq(submitForm.uuid, data.metadata.id))
      .execute();

    const results = await getDb()
      .select({
        entity: submitForm.entity
      })
      .from(submitForm)
      .where(eq(submitForm.uuid, data.metadata.id))
      .execute();
    const entity_ = results[0].entity;

    // Ping slack
    await sendSlackNotification(
      `💸 New priority queue listing made by ${data.metadata.email} for entity ${entity_} (submitForm.uuid: ${data.metadata.id})`
    );
  } else if (type === 'featured-1') {
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

    await processFeatured(type, data);
  } else if (type === 'featured-2') {
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

    await processFeatured(type, data);
  } else if (type === 'featured-3') {
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

    await processFeatured(type, data);
  } else if (type === 'featured-4') {
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

    await processFeatured(type, data);
  } else if (type === 'featured-5') {
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

    await processFeatured(type, data);
  } else {
    if (getIsValidOnly) {
      return false;
    }
    throw new Error('Invalid payment type');
  }
}
