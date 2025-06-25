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
  cart: Product[];
}
export interface Commit{
  (type: string, payload?: any): void;
}
export default createStore({
  state: {
    products: [] as Product[],
    product: null,
    cart:[] as Product[],
  },
  mutations: {
    setProducts(state: State, products: Product[]) {
      state.products = products;
    },
    setProduct(state: State, product: Product | null) {
      state.product = product;
    },
    addToCart(state: State, product: Product) {
      // Check if the product is already in the cart
      const existingProduct = state.cart.find(item => item.id === product.id);
      if (existingProduct) {
        // If it exists, you might want to update the quantity or just return
        return;
      }
      state.cart.push(product);
    },
    removeFromCart(state: State, productId: number) {
      state.cart = state.cart.filter(item => item.id !== productId);
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
    currentProduct: (state: State) => state.product,
    cartItems: (state: State) => state.cart,
    cartCount: (state: State) => state.cart.length,
  }
});