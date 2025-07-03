<template>
  <div>
    <NavbarComponent @show-cart="sideCartOpen = true" />
    <SideCart :isActive="sideCartOpen" @close="sideCartOpen = false" />
    <main>
      <slot />
    </main>
    <FooterComponent />
  </div>
</template>

<script setup lang="ts">
import NavbarComponent from './NavbarComponent.vue';
import FooterComponent from './Footer.vue';
import SideCart from './SideCart.vue';
import { ref } from 'vue';
const sideCartOpen = ref(false);

// import NavbarComponent from './Navbar.vue'
// import FooterComponent from './Footer.vue'
// import SideCart from './SideCart.vue'

// export default {
//     name: 'LayoutPage',
//     components: {
//         NavbarComponent,
//         FooterComponent,
//         SideCart
//     },
//     data() {
//         return {
//             sideCartOpen: false
//         }
//     }
// }
</script>

<style scoped>
main {
  min-height: 80vh;
  padding: 2rem 0;
}
</style>
