<script setup lang="ts">
  import { data } from './data';
  const page = data;

  useSeoMeta({
    title: page.title,
    ogTitle: page.title,
    description: page.description,
    ogDescription: page.description
  });
</script>

<template>
  <div v-if="page" class="relative">
    <!-- <div class="hidden lg:block">
      <UColorModeImage
        light="/images/light/line-1.svg"
        dark="/images/dark/line-1.svg"
        class="pointer-events-none absolute top-0 left-0 h-[650px] object-cover pb-10"
      />
    </div> -->

    <UPageHero
      :title="page.hero.title"
      :description="page.hero.description"
      :links="page.hero.links"
    >
      <template #title>
        <MDC
          :value="page.hero.title"
          class="mx-auto max-w-3xl *:leading-11 sm:*:leading-19"
        />
      </template>
    </UPageHero>

    <!-- tailored ai solutions -->
    <UPageSection
      v-for="(section, index) in page.sections"
      :key="index"
      v-bind="section"
      orientation="horizontal"
      :ui="{
        container: 'lg:px-0 2xl:px-20 mx-0 max-w-none md:mr-10 pb-20',
        features: 'gap-0'
      }"
      reverse
    >
      <template #title>
        <MDC :value="section.title" class="sm:*:leading-11" />
      </template>
      <img
        :src="section.images.desktop"
        :alt="section.title"
        class="left-0 hidden w-full max-w-2xl object-contain lg:block 2xl:hidden"
      />
      <img
        :src="section.images.mobile"
        :alt="section.title"
        class="block w-full object-contain lg:hidden 2xl:block 2xl:w-full 2xl:max-w-2xl"
      />
    </UPageSection>

    <UPageSection
      id="useCases"
      v-bind="page.businessUseCases"
      class="relative overflow-hidden"
    >
      <template #title>
        <MDC :value="page.businessUseCases.title" class="*:leading-9" />
        <div class="hidden @min-[1020px]:block">
          <UColorModeImage
            light="/images/light/line-2.svg"
            dark="/images/dark/line-2.svg"
            class="absolute top-0 right-0 size-full translate-x-[70%] scale-95 transform"
          />
        </div>
      </template>

      <UPageGrid>
        <UPageCard
          v-for="(item, index) in page.businessUseCases.items"
          :key="index"
          v-bind="item"
          spotlight
          spotlight-color="secondary"
          class="rounded-xl border border-(--ui-secondary)/50 hover:border-(--ui-secondary)"
          variant="soft"
        />
      </UPageGrid>
    </UPageSection>

    <!-- ai agent development -->
    <UPageSection
      id="aiAgentDevelopment"
      v-bind="page.aiAgentDevelopment"
      :ui="{
        title: 'text-left @container relative flex',
        description: 'text-left'
      }"
      class="relative overflow-hidden"
    >
      <div
        class="absolute top-10 -left-10 z-10 size-[300px] rounded-full"
      ></div>
      <div
        class="absolute -right-10 -bottom-10 z-10 size-[300px] rounded-full bg-(--ui-primary) opacity-30 blur-[200px]"
      ></div>
      <template #title>
        <MDC :value="page.aiAgentDevelopment.title" class="*:leading-9" />
        <div class="hidden @min-[1020px]:block">
          <UColorModeImage
            light="/images/light/line-2.svg"
            dark="/images/dark/line-2.svg"
            class="absolute top-0 right-0 size-full translate-x-[70%] scale-95 transform"
          />
        </div>
      </template>
    </UPageSection>

    <!-- seamlessImplementation -->
    <UPageSection
      id="steps"
      v-bind="page.seamlessImplementation"
      class="relative overflow-hidden"
    >
      <template #headline>
        <UColorModeImage
          light="/images/light/line-3.svg"
          dark="/images/dark/line-3.svg"
          class="absolute -top-10 right-1/2 h-24 sm:top-0"
        />
      </template>
      <template #title>
        <MDC :value="page.seamlessImplementation.title" />
      </template>

      <template #features>
        <UPageCard
          v-for="(step, index) in page.seamlessImplementation.items"
          :key="index"
          class="group"
          :ui="{ container: 'p-4 sm:p-4', title: 'flex items-center gap-1' }"
        >
          <UColorModeImage
            v-if="step.image"
            :light="step.image?.light"
            :dark="step.image?.dark"
            :alt="step.title"
            class="size-full"
          />

          <div class="flex flex-col gap-2">
            <span class="text-lg font-semibold">
              {{ step.title }}
            </span>
            <span class="text-sm text-(--ui-text-muted)">
              {{ step.description }}
            </span>
          </div>
        </UPageCard>
      </template>
    </UPageSection>

    <USeparator />

    <UPageCTA
      v-bind="page.cta"
      variant="naked"
      class="@container overflow-hidden"
    >
      <template #title>
        <MDC :value="page.cta.title" />

        <div class="@max-[1280px]:hidden">
          <UColorModeImage
            light="/images/light/line-6.svg"
            dark="/images/dark/line-6.svg"
            class="absolute -top-10 left-10 h-full sm:top-0"
          />
          <UColorModeImage
            light="/images/light/line-7.svg"
            dark="/images/dark/line-7.svg"
            class="absolute right-0 bottom-0 h-full"
          />
        </div>
      </template>

      <div
        class="absolute left-1/2 size-40 -translate-x-1/2 -translate-y-80 transform rounded-full blur-[250px] sm:size-50 dark:bg-(--ui-primary)"
      ></div>

      <LazyStarsBg />
    </UPageCTA>

    <UPageSection
      id="solutions"
      v-bind="page.solutions"
      class="relative overflow-hidden"
    >
      <template #title>
        <MDC :value="page.solutions.title" class="*:leading-9" />
        <div class="hidden @min-[1020px]:block">
          <UColorModeImage
            light="/images/light/line-2.svg"
            dark="/images/dark/line-2.svg"
            class="absolute top-0 right-0 size-full translate-x-[70%] scale-95 transform"
          />
        </div>
      </template>

      <UPageGrid
        :ui="{
          grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'
        }"
      >
        <NuxtLink
          v-for="(item, index) in page.solutions.items"
          :key="index"
          to="#"
          class="block h-full"
        >
          <UPageCard
            v-bind="item"
            spotlight
            spotlight-color="secondary"
            class="h-full cursor-pointer rounded-xl border border-(--ui-secondary)/50 hover:border-(--ui-secondary)"
            variant="soft"
          />
        </NuxtLink>
      </UPageGrid>
    </UPageSection>
  </div>
</template>
