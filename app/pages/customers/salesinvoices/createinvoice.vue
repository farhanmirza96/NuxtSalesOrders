<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-screen mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
      <!-- Header Section -->
      <div class="p-4 border-b border-gray-200 bg-[#5E7AC4] rounded-t-lg flex justify-between items-center text-white">
        <h1 class="text-xl font-bold">Sales Invoice</h1>
        <div class="text-sm font-medium">Create New Invoice</div>
      </div>

      <form @submit.prevent="submitForm" class="p-6 space-y-6">
        <!-- Details Row -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="space-y-1">
            <label class="block text-xs font-semibold text-gray-500 uppercase">Customer Name</label>
            <div class="flex gap-1">
              <select v-model="form.customer_id" class="flex-1 border border-gray-300 rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-500 outline-none" required>
                <option value="" disabled>Select Customer</option>
                <option v-for="c in customers" :key="c.id" :value="c.id">{{ c.name }}</option>
              </select>
              <NuxtLink to="/customers/addcustomer" class="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-gray-600 hover:bg-gray-200" title="Add New Customer">+</NuxtLink>
            </div>
          </div>

          <div class="space-y-1">
            <label class="block text-xs font-semibold text-gray-500 uppercase">Invoice Number</label>
            <input type="text" v-model="form.invoice_number" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-500 outline-none" placeholder="INV-001" required />
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div class="space-y-1">
              <label class="block text-xs font-semibold text-gray-500 uppercase">Date</label>
              <input type="date" v-model="form.invoice_date" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
            </div>
            <div class="space-y-1">
              <label class="block text-xs font-semibold text-gray-500 uppercase">Status</label>
              <select v-model="form.status" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-500 outline-none">
                <option value="unpaid">Unpaid</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Items Table Section -->
        <div class="mt-8 border border-gray-200 rounded">
          <table class="w-full text-sm text-left">
            <thead class="bg-gray-100 text-gray-600 uppercase text-xs font-bold border-b border-gray-200">
              <tr>
                <th class="px-4 py-2 w-1/3">Product / Item</th>
                <th class="px-4 py-2 w-32">Qty</th>
                <th class="px-4 py-2 w-48">Units</th>
                <th class="px-4 py-2">Rate</th>
                <th class="px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="(item, index) in form.items" :key="index" class="hover:bg-gray-50">
                <td class="px-4 py-2">
                  <select v-model="item.product_id" @change="updateItemPrice(index)" class="w-full border-none bg-transparent focus:ring-0 text-sm">
                    <option value="" disabled>Select Item</option>
                    <option v-for="p in products" :key="p.id" :value="p.id">{{ p.name }}</option>
                  </select>
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
          <button type="submit" class="px-6 py-2 bg-blue-600 text-white rounded text-sm font-bold hover:bg-blue-700 shadow-md">Save Invoice</button>
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
  invoice_number: '',
  customer_id: '',
  invoice_date: new Date().toISOString().substring(0, 10),
  status: 'unpaid',
  items: [{ product_id: '', quantity: 1, unit_id: '', unit_price: 0, amount: 0 }],
  total_amount: 0
})

const customers = ref<any[]>([])
const products = ref<any[]>([])
const units = ref<any[]>([])

/* ------------------ FETCH DATA ------------------ */
const fetchData = async () => {
  const [cRes, pRes, uRes] = await Promise.all([
    supabase.from('customer').select('id, name').order('name'),
    supabase.from('products').select('id, name, price'),
    supabase.from('units_of_measure').select('id, name').order('name')
  ])
  
  customers.value = cRes.data || []
  products.value = pRes.data || []
  units.value = uRes.data || []
}

async function generateNextInvoiceNumber() {
  const { data } = await supabase
    .from('sales_invoice')
    .select('invoice_number')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (!data) {
    form.value.invoice_number = 'INV-001'
    return
  }

  const lastNumber = data.invoice_number
  const match = lastNumber.match(/(\d+)/)
  if (match) {
    const next = parseInt(match[0]) + 1
    form.value.invoice_number = `INV-${String(next).padStart(3, '0')}`
  } else {
    form.value.invoice_number = 'INV-001'
  }
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
  if (!item) return
  const product = products.value.find(p => p.id === item.product_id)
  if (product) {
    item.unit_price = product.price || 0
    calculateLineAmount(index)
  }
}

const calculateLineAmount = (index: number) => {
  const item = form.value.items[index]
  if (!item) return
  item.amount = (item.quantity || 0) * (item.unit_price || 0)
  calculateTotal()
}

const calculateTotal = () => {
  form.value.total_amount = form.value.items.reduce((sum, item) => sum + item.amount, 0)
}

/* ------------------ SUBMIT FORM ------------------ */
const submitForm = async () => {
  if (!form.value.customer_id || !form.value.invoice_number || form.value.items.some(i => !i.product_id)) {
    alert('Please fill all required fields.')
    return
  }

  // 1. Save Invoice
  const { data: invoice, error: invError } = await supabase
    .from('sales_invoice')
    .insert([{
      customer_id: form.value.customer_id,
      invoice_number: form.value.invoice_number,
      invoice_date: form.value.invoice_date,
      status: form.value.status,
      total_amount: form.value.total_amount
    }])
    .select()
    .single()

  if (invError || !invoice) return alert(invError?.message || 'Failed to create invoice')

  // 2. Save Items
  const itemsToInsert = form.value.items.map(item => ({
    invoice_id: invoice.id,
    product_id: item.product_id,
    unit_id: item.unit_id,
    quantity: item.quantity,
    unit_price: item.unit_price,
    amount: item.amount
  }))

  const { error: itemsError } = await supabase.from('sales_invoice_items').insert(itemsToInsert)

  if (itemsError) {
    console.error('Error inserting items:', itemsError)
    alert('Invoice saved but items failed.')
  } else {
    alert('Invoice created successfully!')
    // Reset Form
    form.value = {
      invoice_number: '',
      customer_id: '',
      invoice_date: new Date().toISOString().substring(0, 10),
      status: 'unpaid',
      items: [{ product_id: '', quantity: 1, unit_id: '', unit_price: 0, amount: 0 }],
      total_amount: 0
    }
    await generateNextInvoiceNumber()
  }
}

onMounted(() => {
  fetchData()
  generateNextInvoiceNumber()
})
</script>