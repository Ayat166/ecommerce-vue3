<template>
  <div class="product-details-container">
    <div class="product-details-card">
      <img :src="product?.image" alt="Product Image" class="product-details-image" />
      <div class="product-details-info">
        <h1 class="product-title">{{ product?.title }}</h1>
        <p class="product-price">${{ product?.price }}</p>
        <p class="product-rating">{{ ratingStars }} <span class="rating-count">({{ product?.rating?.count }}
            reviews)</span></p>
        <p class="product-description">{{ product?.description }}</p>
        <button class="btn add-to-cart" @click="handleAddToCart">Add to Cart</button>
        <RouterLink to="/products" class="btn back-btn">Back to Products</RouterLink>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { RouterLink } from 'vue-router'
import type { Product } from '../types/Product'

const route = useRoute()
const store = useStore()

const product = ref<Product | null>(null)
const productId = computed(() => route.params.id)

const ratingStars = computed(() => {
  const rate = Math.round(product.value?.rating?.rate || 0)
  return '★'.repeat(rate) + '☆'.repeat(5 - rate)
})

const handleAddToCart = () => {
  store.dispatch('addToCart', product.value)
}

onMounted(async () => {
  await store.dispatch('fetchProduct', productId.value)
  product.value = store.getters.currentProduct
})


// export default {
//   name: 'ProductDetails',
//   components: { RouterLink },
//   computed: {
//     productId() {
//       return this.$route.params.id;
//     },
//     ratingStars() {
//       const rate = Math.round(this.product?.rating?.rate || 0);
//       return '★'.repeat(rate) + '☆'.repeat(5 - rate);
//     },
//     ...mapGetters(['currentProduct'])
//   },
//   data() {
//     return {
//       product: null,
//     }
//   },

//   methods: {
//     ...mapActions(['fetchProduct']),
//     ...mapActions(['addToCart']),
//     handleAddToCart() {
//       this.addToCart(this.product);
//     }
//   },
//   mounted() {
//     this.fetchProduct(this.productId).then(() => {
//       this.product = this.currentProduct;
//     });
//   },
// }
</script>

<style scoped>
.product-details-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 80vh;
  background: #f8f9fa;
  padding: 2rem 0;
}

.product-details-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: row;
  gap: 2rem;
  padding: 2rem;
  width: 100%;
  padding: 1rem 2rem;
}

.product-details-image {
  width: 500px;
  height: 500px;
  object-fit: contain;
  border-radius: 12px;
  background: #f4f4f4;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  border: 1px solid #e0e0e0;
  padding: 0.2rem;
}

.product-details-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.product-title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #22223b;
}

.product-price {
  font-size: 1.3rem;
  font-weight: bold;
  color: #4cab58;
  margin-bottom: 0.75rem;
}

.product-rating {
  font-size: 1.1rem;
  color: #f7b731;
  margin-bottom: 1rem;
  letter-spacing: 2px;
}

.rating-count {
  color: #888;
  font-size: 0.95rem;
  margin-left: 0.5rem;
}

.product-description {
  color: #444;
  font-size: 1.05rem;
  margin-bottom: 2rem;
}

.btn.add-to-cart {
  background: #4cab58;
  color: #fff;
  margin-bottom: 1rem;
  width: 200px;
  align-self: flex-start;
}

.btn.back-btn {
  background: #666;
  color: #fff;
  width: 200px;
  align-self: flex-start;
}

.btn.add-to-cart:hover {
  background: #388e3c;
}

.btn.back-btn:hover {
  background: #333;
}

@media (max-width: 1024px) {
  .product-details-card {
    flex-direction: column;
    align-items: center;
    padding: 1.5rem;
    gap: 1.5rem;
  }

  .product-details-image {
    width: 350px;
    height: 350px;
  }
}

@media (max-width: 600px) {
  .product-details-container {
    padding: 0.5rem 0;
  }

  .product-details-card {
    padding: 1rem;
    gap: 1rem;
  }

  .product-details-image {
    width: 100%;
    height: 220px;
    max-width: 100%;
    padding: 0.1rem;
  }

  .product-details-info {
    padding: 0;
  }

  .product-title {
    font-size: 1.2rem;
  }

  .product-price,
  .product-rating,
  .product-description {
    font-size: 1rem;
  }

  .btn.add-to-cart,
  .btn.back-btn {
    width: 100%;
    min-width: 0;
  }
}
</style>
