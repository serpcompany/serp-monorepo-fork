<script setup lang="ts">
  const router = useRouter();
  const route = useRoute();
  const page = ref(Number(route.query.page) || 1);
  const limit = ref(Number(route.query.limit) || 50);

  const props = defineProps({
    topic: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: ''
    },
    owner: {
      type: String,
      default: ''
    }
  });

  const { topic, tag, owner } = toRefs(props);

  // @ts-expect-error: auto‑imported from another layer
  let data = await useMCPServers(
    page.value,
    limit.value,
    tag.value,
    topic.value,
    owner.value
  );
  if (!data) {
    router.push('/404');
  }

  watch([page, limit], async ([newPage, newLimit]) => {
    const query: Record<string, string> = {
      ...(route.query as Record<string, string>)
    };

    if (newPage !== 1) query.page = String(newPage);
    else delete query.page;

    if (newLimit !== 50) query.limit = String(newLimit);
    else delete query.limit;

    // @ts-expect-error: auto‑imported from another layer
    data = await useMCPServers(page.value, limit.value);
    router.push({ query });
  });

  useSeoMeta({
    title: 'Browse Community MCP Servers'
  });
</script>

<template>
  <div class="pb-10">
    <SHero
      headline="MCP Servers"
      subheadline="Discover Open Source MCP Servers."
      :show-search-bar="false"
      :show-buttons="false"
    />

    <main>
      <div class="space-y-4">
        <MCPServerCard
          v-for="server in data.servers"
          :key="server.slug"
          :server="server"
        />
      </div>

      <UPagination
        v-model:page="page"
        :total="data?.pagination?.totalItems"
        :items-per-page="limit"
        :sibling-count="3"
        aria-label="pagination"
        class="mt-20 flex justify-center overflow-x-auto rounded-none"
      />
    </main>
  </div>
</template>
