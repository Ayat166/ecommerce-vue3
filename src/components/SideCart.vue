<template>
    <div>
        <div :class="['cart-sidebar', { active: isActive }]" :style="isActive ? 'z-index: 2000;' : ''">
            <div class="cart-header">
                <h3>Shopping Cart</h3>
                <button class="close-btn" @click="$emit('close')">&times;</button>
            </div>
            <div class="cart-content">
                <div class="empty-cart">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="1.5">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 01-8 0"></path>
                    </svg>
                    <p>Your cart is empty</p>
                    <button class="shop-now-btn">Shop Now</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        isActive: {
            type: Boolean,
            required: true
        }
    }
})
</script>

<style scoped>
.cart-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1999;
}

.cart-sidebar {
    background: #fff;
    width: 400px;
    max-width: 100%;
    height: 100%;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 0;
    right: 0;
    transition: transform 0.3s ease;
    transform: translateX(100%);
    z-index: 2000;
}

.cart-sidebar.active {
    transform: translateX(0);
}

.cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.close-btn {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
}

.cart-content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: calc(100% - 80px);
}

.empty-cart {
    text-align: center;
}

.empty-cart svg {
    margin-bottom: 10px;
}

.shop-now-btn {
    background: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s;
}

.shop-now-btn:hover {
    background: #0056b3;
}
</style>
