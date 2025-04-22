<script setup lang="ts">
const { loggedIn } = useUserSession();
if (!loggedIn.value) {
  navigateTo('/');
}

const { data, pending, error } = await useFetch<{
  companies: Array<{
    id: number;
    name: string;
    domain: string;
    verifiedAt: string;
  }>;
}>('/api/companies/verified', {
  method: 'GET'
});
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-6">Your Verified Companies</h1>

    <div v-if="pending" class="text-center py-8">Loading companies…</div>

    <div v-else-if="error" class="text-red-500 text-center py-8">
      Error loading companies: {{ error.message }}
    </div>

    <div v-else>
      <div
        v-if="data?.companies.length"
        class="grid grid-cols-3 gap-4"
      >
        <NuxtLink
          v-for="company in data.companies"
          :key="company.id"
          :to="`/users/manage/company/${company.id}`"
          class="block"
        >
          <UCard class="hover:shadow-lg transition-shadow duration-200">
            <div class="p-4">
              <h3 class="text-lg font-medium">{{ company.name }}</h3>
              <p class="text-sm text-neutral-500">{{ company.domain }}</p>
              <p class="mt-2 text-xs text-neutral-600">
                Verified on {{ company.verifiedAt }}
              </p>
            </div>
          </UCard>
        </NuxtLink>
      </div>

      <p v-else class="text-center text-neutral-500 py-8">
        You haven’t verified with any companies yet.
      </p>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
