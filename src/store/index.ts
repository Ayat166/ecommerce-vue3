import { createStore } from 'vuex';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}
export interface State {
  products: Product[];
  product: Product | null;
}
export interface Commit{
  (type: string, payload?: any): void;
}
export default createStore({
  state: {
    products: [] as Product[],
    product: null
  },
  mutations: {
    setProducts(state: State, products: Product[]) {
      state.products = products;
    },
    setProduct(state: State, product: Product | null) {
      state.product = product;
    } 
  },
  actions: {
    async fetchProducts({ commit }: { commit: Commit  }) {
      const res = await fetch('https://fakestoreapi.com/products');
      const data = await res.json();
      commit('setProducts', data);
    },
    async fetchProduct({ commit }: { commit: Commit }, id: number) {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      commit('setProduct', data);
    }
  },
  getters: {
    allProducts: (state: State) => state.products,
    currentProduct: (state: State) => state.product
  }
});