import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Products from '../pages/Products.vue'
import ProductDetails from '../pages/ProductDetails.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/products', name: 'Products', component: Products },
  { path: '/product/:id', name: 'ProductDetails', component: ProductDetails },
  { path: '/:catchAll(.*)', redirect: '/' }, // Redirect any unknown paths to Home
  { path: '/error', name: 'Error', component: () => import('../pages/Error.vue') } // Lazy load Error page
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
