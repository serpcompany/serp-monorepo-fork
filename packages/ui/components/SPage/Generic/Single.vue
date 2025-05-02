<script setup lang="ts">
  import type { ServiceProvider, Comment } from '@serp/types/types';

  const { user } = useUserSession();
  const route = useRoute();
  const router = useRouter();
  const { slug } = route.params;

  // @ts-expect-error: Auto-imported from another layer
  const data = (await useServiceProvider(`${slug}`)) as ServiceProvider;
  if (!data) {
    router.push('/404');
  }

  const isVerified = computed(() => {
    return data?.verifiedEmail === user.value?.email;
  });

  const config = useRuntimeConfig();
  const useAuth = config.public.useAuth;

  // Create a consolidated object with all provider details
  const providerDetails = computed(() => {
    return {
      basic: data?.basicInfo || {},
      contracts: data?.contracts || {},
      pricing: data?.pricing || {},
      services: data?.services || {},
      industries: data?.industries || {},
      businessesServed: data?.businessesServed || {},
      supportSetup: data?.supportSetup || {},
      ratings: data?.ratings || {}
    };
  });

  // @ts-expect-error: Auto-imported from another layer
  const { comments } = (await useServiceProviderUpvotesAndComments(
    data?.id
  )) as { upvotes: string[]; comments: Comment[] };

  // @ts-expect-error: Auto-imported from another layer
  const reviews = await useServiceProviderReviews(data?.id);
  reviews.serviceProviderId = data?.id;

  // State for review modal
  const showReviewModal = ref(false);

  // Handle review submission - refresh reviews data
  async function handleReviewSubmitted() {
    // @ts-expect-error: Auto-imported from another layer
    const updatedReviews = await useServiceProviderReviews(data?.id);
    Object.assign(reviews, updatedReviews);
    reviews.serviceProviderId = data?.id;
  }

  const faqItems = computed(() => {
    if (!data?.faqs) return [];

    return data?.faqs.map((faq: { question: string; answer: string }) => ({
      label: faq.question,
      content: faq.answer
    }));
  });

  useSeoMeta({
    title: computed(() =>
      data?.name
        ? `${data.name} - Reviews, Pricing, Features, Alternatives & Deals`
        : 'Service Providers'
    )
  });
</script>

<template>
  <UPage v-if="data">
    <MultipageHeader
      :name="data.name"
      class="bg-background sticky top-0 z-50 transition-all duration-300"
      :image="data.logoUrl"
      :serply-link="data.serplyLink"
    >
      <template #upvote>
        <ServiceProviderEditButton v-if="useAuth" :id="data.id" />
        <ServiceProviderVerificationButton
          v-if="useAuth"
          :id="data.id"
          :domain="data.slug"
          :is-verified-prop="data.verified"
        />
        <!-- <UpvoteButton
          v-if="useAuth"
          :id="data.id"
          module="serviceProvider"
          :upvotes="upvotes"
        /> -->
      </template>
    </MultipageHeader>

    <!-- Main content - single column layout -->
    <section class="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
      <JSONRenderer v-if="data" :value="data" />
      <!-- <secton>
        <UCard
          id="reviews"
          class="mb-8 scroll-mt-60 rounded-md border border-gray-200 dark:border-gray-800"
          :ui="{ body: { padding: 'p-0' } }"
        >
          <template #header>
            <div class="flex items-center px-4 pt-4 pb-2 sm:px-6 sm:pt-6">
              <h2
                class="text-xl font-semibold text-gray-900 dark:text-gray-100"
              >
                {{ data.name }} Reviews
              </h2>
              <UIcon
                name="i-heroicons-link"
                class="ml-2 h-4 w-4 text-gray-400"
              />
            </div>
          </template>
          <UDivider class="my-0" />
          <div class="py-4 sm:p-6">
            <ReviewDistributionCard
              :total-reviews="data.numReviews ? data.numReviews : 0"
              :total-one-star-reviews="
                data.numOneStarReviews ? data.numOneStarReviews : 0
              "
              :total-two-star-reviews="
                data.numTwoStarReviews ? data.numTwoStarReviews : 0
              "
              :total-three-star-reviews="
                data.numThreeStarReviews ? data.numThreeStarReviews : 0
              "
              :total-four-star-reviews="
                data.numFourStarReviews ? data.numFourStarReviews : 0
              "
              :total-five-star-reviews="
                data.numFiveStarReviews ? data.numFiveStarReviews : 0
              "
              :average-rating="data.averageRating ? data.averageRating : 0"
              :show-border="false"
              card-title=""
              class="pb-12"
              :show-review-button="useAuth"
              @open-review-form="showReviewModal = true"
            />

            <CompanyReviews
              :is-verified="isVerified"
              :reviews="reviews"
              class="mt-8"
            />
          </div>
        </UCard>

        <CompanyReviewModal
          v-model:open="showReviewModal"
          :service-provider-id="data.id"
          :result="reviews"
          @close="showReviewModal = false"
          @review-submitted="handleReviewSubmitted"
        />
      </secton> -->

      <!-- <section>
        <UCard
          id="discussion"
          class="mb-8 scroll-mt-30 rounded-md border border-gray-200 dark:border-gray-800"
          :ui="{ body: { padding: 'p-0' } }"
        >
          <template #header>
            <div class="flex items-center px-4 pt-4 pb-2 sm:px-6 sm:pt-6">
              <h2
                class="text-xl font-semibold text-gray-900 dark:text-gray-100"
              >
                Discussion
              </h2>
            </div>
          </template>
          <UDivider class="my-0" />
          <div class="p-4 sm:p-6">
            <CommentsContainer
              v-if="useAuth"
              :id="data.id"
              module="serviceProvider"
              :comments="comments"
              class="comments-github-style"
            />
          </div>
        </UCard>
      </section> -->
    </section>
  </UPage>
</template>
