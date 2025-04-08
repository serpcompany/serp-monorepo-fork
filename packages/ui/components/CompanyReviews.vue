<script setup lang="ts">
  import { ref, computed } from 'vue';
  import type { CompanyReviews } from '@/serp/types/types';

  const props = defineProps<{
    reviews: CompanyReviews;
  }>();
  let userReview = {};
  if (props.reviews?.userReview?.company_review) {
    userReview = props.reviews.userReview.company_review;
  } else if (props.reviews?.userReview) {
    userReview = props.reviews.userReview;
  }

  // Get user session info without redirecting if not logged in
  const { loggedIn, user } = useUserSession();
  const toast = useToast();

  // --- Review Form Logic ---
  const reviewForm = ref({
    title: '',
    content: '',
    rating: null as number | null,
    dateOfExperience: ''
  });

  // Prepopulate the form if the user already has a review
  if (props.reviews && userReview) {
    reviewForm.value = {
      title: userReview?.title,
      content: userReview?.content,
      rating: userReview?.rating,
      dateOfExperience: userReview?.dateOfExperience
    };
  }

  const isReviewComplete = computed(
    () =>
      reviewForm.value.title?.trim() !== '' &&
      reviewForm.value.content?.trim() !== '' &&
      reviewForm.value.rating !== null &&
      reviewForm.value.dateOfExperience?.trim() !== ''
  );

  const loadingReview = ref(false);

  async function saveReview() {
    if (!loggedIn.value) {
      toast.add({
        id: 'not-logged-in',
        title: 'Not logged in',
        description: 'Please log in to submit your review.',
        icon: 'exclamation-circle'
      });
      return;
    }

    try {
      loadingReview.value = true;
      if (!isReviewComplete.value) {
        throw new Error('Please fill in all required fields for your review.');
      }
      if (!user?.value?.email) {
        throw new Error('Please log in to submit a review.');
      }
      const payload = {
        ...reviewForm.value
      };

      const { data: response, error } = await useFetch(
        `/api/company/reviews/${props.reviews.companyId}`,
        {
          method: userReview ? 'PUT' : 'POST',
          headers: useRequestHeaders(['cookie']),
          body: JSON.stringify(payload)
        }
      );

      if (error.value) {
        throw new Error(error.value.message || 'Failed to submit review.');
      }
      if (response.value.message && response.value.message === 'success') {
        toast.add({
          id: 'review-saved',
          title: userReview ? 'Review Updated' : 'Review Submitted',
          description: 'Your review has been successfully saved.',
          icon: 'check-circle'
        });
      } else {
        throw new Error(`Failed to save review - ${response.value.message}`);
      }
    } catch (err: unknown) {
      toast.add({
        id: 'review-error',
        title: 'Error saving review',
        description: err.message,
        icon: 'exclamation-circle'
      });
    } finally {
      loadingReview.value = false;
    }
  }
</script>

<template>
  <UPage>
    <SHero
      headline="Company Reviews"
      subheadline="See what others are saying"
      :show-search-bar="false"
      :show-buttons="false"
    />
    <UMain>
      <div class="space-y-4">
        <!-- Reviews Grid -->
        {{ reviews }}
        <div
          v-if="reviews && reviews?.reviews && reviews?.reviews?.length > 0"
          class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          <div v-if="reviews?.userReview">
            <div class="flex items-center space-x-4">
              <LazyNuxtImg
                v-if="reviews?.userReview?.user?.image"
                :src="reviews?.userReview?.user?.image"
                alt="User Image"
                class="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <h2 class="text-lg font-semibold">
                  {{ reviews?.userReview?.title }}
                </h2>
                <p class="text-sm text-neutral-500">
                  by {{ reviews?.userReview?.user?.name }}
                </p>
              </div>
            </div>
            <div class="mt-2">
              <p class="text-neutral-600">{{ reviews?.userReview?.content }}</p>
              <p class="mt-2 text-sm text-neutral-500">
                Rating: {{ reviews?.userReview?.rating }} / 5
              </p>
              <p class="text-sm text-neutral-500">
                Experience on: {{ reviews?.userReview?.dateOfExperience }}
              </p>
              <p class="text-xs text-neutral-400">
                Reviewed on: {{ reviews?.userReview?.createdAt }}
              </p>
            </div>
          </div>
          <div
            v-for="review in reviews.reviews"
            :key="review.id"
            class="rounded-lg bg-white p-4 shadow-md dark:bg-neutral-800"
          >
            <div class="flex items-center space-x-4">
              <LazyNuxtImg
                v-if="review.user.image"
                :src="review.user.image"
                alt="User Image"
                class="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <h2 class="text-lg font-semibold">{{ review.title }}</h2>
                <p class="text-sm text-neutral-500">
                  by {{ review.user.name }}
                </p>
              </div>
            </div>
            <div class="mt-2">
              <p class="text-neutral-600">{{ review.content }}</p>
              <p class="mt-2 text-sm text-neutral-500">
                Rating: {{ review.rating }} / 5
              </p>
              <p class="text-sm text-neutral-500">
                Experience on: {{ review.dateOfExperience }}
              </p>
              <p class="text-xs text-neutral-400">
                Reviewed on: {{ review.createdAt }}
              </p>
            </div>
          </div>
        </div>

        <!-- No reviews available -->
        <div v-else class="p-4 text-center text-neutral-500">
          No reviews available for this company.
        </div>

        <!-- Pagination Info -->
        <div
          v-if="reviews && reviews.pagination"
          class="mt-4 flex justify-center"
        >
          <span class="text-sm text-neutral-500">
            Page {{ reviews.pagination.currentPage }} of
            {{
              Math.ceil(
                reviews.pagination.totalItems / reviews.pagination.pageSize
              )
            }}
          </span>
        </div>

        <!-- Review Form -->
        <div class="mt-8">
          <UCard class="mx-auto max-w-2xl p-8">
            <UHeading level="2" class="mb-6 text-center text-2xl font-semibold">
              {{ userReview ? 'Edit Your Review' : 'Submit a New Review' }}
            </UHeading>
            <!-- If the user is logged in show the form, otherwise ask them to log in -->
            <div v-if="loggedIn">
              <form class="space-y-6" @submit.prevent="saveReview">
                <UFormField label="Review Title" required>
                  <UInput
                    v-model="reviewForm.title"
                    placeholder="Enter your review title"
                    class="w-full"
                  />
                </UFormField>
                <UFormField label="Review Content" required>
                  <UTextarea
                    v-model="reviewForm.content"
                    rows="4"
                    placeholder="Write your review here..."
                    class="w-full"
                  />
                </UFormField>
                <UFormField label="Rating (1-5)" required>
                  <UInput
                    v-model="reviewForm.rating"
                    type="number"
                    min="1"
                    max="5"
                    placeholder="Rating from 1 to 5"
                    class="w-full"
                  />
                </UFormField>
                <UFormField label="Date of Experience" required>
                  <UInput
                    v-model="reviewForm.dateOfExperience"
                    type="date"
                    class="w-full"
                  />
                </UFormField>
                <div class="text-center">
                  <UButton
                    type="submit"
                    color="secondary"
                    size="xl"
                    :loading="loadingReview"
                    :disabled="!isReviewComplete"
                  >
                    {{ userReview ? 'Update Review' : 'Submit Review' }}
                  </UButton>
                </div>
              </form>
            </div>
            <div v-else class="text-center text-neutral-500">
              Please log in to submit or edit your review.
            </div>
          </UCard>
        </div>
      </div>
    </UMain>
  </UPage>
</template>

<style scoped>
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
  }
</style>
