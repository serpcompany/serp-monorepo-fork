<script setup lang="ts">
  const router = useRouter();
  const joinPaths = (base: string, segment: string) =>
    base.replace(/\/+$/, '') + '/' + segment.replace(/^\/+/, '');
  const fullRoute = joinPaths(router.currentRoute.value.path, 'reviews/');
  router.replace({ path: fullRoute, replace: true });
</script>

<template>
  <div></div>
</template>
