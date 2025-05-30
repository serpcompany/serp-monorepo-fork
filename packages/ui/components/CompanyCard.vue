<script setup lang="ts">
  import type { Company } from '@serp/types/types';
  import { computed, ref } from 'vue';

  const props = defineProps({
    company: {
      type: Object as PropType<Company>,
      required: true
    },
    showReadMore: {
      type: Boolean,
      default: false
    },
    showFeatures: {
      type: Boolean,
      default: false
    },
    showExpandedContent: {
      type: Boolean,
      default: false
    },
    baseSlug: {
      type: String,
      default: 'products/'
    }
  });

  const isExpanded = ref(false);

  // Compute the main image, either the company logo or the first screenshot
  const companyMainImage = computed(() => {
    if (props.company.logo) {
      return props.company.logo;
    } else if (props.company.screenshots && props.company.screenshots.length) {
      return props.company.screenshots[0];
    } else {
      return null;
    }
  });
</script>

<template>
  <div
    :class="[
      'mx-auto max-w-5xl rounded-lg',
      company.featured
        ? 'relative overflow-hidden border border-neutral-200 bg-gradient-to-b from-blue-50/50 to-transparent px-6 py-10 dark:border-blue-500/40 dark:from-blue-900/30 dark:to-neutral-900/60 dark:shadow-[0_0_15px_rgba(30,64,175,0.15)]'
        : 'border border-[var(--ui-border)] px-5 py-4 dark:border-[var(--ui-border-accented)]'
    ]"
  >
    <!-- Featured accent border -->
    <div
      v-if="company.featured"
      class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400"
      aria-hidden="true"
    ></div>

    <!-- card content -->
    <div class="flex items-start">
      <!-- company image -->
      <div
        v-if="companyMainImage"
        class="mr-5 flex-shrink-0"
        :class="{ 'mb-4 sm:mb-0': company.featured }"
      >
        <NuxtLink :to="`/${baseSlug}${company.slug}/reviews/`">
          <div
            :class="[
              'overflow-hidden rounded-lg bg-[var(--ui-bg-muted)] dark:bg-[var(--ui-bg-elevated)]',
              company.featured
                ? 'h-36 w-36 ring-1 ring-blue-100 dark:ring-blue-500/50'
                : 'h-28 w-28'
            ]"
          >
            <LazyNuxtImg
              :src="companyMainImage"
              :alt="company.name"
              class="h-full w-full object-contain"
            />
          </div>
        </NuxtLink>
      </div>

      <!-- company content -->
      <div class="flex-grow">
        <div class="flex flex-col justify-between sm:flex-row">
          <div class="sm:max-w-[calc(100%-180px)] sm:pr-8">
            <!-- company name and badge -->
            <div class="flex items-center">
              <NuxtLink
                class="flex"
                :to="`/${baseSlug}${company.slug}/reviews/`"
              >
                <h2
                  :class="[
                    'font-semibold',
                    company.featured
                      ? 'mb-1 text-2xl text-blue-700 dark:text-blue-300'
                      : 'text-xl text-[var(--ui-text)] dark:text-[var(--ui-text)]'
                  ]"
                >
                  {{ company.name }}
                </h2>
              </NuxtLink>
              <UBadge
                v-if="company.featured"
                :avatar="{
                  src: 'https://github.com/serpcompany.png'
                }"
                size="md"
                color="info"
                variant="filled"
                class="ml-4"
              >
                Featured
              </UBadge>
            </div>

            <!-- company oneliner -->
            <p
              :class="[
                'text-[var(--ui-text-muted)] dark:text-[var(--ui-text-toned)]',
                company.featured
                  ? 'mt-3 text-base leading-relaxed dark:text-[var(--ui-text)]'
                  : 'mt-2 line-clamp-2'
              ]"
            >
              {{ company.oneLiner }}
            </p>

            <!-- show excerpt only for featured cards -->
            <p
              v-if="company.featured && company.excerpt"
              class="mt-5 mb-1 line-clamp-3 text-[var(--ui-text-muted)] dark:text-[var(--ui-text-toned)]"
            >
              {{ company.excerpt }}
            </p>

            <!-- rating display -->
            <div
              v-if="company.rating"
              :class="{ 'mt-3': !company.featured, 'mt-6': company.featured }"
            >
              <span class="text-lg font-medium">{{ company.rating }}/5</span>
            </div>
          </div>

          <!-- right side buttons -->
          <div
            :class="[
              'flex min-w-[140px] flex-col space-y-2',
              company.featured ? 'mt-5 sm:mt-0 sm:ml-4' : 'mt-4 sm:mt-0'
            ]"
          >
            <!-- view website button -->
            <NuxtLink
              :href="company.serplyLink"
              target="_blank"
              class="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-[var(--ui-bg-inverted)] px-4 py-2 text-sm font-medium text-[var(--ui-bg)] transition-colors hover:bg-neutral-800 dark:bg-[var(--ui-bg)] dark:text-[var(--ui-bg-inverted)] dark:hover:bg-[var(--ui-bg-elevated)]"
            >
              Website
              <svg
                class="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </NuxtLink>

            <!-- upvote button -->
            <UpvoteButton
              :id="company.id"
              module="company"
              :upvotes="company.upvotes || []"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- feature tags only for featured companies -->
    <div
      v-if="company.featured && company.features && company.features.length"
      class="mt-8"
    >
      <div class="flex flex-wrap gap-2">
        <span
          v-for="feature in company.features.slice(0, 4)"
          :key="feature.id"
          class="inline-flex rounded-full bg-[var(--ui-color-secondary-50)] px-3 py-1 text-xs font-medium text-[var(--ui-color-secondary-700)] dark:bg-[var(--ui-color-secondary-900)]/30 dark:text-[var(--ui-color-secondary-200)]"
        >
          {{ feature.item }}
        </span>
      </div>
    </div>

    <!-- expanded content (if needed) -->
    <div v-if="isExpanded && showExpandedContent" class="mt-8 border-t pt-4">
      <p>{{ company.excerpt }}</p>

      <!-- features-->
      <section v-if="showFeatures" class="mt-4">
        <h3 class="pb-2 text-lg font-medium">Features</h3>
        <ul class="list-disc pl-5">
          <li v-for="feature in company.features" :key="feature.id">
            {{ feature.item }}: {{ feature.description }}
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<style scoped>
  .upvote-btn :deep(button) {
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
    width: 100%;
  }
  .upvote-btn :deep(.flex) {
    width: 100%;
  }

  /* Override orange upvote color with blue */
  .upvote-btn :deep(.text-orange-500) {
    color: var(--ui-color-secondary-500, #0969da) !important;
  }
  .upvote-btn :deep(.dark\:text-orange-400) {
    color: var(--ui-color-secondary-400, #2f81f7) !important;
  }
</style>
