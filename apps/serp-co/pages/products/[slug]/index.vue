<script setup lang="ts">
  const router = useRouter();
  const fullRoute = router.currentRoute.value.path + 'reviews/';
  router.replace({ path: fullRoute, replace: true });
</script>

<template>
  <div></div>
</template>
