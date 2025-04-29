<script setup lang="ts">
  const router = useRouter();
  const route = useRoute();

  const page = ref(Number(route.query.page) || 1);
  const limit = ref(Number(route.query.limit) || 50);

  // @ts-expect-error: Auto-imported from another layer
  const categories = await useServiceProviderCategories();

  // @ts-expect-error: Auto-imported from another layer
  let data = await useServiceProviders(page.value, limit.value);
  if (!data) {
    router.push('/404');
  }
  console.log('data', data);

  watch([page, limit], async ([newPage, newLimit]) => {
    const query = { ...route.query };
    if (newPage !== 1) {
      query.page = String(newPage);
    } else {
      delete query.page;
    }
    if (newLimit !== 50) {
      query.limit = String(newLimit);
    } else {
      delete query.limit;
    }

    // @ts-expect-error: Auto-imported from another layer
    data = await useServiceProviders(page.value, limit.value);
    router.push({ query });
  });

  useSeoMeta({
    title: 'Discover the best service providers on the internet.'
  });
</script>

<template>
  <div class="pb-10">
    <!-- hero -->
    <SHero
      headline="Search top service providers"
      subheadline="Discover top-rated service providers."
      :show-search-bar="false"
      :show-buttons="false"
    />

    <UMain>
      <!-- rows: serviceProviders -->
      <div class="space-y-4">
        <ServiceProviderCard
          v-for="serviceProvider in data.serviceProviders"
          :key="serviceProvider.slug"
          :serviceProvider="serviceProvider"
          :base-slug="'service-providers/'"
        />
      </div>

      <UPagination
        v-model:page="page"
        :total="data?.pagination?.totalItems"
        :items-per-page="limit"
        :sibling-count="3"
        aria-label="pagination"
        class="mt-20 flex justify-center overflow-x-auto rounded-none"
      />

      <!-- link hub -->
      <SLinkHub
        v-if="categories && categories.length"
        :categories="categories"
        headline="Categories"
        base-slug="service-providers/best"
      />
      <NewsletterSignupPageSection />
    </UMain>
  </div>
</template>
