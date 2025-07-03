import { describe, it, expect, beforeEach, vi } from 'vitest'
import { shallowMount, RouterLinkStub, VueWrapper } from '@vue/test-utils'
import ProductDetails from '../ProductDetails.vue'

// Mock product data
const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  description: 'A great product',
  image: 'test.jpg',
  rating: { rate: 4, count: 10 },
}

// Mock store object
const mockStore = {
  getters: {
    currentProduct: mockProduct,
  },
  dispatch: vi.fn().mockResolvedValue(undefined),
}

// Mock the vuex module, including useStore
vi.mock('vuex', () => ({
  useStore: () => mockStore,
}))

// Mock vue-router's useRoute
vi.mock('vue-router', () => ({
  useRoute: () => ({
    params: { id: mockProduct.id }
  }),
  RouterLink: { name: 'RouterLink', template: '<div><slot /></div>' }
}))

type ProductDetailsVm = InstanceType<typeof ProductDetails>

describe('ProductDetails.vue', () => {
  let wrapper: VueWrapper<ProductDetailsVm>

  beforeEach(async () => {
    wrapper = shallowMount(ProductDetails, {
      global: {
        stubs: { RouterLink: RouterLinkStub },
      },
    }) as VueWrapper<ProductDetailsVm>
    // Set product directly to avoid data() type error
    ;(wrapper.vm as any).product = mockProduct
    await wrapper.vm.$nextTick()
  })

  it('renders product details correctly', () => {
    expect(wrapper.find('.product-title').text()).toBe(mockProduct.title)
    expect(wrapper.find('.product-price').text()).toContain(mockProduct.price.toString())
    expect(wrapper.find('.product-description').text()).toBe(mockProduct.description)
    expect(wrapper.find('.product-rating').text()).toContain('★★★★☆')
    expect(wrapper.find('.rating-count').text()).toContain('10')
  })

  it('renders RouterLink to products', () => {
    const link = wrapper.findComponent(RouterLinkStub)
    expect(link.exists()).toBe(true)
    expect(link.props('to')).toBe('/products')
  })

  it('calls addToCart when button is clicked', async () => {
    await wrapper.find('.add-to-cart').trigger('click')
    expect(mockStore.dispatch).toHaveBeenCalledWith('addToCart', mockProduct)
  })
})
