import {
  integer,
  pgSchema,
  pgTable,
  serial,
  timestamp,
  varchar
} from 'drizzle-orm/pg-core';

export const userSchema = pgSchema('user');
export const newsletterSchema = pgSchema('newsletter');

// Public
export const domain = pgTable('domain', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull()
});

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

export const lDomainUser = userSchema.table('l_domain_user', {
  id: serial('id').primaryKey(),
  domainId: integer('domain_id').notNull(),
  userId: integer('user_id').notNull()
});

// Newsletter
export const newsletterSubscription = newsletterSchema.table(
  'newsletter_subscription',
  {
    id: serial('id').primaryKey(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    email: varchar('email', { length: 255 }).notNull()
  }
);

export const newsletterTag = newsletterSchema.table('newsletter_tag', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull()
});

export const lNewsletterTag = newsletterSchema.table('l_newsletter_tag', {
  id: serial('id').primaryKey(),
  newsletterId: integer('newsletter_id').notNull(),
  tagId: integer('tag_id').notNull()
});

export const lDomainNewsletter = newsletterSchema.table('l_domain_newsletter', {
  id: serial('id').primaryKey(),
  domainId: integer('domain_id').notNull(),
  newsletterId: integer('newsletter_id').notNull()
});
