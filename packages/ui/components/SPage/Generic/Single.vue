<script setup lang="ts">
  import type { ServiceProvider, Comment } from '@serp/types/types';

  const { user } = useUserSession();
  const route = useRoute();
  const router = useRouter();
  const { slug } = route.params;

  // @ts-expect-error: Auto-imported from another layer
  const data = (await useServiceProvider(`${slug}`)) as ServiceProvider;
  if (!data) {
    router.push('/404');
  }

  const isVerified = computed(() => {
    return data?.verifiedEmail === user.value?.email;
  });

  const config = useRuntimeConfig();
  const useAuth = config.public.useAuth;

  // Create a consolidated object with all provider details
  const providerDetails = computed(() => {
    return {
      basic: data?.basicInfo || {},
      contracts: data?.contracts || {},
      pricing: data?.pricing || {},
      services: data?.services || {},
      industries: data?.industries || {},
      businessesServed: data?.businessesServed || {},
      supportSetup: data?.supportSetup || {},
      ratings: data?.ratings || {}
    };
  });

  // @ts-expect-error: Auto-imported from another layer
  const { comments } = (await useServiceProviderUpvotesAndComments(
    data?.id
  )) as { upvotes: string[]; comments: Comment[] };

  // @ts-expect-error: Auto-imported from another layer
  const reviews = await useServiceProviderReviews(data?.id);
  reviews.serviceProviderId = data?.id;

  // State for review modal
  const showReviewModal = ref(false);

  // Handle review submission - refresh reviews data
  async function handleReviewSubmitted() {
    // @ts-expect-error: Auto-imported from another layer
    const updatedReviews = await useServiceProviderReviews(data?.id);
    Object.assign(reviews, updatedReviews);
    reviews.serviceProviderId = data?.id;
  }

  const faqItems = computed(() => {
    if (!data?.faqs) return [];

    return data?.faqs.map((faq: { question: string; answer: string }) => ({
      label: faq.question,
      content: faq.answer
    }));
  });

  // Dynamically generate sections based on available data
  const sections = computed(() => {
    const sectionTitles: string[] = [];

    // Add Overview if basic info exists
    if (data?.basicInfo && Object.keys(data.basicInfo).length > 0) {
      sectionTitles.push('Overview');
    }

    // Add Services section if services exist
    if (data?.services && Object.keys(data.services).length > 0) {
      sectionTitles.push('Services');
    }

    // Add Industries section if industries exist
    if (data?.industries && Object.keys(data.industries).length > 0) {
      sectionTitles.push('Industries');
    }

    // Add Pricing section if pricing info exists
    if (data?.pricing && Object.keys(data.pricing).length > 0) {
      sectionTitles.push('Pricing');
    }

    // Add Contracts section if contracts info exists
    if (data?.contracts && Object.keys(data.contracts).length > 0) {
      sectionTitles.push('Contracts');
    }

    // Add Business Served section if business info exists
    if (data?.businessesServed && Object.keys(data.businessesServed).length > 0) {
      sectionTitles.push('Businesses Served');
    }

    // Add Support section if support setup exists
    if (data?.supportSetup && Object.keys(data.supportSetup).length > 0) {
      sectionTitles.push('Support');
    }

    // Add FAQ section if FAQs exist
    if (faqItems.value && faqItems.value.length > 0) {
      sectionTitles.push('FAQ');
    }

    // Add Reviews section if there are reviews
    if (data?.numReviews > 0 || reviews?.reviews?.length > 0) {
      sectionTitles.push('Reviews');
    }

    // Add Discussion section if comments are enabled
    if (useAuth) {
      sectionTitles.push('Discussion');
    }

    return sectionTitles;
  });

  useSeoMeta({
    title: computed(() =>
      data?.name
        ? `${data.name} - Reviews, Pricing, Features, Alternatives & Deals`
        : 'Service Providers'
    )
  });
</script>

<template>
  <UPage v-if="data">
    <MultipageHeader
      :name="data.name"
      :one-liner="data.description"
      :sections="sections"
      class="bg-background sticky top-0 z-50 transition-all duration-300"
      :image="data.logoUrl"
      :serply-link="data.serplyLink"
    >
      <template #upvote>
        <ServiceProviderEditButton v-if="useAuth" :id="data.id" />
        <ServiceProviderVerificationButton
          v-if="useAuth"
          :id="data.id"
          :domain="data.slug"
          :is-verified-prop="data.verified"
        />
      </template>
    </MultipageHeader>

    <!-- Main content - single column layout -->
    <section class="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
      <JSONRenderer v-if="data" :value="data" />
    </section>
  </UPage>
</template>
