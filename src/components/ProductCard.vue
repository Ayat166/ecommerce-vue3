<template>
    <div class="product-card">
        <div class="product-image">
            <span class="image-placeholder">
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><rect width="100%" height="100%" rx="8" fill="#e0e7ef"/><path d="M7 17l3-3.86a1 1 0 0 1 1.54 0L17 17M9 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" stroke="#bcb8b8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
        </div>
        <div class="product-info">
            <slot name="title">
                <router-link :to="`/product/${id}`"><h2>{{ title }}</h2></router-link>
            </slot>
            <slot name="description">
                <p>{{ description }}</p>
            </slot>
            <slot name="actions">
                <button class="btn add-to-cart">Add to Cart</button>
            </slot>
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
    width: 20em;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: box-shadow 0.2s;
    margin: 0 ;
}

.product-card:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.16);
}

.product-image {
    background: #f4f4f4;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
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
    color: #666;
    font-size: 0.95rem;
    margin-bottom: 1rem;
}

</style>
