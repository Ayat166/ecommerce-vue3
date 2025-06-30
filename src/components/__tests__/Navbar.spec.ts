import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Navbar from '../Navbar.vue'
import { RouterLinkStub } from '@vue/test-utils'

describe('Navbar', () => {
  const global = {
    stubs: { RouterLink: RouterLinkStub },
    mocks: {
      $store: {
        getters: { cartCount: 3 },
      },
    },
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
    const wrapper = shallowMount(Navbar, { global })
    const badge = wrapper.find('.cart-badge')
    expect(badge.exists()).toBe(true)
    expect(badge.text()).toBe('3')
  })

  it('does not show cart badge when cartCount is 0', () => {
    const wrapper = shallowMount(Navbar, {
      global: {
        ...global,
        mocks: { $store: { getters: { cartCount: 0 } } },
      },
    })
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
    expect(wrapper.vm.isOpen).toBe(false)
    await menuBtn.trigger('click')
    expect(wrapper.vm.isOpen).toBe(true)
    await menuBtn.trigger('click')
    expect(wrapper.vm.isOpen).toBe(false)
  })
})
