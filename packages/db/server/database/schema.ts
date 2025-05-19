import {
  boolean,
  customType,
  doublePrecision,
  integer,
  jsonb,
  pgSchema,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
  vector
} from 'drizzle-orm/pg-core';

export const ltree = customType<{ data: string }>({
  dataType() {
    return 'ltree';
  }
});

export const cacheSchema = pgSchema('cache');
export const formSchema = pgSchema('form');
export const stripeSchema = pgSchema('stripe');
export const userSchema = pgSchema('user');

// User
export const user = userSchema.table('user', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }),
  email: varchar('email', { length: 255 }).unique().notNull(),
  name: varchar('name', { length: 255 }),
  image: varchar('image', { length: 255 })
});

export const vote = userSchema.table('vote', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }),
  entity: integer('entity').notNull(),
  user: integer('user').notNull(),
  direction: integer('direction').notNull()
});

export const comment = userSchema.table('comment', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }),
  entity: integer('entity').notNull(),
  content: text('content').notNull(),
  parentId: integer('parent_id'),
  path: ltree('path'),
  user: integer('user').notNull()
});

export const review = userSchema.table('review', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }),
  entity: integer('entity').notNull(),
  content: text('content').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  rating: integer('rating').notNull(),
  dateOfExperience: timestamp('date_of_experience', { withTimezone: true }),
  isFlagged: boolean('is_flagged'),
  flaggedReason: text('flagged_reason'),
  flaggedAt: timestamp('flagged_at', { withTimezone: true }),
  flaggedBy: integer('flagged_by'),
  user: integer('user').notNull()
});

export const verification = userSchema.table('verification', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  entity: integer('entity').notNull(),
  user: integer('user').notNull()
});

export const verificationRequest = userSchema.table('verification_request', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  entity: integer('entity').notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  code: varchar('code', { length: 32 }).notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  verification: integer('verification'),
  user: integer('user').notNull()
});

export const edit = userSchema.table('edit', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  entity: integer('entity').notNull(),
  user: integer('user').notNull(),
  proposedChanges: jsonb('proposed_changes').notNull(),
  status: varchar('status', { length: 255 }).notNull(),
  reviewedAt: timestamp('reviewed_at', { withTimezone: true }),
  reviewedBy: integer('reviewed_by'),
  reviewNotes: text('review_notes'),
  updatedMainDb: boolean('updated_main_db').notNull().default(false)
});

export const submitForm = userSchema.table('submit_form', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }),
  entity: integer('entity'),
  user: integer('user').notNull(),
  formData: jsonb('form_data').notNull(),
  identifier: varchar('identifier', { length: 255 }).notNull(),
  module: varchar('module', { length: 255 }).notNull(),
  status: varchar('status', { length: 255 }).notNull(),
  reviewedAt: timestamp('reviewed_at', { withTimezone: true }),
  reviewedBy: integer('reviewed_by'),
  reviewNotes: text('review_notes'),
  isPriority: boolean('is_priority').notNull().default(false),
  priorityPayment: integer('priority_payment'),
  backlinkVerified: boolean('backlink_verified').notNull().default(false),
  backlinkVerifiedAt: timestamp('backlink_verified_at', { withTimezone: true }),
  uuid: uuid('uuid').notNull()
});

// Generic
export const entity = cacheSchema.table('entity', {
  id: serial('id').primaryKey(),
  lastUpdated: timestamp('last_updated', { withTimezone: true })
    .notNull()
    .defaultNow(),
  sourceId: varchar('source_id', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  module: varchar('module', { length: 255 }).notNull(),
  image: varchar('image', { length: 255 }),
  data: jsonb('data'),
  singleData: jsonb('single_data'),
  categories: jsonb('categories'),
  topics: jsonb('topics'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  searchText: text('search_text'),
  embedding: vector('embedding', { dimensions: 1536 })
});

export const entityAggregate = cacheSchema.table('entity_aggregate', {
  entity: integer('entity').primaryKey(),
  numReviews: integer('num_reviews').notNull().default(0),
  numOneStarReviews: integer('num_one_star_reviews').notNull().default(0),
  numTwoStarReviews: integer('num_two_star_reviews').notNull().default(0),
  numThreeStarReviews: integer('num_three_star_reviews').notNull().default(0),
  numFourStarReviews: integer('num_four_star_reviews').notNull().default(0),
  numFiveStarReviews: integer('num_five_star_reviews').notNull().default(0),
  averageRating: doublePrecision('average_rating').notNull().default(0),
  numUpvotes: integer('num_upvotes').notNull().default(0),
  numDownvotes: integer('num_downvotes').notNull().default(0),
  hotScore: doublePrecision('hot_score').notNull().default(0),
  hotScoreHour: doublePrecision('hot_score_hour').notNull().default(0),
  hotScoreDay: doublePrecision('hot_score_day').notNull().default(0),
  hotScoreWeek: doublePrecision('hot_score_week').notNull().default(0),
  hotScoreMonth: doublePrecision('hot_score_month').notNull().default(0),
  hotScoreYear: doublePrecision('hot_score_year').notNull().default(0),
  lastUpdatedVotes: timestamp('last_updated_votes', { withTimezone: true })
    .notNull()
    .defaultNow(),
  lastUpdatedReviews: timestamp('last_updated_reviews', { withTimezone: true })
    .notNull()
    .defaultNow()
});

export const category = cacheSchema.table('category', {
  id: serial('id').primaryKey(),
  module: varchar('module', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  sourceId: integer('source_id'),
  data: jsonb('data'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
});

export const topic = cacheSchema.table('topic', {
  id: serial('id').primaryKey(),
  module: varchar('module', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  sourceId: integer('source_id'),
  data: jsonb('data'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
});

// Stripe
export const customer = stripeSchema.table('customer', {
  id: varchar('id', { length: 255 }).primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  user: integer('user')
});

export const payment = stripeSchema.table('payment', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  customer: varchar('customer', { length: 255 }).notNull(),
  data: jsonb('data').notNull(),
  type: varchar('type', { length: 255 }).notNull()
});

export const featuredSubscription = stripeSchema.table(
  'featured_subscription',
  {
    id: serial('id').primaryKey(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    lastPayment: integer('last_payment'),
    placement: integer('placement').notNull(),
    category: integer('category'),
    entity: integer('entity').notNull(),
    isActive: boolean('is_active').notNull().default(false),
    user: integer('user').notNull(),
    cancelAtPeriodEnd: boolean('cancel_at_period_end').notNull().default(false),
    currentPeriodEnd: timestamp('current_period_end', { withTimezone: true }),
    currentPeriodStart: timestamp('current_period_start', {
      withTimezone: true
    }),
    endedAt: timestamp('ended_at', { withTimezone: true }),
    cancelAt: timestamp('cancel_at', { withTimezone: true }),
    reservationExpiresAt: timestamp('reservation_expires_at', {
      withTimezone: true
    }),
    customerId: varchar('customer')
  }
);
