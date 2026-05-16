<template>
  <div>
    <h1>About Us</h1>
    <AppAlert>
      This is an auto-imported component
    </AppAlert><br />
    <NuxtLink to="/home">Home</NuxtLink> |
    <NuxtLink to="/customers/salesorders/salesorders">Sales Orders</NuxtLink> |
    <NuxtLink to="/vendors/purchaseorders/purchaseorders">Purchase Orders</NuxtLink> |
    <NuxtLink to="/inventory/inventory">Inventory</NuxtLink> |
  </div>
</template>

<script setup>
definePageMeta({
    layout: 'side-bar'
})
</script>