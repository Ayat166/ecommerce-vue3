import { describe, it, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Navbar from '../NavbarComponent.vue'
import { RouterLinkStub } from '@vue/test-utils'

// Mock store object
const mockStore = {
  getters: {
    cartItems: [
      { product: { id: 1, title: 'A', price: 10 }, quantity: 2 },
      { product: { id: 2, title: 'B', price: 20 }, quantity: 1 }
    ]
  }
}

// Mock the vuex module, including useStore
vi.mock('vuex', () => ({
  useStore: () => mockStore,
}))

describe('Navbar', () => {
  const global = {
    stubs: { RouterLink: RouterLinkStub },
  }

  it('renders navigation links', () => {
    const wrapper = shallowMount(Navbar, { global })
    const links = wrapper.findAllComponents(RouterLinkStub)
    expect(links).toHaveLength(3)
    expect(links[0].props('to')).toBe('/')
    expect(links[1].props('to')).toBe('/products')
    expect(links[2].props('to')).toBe('/contact')
  })

  it('shows cart badge with correct count', () => {
    mockStore.getters.cartItems = [
      { product: { id: 1, title: 'A', price: 10 }, quantity: 2 },
      { product: { id: 2, title: 'B', price: 20 }, quantity: 1 }
    ]
    const wrapper = shallowMount(Navbar, { global })
    const badge = wrapper.find('.cart-badge')
    expect(badge.exists()).toBe(true)
    expect(badge.text()).toBe('3')
  })

  it('does not show cart badge when cartCount is 0', () => {
    mockStore.getters.cartItems = []
    const wrapper = shallowMount(Navbar, { global })
    const badge = wrapper.find('.cart-badge')
    // The badge always exists in the DOM, but is hidden with v-show when cartCount is 0
    expect(badge.isVisible()).toBe(false)
  })

  it('emits show-cart event when cart button is clicked', async () => {
    const wrapper = shallowMount(Navbar, { global })
    const cartBtn = wrapper.find('.cart-btn')
    await cartBtn.trigger('click')
    expect(wrapper.emitted('show-cart')).toBeTruthy()
  })

  it('toggles menu when menu button is clicked', async () => {
    const wrapper = shallowMount(Navbar, { global })
    const menuBtn = wrapper.find('.menu-toggle')
    // Check class on nav to determine open/closed state
    const nav = wrapper.find('.nav-links')
    expect(nav.classes()).not.toContain('open')
    await menuBtn.trigger('click')
    expect(nav.classes()).toContain('open')
    await menuBtn.trigger('click')
    expect(nav.classes()).not.toContain('open')
  })
})
