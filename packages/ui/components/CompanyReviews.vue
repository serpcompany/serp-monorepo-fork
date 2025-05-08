<script setup lang="ts">
  import type { CompanyReviews } from '@/serp/types/types';

  defineProps<{
    reviews: CompanyReviews;
    isVerified: boolean;
  }>();
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
            :is-verified="isVerified"
          />

          <CompanyReviewCard
            v-for="review in reviews.reviews"
            :key="review.id"
            :review="review"
            :is-verified="isVerified"
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
