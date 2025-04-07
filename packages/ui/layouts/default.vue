<!-- layouts/default.vue -->
<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  import type { BreadcrumbItem } from '#ui/types';

  const route = useRoute();
  const items = useBreadcrumbItems({
    schemaOrg: true,
    overrides: [
      undefined,
      undefined,
      {
        label: Array.isArray(route.params.slug)
          ? route.params.slug.join('')
          : route.params.slug || '',
        to: String(route.fullPath),
        type: undefined
      }
    ]
  }).value as BreadcrumbItem[];
</script>

<template>
  <UContainer>
    <SHeader />
    <UBreadcrumb
      v-if="route.path !== '/' && !route.path.match(/^\/[^\/]+\/?$/)"
      class="mx-auto my-8 max-w-7xl px-4 md:px-6 lg:px-8"
      :items="items"
      :ui="{
        link: 'text-xs text-primary-500 text-neutral-800 dark:text-neutral-300 min-w-0 group relative flex items-center gap-1.5 focus-visible:outline-(--ui-primary)',
        separatorIcon: 'shrink-0 size-4 text-neutral-500 dark:text-neutral-400'
      }"
    />
    <slot></slot>
    <LazySFooter />
  </UContainer>
</template>
