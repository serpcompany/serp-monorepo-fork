# README

## Turbo

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel.

```sh
pnpx turbo login
```

This will authenticate the Turborepo CLI with your Vercel account

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```sh
npx turbo link
```

## Cloudflare Pages Development

1. Build the project with `pnpm build`
2. Preview locally with `pnpm dlx wrangler pages dev dist`

```sh
# run dev
pnpm dev
```

## Nuxt Hub

```bash
# deploy to nuxt hub
cd apps/serp-wiki && pnpx nuxthub deploy
```

# Server

```sql
CREATE SCHEMA "user"
```

```sql
CREATE TABLE
  "user"."user" (
    id serial NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NULL,
    email character varying(255) NOT NULL,
    name character varying(255) NULL,
    image character varying(255) NULL
  );

ALTER TABLE
  "user"."user"
ADD
  CONSTRAINT user_pkey PRIMARY KEY (id)
```

```sql
CREATE UNIQUE INDEX "user_index_unique_email" on "user"."user" ("email" ASC)
```

## Server comments (postgres) (company)

```sql
CREATE EXTENSION IF NOT EXISTS ltree;
```

```sql
CREATE TABLE
  "user".company_comment (
    id serial NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NULL,
    company integer NOT NULL,
    content text NOT NULL,
    parent_id integer NULL,
    path ltree NULL,
    "user" integer NOT NULL
  );

ALTER TABLE
  "user".company_comment
ADD
  CONSTRAINT company_comment_pkey PRIMARY KEY (id)
```

```sql
CREATE OR REPLACE FUNCTION update_company_comments_path()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.parent_id IS NULL THEN
        -- Top-level comment: simply set the path using a prefix
        UPDATE "user"."company_comment"
        SET path = ('c' || NEW.id::text)::ltree
        WHERE id = NEW.id;
    ELSE
        -- Nested comment: get the parent's path and append the new label
        UPDATE "user"."company_comment"
        SET path = (
            (SELECT path FROM "user"."company_comment" WHERE id = NEW.parent_id)
            || (('c' || NEW.id::text)::ltree)
        )
        WHERE id = NEW.id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

```sql
CREATE TRIGGER trg_update_company_comments_path
AFTER INSERT ON "user"."company_comment"
FOR EACH ROW
EXECUTE PROCEDURE update_company_comments_path();
```

```sql
CREATE INDEX idx_company_comments_path ON "user"."company_comment" USING GIST (path);
```

## Server comments (postgres) (service_provider)

```sql
CREATE EXTENSION IF NOT EXISTS ltree;
```

```sql
CREATE TABLE
  "user".service_provider_comment (
    id serial NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NULL,
    service_provider integer NOT NULL,
    content text NOT NULL,
    parent_id integer NULL,
    path ltree NULL,
    "user" integer NOT NULL
  );

ALTER TABLE
  "user".service_provider_comment
ADD
  CONSTRAINT service_provider_comment_pkey PRIMARY KEY (id)
```

```sql
CREATE OR REPLACE FUNCTION update_service_provider_comments_path()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.parent_id IS NULL THEN
        -- Top-level comment: simply set the path using a prefix
        UPDATE "user"."service_provider_comment"
        SET path = ('c' || NEW.id::text)::ltree
        WHERE id = NEW.id;
    ELSE
        -- Nested comment: get the parent's path and append the new label
        UPDATE "user"."service_provider_comment"
        SET path = (
            (SELECT path FROM "user"."service_provider_comment" WHERE id = NEW.parent_id)
            || (('c' || NEW.id::text)::ltree)
        )
        WHERE id = NEW.id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

```sql
CREATE TRIGGER trg_update_service_provider_comments_path
AFTER INSERT ON "user"."service_provider_comment"
FOR EACH ROW
EXECUTE PROCEDURE update_service_provider_comments_path();
```

```sql
CREATE INDEX idx_service_provider_comments_path ON "user"."service_provider_comment" USING GIST (path);
```

## Server comments (postgres) (post)

```sql
CREATE EXTENSION IF NOT EXISTS ltree;
```

```sql
CREATE TABLE
  "user".post_comment (
    id serial NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NULL,
    post integer NOT NULL,
    content text NOT NULL,
    parent_id integer NULL,
    path ltree NULL,
    "user" integer NOT NULL
  );

ALTER TABLE
  "user".post_comment
ADD
  CONSTRAINT post_comment_pkey PRIMARY KEY (id)
```

```sql
CREATE OR REPLACE FUNCTION update_post_comments_path()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.parent_id IS NULL THEN
        -- Top-level comment: simply set the path using a prefix
        UPDATE "user"."post_comment"
        SET path = ('c' || NEW.id::text)::ltree
        WHERE id = NEW.id;
    ELSE
        -- Nested comment: get the parent's path and append the new label
        UPDATE "user"."post_comment"
        SET path = (
            (SELECT path FROM "user"."post_comment" WHERE id = NEW.parent_id)
            || (('c' || NEW.id::text)::ltree)
        )
        WHERE id = NEW.id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

```sql
CREATE TRIGGER trg_update_post_comments_path
AFTER INSERT ON "user"."post_comment"
FOR EACH ROW
EXECUTE PROCEDURE update_post_comments_path();
```

```sql
CREATE INDEX idx_post_comments_path ON "user"."post_comment" USING GIST (path);
```

## Reviews (postgres) (company)

```sql
CREATE TABLE
  "user".company_review (
    id serial NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NULL,
    company integer NOT NULL,
    content text NOT NULL,
    title character varying(255) NOT NULL,
    rating smallint NOT NULL,
    date_of_experience timestamp without time zone NULL,
    is_flagged boolean NOT NULL DEFAULT false,
    flagged_reason text NULL,
    flagged_at timestamp without time zone NULL,
    flagged_by integer NULL,
    "user" integer NOT NULL
  );

ALTER TABLE
  "user".company_review
ADD
  CONSTRAINT company_review_pkey PRIMARY KEY (id)
```

```sql
CREATE UNIQUE INDEX "company_review_index_3" on "user"."company_review" ("company" ASC, "user" ASC)
```

```sql
CREATE TABLE cache.company_review_aggregate (
  company_id INTEGER PRIMARY KEY,
  num_reviews INTEGER NOT NULL DEFAULT 0,
  num_one_star_reviews INTEGER NOT NULL DEFAULT 0,
  num_two_star_reviews INTEGER NOT NULL DEFAULT 0,
  num_three_star_reviews INTEGER NOT NULL DEFAULT 0,
  num_four_star_reviews INTEGER NOT NULL DEFAULT 0,
  num_five_star_reviews INTEGER NOT NULL DEFAULT 0,
  average_rating FLOAT NOT NULL DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

```sql
CREATE OR REPLACE FUNCTION update_company_review_aggregate()
RETURNS TRIGGER AS $$
BEGIN
  -- Initialize entry if it doesn't exist
  INSERT INTO cache.company_review_aggregate (company_id, num_reviews, average_rating,
    num_one_star_reviews, num_two_star_reviews, num_three_star_reviews,
    num_four_star_reviews, num_five_star_reviews, last_updated)
  VALUES (NEW.company, 0, 0, 0, 0, 0, 0, 0, now())
  ON CONFLICT (company_id) DO NOTHING;

  -- Recalculate the aggregate
  UPDATE cache.company_review_aggregate SET
    num_reviews = agg.total_reviews,
    average_rating = agg.avg_rating,
    num_one_star_reviews = agg.one_star,
    num_two_star_reviews = agg.two_star,
    num_three_star_reviews = agg.three_star,
    num_four_star_reviews = agg.four_star,
    num_five_star_reviews = agg.five_star,
    last_updated = now()
  FROM (
    SELECT
      COUNT(*) as total_reviews,
      COALESCE(AVG(rating)::FLOAT, 0) as avg_rating,
      COUNT(*) FILTER (WHERE rating = 1) AS one_star,
      COUNT(*) FILTER (WHERE rating = 2) AS two_star,
      COUNT(*) FILTER (WHERE rating = 3) AS three_star,
      COUNT(*) FILTER (WHERE rating = 4) AS four_star,
      COUNT(*) FILTER (WHERE rating = 5) AS five_star
    FROM "user".company_review
    WHERE company = NEW.company AND is_flagged = false
  ) AS agg
  WHERE cache.company_review_aggregate.company_id = NEW.company;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

```sql
-- Run after INSERT/UPDATE/DELETE on reviews
CREATE TRIGGER trigger_update_company_review_aggregate
AFTER INSERT OR UPDATE OR DELETE ON "user".company_review
FOR EACH ROW EXECUTE FUNCTION update_company_review_aggregate();
```

## Reviews (postgres) (service_provider)

```sql
CREATE TABLE
  "user".service_provider_review (
    id serial NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NULL,
    service_provider integer NOT NULL,
    content text NOT NULL,
    title character varying(255) NOT NULL,
    rating smallint NOT NULL,
    date_of_experience timestamp without time zone NULL,
    is_flagged boolean NOT NULL DEFAULT false,
    flagged_reason text NULL,
    flagged_at timestamp without time zone NULL,
    flagged_by integer NULL,
    "user" integer NOT NULL
  );

ALTER TABLE
  "user".service_provider_review
ADD
  CONSTRAINT service_provider_review_pkey PRIMARY KEY (id)
```

```sql
CREATE UNIQUE INDEX "service_provider_review_index_3" on "user"."service_provider_review" ("service_provider" ASC, "user" ASC)
```

```sql
CREATE TABLE cache.service_provider_review_aggregate (
  service_provider_id INTEGER PRIMARY KEY,
  num_reviews INTEGER NOT NULL DEFAULT 0,
  num_one_star_reviews INTEGER NOT NULL DEFAULT 0,
  num_two_star_reviews INTEGER NOT NULL DEFAULT 0,
  num_three_star_reviews INTEGER NOT NULL DEFAULT 0,
  num_four_star_reviews INTEGER NOT NULL DEFAULT 0,
  num_five_star_reviews INTEGER NOT NULL DEFAULT 0,
  average_rating FLOAT NOT NULL DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

```sql
CREATE OR REPLACE FUNCTION update_service_provider_review_aggregate()
RETURNS TRIGGER AS $$
BEGIN
  -- Initialize entry if it doesn't exist
  INSERT INTO cache.service_provider_review_aggregate (service_provider_id, num_reviews, average_rating,
    num_one_star_reviews, num_two_star_reviews, num_three_star_reviews,
    num_four_star_reviews, num_five_star_reviews, last_updated)
  VALUES (NEW.service_provider, 0, 0, 0, 0, 0, 0, 0, now())
  ON CONFLICT (service_provider_id) DO NOTHING;

  -- Recalculate the aggregate
  UPDATE cache.service_provider_review_aggregate SET
    num_reviews = agg.total_reviews,
    average_rating = agg.avg_rating,
    num_one_star_reviews = agg.one_star,
    num_two_star_reviews = agg.two_star,
    num_three_star_reviews = agg.three_star,
    num_four_star_reviews = agg.four_star,
    num_five_star_reviews = agg.five_star,
    last_updated = now()
  FROM (
    SELECT
      COUNT(*) as total_reviews,
      COALESCE(AVG(rating)::FLOAT, 0) as avg_rating,
      COUNT(*) FILTER (WHERE rating = 1) AS one_star,
      COUNT(*) FILTER (WHERE rating = 2) AS two_star,
      COUNT(*) FILTER (WHERE rating = 3) AS three_star,
      COUNT(*) FILTER (WHERE rating = 4) AS four_star,
      COUNT(*) FILTER (WHERE rating = 5) AS five_star
    FROM "user".service_provider_review
    WHERE service_provider = NEW.service_provider AND is_flagged = false
  ) AS agg
  WHERE cache.service_provider_review_aggregate.service_provider_id = NEW.service_provider;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

```sql
-- Run after INSERT/UPDATE/DELETE on reviews
CREATE TRIGGER trigger_update_service_provider_review_aggregate
AFTER INSERT OR UPDATE OR DELETE ON "user".service_provider_review
FOR EACH ROW EXECUTE FUNCTION update_service_provider_review_aggregate();
```

## Company Verification (postgres)

```sql
CREATE TABLE
  "user".company_verification (
    id serial NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    company integer NOT NULL,
    "user" integer NOT NULL
  );

ALTER TABLE
  "user".company_verification
ADD
  CONSTRAINT company_verification_pkey PRIMARY KEY (id)
```

```sql
CREATE UNIQUE INDEX "company_verification_index_2" on "user"."company_verification" ("company" ASC, "user" ASC)
```

```sql
CREATE UNIQUE INDEX "company_verification_index_3" on "user"."company_verification" ("company" ASC)
```

## Service Provider Verification (postgres)

```sql
CREATE TABLE
  "user".service_provider_verification (
    id serial NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    service_provider integer NOT NULL,
    "user" integer NOT NULL
  );

ALTER TABLE
  "user".service_provider_verification
ADD
  CONSTRAINT service_provider_verification_pkey PRIMARY KEY (id)
```

```sql
CREATE UNIQUE INDEX "service_provider_verification_index_2" on "user"."service_provider_verification" ("service_provider" ASC, "user" ASC)
```

```sql
CREATE UNIQUE INDEX "service_provider_verification_index_3" on "user"."service_provider_verification" ("service_provider" ASC)
```

## Company Edit (postgres)

```sql
CREATE TABLE
  "user".company_edit (
    id serial NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    company integer NOT NULL,
    "user" integer NOT NULL,
    proposed_changes character varying(255) NOT NULL,
    status character varying(255) NOT NULL,
    reviewed_at timestamp without time zone NULL,
    reviewed_by integer NULL,
    review_notes text NULL,
    updated_main_db boolean NOT NULL DEFAULT false
  );

ALTER TABLE
  "user".company_edit
ADD
  CONSTRAINT company_edit_pkey PRIMARY KEY (id)
```

# ESLint

## How to use

You can add "global/default" eslint settings to this packages `eslint.config.mjs` file. or you can add app/package specific settings to their respestive `eslint.config.mjs` files.

> Note: If running a command at top level (ie through turbo) make sure you run turbo with no cache to test it using the ``--force` clag on the command, like `pnpm lint --force`

## ESLint Rules (INLINE)

```ts
// eslint-disable-next-line no-unused-vars

// eslint-disable-next-line @typescript-eslint/no-unused-vars

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars

// @ts-expect-error: Auto-imported from another layer
```

```vue
<!-- eslint-disable-next-line vue/no-v-html -->

<!-- eslint-disable-next-line no-console -->
```

### Eslint Rules (FILE)

```ts
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, no-console */
```

