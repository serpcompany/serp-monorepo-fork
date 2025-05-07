<script setup lang="ts">
  const props = defineProps({
    formData: {
      type: Object,
      required: true
    }
  });

  const emit = defineEmits(['update', 'submit']);

  const localFormData = ref({ ...props.formData });

  // Sample categories
  const categories = [
    'Software Development',
    'Web Development',
    'Mobile Development',
    'Cloud Computing',
    'DevOps',
    'Security',
    'Data Science',
    'Machine Learning',
    'Artificial Intelligence',
    'Blockchain'
  ];

  // Product domains
  const productDomains = [
    'agencyassassin.com',
    'serpblocks.com',
    'daft.fm',
    'boxingundefeated.com'
  ];

  function updateForm() {
    emit('update', { ...localFormData.value });
  }

  // Watch for external changes to formData
  watch(
    () => props.formData,
    (newValue) => {
      localFormData.value = { ...newValue };
    },
    { deep: true }
  );
</script>

<script setup lang="ts">
  const props = defineProps({
    formData: {
      type: Object,
      required: true
    }
  });

  const emit = defineEmits(['update', 'submit']);

  const localFormData = ref({ ...props.formData });

  // Sample categories
  const categories = [
    'Software Development',
    'Web Development',
    'Mobile Development',
    'Cloud Computing',
    'DevOps',
    'Security',
    'Data Science',
    'Machine Learning',
    'Artificial Intelligence',
    'Blockchain'
  ];

  // Product domains
  const productDomains = [
    'agencyassassin.com',
    'serpblocks.com',
    'daft.fm',
    'boxingundefeated.com'
  ];

  function updateForm() {
    emit('update', { ...localFormData.value });
  }

  // Watch for external changes to formData
  watch(
    () => props.formData,
    (newValue) => {
      localFormData.value = { ...newValue };
    },
    { deep: true }
  );
</script>

<template>
  <div>
    <h2 class="text-secondary-dark mb-4 text-xl font-semibold">
      Customize Your Badge
    </h2>
    <form @submit.prevent="$emit('submit')" class="space-y-6">
      <div class="space-y-4">
        <div>
          <label
            for="categoryName"
            class="mb-1 block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="categoryName"
            v-model="localFormData.categoryName"
            class="focus:ring-primary focus:border-primary w-full rounded-md border border-gray-300 px-4 py-2 transition duration-200"
            @change="updateForm"
          >
            <option value="" disabled>Select a category</option>
            <option
              v-for="category in categories"
              :key="category"
              :value="category"
            >
              {{ category }}
            </option>
          </select>
        </div>

        <div>
          <label
            for="productDomain"
            class="mb-1 block text-sm font-medium text-gray-700"
          >
            Product Domain
          </label>
          <select
            id="productDomain"
            v-model="localFormData.productDomain"
            class="focus:ring-primary focus:border-primary w-full rounded-md border border-gray-300 px-4 py-2 transition duration-200"
            @change="updateForm"
          >
            <option value="" disabled>Select a domain</option>
            <option
              v-for="domain in productDomains"
              :key="domain"
              :value="domain"
            >
              {{ domain }}
            </option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        class="bg-primary hover:bg-primary-dark w-full rounded-md px-6 py-3 font-medium text-white transition duration-300"
      >
        Generate SVG
      </button>
    </form>
  </div>
</template>
