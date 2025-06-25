import { createStore } from 'vuex';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}
export interface ProductCart {
  product: Product;
  quantity: number;
}
export interface State {
  products: Product[];
  product: Product | null;
  cart: ProductCart[];
}
export interface Commit{
  (type: string, payload?: any): void;
}

export default createStore({
  state: {
    products: [] as Product[],
    product: null,
    cart:[] as ProductCart[],
  },
  mutations: {
    setProducts(state: State, products: Product[]) {
      state.products = products;
    },
    setProduct(state: State, product: Product | null) {
      state.product = product;
    },
    addCartItem(state: State, item: ProductCart) {
      state.cart.push(item);
    },
    updateCartItemQuantity(state: State, payload: { productId: number; quantity: number }) {
      const existingProduct = state.cart.find(item => item.product.id === payload.productId);
      if (existingProduct) {
        existingProduct.quantity = payload.quantity;
      }
    },
    removeCartItem(state: State, productId: number) {
      state.cart = state.cart.filter(item => item.product.id !== productId);
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
    },
    addToCart({ state, commit }: { state: State; commit: Commit }, product: Product) {
      const existingProduct = state.cart.find(item => item.product.id === product.id);
      if (existingProduct) {
        commit('updateCartItemQuantity', { productId: product.id, quantity: existingProduct.quantity + 1 });
      } else {
        commit('addCartItem', { product, quantity: 1 });
      }
    },
    removeFromCart({ commit }: { commit: Commit }, productId: number) {
      commit('removeCartItem', productId);
    }
  },
  getters: {
    allProducts: (state: State) => state.products,
    currentProduct: (state: State) => state.product,
    cartItems: (state: State) => state.cart,
    cartCount: (state: State) => state.cart.reduce((total, item) => total + item.quantity, 0),
  }
});