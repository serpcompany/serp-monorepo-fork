<script setup lang="ts">
  import type { Company, Comment } from '@serp/types/types';

  const route = useRoute();
  const router = useRouter();
  const { slug } = route.params;

  // @ts-expect-error: Auto-imported from another layer
  const data = (await useCompany(`${slug}`)) as Company;
  if (!data) {
    router.push('/404');
  }

  const config = useRuntimeConfig();
  const useAuth = config.public.useAuth;

  // When not using caching at the API level, grab the upvotes and comments directly from the data object
  // const upvotes = data.upvotes || [];
  // const comments = data.comments || [];

  // Possibly move to onMounted, but may negatively impact SEO (components currently have onMounted, investigate impact on SEO)

  // @ts-expect-error: Auto-imported from another layer
  const { upvotes, comments } = (await useCompanyUpvotesAndComments(
    data?.id
  )) as { upvotes: string[]; comments: Comment[] };

  const faqItems = computed(() => {
    if (!data?.faqs) return [];

    return data?.faqs.map((faq: { question: string; answer: string }) => ({
      label: faq.question,
      content: faq.answer
    }));
  });

  const sections = computed(() => {
    const sectionTitles: string[] = [];

    sectionTitles.push('Overview');

    if (data?.categories && data?.categories.length) {
      sectionTitles.push('Categories');
    }

    if (data?.features) {
      sectionTitles.push('Features');
    }

    if (data?.content) {
      sectionTitles.push('Article');
    }

    if (data?.screenshots && data?.screenshots.length) {
      sectionTitles.push('Media');
    }

    if (faqItems.value && faqItems.value.length) {
      sectionTitles.push('FAQ');
    }

    if (data?.alternatives) {
      sectionTitles.push('Alternatives');
    }

    // Add Comments section to navigation
    sectionTitles.push('Discussion');

    return sectionTitles;
  });

  useSeoMeta({
    title: computed(() =>
      data?.name
        ? `${data.name} - Reviews, Pricing, Features`
        : 'Company Information'
    )
  });
</script>

<template>
  <UPage v-if="data">
    <MultipageHeader
      :name="data.name"
      :one-liner="data.oneLiner"
      :sections="sections"
      class="bg-background sticky top-0 z-50 transition-all duration-300"
      :image="data.logo"
      :serply-link="data.serplyLink"
    >
      <template #upvote>
        <UpvoteButton
          v-if="useAuth"
          :id="data.id"
          module="company"
          :upvotes="upvotes"
        />
      </template>
    </MultipageHeader>

    <!-- Main content - single column layout -->
    <section class="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
      <!-- Overview Section -->
      <UCard
        v-if="data.excerpt"
        id="overview"
        class="mb-8 scroll-mt-20 rounded-md border border-gray-200 dark:border-gray-800"
        :ui="{ body: { padding: 'p-4 sm:p-6' } }"
      >
        <template #header>
          <div class="flex items-center px-4 pt-4 pb-2 sm:px-6 sm:pt-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Overview
            </h2>
            <UIcon name="i-heroicons-link" class="ml-2 h-4 w-4 text-gray-400" />
          </div>
        </template>
        <UDivider class="my-0" />
        <div class="p-4 sm:p-6">
          <CompanyOverview :company="data" />
        </div>
      </UCard>

      <!-- Categories Section -->
      <UCard
        id="categories"
        v-if="data.categories && data.categories.length"
        class="mb-8 scroll-mt-20 rounded-md border border-gray-200 dark:border-gray-800"
        :ui="{ body: { padding: 'p-4 sm:p-6' } }"
      >
        <template #header>
          <div class="flex items-center px-4 pt-4 pb-2 sm:px-6 sm:pt-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Categories
            </h2>
            <UIcon name="i-heroicons-link" class="ml-2 h-4 w-4 text-gray-400" />
          </div>
        </template>
        <UDivider class="my-0" />
        <SPill base-slug="products/best" :items="data.categories" />
      </UCard>

      <!-- Media Carousel Section -->
      <UCard
        v-if="data.screenshots && data.screenshots.length"
        id="media"
        class="mb-8 scroll-mt-20 rounded-md border border-gray-200 dark:border-gray-800"
        :ui="{ body: { padding: 'p-0' } }"
      >
        <template #header>
          <div class="flex items-center px-4 pt-4 pb-2 sm:px-6 sm:pt-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Media
            </h2>
            <UIcon name="i-heroicons-link" class="ml-2 h-4 w-4 text-gray-400" />
          </div>
        </template>
        <UDivider class="my-0" />
        <div class="p-0">
          <MediaGallery :company="data" />
        </div>
      </UCard>

      <!-- Article Section -->
      <UCard
        id="article"
        v-if="data.content"
        class="mb-8 scroll-mt-20 rounded-md border border-gray-200 dark:border-gray-800"
        :ui="{ body: { padding: 'p-4 sm:p-6' } }"
      >
        <template #header>
          <div class="flex items-center px-4 pt-4 pb-2 sm:px-6 sm:pt-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Article
            </h2>
            <UIcon name="i-heroicons-link" class="ml-2 h-4 w-4 text-gray-400" />
          </div>
        </template>
        <UDivider class="my-0" />
        <!-- eslint-disable-next-line vue/no-v-html-->
        <div
          class="prose dark:prose-invert max-w-none"
          v-html="data.content"
        ></div>
      </UCard>

      <!-- FAQs Section -->
      <UCard
        v-if="faqItems && faqItems.length"
        id="faqs"
        class="mb-8 scroll-mt-60 rounded-md border border-gray-200 dark:border-gray-800"
        :ui="{ body: { padding: 'p-0' } }"
      >
        <template #header>
          <div class="flex items-center px-4 pt-4 pb-2 sm:px-6 sm:pt-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
              FAQ
            </h2>
            <UIcon name="i-heroicons-link" class="ml-2 h-4 w-4 text-gray-400" />
          </div>
        </template>
        <UDivider class="my-0" />
        <div class="p-4 sm:p-6">
          <UAccordion
            type="multiple"
            :items="faqItems"
            :ui="{
              wrapper: 'divide-y divide-gray-200 dark:divide-gray-800',
              item: {
                base: 'py-4',
                container: '',
                header: {
                  base: 'flex justify-between w-full text-left',
                  inner: 'font-medium text-gray-900 dark:text-gray-100',
                  icon: 'text-gray-400 dark:text-gray-500'
                },
                content: {
                  base: 'text-gray-700 dark:text-gray-300 pt-2'
                }
              }
            }"
          />
        </div>
      </UCard>

      <!-- Features Section -->
      <UCard
        v-if="data.features"
        id="features"
        class="mb-8 scroll-mt-60 rounded-md border border-gray-200 dark:border-gray-800"
        :ui="{ body: { padding: 'p-0' } }"
      >
        <template #header>
          <div class="flex items-center px-4 pt-4 pb-2 sm:px-6 sm:pt-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {{ data.name }} Features
            </h2>
            <UIcon name="i-heroicons-link" class="ml-2 h-4 w-4 text-gray-400" />
          </div>
        </template>
        <UDivider class="my-0" />
        <div class="p-4 sm:p-6">
          <h3
            class="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100"
          >
            What are the feature of {{ data.name }}?
          </h3>
          <div class="space-y-6">
            <div
              v-for="(feature, index) in data.features"
              :key="feature.item"
              class="pb-4"
            >
              <h4
                class="mb-2 text-base font-semibold text-gray-900 dark:text-gray-100"
              >
                Feature Heading #{{ index + 1 }}
              </h4>
              <div class="flex items-baseline space-x-2">
                <UIcon
                  name="i-heroicons-check-circle"
                  class="h-5 w-5 flex-shrink-0 text-green-500"
                />
                <p class="text-gray-700 dark:text-gray-300">
                  {{ feature.item }}
                </p>
              </div>
              <p class="mt-1 ml-7 text-gray-600 dark:text-gray-400">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Alternatives -->
      <UCard
        v-if="data.alternatives"
        id="alternatives"
        class="mb-8 scroll-mt-60 rounded-md border border-gray-200 dark:border-gray-800"
        :ui="{ body: { padding: 'p-0' } }"
      >
        <template #header>
          <div class="flex items-center px-4 pt-4 pb-2 sm:px-6 sm:pt-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {{ data.name }} Alternatives
            </h2>
            <UIcon name="i-heroicons-link" class="ml-2 h-4 w-4 text-gray-400" />
          </div>
        </template>
        <UDivider class="my-0" />
        <div class="grid grid-cols-1 gap-4 p-4 sm:p-6 md:grid-cols-3">
          <UCard
            v-for="alternative in data.alternatives"
            :key="alternative"
            class="border border-gray-200 dark:border-gray-800"
          >
            <div class="mb-4 flex justify-center">
              <div
                class="flex h-16 w-16 items-center justify-center bg-gray-100 dark:bg-gray-800"
              >
                <UIcon name="i-heroicons-cube" class="h-8 w-8 text-gray-400" />
              </div>
            </div>
            <h3 class="mb-2 text-center font-medium">
              Alternatives Company Title
            </h3>
            <p
              class="mb-4 text-center text-sm text-gray-600 dark:text-gray-400"
            >
              AI-based editing tool for effortless photo cleanup, creations, and
              advanced photo refinement.
            </p>
            <p class="text-center text-sm text-gray-500">Starting from</p>
            <p class="text-center text-lg font-bold">
              $29.00
              <span class="text-sm font-normal text-gray-500">per month</span>
            </p>
            <div class="mt-4 space-y-2">
              <div class="flex items-start space-x-2">
                <UIcon
                  name="i-heroicons-check-circle"
                  class="h-5 w-5 flex-shrink-0 text-green-500"
                />
                <span class="text-sm">Get two months free trial</span>
              </div>
              <div class="flex items-start space-x-2">
                <UIcon
                  name="i-heroicons-check-circle"
                  class="h-5 w-5 flex-shrink-0 text-green-500"
                />
                <span class="text-sm">No free plan</span>
              </div>
            </div>
          </UCard>
        </div>
      </UCard>

      <!-- Discussion Section -->
      <UCard
        id="discussion"
        class="mb-8 scroll-mt-20 rounded-md border border-gray-200 dark:border-gray-800"
        :ui="{ body: { padding: 'p-0' } }"
      >
        <template #header>
          <div class="flex items-center px-4 pt-4 pb-2 sm:px-6 sm:pt-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Discussion
            </h2>
          </div>
        </template>
        <UDivider class="my-0" />
        <div class="p-4 sm:p-6">
          <CommentsContainer
            v-if="useAuth"
            :id="data.id"
            module="company"
            :comments="comments"
            class="comments-github-style"
          />
        </div>
      </UCard>
    </section>
  </UPage>
</template>

<style>
  .comments-github-style {
    margin-top: 0;
  }

  .comments-github-style .innerWrapper {
    padding: 16px;
  }

  .comments-github-style .comment-wrapper {
    border-top: 1px solid var(--color-border, #d0d7de);
    padding-top: 16px;
    margin-top: 16px;
  }

  .comments-github-style .comment-wrapper:first-child {
    border-top: none;
    padding-top: 0;
    margin-top: 0;
  }

  .comments-github-style .wrapper {
    display: flex;
    gap: 16px;
  }

  .comments-github-style .addComment {
    display: flex;
    gap: 16px;
    margin-bottom: 16px;
  }

  .comments-github-style .commentBox {
    flex: 1;
    border: 1px solid var(--color-border, #d0d7de);
    border-radius: 6px;
    padding: 8px;
  }

  .comments-github-style .commentBox textarea {
    width: 100%;
    min-height: 100px;
    padding: 8px;
    border-radius: 3px;
  }

  .comments-github-style .commentBox button {
    margin-top: 8px;
    padding: 5px 16px;
    border-radius: 6px;
    color: white;
  }

  .comments-github-style .name-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;
  }

  .comments-github-style .time {
    color: #768390;
    font-size: 0.85em;
  }

  .comments-github-style .comment {
    background-color: #f6f8fa;
    border: 1px solid #d0d7de;
    border-radius: 6px;
    padding: 16px;
    margin-bottom: 8px;
  }

  .dark .comments-github-style .comment {
    background-color: #0d1117;
    border-color: #30363d;
  }
</style>
