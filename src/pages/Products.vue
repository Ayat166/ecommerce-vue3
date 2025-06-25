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

<script>
import ProductCard from '../components/ProductCard.vue'
import { mapGetters, mapActions } from 'vuex';
import SortDropdown from '../components/SortDropdown.vue';
export default {
    name: 'ProductsPage',
    components: { ProductCard, SortDropdown },
    data() {
        return {
            products: []
        }
    },
    computed: {
        ...mapGetters(['allProducts'])
    },
    mounted() {
        this.fetchProducts().then(() => {
            this.products = this.allProducts;
        });
    },
    methods: {
        ...mapActions(['fetchProducts']),
        sortProducts(sortOption) {
            if (sortOption === 'price-asc') {
                this.products.sort((a, b) => a.price - b.price);
            } else if (sortOption === 'price-desc') {
                this.products.sort((a, b) => b.price - a.price);
            } else if (sortOption === 'rating') {
                this.products.sort((a, b) => b.rating.rate - a.rating.rate);
            } else {
                // Default case: no sorting
                this.products = [...this.allProducts];
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
