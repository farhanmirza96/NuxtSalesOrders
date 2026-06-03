<template>
  <div>
    <div class="pt-2 mb-6">
      <header>
        <h1 class="text-2xl font-bold rounded-md p-2 bg-[#5E7AC4] text-white">Edit Vendor</h1>
      </header>
    </div>

    <form @submit.prevent="updateVendor">
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label for="full_name" class="block mb-2.5 text-sm font-medium text-heading">Full name*</label>
          <input type="text" id="full_name" v-model="form.name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder:text-gray-400"
            placeholder="Full Name" required />
        </div>
        <div>
          <label for="phone" class="block mb-2.5 text-sm font-medium text-heading">Phone</label>
          <input type="tel" id="phone" v-model="form.phone"
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
          <label for="text" class="block mb-2.5 text-sm font-medium text-heading">Email address</label>
          <input type="text" id="email" v-model="form.email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder:text-gray-400"
            placeholder="abc@company.com" />
        </div>
      </div>
      <div class="mb-6">
        <label for="address" class="block mb-2.5 text-sm font-medium text-heading">Address</label>
        <input type="text" id="address" v-model="form.address"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder:text-gray-400"
          placeholder="Address" />
      </div>

      <div class="flex items-start mb-6">
        <p class="text-sm text-heading italic">* required fields</p>
      </div>

      <button type="submit"
        class="text-white bg-[#5E7AC4] hover:bg-[#4A63A0] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 focus:outline-none">
        Update Vendor
      </button>
      <button type="button"
        class="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5 focus:outline-none ml-2"
        @click="navigateTo('/vendors/viewVendors')">
        Cancel
      </button>
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

const route = useRoute()
const config = useRuntimeConfig()
const supabase = createClient(
  config.public.supabaseUrl,
  config.public.supabasePublishableKey
)

const form = ref({
  name: '',
  phone: '',
  company: '',
  website: '',
  email: '',
  address: ''
})

async function getVendor() {
  const { data, error } = await supabase
    .from('vendor')
    .select('*')
    .eq('id', route.params.id)
    .single()

  if (error) {
    alert(error.message)
    return
  }

  if (data) {
    form.value = {
      name: data.name || '',
      phone: data.phone || '',
      company: data.company || '',
      website: data.website || '',
      email: data.email || '',
      address: data.address || ''
    }
  }
}

async function updateVendor() {
  const { error } = await supabase
    .from('vendor')
    .update(form.value)
    .eq('id', route.params.id)

  if (error) {
    alert(error.message)
    return
  }

  alert('Vendor updated successfully!')
  navigateTo('/vendors/viewVendors')
}

onMounted(() => {
  getVendor()
})
</script>