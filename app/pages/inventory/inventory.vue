<template>
    <div class="pt-2">
        <header>
            <h1 class="text-2xl font-bold rounded-md p-2 bg-[#5E7AC4] text-white">Inventory</h1>
        </header>
    </div>
    <div class="flex flex-col items-center justify-center text-center">
        <div class="mb-4">
        <h1 class="text-2xl"><strong>Company name</strong></h1>
        <h2 class="text-xl">Inventory by Item</h2>
    </div>

    <div class="w-full max-w-4xl">
        <table class="table-auto border-separate border-spacing-2 w-full text-left">
            <thead class="bg-gray-100">
                <tr>
                    <th class="border-1 border-gray-100 border-b-gray-500">Item</th>
                    <th class="border-1 border-gray-100 border-b-gray-500 ">Quantity</th>
                    <th class="border-1 border-gray-100 border-b-gray-500">Unit</th>
                    <th class="border-1 border-gray-100 border-b-gray-500">Cost</th>
                    <th class="border-1 border-gray-100 border-b-gray-500">Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                    <td>10</td>
                    <td>kg</td>
                    <td>100</td>
                    <td>1000</td>
                </tr>
                <tr>
                    <td>Witchy Woman</td>
                    <td>15</td>
                    <td>kg</td>
                    <td>150</td>
                    <td>2250</td>
                </tr>
                <tr>
                    <td>Shining Star</td>
                    <td>20</td>
                    <td>kg</td>
                    <td>200</td>
                    <td>4000</td>
                </tr>
            </tbody>
        </table>
        </div>
    </div>

    <br />
    <NuxtLink to="/home">Home</NuxtLink> | 
    <NuxtLink to="/purchaseorders/purchaseorders">Purchase Orders</NuxtLink> | 
    <NuxtLink to="/salesorders/salesorders">Sales Orders</NuxtLink>
</template>

<script setup>
definePageMeta({
    layout: 'side-bar'
})
</script>