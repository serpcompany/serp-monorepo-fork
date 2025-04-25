<script setup lang="ts">
  const newsletterLoading = ref(false);
  const newsletterEmail = ref('');
  const toast = useToast();
  const showNewsletterModal = ref(false);

  async function subscribeToNewsletter() {
    try {
      if (!newsletterEmail.value) {
        toast.add({
          id: 'newsletter-error',
          title: 'Invalid Email',
          description: 'Please enter a valid email address.',
          icon: 'exclamation-circle'
        });
        return;
      }
      newsletterLoading.value = true;
      const { data: res } = await useFetch('/api/mcp/newsletter/subscribe', {
        method: 'POST',
        body: {
          email: newsletterEmail.value
        }
      });
      if (res.value.status === 200) {
        toast.add({
          id: 'newsletter-success',
          title: 'Subscribed to Newsletter',
          description: 'You have successfully subscribed to the newsletter.',
          icon: 'check-circle'
        });
      } else {
        toast.add({
          id: 'newsletter-error',
          title: 'Error Subscribing to Newsletter',
          description: res.value.message,
          icon: 'exclamation-circle'
        });
      }
    } catch (error) {
      toast.add({
        id: 'newsletter-error',
        title: 'Error Subscribing to Newsletter',
        description: (error as Error).message,
        icon: 'exclamation-circle'
      });
    } finally {
      newsletterLoading.value = false;
    }
  }
</script>

<template>
  <UButton
    size="xl"
    variant="outline"
    label="Subscribe"
    color="primary"
    class="my-4 inline-flex items-center gap-2 rounded-md px-8 py-3 text-lg font-semibold text-neutral-300 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-(--ui-primary) disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75"
    @click="showNewsletterModal = true"
  />
  <UModal v-model:open="showNewsletterModal" :title="'Newsletter'">
    <template #header>
      <h2 class="text-lg font-semibold text-gray-900 dark:text-neutral-300">
        Subscribe to our Newsletter
      </h2>
    </template>
    <template #body>
      <form class="mx-auto max-w-5xl" @submit.prevent="subscribeToNewsletter">
        <div class="flex flex-col items-center justify-center gap-4">
          <div class="flex w-full max-w-sm">
            <UInput
              v-model="newsletterEmail"
              type="email"
              placeholder="Enter your email"
              :loading="newsletterLoading"
              class="w-full"
            />
            <UButton type="submit" :loading="newsletterLoading" class="ml-2">
              Submit
            </UButton>
          </div>
        </div>
      </form>
    </template>
  </UModal>
</template>
