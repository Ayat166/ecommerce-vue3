import { describe, it, expect, vi, beforeEach } from 'vitest'
import { shallowMount, RouterLinkStub, VueWrapper } from '@vue/test-utils'
import ProductDetails from '../ProductDetails.vue'

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
  let fetchProduct: ReturnType<typeof vi.fn>
  let addToCart: ReturnType<typeof vi.fn>

  beforeEach(async () => {
    fetchProduct = vi.fn().mockResolvedValue(undefined)
    addToCart = vi.fn()
    wrapper = shallowMount(ProductDetails, {
      global: {
        stubs: { RouterLink: RouterLinkStub },
        mocks: {
          $route: { params: { id: mockProduct.id } },
          $store: {
            getters: { currentProduct: mockProduct },
            dispatch: vi.fn((action, payload) => {
              if (action === 'fetchProduct') return fetchProduct(payload)
              if (action === 'addToCart') return addToCart(payload)
            }),
          },
        },
      },
    }) as VueWrapper<ProductDetailsVm>
    // Set product directly to avoid data() type error
    wrapper.vm.product = mockProduct
    await wrapper.vm.$nextTick()
  })

  it('renders product details correctly', () => {
    expect(wrapper.find('.product-title').text()).toBe(mockProduct.title)
    expect(wrapper.find('.product-price').text()).toContain(mockProduct.price.toString())
    expect(wrapper.find('.product-description').text()).toBe(mockProduct.description)
    expect(wrapper.find('.product-rating').text()).toContain('★★★★☆')
    expect(wrapper.find('.rating-count').text()).toContain('10')
  })

  it('calls addToCart when button is clicked', async () => {
    await wrapper.find('.add-to-cart').trigger('click')
    expect(addToCart).toHaveBeenCalledWith(mockProduct)
  })

  it('calls fetchProduct on mount', () => {
    expect(fetchProduct).toHaveBeenCalledWith(mockProduct.id)
  })

  it('renders RouterLink to products', () => {
    const link = wrapper.findComponent(RouterLinkStub)
    expect(link.exists()).toBe(true)
    expect(link.props('to')).toBe('/products')
  })
})
