<script setup lang="ts">
  const { loggedIn, user } = useUserSession();
  const props = defineProps<{
    id: number | string;
    module: string;
    upvotes: string[];
  }>();

  const localUpvotes = ref<string[]>([]);
  const toast = useToast();
  const loading = ref(false);

  watch(
    () => props.upvotes,
    (newUpvotes) => {
      if (newUpvotes && newUpvotes.length) {
        localUpvotes.value = [...newUpvotes];
      } else {
        localUpvotes.value = [];
      }
    },
    { immediate: true }
  );

  async function upvote() {
    try {
      loading.value = true;

      if (loggedIn.value) {
        if (!user?.value?.email) {
          throw new Error('User not authenticated');
        }

        const { data: response, error } = await useFetch('/api/upvote', {
          method: 'POST',
          headers: useRequestHeaders(['cookie']),
          body: JSON.stringify({ id: props.id, module: props.module })
        });

        if (error.value) {
          throw new Error(`Failed to upvote - ${error.value.message}`);
        }

        if (response.value.message === 'success') {
          if (localUpvotes.value.includes(user.value.email)) {
            localUpvotes.value = localUpvotes.value.filter(
              (email) => email !== user.value.email
            );
          } else {
            localUpvotes.value.push(user.value.email);
          }

          toast.add({
            id: 'upvote-success',
            title: 'Upvoted',
            description: 'Your upvote has been recorded',
            icon: 'check-circle'
          });
        } else {
          toast.add({
            id: 'upvote-error',
            title: 'Error upvoting',
            description: response.value.message,
            icon: 'exclamation-circle'
          });
        }
      } else {
        toast.add({
          id: 'upvote-login',
          title: 'Login required',
          description: 'You need to login to upvote',
          icon: 'exclamation-circle'
        });
      }
    } catch (error) {
      toast.add({
        id: 'upvote-error',
        title: 'Error upvoting',
        description: (error as Error).message,
        icon: 'exclamation-circle'
      });
    } finally {
      loading.value = false;
    }
  }
</script>

<template>
  <div class="flex w-full items-center sm:w-auto">
    <UButton
      class="bg-primary-50 disabled:bg-secondary-500 dark:disabled:bg-secondary-500 flex w-full items-center justify-center gap-2 rounded-full border border-neutral-300 px-4 py-2 font-medium text-neutral-700 transition-colors hover:bg-neutral-100 disabled:text-white disabled:opacity-90 sm:w-auto dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-100 dark:disabled:text-white"
      :disabled="loading"
      @click="upvote"
    >
      <span
        v-if="loading"
        class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"
      ></span>
      <span v-else class="text-xl">👍</span>
      <span>Upvotes {{ localUpvotes.length }}</span>
    </UButton>
  </div>
</template>
