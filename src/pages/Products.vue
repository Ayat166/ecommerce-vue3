<template>
    <div class="products-page">
        <h1>Products</h1>
        <div class="product-cards">
            <ProductCard
                v-for="product in products"
                :key="product.id"
                :product="product"
            >
                <!-- <template #image>
                        <img :src="product.image" alt="Product Image" class="image-placeholder" />
                </template>
                <template #title>
                    <router-link :to="`/product/${product.id}`">
                        <h2 style="color: #22223b">{{ product.title }}</h2>
                    </router-link>
                </template>
                <template #description>
                    <p>{{ product.description }}</p>
                </template>
                <template #actions>
                    <button class="btn add-to-cart">Add to Cart</button>
                </template> -->
            </ProductCard>
        </div>
    </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'ProductsPage',
    components: { ProductCard },
    data() {
        return {
            products: []
        }
    }, 
    computed: {
        ...mapGetters(['allProducts'])
    },
    methods: {
        ...mapActions(['fetchProducts'])
    },
    // mounted() {
    //     this.fetchProducts();
    //     this.products = this.allProducts;
    // },
    created() {
        this.fetchProducts().then(() => {
            this.products = this.allProducts;
        });
    }
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
</style>
