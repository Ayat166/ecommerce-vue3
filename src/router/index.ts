import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Products from '../pages/ProductsPage.vue'
import ProductDetails from '../pages/ProductDetails.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/products', name: 'Products', component: Products },
  { path: '/product/:id', name: 'ProductDetails', component: ProductDetails },
  { path: '/:catchAll(.*)', redirect: '/' },
  { path: '/error', name: 'Error', component: () => import('../pages/Error.vue') },
  { path: '/contact', name: 'Contact', component: () => import('../pages/ContactUs.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _, next) => {
  if (to.name === 'ProductDetails' && (!to.params.id || isNaN(Number(to.params.id)))) {
    next({ name: 'Error' })
  } else {
    next()
  }
})
export default router
