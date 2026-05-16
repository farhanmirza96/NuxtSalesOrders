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

const { createClient } = await import('@supabase/supabase-js')

const supabase = createClient(
  config.public.supabaseUrl,
  config.public.supabasePublishableKey
)
const instruments = ref<Instrument[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const form = ref({ name: '' })  // Example form data for adding a new instrument

const isEditMode = ref(false) // This can be used to toggle between add and edit modes in the UI

const editId = ref<string | number | null>(null) // This will hold the ID of the instrument being edited

async function getInstruments() {
  try {
    // Check if runtime config is available
    if (!config.public.supabaseUrl || !config.public.supabasePublishableKey) {
      throw new Error('Supabase credentials not found in runtime config. Please check your .env file.')
    }

    

    const { data, error: err } = await supabase.from('instruments').select()
    if (err) throw err
    instruments.value = data
  } catch (err: any) {
    console.error('Error fetching instruments:', err)
    error.value = err.message || 'An error occurred'
  } finally {
    loading.value = false
  }
}

async function deleteInstrument(id: string | number) {
  try {
    const { error } = await supabase.from('instruments').delete().eq('id', id)
    if (error) throw error
    instruments.value = instruments.value.filter(instr => instr.id !== id)
  } catch (err: any) {
    console.error('Error deleting instrument:', err)
    alert(err.message || 'An error occurred while deleting the instrument')
  }
}

async function addInstrument() {
  try {
    if (!form.value.name) {
      alert('Please enter a name for the instrument')
      return
    }

    if(isEditMode.value) {
      // Edit logic here (not implemented in this snippet)
      const { error } = await supabase.from('instruments').update({ name: form.value.name }).eq('id', editId.value)
      if (!error) {
        // Update the local instruments list
        // const index = instruments.value.findIndex(instr => instr.id === editId.value)
        // if (index !== -1) {
        //   instruments.value[index].name = form.value.name
        // }
        // Reset form and edit mode
        form.value.name = ''
        isEditMode.value = false
        editId.value = null
        getInstruments() // Refresh the list to reflect changes
      } else {
        throw error
      }
  
    }else {

    

    const { data, error: err } = await supabase.from('instruments').insert({ name: form.value.name }).select()
    if (err) throw err

    instruments.value.push(data[0])  // Add the new instrument to the list
    form.value.name = ''  // Clear the form
  }} catch (err: any) {
    console.error('Error adding instrument:', err)
    alert(err.message || 'An error occurred while adding the instrument')
  }
}

function editInstrument(instrument: Instrument) {
  form.value.name = instrument.name
  isEditMode.value = true
  editId.value = instrument.id
}

onMounted(() => {
  getInstruments()
})
</script>

<template>
<div>
    <h1>Welcome username</h1>
</div><br />

<div class="mt-8">
  <h2 class="text-xl font-bold mb-4">Instruments</h2>
  <form @submit.prevent="addInstrument" class="mb-4">
    <input v-model="form.name" type="text" placeholder="New instrument name" class="border border-gray-300 rounded px-3 py-2 mr-2" />
    <button type="submit" class="bg-sky-500 hover:bg-sky-700 text-white py-2 px-4 rounded">
      {{ isEditMode ? 'Update Instrument' : 'Add Instrument' }}
    </button>
  </form>

  <div v-if="loading" class="text-gray-500">Loading...</div>
  
  <div v-else-if="error" class="text-red-500">Error: {{ error }}</div>
  
  <div v-else-if="instruments.length === 0" class="text-gray-500">No instruments found</div>
  
  <table v-else class="min-w-full bg-white border border-gray-200">
    <thead>
      <tr class="bg-gray-100">
        <th class="px-4 py-2 text-left text-gray-700 border-b">S.No</th>
        <th class="px-4 py-2 text-left text-gray-700 border-b">Name</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="instrument in instruments" :key="instrument.id">
        <!-- <td class="px-4 py-2 border-b">{{ instrument.id }}</td> -->
        <td class="px-4 py-2 border-b">{{ instruments.indexOf(instrument) + 1 }}</td>
        <td class="px-4 py-2 border-b">{{ instrument.name }}</td>
        <td class="px-4 py-2 ">
          <button class="ml-2 bg-sky-500 hover:bg-sky-700 text-white py-1 px-3 rounded" @click="editInstrument(instrument)">Edit</button>
          <button class="ml-2 bg-sky-500 hover:bg-sky-700 text-white py-1 px-3 rounded" @click="deleteInstrument(instrument.id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</div><br />
<NuxtLink to="/customers/salesorders/salesorders">Sales Orders</NuxtLink> | 
<NuxtLink to="/vendors/purchaseorders/purchaseorders">Purchase Orders</NuxtLink> | 
<NuxtLink to="/inventory/inventory">Inventory</NuxtLink> | 
<NuxtLink to="/about">About</NuxtLink>
</template>

<style scoped>
</style>