<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-screen mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
      <div class="p-4 border-b border-gray-200 bg-[#5E7AC4] rounded-t-lg flex justify-between items-center text-white">
        <h1 class="text-xl font-bold">Vendors</h1>
        <div class="text-sm font-medium">Vendor list</div>
      </div>

      <div class="mt-8 border border-gray-200 rounded">

        <table class="w-full text-sm text-left">
          <thead class="bg-gray-200 text-gray-600 uppercase text-xs font-bold border-b border-gray-200">
            <tr>
              <th class="px-4 py-2">S.No</th>
              <th class="px-4 py-2">Name</th>
              <th class="px-4 py-2">Phone</th>
              <th class="px-4 py-2">Company Name</th>
              <th class="px-4 py-2">Website</th>
              <th class="px-4 py-2">Email</th>
              <th class="px-4 py-2">Address</th>
              <th class="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="(vendor, index) in vendors" :key="vendor.id"
              :class="[(index + 1) % 2 === 0 ? 'bg-gray-100' : 'bg-white']" class="hover:bg-gray-200 cursor-pointer">
              <!-- <td class="px-4 py-2 border-b">{{ instrument.id }}</td> -->
              <td class="px-4 py-2">{{ index + 1 }}</td>
              <td class="px-4 py-2">{{ vendor.name }}</td>
              <td class="px-4 py-2">{{ vendor.phone }}</td>
              <td class="px-4 py-2">{{ vendor.company }}</td>
              <td class="px-4 py-2">{{ vendor.website }}</td>
              <td class="px-4 py-2">{{ vendor.email }}</td>
              <td class="px-4 py-2">{{ vendor.address }}</td>
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
      </div>
    </div>
  </div>
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