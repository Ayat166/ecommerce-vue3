import { describe, it, expect, vi, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import SideCart from '../SideCart.vue'
import { RouterLinkStub } from '@vue/test-utils'
import type { ProductCart } from '../../types/ProductCart'

// Mock store object
const mockStore = {
  getters: {
    cartItems: [] as ProductCart[],
  },
  dispatch: vi.fn(),
}

// Mock the vuex module, including useStore
vi.mock('vuex', () => ({
  useStore: () => mockStore,
}))

describe('SideCart', () => {
  const global = {
    stubs: { RouterLink: RouterLinkStub },
  }

  beforeEach(() => {
    mockStore.dispatch.mockClear()
  })

  const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    image: 'https://example.com/image.jpg',
    description: 'A great product',
    rating: { rate: 4, count: 10 },
  }

  it('renders cart items when cart is not empty', () => {
    mockStore.getters.cartItems = [
      {
        product: mockProduct,
        quantity: 2,
      },
    ]
    const wrapper = shallowMount(SideCart, {
      props: { isActive: true },
      global,
    })
    expect(wrapper.text()).toContain('Test Product')
    expect(wrapper.text()).toContain('Qty: 2')
  })

  it('shows empty cart message when cart is empty', () => {
    mockStore.getters.cartItems = []
    const wrapper = shallowMount(SideCart, {
      props: { isActive: true },
      global,
    })
    expect(wrapper.text()).toContain('Your cart is empty')
  })

  it('emits close event when close button is clicked', async () => {
    mockStore.getters.cartItems = [
      {
        product: mockProduct,
        quantity: 2,
      },
    ]
    const wrapper = shallowMount(SideCart, {
      props: { isActive: true },
      global,
    })
    await wrapper.find('.close-btn').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('calls removeFromCart when remove button is clicked', async () => {
    mockStore.getters.cartItems = [
      {
        product: mockProduct,
        quantity: 2,
      },
    ]
    const wrapper = shallowMount(SideCart, {
      props: { isActive: true },
      global,
    })
    // Find the remove button for the product item (not the header close button)
    const removeBtns = wrapper.findAll('.product-item .close-btn')
    expect(removeBtns.length).toBeGreaterThan(0)
    await removeBtns[0].trigger('click')
    expect(mockStore.dispatch).toHaveBeenCalledWith('removeFromCart', 1)
  })
})
