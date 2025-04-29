<script setup lang="ts">
const { loggedIn } = useUserSession();
if (!loggedIn.value) {
  navigateTo('/');
}

// fetch submissions
const submissions = await useCompanySubmissions();

// fetch verified companies
const {
  data: verifiedData,
  pending: verifiedPending,
  error: verifiedError
} = await useFetch<{
  companies: Array<{
    id: number;
    name: string;
    domain: string;
    verifiedAt: string;
  }>;
}>('/api/companies/verified', {
  method: 'GET'
});

useSeoMeta({
  title: 'My Companies'
});
</script>

<template>
  <UPage>
    <SHero
      headline="Submissions & Verified Companies"
      :show-search-bar="false"
      :show-buttons="false"
    />

    <UMain>
      <div class="space-y-8">
        <!-- Submissions Section -->
        <div v-if="submissions" class="">
          <h2 class="text-xl font-semibold mb-4">Your Submissions</h2>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="submission in submissions"
              :key="submission.id"
              class="rounded-lg bg-white p-4 shadow-md dark:bg-neutral-800"
            >
              <div v-if="submission.isPriority">
                <UBadge>Priority</UBadge>
              </div>
              <NuxtLink
                :to="
                  submission.approved
                    ? `/products/${submission.domain}/reviews/`
                    : `/users/submit/company?id=${submission.id}`
                "
              >
                <LazyNuxtImg
                  v-if="submission.logo"
                  :src="submission.logo"
                  alt="Submission Image"
                  class="mb-4 h-48 w-full rounded-lg object-cover"
                />
                <h3 class="text-lg font-semibold">
                  {{ submission.name }} ({{ submission.domain }})
                </h3>
                <p v-if="submission.description" class="text-neutral-600">
                  {{ submission.description }}
                </p>
                <p class="text-neutral-500 mt-2">
                  Status:
                  {{
                    submission.approved
                      ? 'Approved'
                      : submission.reviewedAt
                        ? 'Denied'
                        : 'Pending'
                  }}
                </p>
                <p v-if="submission.reviewedAt" class="text-neutral-500">
                  Reviewed At: {{ submission.reviewedAt }}
                </p>
                <p v-if="submission.reviewedNotes" class="text-neutral-500">
                  Review Notes: {{ submission.reviewedNotes }}
                </p>
                <p v-if="submission.reviewedBy" class="text-neutral-500">
                  Reviewed By: {{ submission.reviewedBy }}
                </p>
                <p class="text-neutral-500">
                  Created At: {{ submission.createdAt }}
                </p>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Verified Companies Section -->
        <div>
          <h2 class="text-xl font-semibold mb-4">Verified Companies</h2>

          <div v-if="verifiedPending" class="py-8 text-center">
            Loading companies…
          </div>

          <div v-else-if="verifiedError" class="py-8 text-center text-red-500">
            Error loading companies: {{ verifiedError.message }}
          </div>

          <div v-else>
            <div v-if="verifiedData?.companies.length" class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <NuxtLink
                v-for="company in verifiedData.companies"
                :key="company.id"
                :to="`/users/manage/company/${company.id}`"
                class="rounded-lg bg-white p-4 shadow-md dark:bg-neutral-800"
              >
                <h3 class="text-lg font-semibold">{{ company.name }} ({{ company.domain }})</h3>
                <p class="mt-2 text-sm text-neutral-600">
                  Verified on {{ company.verifiedAt }}
                </p>
              </NuxtLink>
            </div>

            <p v-else class="py-8 text-center text-neutral-500">
              You haven’t verified with any companies yet.
            </p>
          </div>
        </div>
      </div>
    </UMain>
  </UPage>
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
