<script setup lang="ts">
  defineProps<{
    characters: string[];
    filteredCharacters: string[];
  }>();
</script>

<template>
  <nav class="mx-auto flex justify-between overflow-x-scroll">
    <UButton
      v-for="character in characters"
      :key="character"
      :disabled="!filteredCharacters.includes(character)"
      :to="`#${character}`"
      class="h-10 w-10 items-center bg-none text-2xl lg:justify-center"
    >
      {{ character }}
    </UButton>
  </nav>
</template>
