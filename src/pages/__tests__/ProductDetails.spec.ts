import { describe, it, expect, beforeEach, vi } from 'vitest'
import { shallowMount, RouterLinkStub, VueWrapper } from '@vue/test-utils'
import ProductDetails from '../ProductDetails.vue'
import { createTestingPinia } from '@pinia/testing'
import { useStore } from '../../stores/index'
// Mock product data
const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  description: 'A great product',
  image: 'test.jpg',
  rating: { rate: 4, count: 10 },
}

type ProductDetailsVm = InstanceType<typeof ProductDetails>

describe('ProductDetails.vue', () => {
  let wrapper: VueWrapper<ProductDetailsVm>

  beforeEach(async () => {
    vi.mock('vue-router', async () => {
      const actual = await vi.importActual<typeof import('vue-router')>('vue-router')
      return {
        ...actual,
        useRoute: () => ({ params: { id: 1 } }),
      }
    })
    wrapper = shallowMount(ProductDetails, {
      global: {
        stubs: { RouterLink: RouterLinkStub },
        plugins: [
          createTestingPinia({
            initialState: {
              store: {
                product: mockProduct,
              },
            },
            stubActions: true,
            createSpy: vi.fn,
          }),
        ],
        mocks: {
          $route: { params: { id: 1 } }
        }
      },
    }) as VueWrapper<ProductDetailsVm>
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
    // Get the store instance used in the component
    const store = useStore()
    const addToCartSpy = vi.spyOn(store, 'addToCart')
    await wrapper.find('.add-to-cart').trigger('click')
    expect(addToCartSpy).toHaveBeenCalledWith(mockProduct)
  })
})
