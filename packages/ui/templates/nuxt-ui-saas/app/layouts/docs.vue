<script setup lang="ts">
  import type { ContentNavigationItem } from '@nuxt/content';

  const navigation = inject<Ref<ContentNavigationItem[]>>('navigation');
</script>

<template>
  <div>
    <AppHeader />

    <UMain>
      <UContainer>
        <UPage>
          <template #left>
            <UPageAside>
              <template #top>
                <UContentSearchButton
                  label="Search..."
                  variant="outline"
                  class="w-full"
                >
                  <template #trailing>
                    <div class="ms-auto flex items-center gap-0.5">
                      <UKbd value="meta" />
                      <UKbd value="k" />
                    </div>
                  </template>
                </UContentSearchButton>
              </template>
              <UContentNavigation :navigation="navigation" highlight />
            </UPageAside>
          </template>

          <slot></slot>
        </UPage>
      </UContainer>
    </UMain>

    <AppFooter />
  </div>
</template>
