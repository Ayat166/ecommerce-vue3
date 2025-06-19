<template>
  <header class="navbar">
    <div class="container navbar-inner">

      <div class="logo">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 6h-4v20h4v-8h8v-4h-8V6z" fill="#333" />
        </svg>
      </div>

      <nav :class="['nav-links', { open: isOpen }]">
        <router-link to="/">Home</router-link>
        <router-link to="/products">Products</router-link>
        <a href="#">Contact us</a>
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
        <button @click="$emit('show-cart')">
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

<script lang="ts">
import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import '../styles/navbar.css'
export default defineComponent({
  name: 'Navbar',
  components: { RouterLink },
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen
    }
  }
})
</script>
