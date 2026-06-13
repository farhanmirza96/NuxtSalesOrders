<template>
    <div class="p-6 bg-gray-50 min-h-screen" v-if="sales_invoice.id">
        <div class="max-w-6xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
            <!-- Header Section -->
            <div class="p-4 border-b border-gray-200 bg-[#5E7AC4] rounded-t-lg flex justify-between items-center">
                <h1 class="text-xl font-bold text-white">Sales Invoice Details</h1>
                <div class="text-white text-sm font-medium">Invoice #{{ sales_invoice.invoice_number }}</div>
            </div>

            <!-- Order Details Section -->
            <div class="p-6 space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="space-y-1">
                        <label class="block text-xs font-semibold text-gray-500 uppercase">Invoice Number</label>
                        <div class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm">{{ sales_invoice.invoice_number }}</div>
                    </div>
                    <div class="space-y-1">
                        <label class="block text-xs font-semibold text-gray-500 uppercase">Invoice Date</label>
                        <div class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm">{{ sales_invoice.invoice_date }}</div>
                    </div>
                    <div class="space-y-1">
                        <label class="block text-xs font-semibold text-gray-500 uppercase">Customer Name</label>
                        <div class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm">{{ sales_invoice.customer_name }}</div>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="space-y-1">
                        <label class="block text-xs font-semibold text-gray-500 uppercase">Status</label>
                        <div class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm capitalize">{{ sales_invoice.status }}</div>
                    </div>
                    <div class="space-y-1">
                        <label class="block text-xs font-semibold text-gray-500 uppercase">Total Amount</label>
                        <div class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm">Rs. {{ sales_invoice.total_amount }}</div>
                    </div>
                    <div class="space-y-1">
                        <label class="block text-xs font-semibold text-gray-500 uppercase">Created At</label>
                        <div class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm">{{ new Date(sales_invoice.created_at).toLocaleString() }}</div>
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
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        <tr v-for="(item, index) in sales_invoice.items" :key="index" class="hover:bg-gray-50">
                            <td class="px-4 py-2">{{ index + 1 }}</td>                            
                            <td class="px-4 py-2">{{ item.product_name }}</td>
                            <td class="px-4 py-2">{{ item.quantity }}</td>
                            <td class="px-4 py-2">{{ item.unit_name }}</td>
                            <td class="px-4 py-2">{{ item.unit_price }}</td>
                            <td class="px-4 py-2">{{ item.amount }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Footer Actions -->
            <div class="flex justify-end gap-3 p-4 border-t border-gray-100">
                <NuxtLink :to="`/customers/salesinvoices/edit/${sales_invoice.id}`" class="px-6 py-2 bg-blue-600 text-white rounded text-sm font-bold hover:bg-blue-700 shadow-md">Edit Invoice</NuxtLink>
                <NuxtLink to="/customers/salesinvoices/viewinvoices" class="px-4 py-2 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50">Back to List</NuxtLink>
            </div>
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

interface SalesInvoiceItem {
    product_name: string
    quantity: number
    unit_name: string
    unit_price: number
    amount: number
}

interface SalesInvoice {
    id: string
    invoice_number: string
    invoice_date: string
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
    customer_name: '',
    total_amount: 0,
    created_at: '',
    status: '',
    items: []
});

async function getSalesInvoiceDetails() {
    const invoiceId = route.params.id as string
    if (!invoiceId) {
        console.error('Invoice ID is missing in the route parameters.')
        return
    }

    const { data, error } = await supabase
        .from('sales_invoice')
        .select(`
            id,
            invoice_number,
            invoice_date,
            total_amount,
            created_at,
            status,
            customer:customer_id (name),
            items:sales_invoice_items (
                product_id (name),
                quantity,
                unit_id (name),
                unit_price,
                amount
            )
        `)
        .eq('id', invoiceId)
        .maybeSingle() // changed to maybeSingle to avoid 406 errors

    console.log('Supabase query result (data, error):', { data, error });

    if (error) {
        console.error('sales_invoice/[id].vue:Error fetching sales invoice details:', error)
        return
    }

    if (data) {
        sales_invoice.value = {
            id: data.id,
            invoice_number: data.invoice_number,
            invoice_date: data.invoice_date,
            total_amount: data.total_amount,
            created_at: data.created_at,
            status: data.status,
            customer_name: data.customer?.name || 'N/A',
            items: (data.items || []).map((item: any) => ({
                product_name: item.product_id?.name,
                quantity: item.quantity,
                unit_name: item.unit_id?.name,
                unit_price: item.unit_price,
                amount: item.amount
            }))
        };
        console.log('Mapped sales_invoice.value:', sales_invoice.value);
    } else {
        console.warn(`sales_invoice/[id].vue:No invoice found with ID: ${invoiceId}`);
        sales_invoice.value = { items: [] } as SalesInvoice;
    }
}

onMounted(() => {
    getSalesInvoiceDetails()
})

definePageMeta({
    layout: 'side-bar'
})
</script>