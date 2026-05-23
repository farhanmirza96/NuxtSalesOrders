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
      <tr v-for="(customer, index) in customers" :key="customer.id" :class="[(index+1) % 2 === 0 ? 'bg-gray-100' : 'bg-white']" class="hover:bg-gray-200 cursor-pointer">
        <!-- <td class="px-4 py-2 border-b">{{ instrument.id }}</td> -->
        <td class="px-4 py-2 border-b">{{ index + 1 }}</td>
        <td class="px-4 py-2 border-b">{{ customer.name }}</td>
        <td class="px-4 py-2 border-b">{{ customer.phone }}</td>
        <td class="px-4 py-2 border-b">{{ customer.company }}</td>
        <td class="px-4 py-2 border-b">{{ customer.website }}</td>
        <td class="px-4 py-2 border-b">{{ customer.email }}</td>
        <td class="px-4 py-2 border-b">{{ customer.address }}</td>
        <td class="px-4 py-2 ">
          <button @click="$router.push(`/customers/editcustomer/${customer.id}`)" >
            <Icon name="lucide:edit" class="i-lucide-edit mr-1" />
            
          </button>
          <!-- <button class="ml-2 bg-sky-500 hover:bg-sky-700 text-white py-1 px-3 rounded" @click="deleteCustomer(customer.id)"> -->
          <button @click="deleteCustomer(customer.id)">
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

async function getCustomer(){
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

onMounted(()=>{
    getCustomer()
})

definePageMeta({
    layout: "side-bar"
})

</script>