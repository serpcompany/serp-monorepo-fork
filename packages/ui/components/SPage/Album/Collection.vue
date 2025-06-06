<script setup lang="ts">
  const router = useRouter();
  const route = useRoute();
  const runtimeConfig = useRuntimeConfig();

  // Initialize page and limit from URL or default values
  const page = ref(Number(route.query.page) || 1);
  const limit = ref(Number(route.query.limit) || 100);

  watch(
    [page, limit],
    ([newPage, newLimit]) => {
      // Update URL when page or limit changes
      const query = { ...route.query };
      if (newPage !== 1) {
        query.page = newPage;
      } else {
        delete query.page;
      }
      if (newLimit !== 100) {
        query.limit = newLimit;
      } else {
        delete query.limit;
      }
      router.push({ query });
    },
    { immediate: true }
  );

  const { data } = await useFetch(
    () =>
      `${runtimeConfig.public.apiUrl}/albums?page=${page.value}&limit=${limit.value}`
  );

  useSeoMeta({
    title: 'Albums',
    description:
      'A collection of music albums from every artist in our database... And we have a really big D(atabase).'
  });
</script>

<template>
  <div class="container py-20">
    <h1 class="py-10">Albums</h1>
    <AlbumsLinkHub :albums="data?.albums" />
    <div class="my-20 flex w-full justify-center">
      <UPagination
        v-model:page="page"
        :total="data?.pagination?.totalItems"
        :items-per-page="limit"
        :sibling-count="3"
        aria-label="pagination"
      />
    </div>
  </div>
</template>
