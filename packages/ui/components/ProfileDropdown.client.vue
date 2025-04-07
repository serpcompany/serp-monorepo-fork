<script setup lang="ts">
  // @ts-expect-error: Auto-imported from another layer
  const { loggedIn, user, clear } = useUserSession();
  const config = useRuntimeConfig();
  const profileDropdownLinks = config.public.profileDropdownLinks || [];
  const slideover = ref(false);

  interface MenuItem {
    label: string;
    type?: string;
    to?: string;
    icon?: string;
    kbds?: string[];
    onSelect?: (event: Event) => void;
  }

  const items = ref([
    [
      {
        label: user?.value?.name,
        type: 'label'
      },
      {
        label: 'Dashboard',
        to: '/users/dashboard/',
        icon: 'i-lucide-user'
      }
    ],
    ...profileDropdownLinks,
    [
      {
        label: 'Logout',
        icon: 'i-lucide-log-out',
        kbds: ['shift', 'meta', 'q'],
        onSelect(event: Event) {
          event.preventDefault();
          clear();
          slideover.value = false;
        }
      }
    ]
  ]);

  function handleItemClick(item: MenuItem): void {
    if (item.onSelect) {
      item.onSelect(new Event('click'));
      return;
    }

    if (item.to) {
      slideover.value = false;
    }
  }
</script>

<template>
  <div v-if="loggedIn" class="relative">
    <!-- Avatar trigger -->
    <UAvatar
      :src="user?.image"
      role="button"
      class="cursor-pointer transition-opacity hover:opacity-80"
      @click="slideover = true"
    />

    <!-- Slideover menu -->
    <USlideover
      v-model:open="slideover"
      side="right"
      :ui="{
        content: 'w-80 max-w-[85vw] divide-y divide-(--ui-border)',
        wrapper: 'h-full',
        body: 'p-0'
      }"
    >
      <!-- User profile header -->
      <template #header>
        <div class="flex w-full items-center gap-3 p-4">
          <UAvatar :src="user?.image" size="lg" />
          <div>
            <div class="text-base font-semibold">{{ user?.value?.name }}</div>
          </div>
        </div>
      </template>

      <!-- Menu items -->
      <template #body>
        <div class="divide-y divide-(--ui-border)">
          <div
            v-for="(group, groupIndex) in items"
            :key="groupIndex"
            class="py-1"
          >
            <div v-for="(item, itemIndex) in group" :key="itemIndex">
              <!-- Label items -->
              <div
                v-if="item.type === 'label'"
                class="px-4 py-2 text-sm font-semibold text-(--ui-text-highlighted)"
              >
                {{ item.label }}
              </div>

              <!-- Regular menu items -->
              <NuxtLink
                v-else
                :to="item.to || '#'"
                @click="handleItemClick(item)"
                class="flex items-center gap-2 px-4 py-2 transition-colors hover:bg-(--ui-bg-elevated)"
              >
                <UIcon
                  v-if="item.icon"
                  :name="item.icon"
                  class="flex-shrink-0"
                />
                <span class="flex-grow">{{ item.label }}</span>
                <div v-if="item.kbds" class="flex gap-1">
                  <UKbd
                    v-for="(kbd, kbdIndex) in item.kbds"
                    :key="kbdIndex"
                    :value="kbd"
                    size="xs"
                  />
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </template>
    </USlideover>
  </div>

  <!-- Use a button component for login when not logged in -->
  <UButton
    v-else
    variant="outline"
    size="md"
    as="NuxtLink"
    to="/login"
    class="rounded-md px-4 text-sm font-medium"
  >
    Login
  </UButton>
</template>
