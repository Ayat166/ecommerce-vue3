<template>
    <div class="products-page">
        <h1>Products</h1>
        <div class="product-cards">
            <ProductCard
                v-for="n in 6"
                :key="n"
                :id="n"
                :title="`Product ${n}`"
                :description="`Short description for product ${n}.`"
            >
                <template #title>
                    <router-link :to="`/product/${n}`">
                        <h2 style="color: #22223b">Product {{ n }}</h2>
                    </router-link>
                </template>
                <template #description>
                    <p>Short description for product {{ n }} </p>
                </template>
                <template #actions>
                    <button class="btn add-to-cart">Add to Cart</button>
                </template>
            </ProductCard>
        </div>
    </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'
export default {
    name: 'ProductsPage',
    components: { ProductCard }
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
