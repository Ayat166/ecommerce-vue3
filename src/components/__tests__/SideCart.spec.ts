import { describe, it, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import SideCart from '../SideCart.vue'
import { RouterLinkStub } from '@vue/test-utils'

describe('SideCart', () => {
  const cartItems = [
    {
      product: {
        id: 1,
        title: 'Test Product',
        price: 99.99,
        image: 'https://example.com/image.jpg',
      },
      quantity: 2,
    },
  ]

  const getters = {
    cartItems,
  }

  const global = {
    mocks: {
      $store: {
        getters,
        dispatch: vi.fn(),
      },
    },
    stubs: { RouterLink: RouterLinkStub },
  }

  it('renders cart items when cart is not empty', () => {
    const wrapper = shallowMount(SideCart, {
      props: { isActive: true },
      global: {
        mocks: {
          $store: {
            getters: { cartItems },
          },
        },
        stubs: { RouterLink: RouterLinkStub },
      },
    })
    expect(wrapper.text()).toContain('Test Product')
    expect(wrapper.text()).toContain('Qty: 2')
  })

  it('shows empty cart message when cart is empty', () => {
    const emptyGlobal = {
      mocks: {
        $store: {
          getters: { cartItems: [] },
        },
      },
      stubs: { RouterLink: RouterLinkStub },
    }
    const wrapper = shallowMount(SideCart, {
      props: { isActive: true },
      global: emptyGlobal,
    })
    expect(wrapper.text()).toContain('Your cart is empty')
  })

  it('emits close event when close button is clicked', async () => {
    const wrapper = shallowMount(SideCart, {
      props: { isActive: true },
      global,
    })
    await wrapper.find('.close-btn').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('calls removeFromCart when remove button is clicked', async () => {
    const removeFromCart = vi.fn()
    const wrapper = shallowMount(SideCart, {
      props: { isActive: true },
      global: {
        mocks: {
          $store: {
            getters: { cartItems },
            dispatch: removeFromCart,
          },
        },
        stubs: { RouterLink: RouterLinkStub },
      },
    })
    // Find the remove button for the product item (not the header close button)
    const removeBtns = wrapper.findAll('.product-item .close-btn')
    expect(removeBtns.length).toBeGreaterThan(0)
    await removeBtns[0].trigger('click')
    expect(removeFromCart).toHaveBeenCalled()
  })
})
