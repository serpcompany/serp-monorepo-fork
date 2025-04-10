<script setup lang="ts">
  import type { Post } from '@serp/types/types';

  const config = useRuntimeConfig();
  const useAuth = config.public.useAuth;
  const forCloudflare = config.public.forCloudflare;

  const props = defineProps<{
    data: Post;
    module: string;
  }>();

  const isValidAuthor =
    props.data.author !== undefined &&
    props.data.author !== null &&
    props.data.author !== 'None';

  let comments = props.data.comments || [];
  if (!forCloudflare) {
    const commentsData = await usePostComments(props.data.id);
    comments = commentsData.comments;
  }
</script>

<template>
  <UMain>
    <section class="mb-8">
      <SectionHeroOne :title="data.title" />
      <SPill base-slug="posts/category" :items="data.categories || []" />
    </section>
    <div class="items-end justify-between lg:flex">
      <div v-if="isValidAuthor">Author: {{ data.author }}</div>
      <div v-if="data?.createdAt">Published: {{ data.createdAt }}</div>
    </div>
    <USeparator class="my-4">
      <SLogo />
    </USeparator>
    <!-- eslint-disable-next-line vue/no-v-html-->
    <article class="prose dark:prose-invert" v-html="data.content"></article>

    <!-- link hub for other posts -->
    <UPageSection v-if="module === 'movies'" title="More Posts">
      <LazyMoviePostLinkHub />
    </UPageSection>

    <!-- Comments Section -->
    <div v-if="useAuth" class="mt-10">
      <h2 class="mb-4 text-2xl font-bold">Comments</h2>
      <CommentsContainer
        :id="forCloudflare ? data.slug : data.id"
        module="posts"
        :comments="comments || []"
        class="comments-github-style"
      />
    </div>
  </UMain>
</template>

<style>
  .comments-github-style {
    border-radius: 6px;
    margin-top: 16px;
  }
</style>
