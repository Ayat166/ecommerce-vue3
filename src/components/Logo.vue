<template>
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="sa-bg" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stop-color="#42b983" />
        <stop offset="100%" stop-color="#35495e" />
      </radialGradient>
    </defs>
    <circle cx="24" cy="24" r="22" fill="#333" stroke="#42b983" stroke-width="2" />
    <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" font-family="'Segoe UI', Arial, sans-serif"
      font-size="20" font-weight="bold" fill="#fff" letter-spacing="2">SA</text>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'LogoIcon',
});
</script>
