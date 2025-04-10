# README

## URL Patterns

EXPLAINER:

for each site...

everytime you add a new module you would create a new page under:

- `pages/<module-name>/index.vue`
- `pages/<module-name>/best/[slug]/index.vue`
- `pages/<module-name>/category/[slug/index.vue`

that would simply hit that site's api endpoint to get the right data from the DB and the UI would render from the shared `packages/ui` package for the layout...and the SINGLE page for everything would just always go under /posts/ ---- exactly like we have setup for the `glossary` and `blog` on serp.co

ALL singles for everything could now go under /posts/[slug]/

- glossary == /posts/[slug]/
- software == /posts/[slug]/

### EXAMPLES:

```yaml
- companies: serp.co/posts/SERP/
  pages/posts/<single>/

  pages/software/index.vue
  pages/software/best/index.vue

- service-providers: serp.co/posts/SERP/reviews
  pages/posts/<single>/reviews
  pages/providers/best/

- local businesses: serp.co/posts/dr-johns-dentistry-la-canada/
- ski resorts: serp.co/posts/big-sky-montana/
- games: serp.co/posts/counterstrike/
- movies: serp.co/posts/avengers-endgame/
- books: serp.co/posts/the-hobbit/
- shop: serp.co/posts/sony-playstation-4/
```

## Config

Define your SFooter.vue links using this object

```ts
// nuxt.config.ts
footerColumns: [
        {
          title: 'Links',
          id: 1,
          slug: '',
          items: [
            { text: 'Companies', slug: '/reviews/' },
            { text: 'Tools', slug: '/tools/' },
            { text: 'Blog', slug: '/blog/' },
            { text: 'Glossary', slug: '/glossary/' },
            { text: 'Archive', slug: '/archive/' }
          ]
        },
        {
          title: '',
          id: 2,
          slug: '',
          items: [{ text: '', slug: '#' }]
        },
        {
          title: '',
          id: 3,
          slug: '#',
          items: [{ text: '', slug: '#' }]
        },
        {
          title: '',
          id: 4,
          slug: '#',
          items: [
            { text: '', slug: '#' },
            { text: '', slug: '#' }
          ]
        },
        {
          title: '',
          id: 5,
          slug: '#',
          items: [{ text: '', slug: '#' }]
        }
      ],
      legalLinks: [
        { text: 'Privacy', slug: '/legal/privacy-policy/' },
        { text: 'Terms', slug: '/legal/terms-conditions/' },
        { text: 'Affiliate Disclosure', slug: '/legal/affiliate-disclosure/' },
        { text: 'DMCA', slug: '/legal/dmca/' }
      ],
      copyrightText: '© SERP',
      address: '123 Rank St. Page One City, 90210 USA'
    }
```

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
      AVG(rating)::FLOAT as avg_rating,
      COUNT(*) FILTER (WHERE rating = 1) AS one_star,
      COUNT(*) FILTER (WHERE rating = 2) AS two_star,
      COUNT(*) FILTER (WHERE rating = 3) AS three_star,
      COUNT(*) FILTER (WHERE rating = 4) AS four_star,
      COUNT(*) FILTER (WHERE rating = 5) AS five_star
    FROM "user".company_review
    WHERE company = NEW.company
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

# Cloudflare