import { describe, it, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import ProductCard from '../ProductCard.vue'
import { createStore } from 'vuex'
import { RouterLinkStub } from '@vue/test-utils'

describe('ProductCard', () => {
  const product = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    image: 'https://example.com/image.jpg',
    rating: { rate: 4 },
  }

  const actions = {
    addToCart: vi.fn(),
  }

  const store = createStore({
    actions,
  })

  it('renders product title, price, and image', () => {
    const wrapper = shallowMount(ProductCard, {
      props: { product },
      global: {
        plugins: [store],
        stubs: { RouterLink: RouterLinkStub },
      },
    })
    expect(wrapper.text()).toContain(product.title)
    expect(wrapper.text()).toContain(product.price.toString())
    expect(wrapper.find('img').attributes('src')).toBe(product.image)
  })

  it('displays correct number of rating stars', () => {
    const wrapper = shallowMount(ProductCard, {
      props: { product },
      global: {
        plugins: [store],
        stubs: { RouterLink: RouterLinkStub },
      },
    })
    expect(wrapper.text()).toContain('★★★★☆')
  })

  it('calls addToCart when button is clicked', async () => {
    const wrapper = shallowMount(ProductCard, {
      props: { product },
      global: {
        plugins: [store],
        stubs: { RouterLink: RouterLinkStub },
      },
    })
    await wrapper.find('button.add-to-cart').trigger('click')
    expect(actions.addToCart).toHaveBeenCalled()
  })

  it('links to the correct product details page', () => {
    const wrapper = shallowMount(ProductCard, {
      props: { product },
      global: {
        plugins: [store],
        stubs: { RouterLink: RouterLinkStub },
      },
    })
    const link = wrapper.findComponent(RouterLinkStub)
    expect(link.props('to')).toBe(`/product/${product.id}`)
  })
})
