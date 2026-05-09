<script setup lang="ts">
definePageMeta({
  layout: 'side-bar'
})
</script>

<template>
<div>
    <h1>Welcome username</h1>
</div><br />
<NuxtLink to="/customers/salesorders/salesorders">Sales Orders</NuxtLink> | 
<NuxtLink to="/vendors/purchaseorders/purchaseorders">Purchase Orders</NuxtLink> | 
<NuxtLink to="/inventory/inventory">Inventory</NuxtLink>
</template>

<style scoped>
</style>