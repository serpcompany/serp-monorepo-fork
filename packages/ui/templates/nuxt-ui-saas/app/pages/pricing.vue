<script setup lang="ts">
  const { data: page } = await useAsyncData('pricing', () =>
    queryCollection('pricing').first()
  );

  useSeoMeta({
    title: page.value?.title,
    ogTitle: page.value?.title,
    description: page.value?.description,
    ogDescription: page.value?.description
  });

  defineOgImageComponent('Saas');

  const isYearly = ref('0');

  const items = ref([
    {
      label: 'Monthly',
      value: '0'
    },
    {
      label: 'Yearly',
      value: '1'
    }
  ]);
</script>

<template>
  <div v-if="page">
    <UPageHero v-bind="page.hero">
      <template #links>
        <UTabs
          v-model="isYearly"
          :items="items"
          color="neutral"
          class="w-72"
          :ui="{ list: 'rounded-full', indicator: 'rounded-full' }"
        />
      </template>
    </UPageHero>

    <UContainer>
      <UPricingPlans scale>
        <UPricingPlan
          v-for="(plan, index) in page.plans"
          :key="index"
          v-bind="plan"
          :price="isYearly === '1' ? plan.price.year : plan.price.month"
          :billing-cycle="isYearly === '1' ? '/year' : '/month'"
        />
      </UPricingPlans>
    </UContainer>

    <UPageSection>
      <UPageLogos>
        <UIcon
          v-for="icon in page.logos.icons"
          :key="icon"
          :name="icon"
          class="h-12 w-12 flex-shrink-0 text-(--ui-text-muted)"
        />
      </UPageLogos>
    </UPageSection>

    <UPageSection :title="page.faq.title" :description="page.faq.description">
      <UPageAccordion
        :items="page.faq.items"
        multiple
        class="mx-auto max-w-4xl"
      />
    </UPageSection>
  </div>
</template>
