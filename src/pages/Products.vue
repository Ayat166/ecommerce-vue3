<template>
  <div class="products-page">
    <h1>Products</h1>
    <div class="sort-controls">
      <SortDropdown @sort="sortProducts" />
    </div>
    <div class="product-cards">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script lang="ts">
import ProductCard from '../components/ProductCard.vue'
import { mapGetters, mapActions } from 'vuex';
import SortDropdown from '../components/SortDropdown.vue';
import type { Product } from '../stores';
export default {
  name: 'ProductsPage',
  components: { ProductCard, SortDropdown },
  data() {
    return {
      products: [] as Product[]
    }
  },
  computed: {
    ...mapGetters(['allProducts'])
  },
  mounted() {
    this.fetchProducts().then(() => {
      this.products = [...(this.allProducts as Product[])];
    });
  },
  methods: {
    ...mapActions(['fetchProducts']),
    sortProducts(sortOption: string) {
      if (sortOption === 'price-asc') {
        this.products = [...this.products].sort((a, b) => a.price - b.price);
      } else if (sortOption === 'price-desc') {
        this.products = [...this.products].sort((a, b) => b.price - a.price);
      } else if (sortOption === 'rating') {
        this.products = [...this.products].sort((a, b) => {
          const aRating = (a as Product & { rating?: { rate: number } }).rating;
          const bRating = (b as Product & { rating?: { rate: number } }).rating;
          if (aRating && bRating) {
            return bRating.rate - aRating.rate;
          }
          return 0;
        });
      } else {
        // Default case: no sorting
        this.products = [...(this.allProducts as Product[])];
      }
    }
  },

}
</script>

<style scoped>
.products-page {
  padding: 2rem 0;
}

.products-page h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.product-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}

.sort-controls {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}
</style>
