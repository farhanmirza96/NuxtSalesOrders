<template>
    <div class="p-6 bg-gray-50 min-h-screen">
        <div class="max-w-screen mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
            <!-- Header Section -->
            <div class="p-4 border-b border-gray-200 bg-[#5E7AC4] rounded-t-lg flex justify-between items-center text-white">
                <h1 class="text-xl font-bold">Sales Order</h1>
                <div class=" text-sm font-medium">Sales Order List</div>
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
                        <tr v-for="(order, index) in sales_orders" :key="order.id"
                            :class="[(index + 1) % 2 === 0 ? 'bg-gray-100' : 'bg-white']"
                            class="hover:bg-gray-200 cursor-pointer">
                            <td class="px-4 py-2">{{ index + 1 }}</td>
                            <td class="px-4 py-2">{{ order.order_number }}</td>
                            <td class="px-4 py-2">{{ order.order_date }}</td>
                            <td class="px-4 py-2">{{ order.customer_name }}</td>
                            <td class="px-4 py-2">Rs. {{ order.total_amount }}</td>
                            <td class="px-4 py-2 capitalize">{{ order.status }}</td>
                            <td class="px-4 py-2">
                                <NuxtLink :to="`/customers/salesorders/${order.id}`"
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
const config = useRuntimeConfig()
const { createClient } = await import('@supabase/supabase-js')
const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabasePublishableKey
)

interface SalesOrderItem {
    product_name: string
    quantity: number
    unit_name: string
    unit_price: number
    amount: number
    status: string // Assuming status can be per item
    order_number: string // Assuming order_number can be per item
    customer_name: string // Assuming customer_name can be per item
}

interface SaleOrder {
    id: string | number
    order_number: string
    order_date: string
    customer_name: string
    total_amount: number
    created_at: string
    status: string
}

const sales_orders = ref<SaleOrder[]>([])

async function getSaleOrders() {
    const { data, error } = await supabase
        .from('sales_order')
        .select(`
            id,
            order_number,
            order_date,
            status,
            total_amount,
            customer:customer_id(name)
        `)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching sales orders:', error)
    } else {
        console.log('viewsaleorder.vue: Fetched sales orders data:', data);
        sales_orders.value = (data || []).map((order: any) => ({
            ...order,
            customer_name: order.customer?.name || 'N/A'
        }))
    }
}

onMounted(() => {
    getSaleOrders()
})

definePageMeta({
    layout: 'side-bar'
})
</script>