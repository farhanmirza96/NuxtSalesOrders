<template>
    <div class="p-6 bg-gray-50 min-h-screen">
        <div class="max-w-screen mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
            <!-- Header Section -->
            <div class="p-4 border-b border-gray-200 bg-[#5E7AC4] rounded-t-lg flex justify-between items-center text-white">
                <h1 class="text-xl font-bold">Invoices</h1>
                <div class=" text-sm font-medium">Invoices List</div>
            </div>



            <!-- Items Table Section -->
            <div class="mt-8 border border-gray-200 rounded">
                <table class="w-full text-sm text-left">
                    <thead class="bg-gray-200 text-gray-600 uppercase text-xs font-bold border-b border-gray-200">
                        <tr>
                            <th class="px-4 py-2">S.No.</th>
                            <th class="px-4 py-2">Num</th>
                            <th class="px-4 py-2">Date</th>
                            <th class="px-4 py-2">Customer Name</th>
                            <th class="px-4 py-2">Total Amount</th>
                            <th class="px-4 py-2">Status</th>
                            <th class="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        <tr v-for="(invoice, index) in sales_invoice" :key="invoice.id"
                            :class="[(index + 1) % 2 === 0 ? 'bg-gray-100' : 'bg-white']"
                            class="hover:bg-gray-200 cursor-pointer">
                            <td class="px-4 py-2">{{ index + 1 }}</td>
                            <td class="px-4 py-2">{{ invoice.invoice_number }}</td>
                            <td class="px-4 py-2">{{ invoice.invoice_date }}</td>
                            <td class="px-4 py-2">{{ invoice.customer_name }}</td>
                            <td class="px-4 py-2">Rs. {{ invoice.total_amount }}</td>
                            <td class="px-4 py-2 capitalize">{{ invoice.status }}</td>
                            <td class="px-4 py-2">
                                <NuxtLink :to="`/customers/salesinvoices/${invoice.id}`"
                                    class="text-blue-600 hover:text-blue-800 font-medium">View Details</NuxtLink>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRuntimeConfig } from '#app'
import { createClient } from '@supabase/supabase-js'

const config = useRuntimeConfig()
const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabasePublishableKey
)

interface SalesInvoice {
    id: string
    invoice_number: string
    invoice_date: string
    customer_name: string
    total_amount: number
    status: string
}

const sales_invoice = ref<SalesInvoice[]>([])

async function getInvoices() {
    const { data, error } = await supabase
        .from('sales_invoice')
        .select(`
            id,
            invoice_number,
            invoice_date,
            status,
            total_amount,
            customer:customer_id(name)
        `)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching sales invoices:', error)
    } else {
        sales_invoice.value = (data || []).map((inv: any) => ({
            ...inv,
            customer_name: inv.customer?.name || 'N/A'
        }))
    }
}

onMounted(() => {
    getInvoices()
})

definePageMeta({
    layout: 'side-bar'
})
</script>