<script setup lang="ts">
  const badges = [
    {
      name: 'SERP Featured',
      url: 'https://embeds.serp.co/serp-featured-trophy.svg',
      path: 'serp-featured-trophy'
    },
    {
      name: 'SERP Verified',
      url: 'https://embeds.serp.co/serp-verified-med.svg',
      path: 'serp-verified-med'
    },
    {
      name: 'SERP Verified',
      url: 'https://embeds.serp.co/serp-verified-small.svg',
      path: 'serp-verified-small'
    },
    {
      name: 'SERP Verified',
      url: 'https://embeds.serp.co/serp-verified-tiny.svg',
      path: 'serp-verified-tiny'
    }
  ];

  const toast = useToast();

  const copyToClipboard = (badge) => {
    const embedCode = `<a href="https://serp.co/"><img src="https://embeds.serp.co/${badge.path}.svg" alt="${badge.name}"></a>`;

    navigator.clipboard
      .writeText(embedCode)
      .then(() => {
        toast.add({
          title: 'Copied to clipboard!',
          description: 'Paste the code on your clipboard onto your website.',
          icon: 'i-lucide-check-circle',
          color: 'success'
        });
      })
      .catch(() => {
        toast.add({
          title: 'Failed to copy',
          description: 'Please try again or copy manually.',
          icon: 'i-lucide-alert-circle',
          color: 'danger'
        });
      });
  };

  definePageMeta({
    title: 'SERP Badges',
    description:
      'Official SERP badges for embedding on your website to showcase recognition and verification.'
  });
</script>

<template>
  <div>
    <UContainer class="py-16">
      <div class="mb-12 text-center">
        <h1 class="mb-4 text-4xl font-bold">SERP Badges</h1>
        <p class="mx-auto max-w-2xl text-lg text-gray-500 dark:text-gray-400">
          Showcase your recognition with embeddable badges for your website.
          Click the button below each badge to copy its HTML code to your
          clipboard.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div v-for="(badge, index) in badges" :key="index">
          <UCard class="flex h-full flex-col">
            <div
              class="flex flex-1 items-center justify-center rounded-t-lg px-4 py-8"
            >
              <img :src="badge.url" :alt="badge.name" class="h-auto w-auto" />
            </div>
            <UDivider />
            <div class="flex items-center justify-center p-4">
              <UButton
                block
                color="neutral"
                variant="outline"
                icon="i-lucide-clipboard-copy"
                size="xl"
                @click="copyToClipboard(badge)"
              >
                Copy to clipboard
              </UButton>
            </div>
          </UCard>
        </div>
      </div>

      <UDivider class="my-16" />
    </UContainer>
  </div>
</template>
