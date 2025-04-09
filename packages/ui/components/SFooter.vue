<script setup lang="ts">
  import type { FooterColumn } from '@serp/types/types';

  const config = useRuntimeConfig();
  const companyName = config.public.siteName;
  const socialLinks = config.public.socialLinks as Array<{
    name: string;
    href: string;
    icon: string;
  }>;
  const legalLinks = config.public.legalLinks as Array<{
    text: string;
    slug: string;
  }>;

  // Transform footerColumns to the format expected by UFooterColumns
  const footerColumnsData = computed(() => {
    const columns = config.public.footerColumns as FooterColumn[];
    return columns.map((column) => ({
      label: column.title,
      children: column.items.map((item) => ({
        label: item.text,
        to: item.slug
      }))
    }));
  });
</script>

<template>
  <UFooter
    class="footer-wrapper mt-20 w-full"
    :ui="{
      top: 'py-0 lg:py-0',
      bottom: 'py-0 lg:py-0'
    }"
  >
    <!-- Top section with columns - full width with background -->
    <template #top>
      <div class="bg-primary-800 dark:bg-primary-950 w-full py-30">
        <div class="mx-auto max-w-[1248px] px-4">
          <UFooterColumns
            :columns="footerColumnsData"
            class="footer-columns-large"
          >
            <!-- Left section with newsletter -->
            <template #left>
              <div class="flex flex-col items-start space-x-2">
                <span class="pb-4 text-4xl font-bold">{{ companyName }}</span>
                <p class="font-bold">Subscribe to our newsletter.</p>
                <p>Join a trillion readers and stay ahead of the curve.</p>
                <UButton
                  type="submit"
                  size="xl"
                  variant="outline"
                  label="Subscribe"
                  class="text-primary-100 dark:text-primary-100 my-4 rounded-md px-4 py-2 text-lg font-semibold"
                />
              </div>
            </template>
          </UFooterColumns>
        </div>
      </div>
    </template>

    <!-- Bottom section with full-width colored ribbon -->
    <template #bottom>
      <div
        class="mx-auto flex max-w-[1248px] items-center justify-between py-8 md:flex-row"
      >
        <div class="flex flex-row items-center md:mb-0">
          <!-- Social Links -->
          <nav aria-label="Social Media Links" class="flex">
            <NuxtLink
              v-for="social in socialLinks"
              :key="social.name"
              :to="social.href"
              :aria-label="social.name"
              class="mr-6"
              target="_blank"
            >
              <UIcon
                :name="social.icon"
                class="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-200 size-5"
                aria-hidden="true"
              />
              <span class="sr-only">Visit our {{ social.name }} page</span>
            </NuxtLink>
          </nav>
        </div>
        <div
          aria-label="Legal Navigation"
          class="flex flex-col text-sm sm:items-center md:flex-row"
        >
          <div
            class="flex flex-col flex-wrap justify-center gap-4 sm:flex-row md:justify-end"
          >
            <NuxtLink
              v-for="link in legalLinks"
              :key="link.text"
              :to="link.slug"
              class="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-200"
            >
              {{ link.text }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </template>
  </UFooter>
</template>
