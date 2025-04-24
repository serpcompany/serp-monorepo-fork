<script setup lang="ts">
  const route = useRoute();

  const { data } = await useAsyncData(route.path, () =>
    queryCollection('content').path(route.path).first()
  );
  if (!data.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page not found',
      fatal: true
    });
  }
  const page = data.value.body;

  useSeoMeta({
    title: page.title,
    ogTitle: page.title,
    description: page.description,
    ogDescription: page.description
  });

  definePageMeta({
    layout: 'lander'
  });
</script>
<template>
  <div>Growth services</div>
</template>
