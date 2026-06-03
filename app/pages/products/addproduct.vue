<template>
  <div>
    <div class="pt-2 mb-6">
      <header>
        <h1 class="text-2xl font-bold rounded-md p-2 bg-[#5E7AC4] text-white">Add Product</h1>
      </header>
    </div>

    <form @submit.prevent="addProduct">
      <div class="grid gap-6 mb-0 md:grid-cols-2">
        <div>
          <label for="full_name" class="block mb-2.5 text-sm font-medium text-heading">Product name*</label>
          <input type="text" id="full_name" v-model="form.name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder:text-gray-400"
            placeholder="Full Name" @input="checkDuplicateName" required />
          <p v-if="nameExists" class="text-red-500 text-sm mt-1">A product with this name already exists.</p>
        </div>
        <div>
          <label for="description" class="block mb-2.5 text-sm font-medium text-heading">Description</label>
          <input type="text" id="description" v-model="form.description"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder:text-gray-400"
            placeholder="Product description" />
        </div>
        <div>
          <label for="type" class="block mb-2.5 text-sm font-medium text-heading">Type*</label>
          <input type="text" id="type" v-model="form.type"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder:text-gray-400"
            placeholder="Product type" required />
        </div>
        <div>
          <label for="quantity" class="block mb-2.5 text-sm font-medium text-heading">Quantity</label>
          <input type="number" id="quantity" v-model="form.quantity"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder:text-gray-400"
            placeholder="Product quantity" />
        </div>
        <div>
          <label for="qty_on_sale_orders" class="block mb-2.5 text-sm font-medium text-heading">Quantity on Sale Orders</label>
          <input type="number" id="qty_on_sale_orders" v-model="form.qty_on_sale_orders"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder:text-gray-400"
            placeholder="Quantity on Sale Orders" />
        </div>
        <div class="mb-6">
          <label for="avg_sale_price" class="block mb-2.5 text-sm font-medium text-heading">Average Sale Price</label>
          <input type="number" id="avg_sale_price" v-model="form.avg_sale_price"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder:text-gray-400"
            placeholder="Average sale price" />
        </div>

      </div>
      <p class="text-sm text-heading italic">* required fields</p>
      
      <button type="submit" :disabled="nameExists"
        class="text-white bg-[#5E7AC4] hover:bg-[#4A63A0] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 focus:outline-none">Submit</button>

    </form>

  </div>
</template>

<script setup lang="ts">

import { ref, onMounted } from 'vue'
import { useRuntimeConfig } from '#app'
import { createClient } from '@supabase/supabase-js'

/* ------------------ TYPES ------------------ */
interface ProductSchema {
  id: string | number
  name: string
  description: string
  type: string
  quantity: number
  qty_on_sale_orders: number
  avg_sale_price: number
  avg_futuristic_cost: number
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
  description: '',
  type: '',
  quantity: 0,
  qty_on_sale_orders: 0,
  avg_sale_price: 0,
  avg_futuristic_cost: 0
})

const nameExists = ref(false)
let timeout: any

/* ------------------ LIVE DUPLICATE CHECK ------------------ */
const checkDuplicateName = () => {
  clearTimeout(timeout)
  timeout = setTimeout(async () => {
    const { data, error } = await supabase
      .from('products')
      .select('id')
      .eq('name', form.value.name)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error checking product name:', error)
      nameExists.value = false
    } else {
      nameExists.value = !!data
    }
  }, 500) // Debounce by 500ms
}

/* ------------------ FETCH DATA (ONLY ONE SOURCE) ------------------ */
const { data: products, refresh } = await useAsyncData('products', async () => {
  const { data } = await supabase.from('products').select()
  return data as ProductSchema[]
})

/* ------------------ ADD PRODUCT ------------------ */
async function addProduct() {
  try {
    const { error } = await supabase.from('products').insert(form.value)
    if (error) throw error
    alert('Product added successfully!')
    await refresh() // Refresh the product list after adding
  } catch (err: unknown) {
    if (err instanceof Error) {
      alert(err.message)
    } else {
      alert('An error occurred while adding the product.')
    }
  }
}

definePageMeta({
  layout: 'side-bar'
})
</script>