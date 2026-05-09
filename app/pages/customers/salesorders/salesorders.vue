<template>
    <div class="pt-2">
        <header>
            <h1 class="text-2xl font-bold rounded-md p-2 bg-[#5E7AC4] text-white">Sales Orders</h1>
        </header>
    </div>
    <div class="flex flex-col items-center justify-center text-center">
        <div class="mb-4">
        <h1 class="text-2xl"><strong>Company name</strong></h1>
        <h2 class="text-xl">Sales Order by Customer</h2>
    </div>

    <div class="w-full max-w-4xl">
        <table class="table-auto border-separate border-spacing-2 w-full text-left">
            <thead class="bg-gray-100">
                <tr>
                    <th><UCheckbox v-model="value" /></th>
                    <th class="border-1 border-gray-100 border-b-gray-500">Type</th>
                    <th class="border-1 border-gray-100 border-b-gray-500">Date</th>
                    <th class="border-1 border-gray-100 border-b-gray-500">Customer</th>
                    <th class="border-1 border-gray-100 border-b-gray-500">Amount</th>
                    <th class="border-1 border-gray-100 border-b-gray-500">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><UCheckbox v-model="value" /></td>
                    <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                    <td>Malcolm Lockyer</td>
                    <td>2025-01-01</td>
                    <td class="text-right">1961</td>
                    <td>Pending</td>
                </tr>
                <tr>
                    <td><UCheckbox v-model="value" /></td>
                    <td>Witchy Woman</td>
                    <td>The Eagles</td>
                    <td>2025-01-02</td>
                    <td class="text-right">1972</td>
                    <td>Pending</td>
                </tr>
                <tr>
                    <td><UCheckbox v-model="value" /></td>
                    <td>Shining Star</td>
                    <td>Earth, Wind, and Fire</td>
                    <td>2025-01-03</td>
                    <td class="text-right">1975</td>
                    <td>Pending</td>
                </tr>
            </tbody>
        </table>
        </div>
    </div>

    <br />
    <NuxtLink to="/home">Home</NuxtLink> | 
    <NuxtLink to="/vendors/purchaseorders/purchaseorders">Purchase Orders</NuxtLink> | 
    <NuxtLink to="/inventory/inventory">Inventory</NuxtLink>
</template>

<script setup>
definePageMeta({
    layout: 'side-bar'
})
const value = ref(false)
</script>