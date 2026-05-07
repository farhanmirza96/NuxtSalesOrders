import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

if (process.client) {
  gsap.registerPlugin(ScrollTrigger, TextPlugin)
}

export default defineNuxtPlugin(() => {
  if (process.client) {
    return {
      provide: {
        gsap
      }
    }
  }
})
