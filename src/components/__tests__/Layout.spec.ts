import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Layout from '../Layout.vue'

// Mocks for child components
const NavbarComponent = {
  template: '<div class="navbar-mock" @show-cart="$emit(\'show-cart\')"></div>',
}
const FooterComponent = {
  template: '<div class="footer-mock"></div>',
}
const SideCart = {
  props: ['isActive'],
  template: '<div class="sidecart-mock" v-if="isActive"></div>',
}

describe('Layout', () => {
  it('renders Navbar, Footer, and slot content', () => {
    const wrapper = shallowMount(Layout, {
      global: {
        stubs: {
          NavbarComponent,
          FooterComponent,
          SideCart,
        },
      },
      slots: {
        default: '<div class="main-content">Main Content</div>',
      },
    })
    // Check for stub elements by class since findComponent won't work with stubbed string names
    expect(wrapper.find('.navbar-mock').exists()).toBe(true)
    expect(wrapper.find('.footer-mock').exists()).toBe(true)
    expect(wrapper.find('.main-content').exists()).toBe(true)
  })

  it('shows SideCart when show-cart event is emitted from Navbar', async () => {
    const wrapper = shallowMount(Layout, {
      global: {
        stubs: {
          NavbarComponent,
          FooterComponent,
          SideCart,
        },
      },
    })
    // SideCart should not be visible initially
    expect(wrapper.find('.sidecart-mock').exists()).toBe(false)
    // Emit show-cart from Navbar
    await wrapper.find('.navbar-mock').trigger('show-cart')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.sidecart-mock').exists()).toBe(true)
  })

  it('hides SideCart when close event is emitted from SideCart', async () => {
    const wrapper = shallowMount(Layout, {
      global: {
        stubs: {
          NavbarComponent,
          FooterComponent,
          SideCart,
        },
      },
    })
    // Open SideCart
    await wrapper.find('.navbar-mock').trigger('show-cart')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.sidecart-mock').exists()).toBe(true)
    // Emit close from SideCart
    await wrapper.find('.sidecart-mock').trigger('close')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.sidecart-mock').exists()).toBe(false)
  })
})
