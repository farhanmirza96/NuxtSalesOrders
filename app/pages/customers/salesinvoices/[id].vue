<template>
    <div class="p-6 bg-gray-50 min-h-screen" v-if="sales_invoice.id">
        <div class="max-w-6xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
            <!-- Header Section -->
            <div class="p-4 border-b border-gray-200 bg-[#5E7AC4] rounded-t-lg flex justify-between items-center">
                <h1 class="text-xl font-bold text-white">Sales Invoice Details</h1>
                <div class="text-white text-sm font-medium">Invoice #{{ sales_invoice.invoice_number }}</div>
            </div>

            <!-- Order Details Section -->
            <form @submit.prevent="updateSalesInvoice">

                <div class="p-6 space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="space-y-1">
                            <label class="block text-xs font-semibold text-gray-500 uppercase">Invoice Number</label>
                            <input type="text" v-model="sales_invoice.invoice_number"
                                class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm">
                        </div>
                        <div class="space-y-1">
                            <label class="block text-xs font-semibold text-gray-500 uppercase">Invoice Date</label>
                            <input type="date" v-model="sales_invoice.invoice_date"
                                class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"></input>
                        </div>
                        <div class="space-y-1">
                            <label class="block text-xs font-semibold text-gray-500 uppercase">Customer Name</label>
                            <select v-model="sales_invoice.customer_id"
                                class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm">
                                <option value="" disabled>Select Customer</option>
                                <option v-for="customer in customers" :key="customer.id" :value="customer.id">
                                    {{ customer.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="space-y-1">
                            <label class="block text-xs font-semibold text-gray-500 uppercase">Status</label>
                            <input type="text" v-model="sales_invoice.status"
                                class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm capitalize"></input>
                        </div>
                        <div class="space-y-1">
                            <label class="block text-xs font-semibold text-gray-500 uppercase">Total Amount</label>
                            <div class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm">Rs. {{
                                sales_invoice.total_amount }}</div>
                        </div>
                        <div class="space-y-1">
                            <label class="block text-xs font-semibold text-gray-500 uppercase">Created At</label>
                            <div class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm">{{ new
                                Date(sales_invoice.created_at).toLocaleString() }}</div>
                        </div>
                    </div>
                </div>

                <!-- Items Table Section -->
                <div class="mt-8 border border-gray-200 rounded">
                    <table class="w-full text-sm text-left">
                        <thead class="bg-gray-100 text-gray-600 uppercase text-xs font-bold border-b border-gray-200">
                            <tr>
                                <th class="px-4 py-2">No.</th>
                                <th class="px-4 py-2 w-48">Product</th>
                                <th class="px-4 py-2 w-32">Qty</th>
                                <th class="px-4 py-2 w-48">Units</th>
                                <th class="px-4 py-2">Rate</th>
                                <th class="px-4 py-2">Amount</th>
                                <th class="px-4 py-2"></th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr v-for="(item, index) in sales_invoice.items" :key="index">

                                <td class="px-4 py-2">
                                    {{ index + 1 }}
                                </td>

                                <td class="px-4 py-2">
                                    <select v-model="item.product_id" @change="updateItemPrice(index)"
                                        class="w-full border rounded px-2 py-1">
                                        <option value="" disabled>Select Item</option>
                                        <option v-for="product in products" :key="product.id" :value="product.id">
                                            {{ product.name }}
                                        </option>
                                    </select>
                                </td>

                                <td class="px-4 py-2">
                                    <input type="number" v-model.number="item.quantity"
                                        @input="calculateLineAmount(index)"
                                        class="w-full border rounded px-2 py-1" />
                                </td>

                                <td class="px-4 py-2">
                                    <select v-model="item.unit_id" class="w-full border rounded px-2 py-1">
                                        <option value="" disabled>Select Unit</option>
                                        <option v-for="unit in units" :key="unit.id" :value="unit.id">
                                            {{ unit.name }}
                                        </option>
                                    </select>
                                </td>

                                <td class="px-4 py-2">
                                    <input type="number" v-model.number="item.unit_price"
                                        @input="calculateLineAmount(index)"
                                        class="w-full border rounded px-2 py-1" />
                                </td>

                                <td class="px-4 py-2">
                                    <input type="number" v-model.number="item.amount" readonly
                                        class="w-full border rounded px-2 py-1 bg-gray-100" />
                                </td>

                                <td class="px-4 py-2 text-right">
                                    <button type="button" @click="removeItem(index)"
                                        class="text-red-500 hover:text-red-700">Remove</button>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                    <div class="p-3 bg-gray-50 flex justify-between items-center border-t border-gray-200">
                        <button type="button" @click="addItem" class="text-blue-600 hover:text-blue-800 text-sm font-bold">+ Add Line</button>
                        <div class="text-right space-y-1">
                            <span class="text-xs text-gray-500 uppercase mr-4">Total Amount:</span>
                            <span class="text-lg font-bold text-gray-800">Rs. {{ sales_invoice.total_amount.toFixed(2) }}</span>
                        </div>
                    </div>
                </div>

                <!-- Footer Actions -->
                <div class="flex justify-end gap-3 p-4 border-t border-gray-100">
                    <button type="submit" class="px-6 py-2 bg-blue-600 text-white rounded">Update Invoice</button>
                    <!-- <NuxtLink :to="`/customers/salesinvoices/${sales_invoice.id}`" class="px-6 py-2 bg-blue-600 text-white rounded text-sm font-bold hover:bg-blue-700 shadow-md">Edit Invoice</NuxtLink>
                 <NuxtLink :to="`/customers/salesinvoices/edit/${sales_invoice.id}`" class="px-6 py-2 bg-blue-600 text-white rounded text-sm font-bold hover:bg-blue-700 shadow-md">Edit Invoice</NuxtLink>
                 <NuxtLink :to="`/customers/salesinvoices/editsaleinvoice/${sales_invoice.id}`" class="px-6 py-2 bg-blue-600 text-white rounded text-sm font-bold hover:bg-blue-700 shadow-md">Edit Invoice</NuxtLink>
                 <NuxtLink :to="`/customers/salesinvoices/editinvoice/${sales_invoice.id}`" class="px-6 py-2 bg-blue-600 text-white rounded text-sm font-bold hover:bg-blue-700 shadow-md">Edit Invoice</NuxtLink>
                 <NuxtLink :to="`/customers/salesinvoices/edit/${sales_invoice.id}`" class="px-6 py-2 bg-blue-600 text-white rounded text-sm font-bold hover:bg-blue-700 shadow-md">Edit Invoice</NuxtLink>
                 <NuxtLink :to="`/customers/salesinvoices/${sales_invoice.id}/edit`" class="px-6 py-2 bg-blue-600 text-white rounded text-sm font-bold hover:bg-blue-700 shadow-md">Edit Invoice</NuxtLink>
                 <NuxtLink :to="`/customers/salesinvoices/${sales_invoice.id}/editinvoice`" class="px-6 py-2 bg-blue-600 text-white rounded text-sm font-bold hover:bg-blue-700 shadow-md">Edit Invoice</NuxtLink>
                 <NuxtLink :to="`/customers/salesinvoices/${sales_invoice.id}/editsaleinvoice`" class="px-6 py-2 bg-blue-600 text-white rounded text-sm font-bold hover:bg-blue-700 shadow-md">Edit Invoice</NuxtLink> -->
                    <NuxtLink to="/customers/salesinvoices/viewinvoices"
                        class="px-4 py-2 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50">Back to
                        List</NuxtLink>
                </div>
            </form>
        </div>
    </div>
    <div v-else class="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div class="text-gray-500 text-lg">Loading sales invoice details...</div>
    </div>
</template>


<script lang="ts" setup>

import { ref, onMounted } from 'vue'
import { useRuntimeConfig } from '#app'
import { useRoute } from 'vue-router'
import { createClient } from '@supabase/supabase-js'

const config = useRuntimeConfig()
const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabasePublishableKey
)


const customers = ref<any[]>([])
const products = ref<any[]>([])
const units = ref<any[]>([])

async function updateSalesInvoice() {

    console.log("Button clicked")

    if (!sales_invoice.value.customer_id || !sales_invoice.value.invoice_number || sales_invoice.value.items.some(item => !item.product_id || !item.unit_id)) {
        alert('Please fill all required fields.')
        return
    }

    calculateTotal()

    const { data, error } = await supabase
        .from('sales_invoice')
        .update({
            customer_id: sales_invoice.value.customer_id,
            invoice_number: sales_invoice.value.invoice_number,
            invoice_date: sales_invoice.value.invoice_date,
            status: sales_invoice.value.status,
            total_amount: sales_invoice.value.total_amount
        })
        .eq('id', sales_invoice.value.id)
        .select()

    console.log('Data =', data)
    console.log('Error =', error)

    if (error) {
        alert(error.message)
        return
    }

    const { error: deleteError } = await supabase
        .from('sales_invoice_items')
        .delete()
        .eq('invoice_id', sales_invoice.value.id)

    if (deleteError) {
        alert(deleteError.message)
        return
    }

    const itemsToInsert = sales_invoice.value.items.map(item => ({
        invoice_id: sales_invoice.value.id,
        product_id: item.product_id,
        unit_id: item.unit_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
        amount: item.amount
    }))

    const { error: itemsError } = await supabase
        .from('sales_invoice_items')
        .insert(itemsToInsert)

    if (itemsError) {
        alert(itemsError.message)
        return
    }

    alert('Invoice updated successfully')

    navigateTo(`/customers/salesinvoices/${sales_invoice.value.id}`)
}

interface SalesInvoiceItem {
    product_id: string
    product_name: string
    quantity: number
    unit_id: string
    unit_name: string
    unit_price: number
    amount: number
}

interface SalesInvoice {
    id: string
    invoice_number: string
    invoice_date: string
    customer_id: string
    customer_name: string
    total_amount: number
    created_at: string
    status: string
    items: SalesInvoiceItem[]
}

const route = useRoute();
const sales_invoice = ref<SalesInvoice>({
    id: '',
    invoice_number: '',
    invoice_date: '',
    customer_id: '',
    customer_name: '',
    total_amount: 0,
    created_at: '',
    status: '',
    items: []
});

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

const addItem = () => {
    sales_invoice.value.items.push({ product_id: '', product_name: '', quantity: 1, unit_id: '', unit_name: '', unit_price: 0, amount: 0 })
}

const removeItem = (index: number) => {
    if (sales_invoice.value.items.length > 1) {
        sales_invoice.value.items.splice(index, 1)
        calculateTotal()
    }
}

const updateItemPrice = (index: number) => {
    const item = sales_invoice.value.items[index]
    if (!item) return

    const product = products.value.find(product => product.id === item.product_id)
    if (product) {
        item.unit_price = product.price || 0
        calculateLineAmount(index)
    }
}

const calculateLineAmount = (index: number) => {
    const item = sales_invoice.value.items[index]
    if (!item) return

    item.amount = (item.quantity || 0) * (item.unit_price || 0)
    calculateTotal()
}

const calculateTotal = () => {
    sales_invoice.value.total_amount = sales_invoice.value.items.reduce((sum, item) => sum + (item.amount || 0), 0)
}

async function getSalesInvoiceDetails() {

    const invoiceId = route.params.id as string

    const { data, error } = await supabase
        .from('sales_invoice')
        .select(`
            id,
            invoice_number,
            invoice_date,
            customer_id,
            total_amount,
            created_at,
            status,
            customer:customer_id(name),
            items:sales_invoice_items(
                product_id(id, name),
                quantity,
                unit_id(id, name),
                unit_price,
                amount
            )
        `)
        .eq('id', invoiceId)
        .single()

    console.log('Supabase query result:', data)

    if (error) {
        console.error(error)
        return
    }

    sales_invoice.value = {
        id: data.id,
        invoice_number: data.invoice_number,
        invoice_date: data.invoice_date,
        customer_id: data.customer_id,
        total_amount: data.total_amount,
        created_at: data.created_at,
        status: data.status,
        customer_name: data.customer?.name || '',
        items: (data.items || []).map((item: any) => ({
            product_id: item.product_id?.id || '',
            product_name: item.product_id?.name || '',
            quantity: item.quantity,
            unit_id: item.unit_id?.id || '',
            unit_name: item.unit_id?.name || '',
            unit_price: item.unit_price,
            amount: item.amount
        }))
    }

    calculateTotal()
}

onMounted(() => {
    fetchData()
    getSalesInvoiceDetails()

})

definePageMeta({
    layout: 'side-bar'
})
</script>
