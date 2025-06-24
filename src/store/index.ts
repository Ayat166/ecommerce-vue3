import { createStore } from 'vuex';

export default createStore({
  state: {
    products: [],
    product: null
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setProduct(state, product) {
      state.product = product;
    } 
  },
  actions: {
    async fetchProducts({ commit }) {
      const res = await fetch('https://fakestoreapi.com/products');
      const data = await res.json();
      commit('setProducts', data);
    },
    async fetchProduct({ commit }, id) {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      commit('setProduct', data);
    }
  },
  getters: {
    allProducts: (state) => state.products,
    currentProduct: (state) => state.product
  }
});