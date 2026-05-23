<script setup lang="ts">
definePageMeta({
  layout: 'side-bar'
})

import { ref, onMounted } from 'vue'
import { useRoute, useRuntimeConfig, navigateTo } from '#app'

const route = useRoute()

const config = useRuntimeConfig()

const { createClient } = await import('@supabase/supabase-js')

const supabase = createClient(
  config.public.supabaseUrl,
  config.public.supabasePublishableKey
)

const form = ref({
  firstname: '',
  lastname: '',
  companyname: '',
  phonenumber: '',
  website: '',
  email: '',
  address: ''
})

async function getCustomer() {
  const { data, error } = await supabase
    .from('addcustomers')
    .select('*')
    .eq('id', route.params.id)
    .single()

  if (error) {
    alert(error.message)
    return
  }

  form.value = data
}

async function updateCustomer() {
  const { error } = await supabase
    .from('addcustomers')
    .update(form.value)
    .eq('id', route.params.id)

  if (error) {
    alert(error.message)
    return
  }

  alert('Customer Updated')

  navigateTo('/customers/viewCustomers')
}

onMounted(() => {
  getCustomer()
})
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-5">Edit Customer</h1>

    <form @submit.prevent="updateCustomer">
      <input v-model="form.firstname" class="border p-2 w-full mb-2" />
      <input v-model="form.lastname" class="border p-2 w-full mb-2" />
      <input v-model="form.companyname" class="border p-2 w-full mb-2" />
      <input v-model="form.phonenumber" class="border p-2 w-full mb-2" />
      <input v-model="form.website" class="border p-2 w-full mb-2" />
      <input v-model="form.email" class="border p-2 w-full mb-2" />
      <input v-model="form.address" class="border p-2 w-full mb-2" />

      <button class="bg-green-500 text-white px-4 py-2 rounded">
        Update Customer
      </button>
    </form>
  </div>
</template>