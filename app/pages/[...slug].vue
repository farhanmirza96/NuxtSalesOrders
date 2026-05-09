<script setup>
const route = useRoute();
</script>
<template>
    <p>This is Blog dynamic page</p><br />
    
    <p>Your desired link <strong>{{ route.params.slug.join('/') }}</strong> dosen't exists</p>
    <NuxtLink to="/home">Home</NuxtLink>
</template>