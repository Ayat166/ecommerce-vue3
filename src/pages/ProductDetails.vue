<template>
    <div class="products-page">
        <h1>Product {{ productId }}</h1>
        <div class="product-cards">
            <ProductCard :id="productId" :title="`Product ${productId}`"
                :description="`Short description for product ${productId}.`" />
        </div>
    </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'
export default {
    name: 'ProductDetails',
    components: { ProductCard },
    computed: {
        productId() {
            try {
                return parseInt(this.$route.params.id, 10);
            } catch (e) {
                console.error('Invalid product ID:', this.$route.params.id);
                return null;
            }
        }
    },
}
</script>

<style>

</style>