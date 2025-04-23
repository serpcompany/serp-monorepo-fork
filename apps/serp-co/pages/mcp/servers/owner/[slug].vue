<script setup lang="ts">
  const route = useRoute();
  const { slug } = route.params;
</script>
<template>
  <SPageMCPServerCollection :owner="slug" />
</template>
