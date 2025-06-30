<template>
  <div class="slider-container">
    <button class="slider-btn prev" @click="prevSlide">&#8592;</button>
    <div class="slider-viewport">
      <div class="slider-track" :style="{
        transform: `translateX(-${trackTranslate}%)`,
        transition: isTransitioning ? 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)' : 'none'
      }">
        <div class="product-cards slider-cards-inline">
          <div class="slider-item" v-for="(product, idx) in displayProducts"
            :key="(product && product.id ? product.id : idx) + '-' + idx">
            <ProductCard v-if="product" :product="product" />
          </div>
        </div>
      </div>
    </div>
    <button class="slider-btn next" @click="nextSlide">&#8594;</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import type { PropType } from 'vue';
import ProductCard from './ProductCard.vue';
import type { Product } from '../stores';

export default defineComponent({
  name: 'ProductSlider',
  components: { ProductCard },
  props: {
    products: {
      type: Array as PropType<Product[]>,
      required: true,
    },
    visibleCount: {
      type: Number,
      default: 3,
    },
  },
  setup(props) {
    // --- True infinite/circular slider logic ---
    const isTransitioning = ref(true);
    const currentIndex = ref(0); // Always points to the first visible item

    // Helper to get the correct product index, wrapping around
    function getProductAt(idx: number) {
      const len = props.products.length;
      if (len === 0) return null;
      return props.products[((idx % len) + len) % len];
    }

    // The visible window of products, always length visibleCount
    const displayProducts = computed(() => {
      const arr = [];
      for (let i = 0; i < props.visibleCount; i++) {
        arr.push(getProductAt(currentIndex.value + i));
      }
      return arr;
    });

    // Always translate by 0, since we only show visibleCount items
    const trackTranslate = computed(() => 0);

    function prevSlide() {
      if (props.products.length === 0) return;
      isTransitioning.value = true;
      currentIndex.value = (currentIndex.value - 1 + props.products.length) % props.products.length;
    }

    function nextSlide() {
      if (props.products.length === 0) return;
      isTransitioning.value = true;
      currentIndex.value = (currentIndex.value + 1) % props.products.length;
    }

    return {
      currentIndex,
      prevSlide,
      nextSlide,
      props,
      displayProducts,
      trackTranslate,
      isTransitioning,
    };
  },
});
</script>

<style scoped>
.slider-container {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
}

.slider-btn {
  background: #42b983;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
}

.slider-btn.prev {
  left: -80px;
}

.slider-btn.next {
  right: -80px;
}

.slider-btn {
  background: #42b983;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 1rem;
  transition: background 0.2s;
}

.slider-btn:hover {
  background: #369870;
}

.slider-viewport {
  width: 960px;
  max-width: 90vw;
  overflow: hidden;
  display: flex;
}

.slider-track {
  display: flex;
  width: 100%;
}

.product-cards.slider-cards-inline {
  display: flex;
  flex-wrap: nowrap;
  gap: 2rem;
  justify-content: center;
  width: 100%;
}

.slider-item {
  min-width: 260px;
  max-width: 500px;
  max-height: 700px;
  flex: 1 1 300px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}
</style>
