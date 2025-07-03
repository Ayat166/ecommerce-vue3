<template>
  <div class="products-page">
    <h1>Products</h1>
    <div class="sort-controls">
      <SortDropdown v-model="selectedSort" />
    </div>
    <div class="product-cards">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useStore } from '../stores/index';
import ProductCard from '../components/ProductCard.vue';
import SortDropdown from '../components/SortDropdown.vue';
import type { Product } from '../types/Product'

const store = useStore();

const products = ref<Product[]>([]);
const selectedSort = ref('default');
const fetchProducts = async () => {
  await store.fetchProducts();
  products.value = [...(store.allProducts as Product[])];
};
const sortProducts = (sortOption: string) => {
  if (sortOption === 'price-asc') {
    products.value.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'price-desc') {
    products.value.sort((a, b) => b.price - a.price);
  } else if (sortOption === 'rating') {
    products.value.sort((a, b) => {
      const aRating = (a as Product & { rating?: { rate: number } }).rating;
      const bRating = (b as Product & { rating?: { rate: number } }).rating;
      return (bRating?.rate || 0) - (aRating?.rate || 0);
    });
  } else {
    // Default case: no sorting
    products.value = [...(store.allProducts as Product[])];
  }
};
watch(selectedSort, (newSort) => {
  sortProducts(newSort);
});
onMounted(() => {
  fetchProducts();
});

// defineExpose({
//   products,
//   fetchProducts,
//   sortProducts,
// });

// import ProductCard from '../components/ProductCard.vue'
// import { mapGetters, mapActions } from 'vuex';
// import SortDropdown from '../components/SortDropdown.vue';
// import type { Product } from '../stores';
// export default {
//   name: 'ProductsPage',
//   components: { ProductCard, SortDropdown },
//   data() {
//     return {
//       products: [] as Product[]
//     }
//   },
//   computed: {
//     ...mapGetters(['allProducts'])
//   },
//   mounted() {
//     this.fetchProducts().then(() => {
//       this.products = [...(this.allProducts as Product[])];
//     });
//   },
//   methods: {
//     ...mapActions(['fetchProducts']),
//     sortProducts(sortOption: string) {
//       if (sortOption === 'price-asc') {
//         this.products = [...this.products].sort((a, b) => a.price - b.price);
//       } else if (sortOption === 'price-desc') {
//         this.products = [...this.products].sort((a, b) => b.price - a.price);
//       } else if (sortOption === 'rating') {
//         this.products = [...this.products].sort((a, b) => {
//           const aRating = (a as Product & { rating?: { rate: number } }).rating;
//           const bRating = (b as Product & { rating?: { rate: number } }).rating;
//           if (aRating && bRating) {
//             return bRating.rate - aRating.rate;
//           }
//           return 0;
//         });
//       } else {
//         // Default case: no sorting
//         this.products = [...(this.allProducts as Product[])];
//       }
//     }
//   },

// }
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
