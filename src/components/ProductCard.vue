<template>
    <div class="product-card">
        <div class="product-image">
            <span class="image-placeholder">
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><rect width="100%" height="100%" rx="8" fill="#e0e7ef"/><path d="M7 17l3-3.86a1 1 0 0 1 1.54 0L17 17M9 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" stroke="#bcb8b8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
        </div>
        <div class="product-info">
            <router-link :to="`/product/${id}`"><h2>{{ title }}</h2></router-link>
            <p>{{ description }}</p>
            <button class="btn add-to-cart">Add to Cart</button>
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
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.10);
    border: 1px solid #ececec;
    width: 26em;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: box-shadow 0.2s, transform 0.2s;
    margin: 0 auto;
}

.product-card:hover {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.16);
    transform: translateY(-4px) scale(1.01);
}

.product-image {
    background: linear-gradient(135deg, #f4f4f4 60%, #e0e7ef 100%);
    height: 200px;
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
    padding: 1.5rem 1.25rem 1.25rem 1.25rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.product-info h2 {
    font-size: 1.3rem;
    font-weight: 600;
    margin: 0 0 0.75rem 0;
    color: #22223b;
    transition: color 0.2s;
}

.product-info h2:hover {
    color: #666;
}

.product-info p {
    flex: 1;
    color: #666;
    font-size: 1.05rem;
    margin-bottom: 1.2rem;
}

.add-to-cart {
    width: 100%;
    font-size: 1rem;
    font-weight: 500;
    padding: 0.7rem 0;
    border-radius: 6px;
    margin-top: 0.5rem;
    background-color: #666;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;
}

.add-to-cart:hover {
    background-color: #3a3737;
}
</style>
