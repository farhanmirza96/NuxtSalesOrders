<template>
  
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 to-blue-700">
    <div class="w-96 mx-auto bg-white/20 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/30">
      <div class="w-full max-w-sm text-white">
      
      <!-- Avatar -->
      <div class="flex justify-center mb-6">
        <div class="w-20 h-20 rounded-full border border-white flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.121 17.804A9 9 0 1118.88 17.8M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>

      <!-- Title -->
      <h2 class="text-center tracking-widest text-lg mb-8 opacity-80" v-gsap.splitText.chars.from="{ opacity: 0, y: 20 }">
        LOGIN
      </h2>

      <!-- Form -->
      <form class="space-y-6">
        
        <!-- Email -->
        <div class="border-b border-white/50 flex items-center gap-3 pb-2">
          <span class="opacity-70">✉️</span>
          <input
            type="text"
            placeholder="Username"
            class="bg-transparent w-full outline-none placeholder-white/70"
          />
        </div>

        <!-- Password -->
        <div class="border-b border-white/50 flex items-center gap-3 pb-2">
          <span class="opacity-70">🔒</span>
          <input
            type="password"
            placeholder="Password"
            class="bg-transparent w-full outline-none placeholder-white/70"
          />
        </div>

        <!-- Options -->
        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center gap-2">
            <input type="checkbox" class="accent-white" />
            <span>Remember me</span>
          </label>
          <a href="#" class="opacity-80 hover:underline">
            Forgot Password?
          </a>
        </div>

        <!-- Button -->
        <button
          type="submit"
          class="w-full bg-blue-900/70 hover:bg-blue-900 text-white py-3 mt-4 tracking-wide rounded-lg"
          
        >
          LOGIN
        </button>
      </form>
    </div>
    </div>
  </div>
</template>


<script setup>
// definePageMeta({
//   layout: 'default',
  
// })

// import { ref, onMounted } from 'vue'
// import { gsap } from 'gsap'

// const box = ref(null)

// onMounted(() => {
//   gsap.to(box.value, {
//     x: 200,
//     rotation: 360,
//     backgroundColor: '#8d5cf6',
//     duration: 2,
//     ease: 'elastic.out(1, 0.3)'
//   })
// })

</script>

<style scoped>
.box {
  width: 100px;
  height: 100px;
  background-color: #42b883;
}
</style>

