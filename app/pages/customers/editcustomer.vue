<template>
  <div>
    <div class="pt-2 mb-6">
      <header>
        <h1 class="text-2xl font-bold rounded-md p-2 bg-[#5E7AC4] text-white">Edit Customer</h1>
      </header>
    </div>

    <form @submit.prevent="updateCustomer">
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label for="first_name" class="block mb-2.5 text-sm font-medium text-heading">First name*</label>
          <input type="text" id="first_name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder:text-gray-400"
            placeholder="First Name" v-model="form.name" required />
        </div>
        <!-- <div>
          <label for="last_name" class="block mb-2.5 text-sm font-medium text-heading">Last name</label>
          <input type="text" id="last_name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder:text-gray-400"
            placeholder="Last Name" />
        </div>
        <div>
          <label for="company" class="block mb-2.5 text-sm font-medium text-heading">Company*</label>
          <input type="text" id="company"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder:text-gray-400"
            placeholder="Company name" required />
        </div> -->
        <div>
          <label for="phone" class="block mb-2.5 text-sm font-medium text-heading">Phone</label>
          <input type="tel" id="phone"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder:text-gray-400"
            placeholder="03xxxxxxxxx" v-model="form.phone"/>
        </div>
        <!-- <div>
          <label for="website" class="block mb-2.5 text-sm font-medium text-heading">Website URL</label>
          <input type="url" id="website"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder:text-gray-400"
            placeholder="website address" />
        </div>
        <div>
          <label for="email" class="block mb-2.5 text-sm font-medium text-heading">Email address</label>
          <input type="email" id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder:text-gray-400"
            placeholder="abc@company.com" />
        </div>
      </div>
      <div class="mb-6">
        <label for="address" class="block mb-2.5 text-sm font-medium text-heading">Address</label>
        <input type="text" id="address"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder:text-gray-400"
          placeholder="Address" />
      </div> -->
        <!-- <div class="mb-6">
        <label for="password" class="block mb-2.5 text-sm font-medium text-heading">Password</label>
        <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder:text-gray-400" placeholder="•••••••••" />
    </div> 
    <div class="mb-6">
        <label for="confirm_password" class="block mb-2.5 text-sm font-medium text-heading">Confirm password</label>
        <input type="password" id="confirm_password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder:text-gray-400" placeholder="•••••••••" />
    </div>  -->
        <div class="flex items-start mb-6">
          <!-- <div class="flex items-center h-5">
        <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-2 focus:ring-blue-500" required />
        </div>
        <label for="remember" class="ms-2 text-sm font-medium text-heading">I agree with the <a href="#" class="text-fg-brand hover:underline">terms and conditions</a>.</label> -->
          <p class="text-sm text-heading italic">* required fields</p>
        </div>
        <button type="submit"
          class="text-white bg-[#5E7AC4] hover:bg-[#4A63A0] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 focus:outline-none" >Update</button>
        <button
          class="text-white bg-[#5E7AC4] hover:bg-[#4A63A0] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 focus:outline-none ml-2"
          @click="navigateTo('/customers/viewCustomers')">Cancel</button>
    </div>
    </form>

  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'side-bar'
})

import { ref, onMounted } from 'vue'
import { useRoute, useRuntimeConfig, navigateTo } from '#app'
import { createClient } from '@supabase/supabase-js'

interface Customer {
  id: string | number
  name: string
  // lastname: string
  // companyname: string
  phone: string
  // website: string
  // email: string
  // address: string
}

const config = useRuntimeConfig()

// const { createClient } = await import('@supabase/supabase-js')

const supabase = createClient(
  config.public.supabaseUrl,
  config.public.supabasePublishableKey
)

const route = useRoute()
const customerId = route.params.id

// const customers = ref<Customer[]>([])

// const editId = ref<string | number | null>(null)

// const isEditMode = ref(false)

const form = ref({
  name: '',
  // lastname: '',
  // companyname: '',
  phone: '',
  // website: '',
  // email: '',
  // address: ''
})

const getCustomer = async () => {
  try {
    const { data, error } = await supabase
      .from('customer')
      .select()
      .eq('id', customerId)
      .single()

    if (error) throw error

    if (data) {
      form.value.name = data.name
      // form.value.lastname = data.lastname
      // form.value.companyname = data.companyname
      form.value.phone = data.phone
      // form.value.website = data.website
      // form.value.email = data.email
      // form.value.address = data.address
    }
  } 
  
  catch (err: any) {
  console.error('Error fetching customer:', err)
    alert(err.message || 'An error occurred while fetching the customer details')
  }
}
const updateCustomer = async () => {
  try {
    const { error } = await supabase
      .from('customer')
      .update({
        name: form.value.name,
        // lastname: form.value.lastname,
        // companyname: form.value.companyname,
        phone: form.value.phone,
        // website: form.value.website,
        // email: form.value.email,
        // address: form.value.address
      })
      .eq('id', customerId)

    if (error) {console.log(error)}

    alert('Customer updated successfully!')
    navigateTo('/customers/viewCustomers')
  } catch (err: any) {
    console.error('Error updating customer:', err)
    alert(err.message || 'An error occurred while updating the customer')
  }
}

// onMounted(async () => {
//   try {
//     const { data, error } = await supabase
//       .from('customer')
//       .select()
//       .eq('id', customerId)
//       .single()

//     if (error) throw error

//     if (data) {
//       form.value.name = data.name
//       // form.value.lastname = data.lastname
//       // form.value.companyname = data.companyname
//       form.value.phone = data.phone
//       // form.value.website = data.website
//       // form.value.email = data.email
//       // form.value.address = data.address
//     }
//   } catch (err: any) {
//     console.error('Error fetching customer:', err)
//     alert(err.message || 'An error occurred while fetching the customer details')
//   }
// })
onMounted(() => {
  getCustomer()
})
</script>