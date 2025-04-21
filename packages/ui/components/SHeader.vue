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
            color="secondary"
            highlight
            variant="pill"
            :items="headerNavItems"
            :content="{ align: 'center', side: 'bottom', sideOffset: 8 }"
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
    <SBreadcrumb />
  </header>
</template>
