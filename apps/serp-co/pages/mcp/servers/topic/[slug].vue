<script setup lang="ts">
  const route = useRoute();
  const { slug } = route.params;
</script>
<template>
  <SPageMCPServerCollection :topic="slug" />
</template>
