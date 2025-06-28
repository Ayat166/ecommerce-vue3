<template>
    <div class="product-card">
        <div class="product-image">
            <span class="image-placeholder">
                <img :src="product.image" alt="Product Image" class="image-placeholder" />
            </span>

        </div>
        <div class="product-info">
            <RouterLink :to="`/product/${product.id}`">
                <h2>{{ product.title }}</h2>
            </RouterLink>
            <p class="product-price">${{ product.price }}</p>
            <p class="product-rating">{{ ratingStars }}</p>


            <button class="btn add-to-cart" @click="handleAddToCart">Add to Cart</button>

        </div>
    </div>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router'
import { mapActions } from 'vuex';

export default {
    name: 'ProductCard',
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    components: {
        RouterLink
    },
    computed: {
        ratingStars() {
            const rate = Math.round(this.product.rating?.rate || 0);
            return '★'.repeat(rate) + '☆'.repeat(5 - rate);
        }
    },
    methods: {
        ...mapActions(['addToCart']),
        handleAddToCart() {
            this.addToCart(this.product);
        }
    },
}
</script>

<style scoped>
.product-card {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    width: 20em;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: box-shadow 0.2s;
    margin: 0;
}

.product-card:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.16);
}

.product-image {
    background: #fff;
    height: 300px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid #e0e0e0;
    transition: background 0.2s;
    border-radius: 10px 10px 0 0;
    padding: 1rem;
}

.product-image:hover {
    background: #f4f4f4;
}

.product-image img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    display: block;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
    border: 1px solid #e0e0e0;
    padding: 0.25rem;
}

.image-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.product-info {
    padding: 1rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    background: #fff;
    border-radius: 0 0 10px 10px;
    transition: background 0.2s;
}

.product-info h2 {
    font-size: 1.2rem;
    margin: 0 0 0.5rem 0;
    color: #22223b;
    transition: color 0.2s;
}

.product-info h2:hover {
    color: #666;
}

.product-info p {
    flex: 1;
    font-size: 0.95rem;
    margin-bottom: 1rem;
}

.product-price {
    font-weight: bold;
    color: #4cab58;
    margin-bottom: 0.5rem;
}

.product-rating {
    color: #9a8c98;
    font-size: 0.9rem;
    margin-bottom: 1rem;
}
</style>
