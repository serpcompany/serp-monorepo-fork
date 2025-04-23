<script setup lang="ts">
  const config = useRuntimeConfig();
  const headerNavItems = config.public.headerNavItems;
  const useAuth = config.public.useAuth;

  const mobileMenuOpen = ref(false);
  const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value;
  };
</script>

<template>
  <header
    class="bg-background top-0 z-50 mx-auto h-18 max-w-full border-b border-(--ui-border) px-12"
  >
    <div class="flex h-full items-center justify-between px-4">
      <!-- Left side -->
      <div class="flex items-center">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <NuxtLink to="/" aria-label="home">
            <SLogo />
          </NuxtLink>
        </div>
        <!-- Desktop nav -->
        <div class="ml-6 hidden lg:flex">
          <UNavigationMenu
            aria-label="Main navigation"
            orientation="horizontal"
            content-orientation="vertical"
            highlight
            text-size="base"
            variant="pill"
            :items="headerNavItems"
            :ui="{
              link: 'group relative w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2 text-primary',
              viewport:
                'relative overflow-hidden bg-default shadow-lg rounded-md ring ring-default h-(--reka-navigation-menu-viewport-height) w-full transition-[width,height,left] duration-200 origin-[top_center] data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] z-[100]',
              childList:
                'flex flex-col bg-white dark:bg-gray-800 justify-center',
              childLink:
                'px-4 py-2 hover:bg-gray-200  dark:hover:bg-gray-600 dark:hover:text-gray-300 rounded-md transition-colors duration-200'
            }"
          />
        </div>
      </div>

      <!-- Right side -->
      <div class="flex items-center">
        <!-- Hamburger menu for small screens -->
        <div class="lg:hidden">
          <button
            type="button"
            class="rounded-md p-2 hover:text-[var(--ui-primary)] focus:ring-2 focus:ring-[var(--ui-primary)] focus:outline-none focus:ring-inset"
            :aria-expanded="mobileMenuOpen"
            @click="toggleMobileMenu"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <!-- Desktop color mode & profile -->
        <div class="hidden items-center space-x-4 lg:flex">
          <ColorModeButton />
          <ProfileDropdown v-if="useAuth" />
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="mobileMenuOpen" class="lg:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <UNavigationMenu
          orientation="vertical"
          highlight
          :items="headerNavItems"
          class="w-full"
          :content="{ align: 'center', side: 'bottom', sideOffset: 8 }"
        />
        <div v-if="useAuth" class="mt-4 border-t border-neutral-200 pt-4">
          <ProfileDropdown />
        </div>
      </div>
    </div>
  </header>
  <div class="px-12">
    <SBreadcrumb />
  </div>
</template>
