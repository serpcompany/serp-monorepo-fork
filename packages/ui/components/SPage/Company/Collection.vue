<script setup lang="ts">
  const router = useRouter();
  const route = useRoute();

  const page = ref(Number(route.query.page) || 1);
  const limit = ref(Number(route.query.limit) || 50);

  // @ts-expect-error: Auto-imported from another layer
  const categories = await useCompanyCategories();

  // @ts-expect-error: Auto-imported from another layer
  let data = await useCompanies(page.value, limit.value);
  if (!data) {
    router.push('/404');
  }

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
    data = await useCompanies(page.value, limit.value);
    router.push({ query });
  });

  useSeoMeta({
    title: 'Discover the best products on the internet.'
  });
</script>

<template>
  <div>
    <SHero
      headline="Products, Software & Services."
      subheadline="Discover top-rated software, tools & services."
      :show-search-bar="false"
      :show-buttons="false"
    />
    <main class="space-y-20">
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <CompanyCard
          v-for="company in data.companies"
          :key="company.slug"
          :company="company"
        />
      </div>
      <UPagination
        v-model:page="page"
        :total="data?.pagination?.totalItems"
        :items-per-page="limit"
        :sibling-count="3"
        aria-label="pagination"
        class="flex justify-center overflow-x-auto rounded-none"
      />
      <SLinkHub
        v-if="categories && categories.length"
        :categories="categories"
        headline="Categories"
        base-slug="products/best"
      />
      <NewsletterSignupPageSection />
    </main>
  </div>
</template>
