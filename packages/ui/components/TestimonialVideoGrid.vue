<script setup lang="ts">
  defineProps<{
    videos: {
      personName: string;
      businessName: string;
      businessWebsite: string;
      positionAtCompany: string;
      videoId: string;
    }[];
  }>();
</script>

<template>
  <UPageSection class="py-8">
    <h2
      class="mb-4 text-center text-2xl font-bold text-gray-900 dark:text-white"
    >
      Success Stories
    </h2>
    <div class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="(video, index) in videos"
        :key="index"
        class="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800"
      >
        <div class="relative aspect-video w-full overflow-hidden">
          <iframe
            :src="`https://www.youtube.com/embed/${video.videoId}?autoplay=0&playsinline=1&controls=0`"
            width="640"
            height="360"
            class="absolute h-full w-full object-cover"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>

        <div class="flex flex-1 flex-col p-4">
          <div class="mt-auto">
            <h3 class="text-sm font-extrabold text-gray-900 dark:text-white">
              {{ video.businessName }}
            </h3>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              {{ video.personName }}, {{ video.positionAtCompany }}
              <LazyNuxtLink
                :href="video.businessWebsite"
                target="_blank"
                rel="noopener noreferrer nofollow"
                class="text-blue-600 hover:underline dark:text-blue-400"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </UPageSection>
</template>
