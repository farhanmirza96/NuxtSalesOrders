<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRuntimeConfig } from '#app'

interface Instrument {
  id: string | number
  name: string
}

definePageMeta({
  layout: 'side-bar'
})

const config = useRuntimeConfig()
const instruments = ref<Instrument[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

async function getInstruments() {
  try {
    // Check if runtime config is available
    if (!config.public.supabaseUrl || !config.public.supabasePublishableKey) {
      throw new Error('Supabase credentials not found in runtime config. Please check your .env file.')
    }

    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(config.public.supabaseUrl, config.public.supabasePublishableKey)

    const { data, error: err } = await supabase.from('instruments').select()
    if (err) throw err
    instruments.value = data
  } catch (err) {
    console.error('Error fetching instruments:', err)
    error.value = err.message || 'An error occurred'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getInstruments()
})
</script>

<template>
<div>
    <h1>Welcome username</h1>
</div><br />
<NuxtLink to="/customers/salesorders/salesorders">Sales Orders</NuxtLink> | 
<NuxtLink to="/vendors/purchaseorders/purchaseorders">Purchase Orders</NuxtLink> | 
<NuxtLink to="/inventory/inventory">Inventory</NuxtLink>

<div class="mt-8">
  <h2 class="text-xl font-bold mb-4">Instruments</h2>
  
  <div v-if="loading" class="text-gray-500">Loading...</div>
  
  <div v-else-if="error" class="text-red-500">Error: {{ error }}</div>
  
  <div v-else-if="instruments.length === 0" class="text-gray-500">No instruments found</div>
  
  <table v-else class="min-w-full bg-white border border-gray-200">
    <thead>
      <tr class="bg-gray-100">
        <th class="px-4 py-2 text-left border-b">ID</th>
        <th class="px-4 py-2 text-left border-b">Name</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="instrument in instruments" :key="instrument.id">
        <td class="px-4 py-2 border-b">{{ instrument.id }}</td>
        <td class="px-4 py-2 border-b">{{ instrument.name }}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<style scoped>
</style>