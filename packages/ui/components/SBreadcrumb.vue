<script setup lang="ts">
  import { useRoute } from 'vue-router';

  const props = defineProps<{
    excludedRoutes?: (string | RegExp)[];
  }>();

  const route = useRoute();

  const defaultExcludedRoutes = [
    '/',
    /^\/users\/.+/, // Matches any route under /users/
    /^\/[^/]+\/?$/ // Single-level routes like /about
  ] as const;

  const isExcluded = computed(() => {
    const routesToCheck = props.excludedRoutes || defaultExcludedRoutes;
    return routesToCheck.some((pattern) => {
      if (pattern instanceof RegExp) {
        return pattern.test(route.path);
      }
      return route.path === pattern;
    });
  });

  const breadcrumbItems = computed(() => {
    return useBreadcrumbItems({
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
  });

  const breadcrumbUI = {
    link: 'text-xs text-primary-500 dark:text-neutral-300 min-w-0 group relative flex items-center gap-1.5 focus-visible:outline-(--ui-primary)',
    separatorIcon: 'shrink-0 size-4 text-neutral-500 dark:text-neutral-400'
  };
</script>

<template>
  <UBreadcrumb
    v-if="!isExcluded"
    class="mx-auto my-8 max-w-7xl px-4 md:px-6 lg:px-8"
    :items="breadcrumbItems"
    :ui="breadcrumbUI"
  />
</template>
