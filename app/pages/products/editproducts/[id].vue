<template>
  <div>
    <div class="pt-2 mb-6">
      <header>
        <h1 class="text-2xl font-bold rounded-md p-2 bg-[#5E7AC4] text-white">Edit Product</h1>
      </header>
    </div>

    <form @submit.prevent="updateProduct">
      <div class="grid gap-6 mb-0 md:grid-cols-2">
        <div>
          <label for="name" class="block mb-2.5 text-sm font-medium text-heading">Product name*</label>
          <input type="text" id="name" v-model="form.name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm"
            required />
        </div>
        <div>
          <label for="description" class="block mb-2.5 text-sm font-medium text-heading">Description</label>
          <input type="text" id="description" v-model="form.description"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm" />
        </div>
        <div>
          <label for="type" class="block mb-2.5 text-sm font-medium text-heading">Type*</label>
          <input type="text" id="type" v-model="form.type"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm"
            required />
        </div>
        <div>
          <label for="quantity" class="block mb-2.5 text-sm font-medium text-heading">Quantity</label>
          <input type="number" id="quantity" v-model="form.quantity"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm" />
        </div>
        <div>
          <label for="qty_on_sale_orders" class="block mb-2.5 text-sm font-medium text-heading">Qty on Sale Orders</label>
          <input type="number" id="qty_on_sale_orders" v-model="form.qty_on_sale_orders"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm" />
        </div>
        <div class="mb-6">
          <label for="avg_sale_price" class="block mb-2.5 text-sm font-medium text-heading">Average Sale Price</label>
          <input type="number" id="avg_sale_price" v-model="form.avg_sale_price"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm" />
        </div>
      </div>

      <div class="flex gap-2">
        <button type="submit"
          class="text-white bg-[#5E7AC4] hover:bg-[#4A63A0] font-medium rounded-lg text-sm px-4 py-2.5">
          Update Product
        </button>
        <button type="button" @click="navigateTo('/products/viewproducts')"
          class="text-white bg-gray-500 hover:bg-gray-600 font-medium rounded-lg text-sm px-4 py-2.5">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRuntimeConfig, useRoute, navigateTo } from '#app'
import { createClient } from '@supabase/supabase-js'

definePageMeta({
  layout: "side-bar"
})

const config = useRuntimeConfig()
const route = useRoute()
const supabase = createClient(
  config.public.supabaseUrl,
  config.public.supabasePublishableKey
)

const form = ref({
  name: '',
  description: '',
  type: '',
  quantity: 0,
  qty_on_sale_orders: 0,
  avg_sale_price: 0,
  avg_futuristic_cost: 0
})

async function getProduct() {
  const { data, error } = await supabase
    .from('products')
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
      description: data.description || '',
      type: data.type || '',
      quantity: data.quantity || 0,
      qty_on_sale_orders: data.qty_on_sale_orders || 0,
      avg_sale_price: data.avg_sale_price || 0,
      avg_futuristic_cost: data.avg_futuristic_cost || 0
    }
  }
}

async function updateProduct() {
  const { error } = await supabase
    .from('products')
    .update(form.value)
    .eq('id', route.params.id)

  if (error) {
    alert(error.message)
    return
  }

  alert('Product updated successfully!')
  navigateTo('/products/viewproducts')
}

onMounted(() => {
  getProduct()
})
</script>