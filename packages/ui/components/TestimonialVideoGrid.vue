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
  <div class="py-8">
    <h2 class="mb-6 text-center text-2xl font-bold">Client Testimonials</h2>
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="(video, index) in videos"
        :key="index"
        class="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800"
      >
        <div class="relative aspect-video w-full overflow-hidden">
          <!-- Replace with your YouTube player component -->
          <iframe
            :src="`https://www.youtube.com/embed/${video.videoId}`"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="absolute h-full w-full object-cover"
          ></iframe>
        </div>

        <div class="flex flex-1 flex-col p-4">
          <div class="mt-auto">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
              {{ video.personName }}
            </h3>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              {{ video.positionAtCompany }} at
              <a
                :href="video.businessWebsite"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-600 hover:underline dark:text-blue-400"
              >
                {{ video.businessName }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
