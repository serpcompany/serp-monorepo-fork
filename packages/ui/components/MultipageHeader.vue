<script setup lang="ts">
  defineProps({
    name: {
      type: String,
      required: true
    },
    oneLiner: {
      type: String,
      required: false,
      default: ''
    },
    image: {
      type: String,
      required: false,
      default: ''
    },
    sections: {
      type: Array as () => string[],
      required: true
    },
    serplyLink: {
      type: String,
      required: true
    }
  });

  const header = ref(null);
  const isScrolled = ref(false);

  // Add proper Nuxt-friendly scroll detection
  onMounted(() => {
    const handleScroll = () => {
      isScrolled.value = window.scrollY > 0;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll);
    });
  });
</script>

<template>
  <div>
    <header
      ref="header"
      class="w-full bg-[var(--ui-bg)] transition-all duration-300"
      :class="{
        'py-2': isScrolled,
        'py-2 sm:py-4': !isScrolled,
        'sticky top-0 left-0': isScrolled
      }"
      style="z-index: 10"
    >
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <!-- When not scrolled: show the regular layout -->
        <div v-if="!isScrolled">
          <div class="flex flex-col items-center justify-between sm:flex-row">
            <!-- Logo and title section -->
            <div class="flex w-full items-start justify-between">
              <NuxtImg
                v-if="image"
                :src="image"
                :alt="`${name} logo`"
                class="mr-2 h-16 object-contain"
              />
              <div class="flex-grow">
                <h1 class="text-xl font-bold text-(--ui-primary) sm:text-3xl">
                  {{ name }}
                </h1>
                <span class="text-xs">{{ oneLiner }}</span>
              </div>
            </div>

            <!-- Action buttons -->
            <div
              class="flex w-full flex-col items-center justify-end gap-3 pt-4 sm:flex-row sm:pt-0"
            >
              <slot name="upvote"></slot>
              <NuxtLink
                :href="serplyLink"
                target="_blank"
                class="flex w-full items-center justify-center gap-2 rounded-full bg-black px-4 py-2 font-medium text-white transition-colors hover:bg-neutral-800 sm:w-auto dark:bg-white dark:text-black dark:hover:bg-neutral-200"
              >
                Visit Website
                <svg
                  class="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                  />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </NuxtLink>
            </div>
          </div>

          <!-- Navigation for non-scrolled state -->
          <div class="-mx-4 mt-4 overflow-x-auto px-4 sm:px-0">
            <nav
              aria-label="page sections"
              class="flex space-x-4 border-t border-b whitespace-nowrap"
            >
              <NuxtLink
                v-for="section in sections"
                :key="section"
                :href="'#' + section.toLowerCase()"
                class="sectionLinks flex-shrink-0 px-1 py-2 text-sm font-medium text-(--ui-primary) transition-colors duration-200 hover:text-(--ui-primary-dark) sm:px-2 sm:text-base"
              >
                {{ section }}
              </NuxtLink>
            </nav>
          </div>
        </div>

        <!-- When scrolled: show compact layout with everything in one row -->
        <div v-else class="flex items-center justify-between">
          <!-- Left section with logo, title and nav -->
          <div class="flex items-center space-x-6">
            <!-- Logo and title -->
            <div class="flex items-center">
              <NuxtImg
                v-if="image"
                :src="image"
                :alt="`${name} logo`"
                class="mr-2 h-8 object-contain"
              />
              <h1 class="text-base font-bold text-(--ui-primary)">
                {{ name }}
              </h1>
            </div>

            <!-- Nav links left-aligned -->
            <nav
              aria-label="page sections"
              class="flex space-x-4 overflow-x-auto whitespace-nowrap"
            >
              <NuxtLink
                v-for="section in sections"
                :key="section"
                :href="'#' + section.toLowerCase()"
                class="sectionLinks flex-shrink-0 px-2 py-2 text-sm font-medium text-(--ui-primary) transition-colors duration-200 hover:text-(--ui-primary-dark)"
              >
                {{ section }}
              </NuxtLink>
            </nav>
          </div>

          <!-- CTA on the right -->
          <NuxtLink
            :href="serplyLink"
            target="_blank"
            class="flex items-center justify-center gap-1 rounded-full bg-black px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
          >
            Visit Website
            <svg
              class="h-3 w-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
              />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </header>
  </div>
</template>
