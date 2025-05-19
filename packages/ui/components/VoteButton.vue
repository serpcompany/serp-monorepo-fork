<script setup lang="ts">
  const { loggedIn, user } = useUserSession();
  const props = defineProps<{
    id: number | string;
    upvotes: number;
    downvotes: number;
    usersCurrentVote: number | null;
  }>();

  const propUpvotes = ref<number>(0);
  const propDownvotes = ref<number>(0);
  const propCurrentVote = ref<number | null>(null);

  watchEffect(() => {
    propUpvotes.value = props.upvotes;
    propDownvotes.value = props.downvotes;
    propCurrentVote.value = props.usersCurrentVote;
  });

  const toast = useToast();
  const loading = ref(false);

  async function vote(direction: 1 | -1) {
    try {
      loading.value = true;

      if (!loggedIn.value) {
        toast.add({
          id: 'vote-login',
          title: 'Login required',
          description: 'You need to login to vote',
          icon: 'exclamation-circle'
        });
        return;
      }
      if (!user?.value?.siteId) throw new Error('User not authenticated');

      const { data: res, error } = await useFetch('/api/vote', {
        method: 'POST',
        headers: useRequestHeaders(['cookie']),
        body: { id: props.id, direction }
      });
      if (error.value) throw new Error(error.value.message);
      if (res.value.message !== 'success') throw new Error(res.value.message);

      if (propCurrentVote.value === direction) {
        if (direction === 1) propUpvotes.value--;
        else propDownvotes.value--;
        propCurrentVote.value = null;
      } else {
        if (direction === 1) {
          propUpvotes.value++;
          if (propCurrentVote.value === -1) propDownvotes.value--;
        } else {
          propDownvotes.value++;
          if (propCurrentVote.value === 1) propUpvotes.value--;
        }
        propCurrentVote.value = direction;
      }

      toast.add({
        id: 'vote-success',
        title: direction === 1 ? 'Upvoted' : 'Downvoted',
        description: 'Your vote has been recorded',
        icon: 'check-circle'
      });
    } catch (err) {
      toast.add({
        id: 'vote-error',
        title: 'Error voting',
        description: (err as Error).message,
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
      :disabled="loading"
      variant="outline"
      :color="propCurrentVote === 1 ? 'neutral' : 'primary'"
      @click="vote(1)"
    >
      <span
        v-if="loading"
        class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"
      ></span>
      <span v-else class="flex items-center text-xl">
        <UIcon name="i-lucide-square-chevron-up" class="mr-2 size-5" />
        <span class="text-lg">{{ propUpvotes }}</span>
      </span>
    </UButton>
    <span class="mx-2 text-lg font-semibold">{{
      propUpvotes - propDownvotes
    }}</span>
    <UButton
      :disabled="loading"
      variant="outline"
      :color="propCurrentVote === -1 ? 'neutral' : 'primary'"
      @click="vote(-1)"
    >
      <span
        v-if="loading"
        class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"
      ></span>
      <span v-else class="flex items-center text-xl">
        <UIcon name="i-lucide-square-chevron-down" class="mr-2 size-5" />
        <span class="text-lg">{{ propDownvotes }}</span>
      </span>
    </UButton>
  </div>
</template>
