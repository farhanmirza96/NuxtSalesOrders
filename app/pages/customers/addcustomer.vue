<template>
  <div class="p-6 bg-gray-50 min-h-screen">

    <div class="max-w-screen mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
      <div class="p-4 border-b border-gray-200 rounded-t-lg bg-[#5E7AC4] text-white">
      
          <h1 class="text-xl font-bold">Add Customer</h1>
        
      </div>

      <form @submit.prevent="addCustomer">
        <div class="p-4 grid gap-6 mb-0 md:grid-cols-2">
          <div>
            <label for="full_name" class="block mb-2.5 text-sm font-medium text-heading">Full name*</label>
            <input type="text" id="full_name" v-model="form.name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder:text-gray-400"
              placeholder="Full Name" required />
            </div>
            <div>
            <label for="phone" class="block mb-2.5 text-sm font-medium text-heading">Phone</label>
            <input type="text" id="phone" v-model="form.phone"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder:text-gray-400"
              placeholder="03xxxxxxxxx" />
          </div>
          <div>
            <label for="company" class="block mb-2.5 text-sm font-medium text-heading">Company*</label>
            <input type="text" id="company" v-model="form.company"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder:text-gray-400"
              placeholder="Company name" @input="checkDuplicateName" required />
              <p v-if="companyExists" class="text-red-500 text-sm mt-1">A customer with this name already exists.</p>
          </div>
          <div>
            <label for="website" class="block mb-2.5 text-sm font-medium text-heading">Website URL</label>
            <input type="text" id="website" v-model="form.website"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder:text-gray-400"
              placeholder="website address" />
          </div>
          <div>
            <label for="email" class="block mb-2.5 text-sm font-medium text-heading">Email address</label>
            <input type="text" id="email" v-model="form.email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder:text-gray-400"
              placeholder="abc@company.com" />
          </div>
          <div class="mb-6">
            <label for="address" class="block mb-2.5 text-sm font-medium text-heading">Address</label>
            <input type="text" id="address" v-model="form.address"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder:text-gray-400"
              placeholder="Address" />
          </div>

          <p class="text-sm text-heading italic">* required fields</p>
          
        </div>
          <button type="submit" :disabled="companyExists"
          class="ml-4 mb-2 text-white bg-[#5E7AC4] hover:bg-[#4A63A0] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 focus:outline-none">Submit</button>
          
      </form>

    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'side-bar'
})

import { ref } from 'vue'
import { useRuntimeConfig } from '#app'
import { createClient } from '@supabase/supabase-js'

/* ------------------ TYPES ------------------ */
interface Customer {
  id: string | number
  name: string
  phone: string
  company: string
  website: string
  email: string
  address: string
}

/* ------------------ SUPABASE ------------------ */
const config = useRuntimeConfig()

const supabase = createClient(
  config.public.supabaseUrl,
  config.public.supabasePublishableKey
)

/* ------------------ STATE ------------------ */
const form = ref({
  name: '',
  phone: '',
  company: '',
  website: '',
  email: '',
  address: ''
})

const companyExists = ref(false)
let timeout: any

/* ------------------ LIVE DUPLICATE CHECK ------------------ */
const checkDuplicateName = () => {
  clearTimeout(timeout)

  timeout = setTimeout(async () => {
    const companyName = form.value.company.trim()
    if (!companyName) {
      companyExists.value = false
      return
    }

    const { data, error } = await supabase
      .from('customer')
      .select('id')
      .ilike('company', companyName)

    if (error) {
      console.error(error)
      return
    }

    companyExists.value = (data ?? []).length > 0
  }, 400)
}

/* ------------------ FETCH DATA (ONLY ONE SOURCE) ------------------ */
const { data: customers, refresh } = await useAsyncData('customers', async () => {
  const { data } = await supabase.from('customer').select()
  return data || []
})

/* ------------------ ADD CUSTOMER ------------------ */
async function addCustomer() {
  try {
    const companyName = form.value.company.trim()

    // Final check before adding to handle rapid submissions
    const { data: existing } = await supabase
      .from('customer')
      .select('id')
      .ilike('company', companyName)

    if (existing && existing.length > 0) {
      companyExists.value = true
      alert('Customer with this company name already exists.')
      return
    }

    const { error } = await supabase
      .from('customer')
      .insert([{
        name: form.value.name.trim(),
        phone: form.value.phone,
        company: companyName,
        website: form.value.website,
        email: form.value.email,
        address: form.value.address
      }])

    if (error) {
      console.error(error)
      alert(error.message)
      return
    }

    // reset form
    form.value = {
      name: '',
      phone: '',
      company: '',
      website: '',
      email: '',
      address: ''
    }

    // refresh table data
    await refresh()

    alert('Customer added successfully!')

  } catch (e) {
    console.error(e)
    alert('Something went wrong')
  }
}
</script>