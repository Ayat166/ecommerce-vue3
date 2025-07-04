import { describe, it, expect, vi } from 'vitest'
import { shallowMount, VueWrapper } from '@vue/test-utils'
import Navbar from '../NavbarComponent.vue'
import { RouterLinkStub } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import type { ProductCart } from '@/types/ProductCart'


const mockProducts: ProductCart[] = [
  {
    product: {
      id: 1, title: 'A', price: 10, description: 'A great product',
      image: 'test.jpg',
      rating: { rate: 4.5, count: 100 }
    }, quantity: 2
  },
  {
    product: {
      id: 2, title: 'B', price: 20, description: 'A great product',
      image: 'test.jpg',
      rating: { rate: 4.5, count: 100 }
    }, quantity: 1
  }
]

function mountComponent(mockProducts: ProductCart[] = []) {
  return shallowMount(Navbar, {
    global: {
      stubs: { RouterLink: RouterLinkStub },
      plugins: [
        createTestingPinia({
          initialState: {
            store: {
              cart: mockProducts
            },
          },
          stubActions: false,
          createSpy: vi.fn,
        }),
      ]
    }
  })
}

describe('Navbar', () => {
  let wrapper: VueWrapper<any>


  it('renders navigation links', () => {
    wrapper = mountComponent(mockProducts)
    const links = wrapper.findAllComponents(RouterLinkStub)
    expect(links).toHaveLength(3)
    expect(links[0].props('to')).toBe('/')
    expect(links[1].props('to')).toBe('/products')
    expect(links[2].props('to')).toBe('/contact')
  })

  it('shows cart badge with correct count', () => {
    wrapper = mountComponent(mockProducts)

    const badge = wrapper.find('.cart-badge')
    expect(badge.exists()).toBe(true)
    expect(badge.text()).toBe('3')
  })

  it('does not show cart badge when cartCount is 0', () => {
    wrapper = mountComponent([])
    const badge = wrapper.find('.cart-badge')
    expect(badge.isVisible()).toBe(false)
  })

  it('emits show-cart event when cart button is clicked', async () => {
    wrapper = mountComponent(mockProducts)
    const cartBtn = wrapper.find('.cart-btn')
    await cartBtn.trigger('click')
    expect(wrapper.emitted('show-cart')).toBeTruthy()
  })

  it('toggles menu when menu button is clicked', async () => {
    wrapper = mountComponent(mockProducts)
    const menuBtn = wrapper.find('.menu-toggle')
    const nav = wrapper.find('.nav-links')
    expect(nav.classes()).not.toContain('open')
    await menuBtn.trigger('click')
    expect(nav.classes()).toContain('open')
    await menuBtn.trigger('click')
    expect(nav.classes()).not.toContain('open')
  })
})
