<template>
    <div class="container">
        <h1 class="product-title text-center mb-1 mt-1">Product {{ productId }}</h1>
        <div class="product-details-card">
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

<style scoped>
.product-title {
    font-size: 2rem;
    font-weight: 600;
    color: #22223b;
    letter-spacing: 0.5px;
    margin-bottom: 2rem;
}

.product-details-card {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 2rem;
}

.product-details-card .product-card {
    width: 100%;
    max-width: 400px;
    min-width: 280px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.10);
    border-radius: 12px;
    background: #fff;
}
</style>