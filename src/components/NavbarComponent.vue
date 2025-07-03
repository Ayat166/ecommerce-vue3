<template>
  <header class="navbar">
    <div class="container navbar-inner">

      <div class="logo">
        <LogoIcon />
      </div>

      <nav :class="['nav-links', { open: isOpen }]">
        <router-link to="/">Home</router-link>
        <router-link to="/products">Products</router-link>
        <router-link to="/contact">Contact us</router-link>
      </nav>
      <div class="nav-icons">
        <button>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19 19L13.8 13.8M16 8.5C16 12.6421 12.6421 16 8.5 16C4.35786 16 1 12.6421 1 8.5C1 4.35786 4.35786 1 8.5 1C12.6421 1 16 4.35786 16 8.5Z"
              stroke="#4B4B60" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
        <a href="#" class="sign-in">Sign In</a>
        <button @click="$emit('show-cart')" class="cart-btn">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 5H19L17.5 13H6.5L5 5Z" stroke="#4B4B60" stroke-width="2" stroke-linejoin="round" />
            <path
              d="M8 18C8.55228 18 9 17.5523 9 17C9 16.4477 8.55228 16 8 16C7.44772 16 7 16.4477 7 17C7 17.5523 7.44772 18 8 18Z"
              fill="#4B4B60" />
            <path
              d="M16 18C16.5523 18 17 17.5523 17 17C17 16.4477 16.5523 16 16 16C15.4477 16 15 16.4477 15 17C15 17.5523 15.4477 18 16 18Z"
              fill="#4B4B60" />
            <path d="M2 2H4L4.5 5" stroke="#4B4B60" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span v-show="Number(cartCount) > 0" class="cart-badge">{{ Number(cartCount) }}</span>
        </button>
      </div>

      <button class="menu-toggle" @click="toggleMenu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from '../stores/index';
import LogoIcon from './LogoComponent.vue';
import type { ProductCart } from '../types/ProductCart';
const store = useStore();
const isOpen = ref(false);
const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};
// Use computed for cartCount to ensure reactivity
const cartCount = computed(() => {
  const cartItems = store.cartItems;
  return cartItems.reduce((total, item) => total + item.quantity, 0);
});
</script>
