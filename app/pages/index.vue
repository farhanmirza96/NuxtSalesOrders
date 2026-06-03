<template>
  <div class="min-h-screen flex items-center justify-center overflow-hidden relative">
    <!-- Deep dark background for better glassmorphism -->
    <div ref="bg" class="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950" />

    <div ref="blob1" class="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-blue-600/20 blur-[100px] animate-blob" />
    <div ref="blob2" class="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-purple-600/20 blur-[100px] animate-blob animation-delay-2000" />

    <!-- faint grid for depth -->
    <div class="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />

    <!-- Login card -->
    <div
      ref="card"
      class="relative w-[24rem] mx-auto bg-white/5 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-white/10"
    >
      <!-- Decorative border glow -->
      <div class="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
      <div class="pointer-events-none absolute -inset-1 rounded-[1.1rem] bg-[conic-gradient(from_180deg,rgba(56,189,248,.0),rgba(56,189,248,.35),rgba(217,70,239,.35),rgba(56,189,248,.0))] opacity-60 blur-xl" />

      <div class="relative z-10 w-full max-w-sm text-white">
        <!-- Avatar -->
        <div class="flex justify-center mb-6">
          <div ref="avatar" class="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center bg-white/5 shadow-inner">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M5.121 17.804A9 9 0 0118.88 17.8M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
        </div>

        <!-- Title -->
        <h2 class="text-center tracking-[0.3em] text-xl font-light mb-8 text-white/90" ref="title">
          USER LOGIN
        </h2>

        <!-- Form -->
        <form class="space-y-6" @submit.prevent="onSubmit">
          <!-- Email -->
          <div ref="emailRow" class="bg-white/5 border border-white/10 rounded-xl flex items-center gap-3 px-4 py-3">
            <Icon name="lucide:user" class="text-white/40 w-5 h-5" />
            <input
              v-model="username"
              type="text"
              placeholder="admin"
              class="bg-transparent w-full outline-none placeholder-white/70"
              autocomplete="username"
            />
          </div>

          <!-- Password -->
          <div ref="passwordRow" class="bg-white/5 border border-white/10 rounded-xl flex items-center gap-3 px-4 py-3">
            <Icon name="lucide:lock" class="text-white/40 w-5 h-5" />
            <input
              v-model="password"
              type="password"
              placeholder="••••••••"
              class="bg-transparent w-full outline-none placeholder-white/70"
              autocomplete="current-password"
            />
          </div>

          <!-- Options -->
          <div ref="optionsRow" class="flex items-center justify-between text-sm">
            <label class="flex items-center gap-2">
              <input type="checkbox" v-model="remember" class="accent-white" />
              <span>Remember me</span>
            </label>
            <a href="#" class="opacity-80 hover:underline" @click.prevent>
              Forgot Password?
            </a>
          </div>

          <!-- Button -->
          <button
            ref="loginBtn"
            type="submit"
            class="w-full bg-white text-slate-900 hover:bg-white/90 font-semibold py-3.5 mt-4 tracking-widest rounded-xl transition-all shadow-xl"
          >
            LOGIN
          </button>

          <!-- Small helper text (optional) -->
          <p v-if="message" ref="msg" class="text-center text-xs font-medium text-blue-400 mt-4">{{ message }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { useRouter } from 'vue-router'

const router = useRouter()

const card = ref(null)
const avatar = ref(null)
const title = ref(null)
const emailRow = ref(null)
const passwordRow = ref(null)
const optionsRow = ref(null)
const loginBtn = ref(null)
const msg = ref(null)

// Background refs for more obvious animation
const bg = ref(null)
const blob1 = ref(null)
const blob2 = ref(null)


const username = ref('')
const password = ref('')
const remember = ref(true)
const message = ref('')

// To clean up GSAP tweens/timelines when component unmounts
let tl = null

function onSubmit() {
  if (username.value === 'admin' && password.value === 'admin') {
    message.value = "Signing you in..."
    setTimeout(() => {
      router.push('/home')
    }, 1000)
  } else {
    message.value = 'Invalid credentials. (Hint: admin/admin)'
  }

  // Keep animations safe if gsap not available
  if (!gsap || !loginBtn.value) return

  gsap.fromTo(
    loginBtn.value,
    { scale: 0.98 },
    { scale: 1.02, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }
  )

  if (msg.value) {
    gsap.fromTo(msg.value, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' })
  }
}

onMounted(() => {
  // Important: gsap only on client.
  // Also plugin may be missing in some setups.
  if (!gsap || !card.value || !avatar.value || !title.value) return

  // Create a timeline for a smooth “stunning” entry.
  // This makes the whole page feel orchestrated.
  tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  // 1) Card entrance (scale + fade + subtle rotation)
  tl.fromTo(
    card.value,
    { opacity: 0, y: 40, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'expo.out' }
  )

  // 2) Avatar draw/pop
  tl.fromTo(
    avatar.value,
    { opacity: 0, scale: 0, rotate: -45 },
    { opacity: 1, scale: 1, duration: 0.5 },
    '-=0.35'
  )

  // 3) Title reveal: split effect without relying on splitText directive.
  // We'll animate from y/opacity for the whole title.
  tl.fromTo(
    title.value,
    { opacity: 0, y: 10, letterSpacing: '0.1em' },
    { opacity: 1, y: 0, duration: 0.6, letterSpacing: '0.3em' },
    '-=0.25'
  )

  // 4) Form items stagger in
  tl.fromTo(
    emailRow.value,
    { opacity: 0, x: -20 },
    { opacity: 1, x: 0, duration: 0.35 },
    '-=0.15'
  )
  tl.fromTo(
    passwordRow.value,
    { opacity: 0, x: -20 },
    { opacity: 1, x: 0, duration: 0.35 },
    '-=0.20'
  )
  tl.fromTo(
    optionsRow.value,
    { opacity: 0 },
    { opacity: 1, y: 0, duration: 0.35 },
    '-=0.20'
  )
  tl.fromTo(
    loginBtn.value,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.4 },
    '-=0.15'
  )

  if (bg.value && blob1.value && blob2.value) {
    // orbiting blobs with wider movement
    gsap.to(blob1.value, {
      x: 150,
      y: 100,
      duration: 8,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
    })

    gsap.to(blob2.value, {
      x: -150,
      y: -100,
      duration: 10,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
    })
  }

  // Subtle hover pulse for the login button logic
  if (loginBtn.value) {
    gsap.to(loginBtn.value, {
      keyframes: [
        { boxShadow: '0 0 0px rgba(99,102,241,0.0)', duration: 0.01 },
        { boxShadow: '0 0 28px rgba(99,102,241,0.25)', duration: 0.65 },
        { boxShadow: '0 0 0px rgba(99,102,241,0.0)', duration: 0.8 },
      ],
      repeat: -1,
      ease: 'sine.inOut',
      yoyo: true,
    })
  }
})

onBeforeUnmount(() => {
  // Prevent memory leaks if user navigates away.
  if (tl) tl.kill()
})
</script>

<style scoped>
/* CSS-only ambient animation (cheap + smooth) */
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
    opacity: 0.85;
  }
  50% {
    transform: translate(25px, -35px) scale(1.08);
    opacity: 1;
  }
  100% {
    transform: translate(0px, 0px) scale(1);
    opacity: 0.85;
  }
}

.animate-blob {
  animation: blob 7s ease-in-out infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}
</style>
