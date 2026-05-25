<template>
 <table class="min-w-full bg-white border rounded-lg border-gray-200">
    <thead>
      <tr class="bg-[#5E7AC4]">
        <th class="px-4 py-2 text-left text-gray-700 border-b">S.No</th>
        <th class="px-4 py-2 text-left text-gray-700 border-b">Name</th>
        <th class="px-4 py-2 text-left text-gray-700 border-b">Phone</th>
        <th class="px-4 py-2 text-left text-gray-700 border-b">Company Name</th>
        <th class="px-4 py-2 text-left text-gray-700 border-b">Website</th>
        <th class="px-4 py-2 text-left text-gray-700 border-b">Email</th>
        <th class="px-4 py-2 text-left text-gray-700 border-b">Address</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(vendor, index) in vendors" :key="vendor.id" :class="[(index+1) % 2 === 0 ? 'bg-gray-100' : 'bg-white']" class="hover:bg-gray-200 cursor-pointer">
        <!-- <td class="px-4 py-2 border-b">{{ instrument.id }}</td> -->
        <td class="px-4 py-2 border-b">{{ index + 1 }}</td>
        <td class="px-4 py-2 border-b">{{ vendor.name }}</td>
        <td class="px-4 py-2 border-b">{{ vendor.phone }}</td>
        <td class="px-4 py-2 border-b">{{ vendor.company }}</td>
        <td class="px-4 py-2 border-b">{{ vendor.website }}</td>
        <td class="px-4 py-2 border-b">{{ vendor.email }}</td>
        <td class="px-4 py-2 border-b">{{ vendor.address }}</td>
        <td class="px-4 py-2 ">
          <button @click="$router.push(`/vendors/editvendor/${vendor.id}`)" class="cursor-pointer">
            <Icon name="lucide:edit" class="i-lucide-edit mr-1" />
            
          </button>
          <!-- <button class="ml-2 bg-sky-500 hover:bg-sky-700 text-white py-1 px-3 rounded" @click="deleteCustomer(customer.id)"> -->
          <button @click="deleteCustomer(vendor.id)" class="cursor-pointer">
            <Icon name="lucide:trash" class="i-lucide-trash" />
            
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">

import { ref, onMounted } from 'vue'
import { useRuntimeConfig } from '#app'

interface Vendor {
    id: string | number
    name: string
    phone: string
    company: string
    website: string
    email: string
    address: string
}

const config = useRuntimeConfig()
const { createClient } = await import('@supabase/supabase-js')
const supabase = createClient(
  config.public.supabaseUrl,
  config.public.supabasePublishableKey
)

const vendors = ref<Vendor[]>([])

async function getVendors() {
  const { data, error } = await supabase.from('vendor').select('*')
  if (error) {
    console.error('Error fetching vendors:', error)
  } else {
    vendors.value = data as Vendor[]
  }
}

async function deleteCustomer(id: string | number) {
  if (confirm('Are you sure you want to delete this vendor?')) {
    const { error } = await supabase.from('vendor').delete().eq('id', id)
    if (error) {
      console.error('Error deleting vendor:', error)
    } else {
      getVendors() // Refresh the list after deletion
    }
  }
}

onMounted(() => {
  getVendors()
})

definePageMeta({
  layout: 'side-bar'
})

</script>