import { describe, it, expect, vi, beforeEach } from 'vitest'
import { shallowMount, VueWrapper } from '@vue/test-utils'
import ProductCard from '../ProductCard.vue'
import { RouterLinkStub } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useStore } from '../../stores/index'
// Mock product with all required fields
const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  image: 'https://example.com/image.jpg',
  description: 'A great product',
  rating: { rate: 4, count: 10 },
}

describe('ProductCard', () => {

  let wrapper: VueWrapper<any>

  beforeEach(async () => {
    wrapper = shallowMount(ProductCard, {
      props: {
        product: mockProduct
      },
      global: {
        stubs: { RouterLink: RouterLinkStub },
        plugins: [
          createTestingPinia({
            initialState: {
              store: {
                product: mockProduct,
              },
            },
            stubActions: false,
            createSpy: vi.fn,
          }),
        ],
      },
    })
    await wrapper.vm.$nextTick()
  })
  it('renders product title, price, and image', () => {
    expect(wrapper.text()).toContain(mockProduct.title)
    expect(wrapper.text()).toContain(mockProduct.price.toString())
    expect(wrapper.find('img').attributes('src')).toBe(mockProduct.image)
  })

  it('displays correct number of rating stars', () => {
    expect(wrapper.text()).toContain('★★★★☆')
  })

  it('calls addToCart when button is clicked', async () => {
    const store = useStore()
    const addToCartSpy = vi.spyOn(store, 'addToCart')
    await wrapper.find('button.add-to-cart').trigger('click')
    expect(addToCartSpy).toHaveBeenCalledWith(mockProduct)
  })

  it('links to the correct product details page', () => {
    const link = wrapper.findComponent(RouterLinkStub)
    expect(link.props('to')).toBe(`/product/${mockProduct.id}`)
  })
})
