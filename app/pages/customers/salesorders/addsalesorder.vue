<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
      <!-- Header Section -->
      <div class="p-4 border-b border-gray-200 bg-[#5E7AC4] rounded-t-lg flex justify-between items-center">
        <h1 class="text-xl font-bold text-white">Sales Order</h1>
        <div class="text-white text-sm font-medium">Add New Sales Order</div>
      </div>

      <form @submit.prevent="submitForm" class="p-6 space-y-6">
        <!-- Customer & Order Details Row -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="space-y-1">
            <label class="block text-xs font-semibold text-gray-500 uppercase">Customer Name</label>
            <div class="flex gap-1">
              <select v-model="form.customer_id" class="flex-1 border border-gray-300 rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-500 outline-none">
                <option value="" disabled>Select Customer</option>
                <option v-for="c in customers" :key="c.id" :value="c.id">{{ c.name }}</option>
              </select>
              <NuxtLink to="/customers/addcustomer" class="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-gray-600 hover:bg-gray-200" title="Add New Customer">+</NuxtLink>
            </div>
          </div>

          <div class="space-y-1">
            <label class="block text-xs font-semibold text-gray-500 uppercase">Order Number</label>
            <input type="text" v-model="form.order_number" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-500 outline-none" placeholder="SO-001" required />
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div class="space-y-1">
              <label class="block text-xs font-semibold text-gray-500 uppercase">Date</label>
              <input type="date" v-model="form.order_date" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
            </div>
            <div class="space-y-1">
              <label class="block text-xs font-semibold text-gray-500 uppercase">Status</label>
              <select v-model="form.status" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-500 outline-none">
                <option value="open">Open</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Items Table Section -->
        <div class="mt-8 border border-gray-200 rounded">
          <table class="w-full text-sm text-left">
            <thead class="bg-gray-100 text-gray-600 uppercase text-xs font-bold border-b border-gray-200">
              <tr>
                <th class="px-4 py-2 w-1/3">Item / Product</th>
                <th class="px-4 py-2 w-32">Qty</th>
                <th class="px-4 py-2 w-48">Units</th>
                <th class="px-4 py-2">Rate</th>
                <th class="px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="(item, index) in form.items" :key="index" class="hover:bg-gray-50">
                <td class="px-4 py-2">
                  <div class="flex gap-1">
                    <select v-model="item.product_id" @change="updateItemPrice(index)" class="w-full border-none bg-transparent focus:ring-0 text-sm">
                      <option value="" disabled>Select Item</option>
                      <option v-for="p in products" :key="p.id" :value="p.id">{{ p.name }}</option>
                    </select>
                  </div>
                </td>
                <td class="px-4 py-2">
                  <input type="number" v-model.number="item.quantity" @input="calculateLineAmount(index)" class="w-full border-none bg-transparent focus:ring-0 text-sm" min="1" />
                </td>
                <td class="px-4 py-2">
                  <div class="flex items-center gap-1">
                    <select v-model="item.unit_id" class="flex-1 border-none bg-transparent focus:ring-0 text-sm min-w-[100px]">
                      <option value="" disabled>Select Unit</option>
                      <option v-for="unit in units" :key="unit.id" :value="unit.id">{{ unit.name }}</option>
                    </select>
                    <NuxtLink to="/products/units/addunit" class="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-gray-600 hover:bg-gray-200" title="Add New Unit">+</NuxtLink>
                  </div>
                </td>
                <td class="px-4 py-2">
                  <input type="number" v-model.number="item.unit_price" @input="calculateLineAmount(index)" class="w-full border-none bg-transparent focus:ring-0 text-sm" step="0.01" />
                </td>
                <td class="px-4 py-2 font-medium text-gray-700">
                  {{ item.amount.toFixed(2) }}
                </td>
                <td class="px-4 py-2 text-right">
                  <button type="button" @click="removeItem(index)" class="text-red-400 hover:text-red-600">×</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="p-3 bg-gray-50 flex justify-between items-center border-t border-gray-200">
            <button type="button" @click="addItem" class="text-blue-600 hover:text-blue-800 text-sm font-bold">+ Add Line</button>
            <div class="text-right space-y-1">
              <span class="text-xs text-gray-500 uppercase mr-4">Total Amount:</span>
              <span class="text-lg font-bold text-gray-800">Rs. {{ form.total_amount.toFixed(2) }}</span>
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button type="button" class="px-4 py-2 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
          <button type="submit" class="px-6 py-2 bg-blue-600 text-white rounded text-sm font-bold hover:bg-blue-700 shadow-md">Save Order</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'side-bar'
})

import { ref, onMounted } from 'vue'
import { useRuntimeConfig } from '#app'
import { createClient } from '@supabase/supabase-js'

const config = useRuntimeConfig()
const supabase = createClient(
  config.public.supabaseUrl,
  config.public.supabasePublishableKey
)
/* ------------------ STATE ------------------ */
const form = ref({
  order_number: '',
  customer_id: '',
  order_date: new Date().toISOString().substring(0, 10),
  status: 'open', // Changed to 'open' for consistency with options
  items: [{ product_id: '', quantity: 1, unit_id: '', unit_price: 0, amount: 0 }],
  total_amount: 0
})

const customers = ref<any[]>([]);
/* ------------------ FETCH CUSTOMERS ------------------ */
// Supabase code to fetch customers
const fetchCustomers = async () => {
  const { data, error } = await supabase.from('customer').select('id, name').order('name')
  if (error) {
    console.error('Error fetching customers:', error)
  } else {
    customers.value = data || []
  }
}

const products = ref<any[]>([]);
/* ------------------ FETCH PRODUCTS ------------------ */
// Supabase code to fetch products
const fetchProducts = async () => {
  const { data, error } = await supabase.from('products').select('id, name, price')
  if (error) {
    console.error('Error fetching products:', error)
  } else {
    products.value = data || []
  }
}

const units = ref<any[]>([]);
/* ------------------ FETCH UNITS ------------------ */
// Supabase code to fetch units of measure
const fetchUnits = async () => {
  const { data, error } = await supabase.from('units_of_measure').select('id, name').order('name')
  if (error) {
    console.error('Error fetching units:', error)
  } else {
    units.value = data || []
  }
}

async function generateNextOrderNumber() {
  const { data, error } = await supabase
    .from('sales_order')
    .select('order_number')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
    console.error('Error fetching last sales order number:', error);
    form.value.order_number = 'SO-001'; // Fallback
    return;
  }

  let nextNumber = 'SO-001'; // Default starting number

  if (data && data.order_number) {
    const lastOrderNumber = data.order_number;
    const match = lastOrderNumber.match(/^([a-zA-Z-]*?)(\d+)([a-zA-Z-]*)$/);

    if (match) {
      const prefix = match[1] || '';
      const numericPart = match[2];
      const suffix = match[3] || '';

      let num = parseInt(numericPart, 10);
      num++;
      const newNumericPart = String(num).padStart(numericPart.length, '0');
      nextNumber = prefix + newNumericPart + suffix;
    } else {
      // Fallback if parsing fails, just increment as a number
      let num = parseInt(lastOrderNumber, 10);
      nextNumber = !isNaN(num) ? String(num + 1) : 'SO-001';
    }
  }
  form.value.order_number = nextNumber;
}

/* ------------------ FORM LOGIC ------------------ */
const addItem = () => {
  form.value.items.push({ product_id: '', quantity: 1, unit_id: '', unit_price: 0, amount: 0 })
}

const removeItem = (index: number) => {
  if (form.value.items.length > 1) {
    form.value.items.splice(index, 1)
    calculateTotal()
  }
}

const updateItemPrice = (index: number) => {
  const item = form.value.items[index]
  const product = products.value.find(p => p.id === item.product_id)
  if (product) {
    item.unit_price = product.price || 0
    calculateLineAmount(index)
  }
}

const calculateLineAmount = (index: number) => {
  const item = form.value.items[index]
  item.amount = (item.quantity || 0) * (item.unit_price || 0)
  calculateTotal()
}

const calculateTotal = () => {
  form.value.total_amount = form.value.items.reduce((sum, item) => sum + item.amount, 0)
}

/* ------------------ SUBMIT FORM ------------------ */
const submitForm = async () => {
  if (!form.value.customer_id || !form.value.order_number || form.value.items.some(i => !i.product_id || !i.unit_id || i.quantity <= 0 || i.unit_price < 0)) {
    alert('Please ensure all required fields are filled and item quantities/prices are valid.')
    return
  }

  // 1. Order save karein
  const { data: order, error: orderError } = await supabase
    .from('sales_order')
    .insert([{
      customer_id: form.value.customer_id,
      order_number: form.value.order_number,
      order_date: form.value.order_date,
      status: form.value.status,
      total_amount: form.value.total_amount
    }])
    .select()
    .single()

  if (orderError || !order) return alert(orderError?.message || 'Failed to create order')

  // 2. Items save karein
  const itemsToInsert = form.value.items.map(item => ({ ...item, order_id: order.id }))
  const { error: itemsError } = await supabase.from('sales_order_items').insert(itemsToInsert)

  if (itemsError) {
    console.error('Error inserting items:', itemsError)
  } else {
    alert('Sales order created successfully!')
    // Reset Form to initial state and get next number
    form.value = { 
      order_number: '',
      customer_id: '',
      order_date: new Date().toISOString().substring(0, 10),
      status: 'open',
      items: [{ product_id: '', quantity: 1, unit_id: '', unit_price: 0, amount: 0 }],
      total_amount: 0
    }
    await generateNextOrderNumber();
  }
}

onMounted(() => {
  fetchCustomers();
  fetchProducts();
  fetchUnits();
  generateNextOrderNumber();
});
</script>