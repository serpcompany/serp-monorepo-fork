<script setup lang="ts">
  const router = useRouter();
  const route = useRoute();

  const page = ref(Number(route.query.page) || 1);
  const limit = ref(Number(route.query.limit) || 50);
  const categories = await useCompanyCategories();

  const heroLinks = ref([
    {
      label: 'Explore Products',
      to: '/products/',
      icon: 'i-lucide-search',
      class: 'rounded-lg'
    },
    {
      label: 'Learn more',
      to: '/about/',
      color: 'neutral' as const,
      variant: 'subtle' as const,
      trailingIcon: 'i-lucide-arrow-right',
      class: 'rounded-lg'
    }
  ]);

  const logos = [
    'i-simple-icons-google',
    'i-simple-icons-amazon',
    'i-simple-icons-meta',
    'i-simple-icons-microsoft',
    'i-simple-icons-apple',
    'i-simple-icons-adobe',
    'i-simple-icons-slack',
    'i-simple-icons-shopify'
  ];

  let data = await useCompanies(page.value, limit.value);

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
    data = await useCompanies(page.value, limit.value);
    router.push({ query });
  });

  useSeoMeta({
    title: 'Home'
  });
</script>

<template>
  <UPage>
    <!-- hero -->
    <UPageHero
      title="Grow Big or Go Home"
      description="Discover top-rated companies for all your online business needs. Our curated listings help you find trusted partners to scale your business."
      headline="The Most Popular Tools Online"
      orientation="vertical"
      :links="heroLinks"
    >
    </UPageHero>

    <!-- Partner logos marquee -->
    <div>
      <UPageMarquee pause-on-hover>
        <template v-for="logo in logos" :key="logo">
          <UIcon
            :name="logo"
            class="size-8 shrink-0 text-gray-400 dark:text-gray-600"
          />
        </template>
      </UPageMarquee>
    </div>

    <UMain>
      <!-- rows: companies -->
      <div class="mt-40 space-y-4">
        <CompanyCard
          v-for="company in data.companies"
          :key="company.slug"
          :company="company"
        />
      </div>

      <!-- pagination -->
      <div class="mt-20 flex justify-center">
        <UPagination
          v-model:page="page"
          :total="data?.pagination?.totalItems"
          :items-per-page="limit"
          :sibling-count="3"
          aria-label="pagination"
          class="overflow-x-auto rounded-none"
        />
      </div>

      <!-- link hub -->
      <SLinkHub
        v-if="categories && categories.length"
        :categories="categories"
        headline="Categories"
        base-slug="products/best"
        class="mt-20"
      />
    </UMain>
  </UPage>
</template>
