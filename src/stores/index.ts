import type { Product } from '../types/Product'
import type { ProductCart } from '../types/ProductCart'
import { defineStore } from 'pinia'

export interface State {
  products: Product[]
  product: Product | null
  cart: ProductCart[]
}
export interface Commit {
  (type: string, payload?: unknown): void
}

export const useStore = defineStore('store', {
  state: () => ({
    products: [] as Product[],
    product: null,
    cart: [] as ProductCart[],
  }),
  // mutations: {
  //   setProducts(state: State, products: Product[]) {
  //     state.products = products
  //   },
  //   setProduct(state: State, product: Product | null) {
  //     state.product = product
  //   },
  //   addCartItem(state: State, item: ProductCart) {
  //     state.cart.push(item)
  //   },
  //   updateCartItemQuantity(state: State, payload: { productId: number; quantity: number }) {
  //     const existingProduct = state.cart.find((item) => item.product.id === payload.productId)
  //     if (existingProduct) {
  //       existingProduct.quantity = payload.quantity
  //     }
  //   },
  //   removeCartItem(state: State, productId: number) {
  //     state.cart = state.cart.filter((item) => item.product.id !== productId)
  //   },
  // },
  actions: {
    async fetchProducts() {
      const res = await fetch('https://fakestoreapi.com/products')
      const data = await res.json()
      this.products = data
    },
    async fetchProduct(id: number) {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`)
      const data = await res.json()
      this.product = data
    },
    addToCart(product: Product) {
      const existingProduct = this.cart.find((item) => item.product.id === product.id)
      if (existingProduct) {
        existingProduct.quantity += 1
      } else {
        this.cart.push({ product, quantity: 1 })
      }
    },
    removeFromCart(productId: number) {
      this.cart = this.cart.filter((item) => item.product.id !== productId)
    },
  },
  getters: {
    allProducts: (state: State) => state.products,
    currentProduct: (state: State) => state.product,
    cartItems: (state: State) => state.cart,
    cartCount: (state: State) => state.cart.reduce((total, item) => total + item.quantity, 0),
  },
})
