<script setup lang="ts">
  const props = defineProps<{
    value: unknown;
    key_?: string;
  }>();
  const typeofValue = typeof props.value;

  const itemsAreObjects = computed(
    () =>
      Array.isArray(props.value) &&
      props.value.length > 0 &&
      props.value.every(
        (v) => v !== null && typeof v === 'object' && !Array.isArray(v)
      )
  );

  const columns = computed(() => {
    if (!itemsAreObjects.value) return [];
    const keySet = new Set<string>();
    (props.value as Record<string, unknown>[]).forEach((obj) =>
      Object.keys(obj).forEach((k) => keySet.add(k))
    );
    return [...keySet];
  });

  // remove these from showing on the frontend
  const blacklistKeys = [
    'id',
    'createdAt',
    'updatedAt',
    'deletedAt',
    'created_at',
    'updated_at',
    'deleted_at',
    'slug',
    'logoUrl',
    'title'
  ];

  // rename these keys to show on the frontend
  const renameKeysMapping = {
    excerpt: 'Short Description'
  };

  // skip rendering blank key/value pairs and objcets
</script>
<template>
  <UCard>
    <HTMLRenderer v-if="key_ === 'readme'" :value="value" />

    <!-- primitives & null/undefined -->
    <NullRenderer v-else-if="value === null" :value="value" />
    <UndefinedRenderer v-else-if="typeofValue === 'undefined'" :value="value" />
    <StringRenderer v-else-if="typeofValue === 'string'" :value="value" />
    <NumberRenderer v-else-if="typeofValue === 'number'" :value="value" />
    <BooleanRenderer v-else-if="typeofValue === 'boolean'" :value="value" />

    <!-- arrays -->
    <div
      v-else-if="Array.isArray(value)"
      class="space-y-2 border-l border-gray-300 pl-4"
    >
      <!-- array of objects -> table -->
      <table v-if="itemsAreObjects" class="min-w-full border-collapse text-sm">
        <thead class="bg-gray-100">
          <tr>
            <th
              v-for="col in columns"
              :key="col"
              class="border-b border-gray-300 px-2 py-1 text-left font-mono font-semibold"
            >
              {{ col }}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(row, i) in value"
            :key="i"
            class="odd:bg-white even:bg-gray-50"
          >
            <td
              v-for="col in columns"
              :key="col"
              class="border-b border-gray-200 px-2 py-1 align-top"
            >
              <JSONRenderer :value="row[col]" :key_="col" />
            </td>
          </tr>
        </tbody>
      </table>

      <!-- everything else -> bullet list -->
      <ul v-else class="list-disc space-y-1 pl-5">
        <li v-for="(item, i) in value" :key="i">
          <JSONRenderer :value="item" />
        </li>
      </ul>
    </div>

    <!-- objects -->
    <dl
      v-else
      class="json-object grid grid-cols-[max-content_1fr] gap-x-3 gap-y-1 border-l border-gray-300 pl-4"
    >
      <template v-for="(v, k) in value" :key="k">
        <dt
          v-if="v && !blacklistKeys.includes(k)"
          class="pr-1 font-mono text-indigo-600 after:ml-0.5 after:content-[':']"
        >
          {{ renameKeysMapping[k] || k }}
        </dt>
        <dd v-if="v && !blacklistKeys.includes(k)" class="min-w-0">
          <JSONRenderer :value="v" :key_="k" />
        </dd>
      </template>
    </dl>
  </UCard>
</template>
