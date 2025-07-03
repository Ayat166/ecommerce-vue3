import { describe, it, expect, vi, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import ProductCard from '../ProductCard.vue'
import { RouterLinkStub } from '@vue/test-utils'

// Mock product with all required fields
const product = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  image: 'https://example.com/image.jpg',
  description: 'A great product',
  rating: { rate: 4, count: 10 },
}

// Mock store object
const mockStore = {
  dispatch: vi.fn(),
}

// Mock the vuex module, including useStore
vi.mock('vuex', () => ({
  useStore: () => mockStore,
}))

describe('ProductCard', () => {
  const global = {
    stubs: { RouterLink: RouterLinkStub },
  }

  beforeEach(() => {
    mockStore.dispatch.mockClear()
  })

  it('renders product title, price, and image', () => {
    const wrapper = shallowMount(ProductCard, {
      props: { product },
      global,
    })
    expect(wrapper.text()).toContain(product.title)
    expect(wrapper.text()).toContain(product.price.toString())
    expect(wrapper.find('img').attributes('src')).toBe(product.image)
  })

  it('displays correct number of rating stars', () => {
    const wrapper = shallowMount(ProductCard, {
      props: { product },
      global,
    })
    expect(wrapper.text()).toContain('★★★★☆')
  })

  it('calls addToCart when button is clicked', async () => {
    const wrapper = shallowMount(ProductCard, {
      props: { product },
      global,
    })
    await wrapper.find('button.add-to-cart').trigger('click')
    expect(mockStore.dispatch).toHaveBeenCalledWith('addToCart', product)
  })

  it('links to the correct product details page', () => {
    const wrapper = shallowMount(ProductCard, {
      props: { product },
      global,
    })
    const link = wrapper.findComponent(RouterLinkStub)
    expect(link.props('to')).toBe(`/product/${product.id}`)
  })
})
