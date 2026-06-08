<template>
    <div class="pt-2 mb-6">
        <header>
            <h1 class="text-2xl font-bold rounded-md p-2 bg-[#5E7AC4] text-white">Product List</h1>
        </header>
    </div>
    <form class="max-w-md mx-auto">   
    <label for="search" class="mb-2.5 text-sm font-medium text-heading sr-only ">Find product</label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>
        </div>
        <input type="search" id="search" class="block w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="Search product" required />
        <button type="button" class="absolute end-1.5 bottom-1.5 text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none">Search</button>
    </div>
</form>
    <table class="min-w-full bg-white border rounded-lg border-gray-200">
        <thead>
            <tr class="bg-[#5E7AC4]">
                <th class="px-4 py-2 text-left text-white border-b">S.No</th>
                <th class="px-4 py-2 text-left text-white border-b">Name</th>
                <th class="px-4 py-2 text-left text-white border-b">Description</th>
                <th class="px-4 py-2 text-left text-white border-b">Type</th>
                <th class="px-4 py-2 text-left text-white border-b">Quantity</th>
                <th class="px-4 py-2 text-left text-white border-b">Qty on Sale Orders</th>
                <th class="px-4 py-2 text-left text-white border-b">Avg Sale Price</th>
                <th class="px-4 py-2 text-left text-white border-b">Avg Futuristic Cost</th>
                <th class="px-4 py-2 text-left text-white border-b">Actions</th>
            </tr>
        </thead>
        <tbody v-if="products.length > 0">
            <tr v-for="(product, index) in products" :key="product.id" :class="[(index + 1) % 2 === 0 ? 'bg-gray-100' : 'bg-white']" class="hover:bg-gray-200 cursor-pointer">
                <td class="px-4 py-2 border-b">{{ index + 1 }}</td>
                <td class="px-4 py-2 border-b">{{ product.name }}</td>
                <td class="px-4 py-2 border-b">{{ product.description }}</td>
                <td class="px-4 py-2 border-b">{{ product.type }}</td>
                <td class="px-4 py-2 border-b">{{ product.quantity }}</td>
                <td class="px-4 py-2 border-b">{{ product.qty_on_sale_orders }}</td>
                <td class="px-4 py-2 border-b">{{ product.avg_sale_price }}</td>
                <td class="px-4 py-2 border-b">{{ product.avg_futuristic_cost }}</td>
                <td class="px-4 py-2">
                    <button @click="$router.push(`/products/editproducts/${product.id}`)" class="cursor-pointer">
                        <Icon name="lucide:edit" class="i-lucide-edit mr-1" />
                    </button>
                    <button @click="deleteProduct(product.id)" class="cursor-pointer">
                        <Icon name="lucide:trash" class="i-lucide-trash" />
                    </button>
                </td>
            </tr>
        </tbody>
        <tbody v-else>
            <tr>
                <td colspan="9" class="px-4 py-4 text-center text-gray-500">No products found.</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRuntimeConfig } from '#app'
import { createClient } from '@supabase/supabase-js'

const config = useRuntimeConfig()

const supabase = createClient(
  config.public.supabaseUrl,
  config.public.supabasePublishableKey
)

// Reactive variable to store products
const products = ref<Product[]>([])

// Function to fetch products
onMounted(async () => {
  const { data, error } = await supabase.from('products').select('*')
  if (error) {
    console.error('Error fetching products:', error)
  } else {
    products.value = data as Product[]
  }
})

// Function to delete a product
async function deleteProduct(id: string | number) {
  if (!confirm('Are you sure you want to delete this product?')) {
    return;
  }
  try {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      throw error;
    }
    products.value = products.value.filter(p => p.id !== id);
    alert('Product deleted successfully!');
  } catch (err: unknown) {
    if (err instanceof Error) {
      alert(`Error deleting product: ${err.message}`);
    } else {
      alert('An unknown error occurred while deleting the product.');
    }
  }
}

definePageMeta({
    layout: "side-bar"
})

interface Product {
    id: string | number
    name: string
    description: string
    type: string
    quantity: number
    qty_on_sale_orders: number
    avg_sale_price: number
    avg_futuristic_cost: number
}

</script>,
