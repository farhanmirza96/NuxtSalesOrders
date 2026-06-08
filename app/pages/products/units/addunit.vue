<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-2xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
      <!-- Header -->
      <div class="p-4 border-b border-gray-200 bg-[#5E7AC4] rounded-t-lg">
        <h1 class="text-xl font-bold text-white">Add Unit of Measure</h1>
      </div>

      <form @submit.prevent="addUnit" class="p-6 space-y-6">
        <div class="space-y-4">
          <div>
            <label for="unit_name" class="block text-sm font-semibold text-gray-600 uppercase">Unit Name*</label>
            <input
              type="text"
              id="unit_name"
              v-model="form.name"
              @input="checkDuplicateName"
              class="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none shadow-sm"
              placeholder="e.g. Kg, Pcs, Cotton, Tin"
              required
            />
            <p v-if="nameExists" class="text-red-500 text-xs mt-1">This unit already exists in the system.</p>
          </div>

          <p class="text-xs text-gray-400 italic">* required fields</p>
        </div>

        <!-- Footer Actions -->
        <div class="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            @click="$router.back()"
            class="px-4 py-2 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="nameExists || !form.name"
            class="px-6 py-2 bg-blue-600 text-white rounded text-sm font-bold hover:bg-blue-700 shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Save Unit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'side-bar'
})

import { ref } from 'vue'
import { useRuntimeConfig, useRouter } from '#app'
import { createClient } from '@supabase/supabase-js'

const config = useRuntimeConfig()
const router = useRouter()
const supabase = createClient(
  config.public.supabaseUrl,
  config.public.supabasePublishableKey
)

/* ------------------ STATE ------------------ */
const form = ref({
  name: ''
})

const nameExists = ref(false)
let timeout: any

/* ------------------ DUPLICATE CHECK ------------------ */
const checkDuplicateName = () => {
  clearTimeout(timeout)
  timeout = setTimeout(async () => {
    if (!form.value.name) {
      nameExists.value = false
      return
    }

    const { data, error } = await supabase
      .from('units_of_measure')
      .select('id')
      .ilike('name', form.value.name.trim())

    if (!error) {
      nameExists.value = (data ?? []).length > 0
    }
  }, 400)
}

/* ------------------ SUBMIT ------------------ */
async function addUnit() {
  if (nameExists.value) return

  const { error } = await supabase
    .from('units_of_measure')
    .insert([{ name: form.value.name.trim() }])

  if (error) return alert(error.message)
  
  alert('Unit of Measure added successfully!')
  router.back() // Wapas Sales Order page par janay ke liye
}
</script>