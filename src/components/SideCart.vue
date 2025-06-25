<template>
    <div>
        <div :class="['cart-sidebar', { active: isActive }]" :style="isActive ? 'z-index: 2000;' : ''">
            <div class="cart-header">
                <h3>Shopping Cart</h3>
                <button class="close-btn" @click="$emit('close')">&times;</button>
            </div>
            <div class="cart-content" v-show="cartItemsArray.length === 0">
                <div class="empty-cart" >
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="1.5">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 01-8 0"></path>
                    </svg>
                    <p>Your cart is empty</p>
                    <RouterLink to="/products"><button class="shop-now-btn" @click="$emit('close')">Shop Now</button></RouterLink>
                </div>
            </div>
            <div class="cart-content" v-show="cartItemsArray.length > 0">
                <ul>
                    <li v-for="item in cartItemsArray" :key="item.product.id">
                        <div class="product-item">
                            <img :src="item.product.image" alt="Product Image" class="cart-image" />
                            <div class="product-details">
                                <h4>{{ item.product.title }}</h4>
                                <p>Price: ${{ item.product.price }}</p>
                            </div>
                            <div class="product-quantity">
                                <p>Qty: {{ item.quantity }}</p>
                            </div>
                            <div>
                                <button class="close-btn" @click="handleRemove(item.product.id)">&times;</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router';
import { mapGetters , mapMutations } from 'vuex';
export default defineComponent({
    props: {
        isActive: {
            type: Boolean,
            required: true
        }
    },
    components: {
        RouterLink
    },
    computed: {
        ...mapGetters(['cartItems']),
        cartItemsArray() {
            return this.cartItems;
        }
    },
    methods: {
        ...mapMutations(['removeFromCart']),
        handleRemove(productId) {
            this.removeFromCart(productId);
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
    padding: 0;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
    position: fixed;
    top: 0;
    right: 0;
    transition: transform 0.3s cubic-bezier(.4,2,.6,1), box-shadow 0.3s;
    transform: translateX(100%);
    z-index: 2000;
    border-radius: 16px 0 0 16px;
    display: flex;
    flex-direction: column;
}

.cart-sidebar.active {
    transform: translateX(0);
    box-shadow: -8px 0 32px rgba(0,0,0,0.18);
}

.cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 28px 16px 28px;
    border-bottom: 1px solid #f0f0f0;
    background: #f8f9fa;
    border-radius: 16px 0 0 0;
}

.cart-header h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #22223b;
    margin: 0;
}

.close-btn {
    background: none;
    border: none;
    font-size: 2rem;
    color: #888;
    cursor: pointer;
    transition: color 0.2s;
    padding: 0 4px;
}
.close-btn:hover {
    color: #e63946;
}

.cart-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px 28px;
    overflow-y: auto;
}

.empty-cart {
    text-align: center;
    color: #aaa;
    margin-top: 60px;
}

.empty-cart svg {
    margin-bottom: 16px;
    opacity: 0.7;
}

.shop-now-btn {
    background: linear-gradient(90deg, #4cab58 0%, #007bff 100%);
    color: #fff;
    border: none;
    padding: 12px 32px;
    border-radius: 24px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    margin-top: 18px;
    box-shadow: 0 2px 8px rgba(76, 171, 88, 0.08);
    transition: background 0.3s, box-shadow 0.2s;
}
.shop-now-btn:hover {
    background: linear-gradient(90deg, #007bff 0%, #4cab58 100%);
    box-shadow: 0 4px 16px rgba(0, 123, 255, 0.12);
}

ul {
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
}

.product-item {
    display: flex;
    align-items: center;
    background: #f7f7fa;
    border-radius: 10px;
    margin-bottom: 18px;
    padding: 12px 16px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    transition: box-shadow 0.2s;
}
.product-item:hover {
    box-shadow: 0 4px 16px rgba(0, 123, 255, 0.08);
}

.product-item img {
    width: 56px;
    height: 56px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 16px;
    background: #fff;
    border: 1px solid #e0e0e0;
    box-shadow: 0 1px 4px rgba(0,0,0,0.03);
}

.product-details {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.product-details h4 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #22223b;
    margin: 0 0 4px 0;
    line-height: 1.2;
}
.product-details p {
    font-size: 1rem;
    color: #4cab58;
    margin: 0;
    font-weight: 500;
}
.product-quantity {
    font-size: 0.9rem;
    color: #888;
    margin-left: 16px;
    flex-shrink: 0;
    padding: 4px 8px;
    background: #f0f0f0;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.02);
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 60px;
    text-align: center;
    font-weight: 500;
    transition: background 0.2s, box-shadow 0.2s;
}
</style>
