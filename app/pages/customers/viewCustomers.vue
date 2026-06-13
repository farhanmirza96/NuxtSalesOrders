<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-screen mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
      <!-- Header Section -->
      <div class="p-4 border-b border-gray-200 bg-[#5E7AC4] rounded-t-lg flex justify-between items-center text-white">
        <h1 class="text-xl font-bold">Customers</h1>
        <div class="text-sm font-medium">Customer list</div>
      </div>


      <!-- Items Table Section -->
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
            <tr v-for="(customer, index) in customers" :key="customer.id"
              :class="[(index + 1) % 2 === 0 ? 'bg-gray-100' : 'bg-white']" class="hover:bg-gray-200 cursor-pointer">
              <!-- <td class="px-4 py-2 border-b">{{ instrument.id }}</td> -->
              <td class="px-4 py-2 ">{{ index + 1 }}</td>
              <td class="px-4 py-2 ">{{ customer.name }}</td>
              <td class="px-4 py-2 ">{{ customer.phone }}</td>
              <td class="px-4 py-2 ">{{ customer.company }}</td>
              <td class="px-4 py-2 ">{{ customer.website }}</td>
              <td class="px-4 py-2 ">{{ customer.email }}</td>
              <td class="px-4 py-2 ">{{ customer.address }}</td>
              <td class="px-4 py-2 ">
                <button @click="$router.push(`/customers/editcustomer/${customer.id}`)" class="cursor-pointer">
                  <Icon name="lucide:edit" class="i-lucide-edit mr-1" />

                </button>
                <!-- <button class="ml-2 bg-sky-500 hover:bg-sky-700 text-white py-1 px-3 rounded" @click="deleteCustomer(customer.id)"> -->
                <button @click="deleteCustomer(customer.id)" class="cursor-pointer">
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


interface Customer {
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

const customers = ref<Customer[]>([])

// const loading = ref(true)
// const error = ref<string | null>(null)

async function getCustomer() {
  //    try {
  // Check if runtime config is available
  // if (!config.public.supabaseUrl || !config.public.supabasePublishableKey) {
  //   throw new Error('Supabase credentials not found in runtime config. Please check your .env file.')
  // }



  const { data, error: err } = await supabase.from('customer').select()
  // if (err) throw err
  customers.value = data || []

  // } catch (err: unknown) {
  //     if (err instanceof Error) {
  //     error.value = err.message
  //   } else {
  //     error.value = 'An error occurred'
  //   }
  // } finally {
  // loading.value = false
  // }
}

async function deleteCustomer(id: string | number) {
  try {
    const { error } = await supabase.from('customer').delete().eq('id', id)
    if (error) throw error
    customers.value = customers.value.filter(cust => cust.id !== id)
  } catch (err: unknown) {
    if (err instanceof Error) {
      alert(err.message)
    } else {
      alert('An error occurred while deleting the customer')
    }
  }
}

onMounted(() => {
  getCustomer()
})

definePageMeta({
  layout: "side-bar"
})

</script>