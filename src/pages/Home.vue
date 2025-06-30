<template>
  <div class="home-page">
    <section class="hero">
      <div class="hero-content">
        <h1>Welcome to Saqaya Ecommerce</h1>
        <p>Your one-stop shop for the best products online. Discover amazing deals and top-rated items!</p>
        <router-link to="/products" class="shop-btn">Shop Now</router-link>
      </div>
      <LogoIcon class="hero-img" style="width: 120px; height: 120px;" />
    </section>

    <section class="top-products">
      <h2>Top 6 Rated Products</h2>
      <ProductSlider :products="topProducts" :visibleCount="3" />
    </section>
  </div>
</template>

<script lang="ts">

import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import ProductSlider from '../components/ProductSlider.vue';
import LogoIcon from '../components/Logo.vue';

export default {
  name: "HomePage",
  components: {
    ProductSlider,
    LogoIcon,
  },
  setup() {
    const store = useStore();

    onMounted(() => {
      if (!store.state.products || store.state.products.length === 0) {
        store.dispatch('fetchProducts');
      }
    });

    // Get top 6 rated products
    const topProducts = computed(() => {
      return [...(store.state.products || [])]
        .filter(p => p.rating && typeof p.rating.rate === 'number')
        .sort((a, b) => b.rating.rate - a.rating.rate)
        .slice(0, 6);
    });

    return { topProducts };
  },
}
</script>
