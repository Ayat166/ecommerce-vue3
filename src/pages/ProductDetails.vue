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
            const redirect = (path) => {
                this.$router.push(path);
            };
            if (this.$route.params.id) {
                const id = parseInt(this.$route.params.id);
                return isNaN(id) ? redirect('/error') : id;
            }
        }
    },
}
</script>

<style>

</style>