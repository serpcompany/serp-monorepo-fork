<script setup lang="ts">
  const { loggedIn, user } = useUserSession();
  const props = defineProps<{
    id: number | string;
    isVerifiedProp: number | boolean;
  }>();

  const { isVerifiedProp } = toRefs(props);

  const isVerified = ref(isVerifiedProp.value);

  watch(isVerifiedProp, (newVal) => {
    isVerified.value = newVal;
  });

  const toast = useToast();
  const loading = ref(false);

  // Function to verify the company
  async function verifyCompany() {
    loading.value = true;
    try {
      if (loggedIn.value) {
        if (!user?.value?.email) {
          throw new Error('User not authenticated');
        }
        const response = await $fetch(`/api/company/claim/${props.id}`, {
          method: 'POST'
        });
        console.log('Claim company response:', response);
        if (response.message === 'success') {
          toast.add({
            id: 'claim-company-success',
            title: 'Success',
            description: 'Company claimed successfully.',
            icon: 'check-circle'
          });
          isVerified.value = response.id;
        } else {
          toast.add({
            id: 'claim-company-error',
            title: 'Error',
            description: `Failed to claim the company. - ${response.message}`,
            icon: 'i-heroicons-exclamation-circle'
          });
        }
      } else {
        toast.add({
          id: 'company-verification-login',
          title: 'Login required',
          description: 'You need to login to claim this company.',
          icon: 'exclamation-circle'
        });
      }
    } catch (error) {
      toast.add({
        id: 'claim-company-error',
        title: 'Error',
        description: 'An error occurred while claiming the company.',
        icon: 'i-heroicons-exclamation-circle'
      });
    } finally {
      loading.value = false;
    }
  }
</script>

<template>
  <div class="flex w-full items-center sm:w-auto">
    <div v-if="isVerified" class="flex items-center">
      <UIcon
        name="i-heroicons-check-circle"
        class="h-5 w-5 flex-shrink-0 text-green-500"
      />
      <span class="ml-2"> Verified </span>
    </div>
    <div v-else class="flex items-center">
      <UButton :loading="loading" @click="verifyCompany"
        >Claim This Company</UButton
      >
    </div>
  </div>
</template>
