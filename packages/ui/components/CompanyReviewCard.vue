<script setup lang="ts">
  const props = defineProps({
    review: {
      type: Object,
      required: true
    }
  });

  const formattedExperienceDate = computed(() => {
    if (
      !props.review.dateOfExperience &&
      !props.review.company_review?.dateOfExperience
    )
      return 'Unknown';

    return new Date(
      props.review.dateOfExperience ||
        props.review.company_review?.dateOfExperience
    ).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  });

  const formattedReviewDate = computed(() => {
    if (!props.review.createdAt && !props.review.company_review?.createdAt)
      return 'Unknown';

    return new Date(
      props.review.createdAt || props.review.company_review?.createdAt
    ).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  });
</script>

<template>
  <UCard class="h-full" variant="outline">
    <template #header>
      <div class="flex items-center space-x-4">
        <LazyNuxtImg
          v-if="review.user && review.user.image"
          :src="review.user.image"
          alt="User Image"
          class="h-12 w-12 rounded-full object-cover"
        />
        <UAvatar
          v-else
          :alt="review.user ? review.user.name : 'Anonymous'"
          size="lg"
        />
        <div>
          <h2 class="text-lg font-semibold">{{ review.title }}</h2>
          <p class="text-primary-800 text-md font-semibold">
            {{ review.user ? review.user.name : 'Anonymous' }}
          </p>
          <div class="mt-3 flex items-center">
            <div class="flex text-amber-500">
              <div v-for="i in 5" :key="i" class="relative h-5 w-5">
                <span
                  class="iconify i-heroicons:star-solid absolute inset-0 h-5 w-5 text-yellow-400 transition-opacity duration-200 dark:text-yellow-500"
                  :style="{
                    opacity:
                      i <= (review.rating || review.company_review?.rating)
                        ? 1
                        : 0.3
                  }"
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div class="p-4">
      <p class="whitespace-pre-line text-gray-700 dark:text-gray-300">
        {{
          review.content || review.company_review?.content || review.body || ''
        }}
      </p>
    </div>

    <template #footer>
      <div class="space-y-1">
        <p class="text-sm text-neutral-500">
          Used: {{ formattedExperienceDate }}
        </p>
        <p class="text-xs text-neutral-400">
          Reviewed: {{ formattedReviewDate }}
        </p>
      </div>
    </template>
  </UCard>
</template>
