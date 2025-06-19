<template>
    <div class="product-card">
        <div class="product-image"></div>
        <div class="product-info">
            <router-link :to="`/product/${id}`"><h2>{{ title }}</h2></router-link>
            <p>{{ description }}</p>
            <button class="add-to-cart">Add to Cart</button>
        </div>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
    name: 'ProductCard',
    props: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        id: {
            type: [Number],
            required: true
        }
    },
    components: {
        RouterLink
    },
}
</script>

<style scoped>
.product-card {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    width: 25em;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: box-shadow 0.2s;
}

.product-card:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.16);
}

.product-image {
    background: #f4f4f4;
    height: 180px;
}

.product-info {
    padding: 1rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.product-info h2 {
    font-size: 1.2rem;
    margin: 0 0 0.5rem 0;
}

.product-info p {
    flex: 1;
    color: #666;
    font-size: 0.95rem;
    margin-bottom: 1rem;
}

.add-to-cart {
    background: #007bff;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;
}

.add-to-cart:hover {
    background: #0056b3;
}
</style>
