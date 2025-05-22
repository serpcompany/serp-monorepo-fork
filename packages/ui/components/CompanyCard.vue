<script setup lang="ts">
  import type { Company } from '@serp/types/types';

  interface Props {
    company: Company;
    showReadMore?: boolean;
    showFeatures?: boolean;
    showExpandedContent?: boolean;
    baseSlug?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    baseSlug: 'products/'
  });

  const featured = computed(() => props.company.featured);
  const companyHyperlink = computed(
    () => `/${props.baseSlug}${props.company.slug}/reviews/`
  );

  const mainImage = computed(() => {
    if (props.company.logo) {
      return props.company.logo;
    } else if (props.company.screenshots && props.company.screenshots.length) {
      return props.company.screenshots[0];
    }

    return null;
  });
</script>

<template>
  <UCard
    :ui="{
      root: 'hover:ring-(--ui-border-accented) transition-all',
      body: 'p-5 sm:p-5'
    }"
    :variant="featured ? 'subtle' : 'outline'"
  >
    <div class="grid grid-cols-[auto_1fr] gap-5 sm:flex sm:flex-row">
      <!-- Company Image -->
      <template v-if="mainImage">
        <div class="bg-muted size-30 border border-(--ui-border)">
          <NuxtLink
            :to="companyHyperlink"
            class="transition-opacity hover:opacity-80"
          >
            <LazyNuxtImg
              :src="mainImage"
              :alt="company.name"
              class="size-full object-cover"
            />
          </NuxtLink>
        </div>
      </template>

      <!-- Company Details -->
      <div
        class="order-3 col-span-2 flex flex-1 flex-grow flex-col items-start justify-between gap-y-4 sm:order-2"
      >
        <div
          :class="[featured ? 'gap-y-3' : 'gap-y-1']"
          class="flex flex-col items-start justify-start"
        >
          <!-- Company Name and Featured Badge -->
          <div class="inline-flex items-center gap-x-3">
            <h2 class="text-dark text-xl font-semibold">
              <NuxtLink
                :to="companyHyperlink"
                class="transition-all hover:underline"
              >
                {{ company.name }}
              </NuxtLink>
            </h2>
            <UBadge
              v-if="featured"
              variant="soft"
              color="secondary"
              size="sm"
              icon="lucide:chevrons-up"
              label="Featured"
            />
          </div>

          <!-- Company One Liner -->
          <p class="text-muted text-sm">{{ company.oneLiner }}</p>

          <!-- Show Excerpt Only When Featured -->
          <p
            v-if="featured && company.excerpt"
            class="text-muted line-clamp-3 text-sm"
          >
            {{ company.excerpt }}
          </p>
        </div>

        <!-- Show Company Categories Only When Featured -->
        <template
          v-if="featured && company.categories && company.categories.length"
        >
          <div class="flex flex-row flex-wrap gap-1">
            <template
              v-for="category in company.categories"
              :key="category.slug"
            >
              <UBadge
                size="sm"
                color="neutral"
                variant="soft"
                :label="category.name"
              />
            </template>
          </div>
        </template>
      </div>

      <!-- Right Side Buttons -->
      <div
        class="order-2 flex flex-row items-start justify-end gap-3 sm:order-3 sm:flex-col sm:items-end sm:justify-between"
      >
        <VoteButton
          :id="company.id"
          :users-current-vote="company.usersCurrentVote"
          :upvotes="company.numUpvotes"
          :downvotes="company.numDownvotes"
          module="company"
        />
        <UButton
          :to="company.serplyLink"
          color="neutral"
          label="Website"
          trailing-icon="lucide:external-link"
          target="_blank"
          external
        />
      </div>
    </div>
  </UCard>
</template>
