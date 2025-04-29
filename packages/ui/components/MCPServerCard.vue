<script setup lang="ts">
  import type { MCPServerIndex } from '@serp/types/types';

  const props = defineProps({
    server: {
      type: Object as PropType<MCPServerIndex>,
      required: true
    }
  });

  // clamp description to ~3 lines
  const displayDescription = computed(() => {
    const desc = props.server.description || '';
    return desc.length > 150 ? desc.slice(0, 147) + '…' : desc;
  });
</script>

<template>
  <div
    class="mx-auto max-w-5xl rounded-lg border border-[var(--ui-border)] px-5 py-4 dark:border-[var(--ui-border-accented)]"
  >
    <div class="flex items-start">
      <!-- main content -->
      <div class="flex-grow">
        <!-- server name / owner -->
        <NuxtLink
          :to="`/mcp/servers/${server.slug}`"
          class="flex items-center space-x-2"
        >
          <h2
            class="text-xl font-semibold text-[var(--ui-text)] dark:text-[var(--ui-text)]"
          >
            {{ server.owner }}/{{ server.repo }}
          </h2>
        </NuxtLink>

        <!-- description -->
        <p
          class="mt-2 line-clamp-3 text-[var(--ui-text-muted)] dark:text-[var(--ui-text-toned)]"
        >
          {{ displayDescription }}
        </p>

        <!-- tags -->
        <div v-if="server.tags?.length" class="mt-3 flex flex-wrap gap-2">
          <span
            v-for="tag in server.tags.slice(0, 10)"
            :key="tag"
            class="inline-flex rounded-full bg-[var(--ui-color-secondary-50)] px-3 py-1 text-xs font-medium text-[var(--ui-color-secondary-700)] dark:bg-[var(--ui-color-secondary-900)]/30 dark:text-[var(--ui-color-secondary-200)]"
          >
            {{ tag }}
          </span>
          <span
            v-if="server.tags.length > 10"
            class="inline-flex rounded-full bg-[var(--ui-color-secondary-50)] px-3 py-1 text-xs font-medium text-[var(--ui-color-secondary-700)] dark:bg-[var(--ui-color-secondary-900)]/30 dark:text-[var(--ui-color-secondary-200)]"
          >
            +{{ server.tags.length - 10 }} more
          </span>
        </div>

        <!-- topics -->
        <div v-if="server.topics?.length" class="mt-3 flex flex-wrap gap-2">
          <span
            v-for="topic in server.topics"
            :key="topic"
            class="inline-flex rounded-full bg-[var(--ui-color-primary-50)] px-3 py-1 text-xs font-medium text-[var(--ui-color-primary-700)] dark:bg-[var(--ui-color-primary-900)]/30 dark:text-[var(--ui-color-primary-200)]"
          >
            {{ topic }}
          </span>
        </div>

        <!-- Categories -->
        <div v-if="server.categories?.length" class="mt-3 flex flex-wrap gap-2">
          <SPill base-slug="mcp/servers/category" :items="server.categories" />
        </div>
      </div>

      <!-- stats & actions -->
      <div class="ml-4 flex min-w-[140px] flex-shrink-0 flex-col space-y-2">
        <!-- star & fork counts -->
        <div class="flex flex-wrap items-center gap-2">
          <UTooltip
            :text="server.stars > 0 ? server.stars + ' stars' : 'No stars'"
            :delay-duration="0"
          >
            <div class="flex items-center space-x-1">
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.163c.969 0 1.371 1.24.588 1.81l-3.37 2.447a1 1 0 00-.364 1.118l1.287 3.955c.3.921-.755 1.688-1.54 1.118l-3.37-2.447a1 1 0 00-1.175 0l-3.37 2.447c-.784.57-1.838-.197-1.54-1.118l1.287-3.955a1 1 0 00-.364-1.118L2.07 9.382c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69L9.05 2.927z"
                />
              </svg>
              <span class="text-sm font-medium">{{ server.stars }}</span>
            </div>
          </UTooltip>
          <UTooltip
            :text="server.forks > 0 ? server.forks + ' forks' : 'No forks'"
            :delay-duration="0"
          >
            <div class="flex items-center space-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <!-- left tine -->
                <rect x="4" y="2" width="2" height="6" />
                <!-- middle tine + handle -->
                <rect x="9" y="2" width="2" height="16" />
                <!-- right tine -->
                <rect x="14" y="2" width="2" height="6" />
              </svg>
              <span class="text-sm font-medium">{{ server.forks }}</span>
            </div>
          </UTooltip>
          <UButton
            :to="server.serplyLink || server.url"
            target="_blank"
            variant="none"
            color="primary"
            size="sm"
            icon="i-lucide-square-arrow-out-up-right"
            aria-label="View repository"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
</style>
