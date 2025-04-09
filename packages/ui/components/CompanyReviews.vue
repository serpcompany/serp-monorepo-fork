<script setup lang="ts">
  import { computed } from 'vue';
  import type { CompanyReviews } from '@/serp/types/types';

  const props = defineProps<{
    reviews: CompanyReviews;
  }>();

  // Filter out the user's review from the reviews array to prevent duplication
  const filteredReviews = computed(() => {
    if (!props.reviews?.reviews || !props.reviews?.userReview?.id) {
      return props.reviews?.reviews || [];
    }

    // Filter out the user's review from the reviews array
    return props.reviews.reviews.filter(
      (review) => review.id !== props.reviews.userReview.id
    );
  });
</script>

<template>
  <UPage>
    <UHero :show-search-bar="false" :show-buttons="false" />
    <USection>
      <div class="space-y-4 py-8">
        <!-- Reviews List -->
        <div
          v-if="
            reviews?.userReview ||
            (reviews?.reviews && reviews?.reviews?.length > 0)
          "
          class="mx-auto max-w-xl space-y-4"
        >
          <CompanyReviewCard
            v-if="reviews?.userReview"
            :review="reviews.userReview"
          />

          <CompanyReviewCard
            v-for="review in filteredReviews"
            :key="review.id"
            :review="review"
          />
        </div>

        <!-- No reviews available -->
        <div v-else class="p-4 text-center text-neutral-500">
          No reviews available for this company.
        </div>
      </div>
    </USection>
  </UPage>
</template>
