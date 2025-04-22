<script setup lang="ts">
const { loggedIn, user } = useUserSession()
if (!loggedIn.value) navigateTo('/')

const route = useRoute()
const companyId = route.params.id as string
const toast = useToast()

const {
  data: companyData,
  pending: companyPending,
  error: companyError
} = await useFetch<Record<string, any>>(`/api/company/${companyId}`)

const {
  data: editsData,
  pending: editsPending,
  error: editsError,
  refresh: refreshEdits
} = await useFetch<{ edits: any[] }>(`/api/company/edit?id=${companyId}`)

const dynamicFields = computed(() => {
  if (!companyData.value) return []
  return Object.keys(companyData.value).filter(
    (k) => !['id', 'createdAt', 'updatedAt', 'numReviews', 'numOneStarReviews', 'numTwoStarReviews', 'numThreeStarReviews', 'numFourStarReviews', 'numFiveStarReviews', 'averageRating', 'verified', 'alternatives'].includes(k)
  )
})

const newEdit = reactive<Record<string, any>>({})
watchEffect(() => {
  if (!companyData.value) return
  dynamicFields.value.forEach((key) => {
    if (!(key in newEdit)) {
        if (key === 'categories') {
            newEdit[key] = companyData.value[key].map((c: any) => c.name)
        } else {
        newEdit[key] = Array.isArray(companyData.value[key]) ? [] : ''
        }
    }
  })
})

const categoriesList = await useCompanyCategories()
const categoryOptions = categoriesList.map((c) => c.name)
const getCategoryIds = computed(() =>
  (newEdit.categories as string[])
    .map((name) => categoriesList.find((c) => c.name === name)?.id)
    .filter((i) => typeof i === 'number')
)

async function onNewLogoSelected(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  
  // Validate file type
  if (!file.type.startsWith('image/')) {
    toast.add({
      id: 'logo-err',
      title: 'Invalid File',
      description: 'Please select an image file.',
      icon: 'exclamation-circle'
    });
    return;
  }

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const img = new Image();
    img.src = reader.result as string;
    img.onload = () => {
      // Calculate new dimensions based on the longest side being 512px
      let width = img.width;
      let height = img.height;
      if (width > height) {
        if (width > 512) {
          height = Math.round(height * (512 / width));
          width = 512;
        }
      } else {
        if (height > 512) {
          width = Math.round(width * (512 / height));
          height = 512;
        }
      }

      // Create an offscreen canvas to resize and convert the image
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        toast.add({
          id: 'logo-err',
          title: 'Processing Error',
          description: 'Failed to get canvas context.',
          icon: 'exclamation-circle'
        });
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);

      // Convert canvas to a WebP blob
      canvas.toBlob(
        async (blob) => {
          if (!blob) {
            toast.add({
              id: 'logo-err',
              title: 'Conversion Error',
              description: 'Could not convert image.',
              icon: 'exclamation-circle'
            });
            return;
          }
          // Create a new File from the blob with a .webp extension
          const processedFile = new File(
            [blob],
            file.name.replace(/\.[^.]+$/, '.webp'),
            { type: 'image/webp' }
          );
          try {
            const s3 = useS3Object();
            const runtime = useRuntimeConfig();
            const uploaded = await s3.upload(processedFile, {
              prefix: 'images',
              meta: { purpose: 'company-logo' }
            });
            newEdit.logo = `${runtime.public.cloudflareR2PublicUrl}${uploaded.replace(
              '/api/s3/query',
              ''
            )}`;
            toast.add({ 
              id: 'logo-ok', 
              title: 'Logo ready!', 
              icon: 'check-circle' 
            });
          } catch (err: any) {
            toast.add({
              id: 'logo-err',
              title: 'Upload failed',
              description: err.message,
              icon: 'exclamation-circle'
            });
          }
        },
        'image/webp',
        1.0 // Image quality
      );
    };
    img.onerror = () => {
      toast.add({
        id: 'logo-err',
        title: 'Image Load Error',
        description: 'Could not load the image for processing.',
        icon: 'exclamation-circle'
      });
    };
  };
  reader.onerror = () => {
    toast.add({
      id: 'logo-err',
      title: 'File Read Error',
      description: 'Could not read the selected file.',
      icon: 'exclamation-circle'
    });
  };
}

const loadingNew = ref(false)
async function submitNewEdit() {
  loadingNew.value = true
  try {
    const payload: Record<string, any> = {}
    for (const key of dynamicFields.value) {
      const val = newEdit[key]
      if (key === 'categories' && val.length) {
        // only add categories if changed
        let isEqual = true
        if (companyData.value[key]) {
          isEqual = val.length === companyData.value[key].length && val.every((v: string) => companyData.value[key].map((c: any) => c.name).includes(v))
        }
        if (!isEqual) {
            payload.categories = getCategoryIds.value
        }
      } else if (key === 'logo' && val) {
        payload.logo = val
      } else if (typeof val === 'string' && val.trim() !== '') {
        payload[key] = val
      }
    }
    if (!Object.keys(payload).length) {
      throw new Error('Change at least one field to submit.')
    }
    const { data: response, error } = await useFetch(`/api/company/edit?id=${companyId}`, {
      method: 'POST',
      headers: useRequestHeaders(['cookie']),
      body: JSON.stringify(payload)
    })
    if (error.value) throw error.value
    if (!response.value) throw new Error('No response from server.')
    if (response.value.message === 'success') {
      toast.add({ id: 'edit-ok', title: 'Edit proposed!', icon: 'check-circle' })
      Object.keys(payload).forEach((k) =>
        Array.isArray(newEdit[k]) ? (newEdit[k] = []) : (newEdit[k] = '')
        )
        await refreshEdits()
    } else {
      throw new Error('Failed to propose edit.')
    }
  } catch (err: any) {
    toast.add({
      id: 'edit-err',
      title: 'Submission failed',
      description: err.message,
      icon: 'exclamation-circle'
    })
  } finally {
    loadingNew.value = false
  }
}

const statusOptions = ref(['pending', 'approved', 'rejected'])
const updateStatus = reactive<Record<number, string>>({})
const updateNotes = reactive<Record<number, string>>({})

watchEffect(() => {
  if (!editsData.value) return
  editsData.value.edits.forEach((edit) => {
    if (updateStatus[edit.id] === undefined) {
      updateStatus[edit.id] = edit.status
    }
    if (updateNotes[edit.id] === undefined) {
      updateNotes[edit.id] = edit.reviewNotes || ''
    }
  })
})

async function updateEdit(editId: number) {
  try {
    const body: any = { status: updateStatus[editId] }
    if (updateNotes[editId].trim()) body.reviewNotes = updateNotes[editId]

    const { error } = await useFetch(`/api/company/edit?id=${editId}`, {
      method: 'PUT',
      headers: useRequestHeaders(['cookie']),
      body: JSON.stringify(body)
    })
    if (error.value) throw error.value

    toast.add({
      id: `updated-${editId}`,
      title: 'Edit updated',
      icon: 'check-circle'
    })
    await refreshEdits()
  } catch (err: any) {
    toast.add({
      id: `update-err-${editId}`,
      title: 'Update failed',
      description: err.message,
      icon: 'exclamation-circle'
    })
  }
}

function humanize(key: string) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase())
}
function formatValue(val: any) {
  if (Array.isArray(val)) return val.join(', ')
  return val ?? '-'
}
</script>

<template>
  <div class="p-4 space-y-6">
    <h1 class="text-2xl font-bold">Manage Company {{ companyData?.name }}</h1>

    <!-- Company Loader/Error -->
    <div v-if="companyPending" class="text-center py-8">Loading company…</div>
    <div v-else-if="companyError" class="text-red-500 text-center py-8">
      Error: {{ companyError.message }}
    </div>

    <!-- Existing Edits -->
    <section>
      <h2 class="text-xl mb-4">Existing Edit Proposals</h2>
      <div v-if="editsPending" class="text-center py-8">Loading edits…</div>
      <div v-else-if="editsError" class="text-red-500 text-center py-8">
        Error: {{ editsError.message }}
      </div>
      <div v-else>
        <div v-if="editsData?.edits.length" class="space-y-4">
          <UCard v-for="edit in editsData.edits" :key="edit.id" class="p-4">
            <div class="flex justify-between items-center">
              <h3 class="font-medium">Edit #{{ edit.id }}</h3>
              <span class="text-sm text-neutral-500">
                {{ edit.createdAt }}
              </span>
            </div>

            <!-- Before vs After -->
            <table class="w-full mt-3 text-left">
              <thead>
                <tr>
                  <th class="pb-1">Field</th>
                  <th class="pb-1">Current</th>
                  <th class="pb-1">Proposed</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(val, key) in JSON.parse(edit.proposedChanges)"
                  :key="key"
                >
                  <td class="pt-1">{{ humanize(key) }}</td>
                  <td class="pt-1">{{ formatValue(companyData[key]) }}</td>
                  <td class="pt-1">{{ formatValue(val) }}</td>
                </tr>
              </tbody>
            </table>

            <div v-if="user.email === companyData?.verifiedEmail">
              <div class="grid grid-cols-2 gap-4 mt-4" >
                <UFormField label="Status">
                  <UInputMenu v-model="updateStatus[edit.id]" :items="statusOptions" />
                </UFormField>
                <UFormField label="Review Notes">
                  <UTextarea v-model="updateNotes[edit.id]" rows="2" />
                </UFormField>
              </div>
              <div class="mt-4 text-right">
                <UButton type="primary" @click="updateEdit(edit.id)">Save</UButton>
              </div>
            </div>
            <div v-else>
              <table class="w-full mt-3 text-left">
                <thead>
                  <tr>
                    <th class="pb-1">Status</th>
                    <th class="pb-1">Review Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="pt-1">{{ edit.status }}</td>
                    <td class="pt-1">{{ edit.reviewNotes || '-' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </UCard>
        </div>
        <p v-else class="text-center text-neutral-500">No edit proposals yet.</p>
      </div>
    </section>

    <!-- Propose a New Edit -->
    <section>
      <h2 class="text-xl mb-4">Propose a New Edit</h2>
      <UCard class="p-4">
        <form @submit.prevent="submitNewEdit" class="space-y-4">
          <div v-for="key in dynamicFields" :key="key">
            <UFormField :label="humanize(key)">
              <template v-if="key === 'description'">
                <UTextarea v-model="newEdit[key]" rows="4" class="w-full" />
              </template>
              <template v-else-if="key === 'categories'">
                <UInputMenu
                  multiple
                  v-model="newEdit.categories"
                  :items="categoryOptions"
                  class="w-full"
                />
              </template>
              <template v-else-if="key === 'logo'">
                <input type="file" accept="image/*" @change="onNewLogoSelected" />
              </template>
              <template v-else>
                <UInput v-model="newEdit[key]" class="w-full" />
              </template>
              <div v-if="companyData[key]">
                <p class="text-xs text-neutral-500 mt-1" v-if="key === 'logo'">
                    Current: <img :src="companyData[key]" alt="Current Logo" class="w-16 h-16" />
                </p>
                <p class="text-xs text-neutral-500 mt-1" v-else-if="key === 'categories'">
                    Current: {{ companyData[key].map((c) => c.name).join(', ') }}
                </p>
                <p class="text-xs text-neutral-500 mt-1" v-else>
                    Current: {{ formatValue(companyData[key]) }}
                </p>
              </div>
            </UFormField>
          </div>
          <div class="text-right">
            <UButton type="primary" :loading="loadingNew">Submit Edit</UButton>
          </div>
        </form>
      </UCard>
    </section>
  </div>
</template>
