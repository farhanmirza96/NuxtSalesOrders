<template>
  <div>
    <div class="pt-2 mb-6">
      <header>
        <h1 class="text-2xl font-bold rounded-md p-2 bg-[#5E7AC4] text-white">Add Customer</h1>
      </header>
    </div>

    <form @submit.prevent="addCustomer">
      <div class="grid gap-6 mb-0 md:grid-cols-2">
        <div>
          <label for="full_name" class="block mb-2.5 text-sm font-medium text-heading">Full name*</label>
          <input type="text" id="full_name" v-model="form.name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder:text-gray-400"
            placeholder="Full Name" @input="checkDuplicateName" required />
          <p v-if="nameExists" class="text-red-500 text-sm mt-1">A customer with this name already exists.</p>
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
            placeholder="Company name" required />
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

      </div>
      <p class="text-sm text-heading italic">* required fields</p>
      <div class="flex items-start mt-2 mb-6">
        <div class="flex items-center h-5">
          <input id="remember" type="checkbox" value=""
            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-2 focus:ring-blue-500" required />
        </div>
        <label for="remember" class="ms-2 text-sm font-medium text-heading">I agree with the <a href="#"
            class="text-fg-brand hover:underline">terms and conditions</a>.</label>
      </div>
      <button type="submit" :disabled="nameExists"
        class="text-white bg-[#5E7AC4] hover:bg-[#4A63A0] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 focus:outline-none">Submit</button>

    </form>

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

const nameExists = ref(false)
let timeout: any

/* ------------------ LIVE DUPLICATE CHECK ------------------ */
const checkDuplicateName = () => {
  clearTimeout(timeout)

  timeout = setTimeout(async () => {
    if (!form.value.name) {
      nameExists.value = false
      return
    }

    const { data, error } = await supabase
      .from('customer')
      .select('id')
      .ilike('name', form.value.name.trim())

    if (error) {
      console.error(error)
      return
    }

    nameExists.value = (data ?? []).length > 0
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

    // safety check (frontend protection)
    if (nameExists.value) {
      alert('Customer already exists')
      return
    }

    const { error } = await supabase
      .from('customer')
      .insert([{
        name: form.value.name.trim(),
        phone: form.value.phone,
        company: form.value.company,
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