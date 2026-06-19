<template>
    <div class="p-6 bg-gray-50 min-h-screen" v-if="sales_order.id">
        <div class="max-w-6xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
            <!-- Header Section -->
            <div class="p-4 border-b border-gray-200 bg-[#5E7AC4] rounded-t-lg flex justify-between items-center">
                <h1 class="text-xl font-bold text-white">Sales Order Details</h1>
                <div class="text-white text-sm font-medium">Order #{{ sales_order.order_number }}</div>
            </div>

            <!-- Order Details Section -->
            <div class="p-6 space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="space-y-1">
                        <label class="block text-xs font-semibold text-gray-500 uppercase">Order Number</label>
                        <div class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm">{{ sales_order.order_number }}</div>
                    </div>
                    <div class="space-y-1">
                        <label class="block text-xs font-semibold text-gray-500 uppercase">Order Date</label>
                        <div class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm">{{ sales_order.order_date }}</div>
                    </div>
                    <div class="space-y-1">
                        <label class="block text-xs font-semibold text-gray-500 uppercase">Customer Name</label>
                        <div class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm">{{ sales_order.customer_name }}</div>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="space-y-1">
                        <label class="block text-xs font-semibold text-gray-500 uppercase">Status</label>
                        <div class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm capitalize">{{ sales_order.status }}</div>
                    </div>
                    <div class="space-y-1">
                        <label class="block text-xs font-semibold text-gray-500 uppercase">Total Amount</label>
                        <div class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm">Rs. {{ sales_order.total_amount }}</div>
                    </div>
                    <div class="space-y-1">
                        <label class="block text-xs font-semibold text-gray-500 uppercase">Created At</label>
                        <div class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm">{{ new Date(sales_order.created_at).toLocaleString() }}</div>
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
                            <th class="px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        <tr v-for="(item, index) in sales_order.items" :key="index" class="hover:bg-gray-50">
                            <td class="px-4 py-2">{{ index + 1 }}</td>                            
                            <td class="px-4 py-2">{{ item.product_name }}</td>
                            <td class="px-4 py-2">{{ item.quantity }}</td>
                            <td class="px-4 py-2">{{ item.unit_name }}</td>
                            <td class="px-4 py-2">{{ item.unit_price }}</td>
                            <td class="px-4 py-2">{{ item.amount }}</td>
                            <td class="px-4 py-2 text-right">{{ item.status }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Footer Actions -->
            <div class="flex justify-end gap-3 p-4 border-t border-gray-100">
                <NuxtLink :to="`/customers/salesorders/edit/${sales_order.id}`" class="px-6 py-2 bg-blue-600 text-white rounded text-sm font-bold hover:bg-blue-700 shadow-md">Edit Order</NuxtLink>
                <NuxtLink to="/customers/salesorders" class="px-4 py-2 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50">Back to List</NuxtLink>
            </div>
        </div>
    </div>
    <div v-else class="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div class="text-gray-500 text-lg">Loading sales order details...</div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRuntimeConfig } from '#app'
import { useRoute } from 'vue-router'

interface SalesOrderItem {
    product_name: string
    quantity: number
    unit_name: string
    unit_price: number
    amount: number
    status: string
}

interface SaleOrder {
    id: string | number
    order_number: string
    order_date: string
    customer_name: string
    total_amount: number
    created_at: string
    status: string
    items: SalesOrderItem[]
}

const route = useRoute()
const config = useRuntimeConfig()
const { createClient } = await import('@supabase/supabase-js')
const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabasePublishableKey
)

const sales_order = ref<SaleOrder>({ items: [] } as any)

async function getSaleOrderDetails() {
    const orderId = route.params.id
    if (!orderId) {
        console.error('Order ID is missing from URL')
        return
    }

    console.log('Fetching details for Order ID:', orderId)

    const { data, error } = await supabase
        .from('sales_order')
        .select(`
            id, order_number, order_date, status, total_amount, created_at,
            customer_id ( name ),
            sales_order_items (
                product_id ( name ),
                quantity,
                unit_id ( name ),
                unit_price,
                amount,
                status
            )
        `)
        .eq('id', orderId)
        .maybeSingle() // changed to maybeSingle to avoid 406 errors

    if (error) {
        console.error('salesorders/[id].vue: Error fetching sales order details:', error)
        alert('Supabase Error: ' + error.message)
    } else if (data) {
        console.log('salesorders/[id].vue: Data received from Supabase:', data)
        // Ensure customer_id and product_id are correctly mapped from the nested structure
        // Supabase returns nested objects for foreign key relationships
        sales_order.value = { 
            ...data, 
            customer_name: data.customer_id?.name || 'N/A', 
            items: (data.sales_order_items || []).map((item: any) => ({ 
                ...item, 
                product_name: item.product_id?.name || 'Unknown Product', 
                unit_name: item.unit_id?.name || 'N/A' 
            })) 
        }
    } else {
        console.warn('salesorders/[id].vue: No order found with ID:', orderId)
    }
    console.log('salesorders/[id].vue: sales_order.value after fetch:', sales_order.value);

}

onMounted(() => {
    getSaleOrderDetails()
    console.log('salesorders/[id].vue: Component mounted.');
})


definePageMeta({
    layout: 'side-bar'
})
</script>