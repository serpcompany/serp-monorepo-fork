<script setup lang="ts">
  import { useMCPServer } from '../../../../../utils/composables/useMCPServer';

  const router = useRouter();
  const route = useRoute();
  const page = ref(Number(route.query.page) || 1);
  const limit = ref(Number(route.query.limit) || 50);
  const categorySlug = route.params.slug as string;

  const toast = useToast();

  const props = defineProps({
    topic: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: ''
    },
    owner: {
      type: String,
      default: ''
    }
  });

  const { topic, tag, owner } = toRefs(props);

  // @ts-expect-error: auto‑imported from another layer
  let data = await useMCPServers(
    page.value,
    limit.value,
    tag.value,
    topic.value,
    owner.value,
    categorySlug
  );
  if (!data) {
    router.push('/404');
  }

  const categories = await useMCPServerCategories();

  watch([page, limit], async ([newPage, newLimit]) => {
    const query: Record<string, string> = {
      ...(route.query as Record<string, string>)
    };

    if (newPage !== 1) query.page = String(newPage);
    else delete query.page;

    if (newLimit !== 50) query.limit = String(newLimit);
    else delete query.limit;

    // @ts-expect-error: auto‑imported from another layer
    data = await useMCPServers(page.value, limit.value);
    router.push({ query });
  });

  const faqItems = computed(() => {
    if (!data?.category?.faqs || !data?.category?.faqs.length) {
      return [];
    }
    return data?.category?.faqs.map((faq) => ({
      label: faq.question,
      content: faq.answer
    }));
  });

  const newsletterLoading = ref(false);
  const newsletterEmail = ref('');
  async function subscribeToNewsletter() {
    try {
      if (!newsletterEmail.value) {
        toast.add({
          id: 'newsletter-error',
          title: 'Invalid Email',
          description: 'Please enter a valid email address.',
          icon: 'exclamation-circle'
        });
        return;
      }
      newsletterLoading.value = true;
      const { data: res } = await useFetch('/api/mcp/newsletter/subscribe', {
        method: 'POST',
        body: {
          email: newsletterEmail.value
        }
      });
      if (res.value.status === 200) {
        toast.add({
          id: 'newsletter-success',
          title: 'Subscribed to Newsletter',
          description: 'You have successfully subscribed to the newsletter.',
          icon: 'check-circle'
        });
      } else {
        toast.add({
          id: 'newsletter-error',
          title: 'Error Subscribing to Newsletter',
          description: res.value.message,
          icon: 'exclamation-circle'
        });
      }
    } catch (error) {
      toast.add({
        id: 'newsletter-error',
        title: 'Error Subscribing to Newsletter',
        description: (error as Error).message,
        icon: 'exclamation-circle'
      });
    } finally {
      newsletterLoading.value = false;
    }
  }

  useSeoMeta({
    title: () => {
      if (categorySlug) {
        return `${data.category.name} - MCP Servers`;
      }
      return 'MCP Servers';
    }
  });
</script>

<template>
  <div class="pb-10">
    <SHero
      headline="MCP Servers"
      :subheadline="
        categorySlug
          ? `Discover ${data.category.name} MCP Servers.`
          : 'The largest collection of MCP Servers.'
      "
      :show-search-bar="false"
      :show-buttons="false"
    />

    <form class="mx-auto max-w-5xl" @submit.prevent="subscribeToNewsletter">
      <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <h2 class="text-xl font-semibold">Subscribe to our Newsletter</h2>
        <div class="flex w-full max-w-sm">
          <UInput
            v-model="newsletterEmail"
            type="email"
            placeholder="Enter your email"
            :loading="newsletterLoading"
            class="w-full"
          />
          <UButton type="submit" :loading="newsletterLoading" class="ml-2">
            Subscribe
          </UButton>
        </div>
      </div>
    </form>

    <main>
      <div class="space-y-4">
        <MCPServerCard
          v-for="server in data.servers"
          :key="server.slug"
          :server="server"
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

      <SLinkHub
        v-if="categories && categories.length"
        :categories="categories"
        headline="Categories"
        class="mt-20"
        base-slug="mcp/servers/category"
      />

      <!-- article -->
      <section v-if="data?.category?.buyersGuide" class="mt-20">
        <CompanyArticleSection :article="data?.category?.buyersGuide" />
      </section>

      <!-- faqs -->
      <UPageSection
        v-if="data?.category?.faqs"
        title="FAQs"
        class="mx-auto max-w-5xl"
      >
        <UPageAccordion
          :items="faqItems"
          :ui="{ body: { class: 'prose dark:prose-invert' } }"
        >
          <template #body="{ item }">
            <div
              class="prose dark:prose-invert max-w-full"
              v-html="item.content"
            ></div>
          </template>
        </UPageAccordion>
      </UPageSection>
    </main>
  </div>
</template>
