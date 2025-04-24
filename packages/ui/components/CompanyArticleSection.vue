<script setup lang="ts">
  defineProps<{
    article: string;
  }>();
</script>

<template>
  <UPageSection title="Buying Advice" class="bg-white dark:bg-gray-900">
    <article v-if="article" role="article" aria-labelledby="article-title">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div
        role="document"
        class="prose dark:prose-invert mx-auto max-w-5xl"
        v-html="article"
      ></div>
    </article>
  </UPageSection>
</template>
