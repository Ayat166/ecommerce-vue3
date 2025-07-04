import { describe, it, expect, vi } from 'vitest'
import { shallowMount, VueWrapper } from '@vue/test-utils'
import SideCart from '../SideCart.vue'
import { RouterLinkStub } from '@vue/test-utils'
import type { ProductCart } from '../../types/ProductCart'
import { createTestingPinia } from '@pinia/testing'
import { useStore } from '../../stores/index'

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  image: 'https://example.com/image.jpg',
  description: 'A great product',
  rating: { rate: 4, count: 10 },
}
function mountComponent(cartItems: ProductCart[] = []) {
  return shallowMount(SideCart, {
    props: {
      isActive: true
    },
    global: {
      stubs: { RouterLink: RouterLinkStub },
      plugins: [
        createTestingPinia({
          initialState: {
            store: {
              cart: cartItems,
            },
          },
          stubActions: true,
          createSpy: vi.fn,
        }),
      ],
    },
  })
}

describe('SideCart', () => {

  let wrapper: VueWrapper<any>


  it('renders cart items when cart is not empty', () => {
    wrapper = mountComponent([{
      product: mockProduct,
      quantity: 2,
    }])

    expect(wrapper.text()).toContain('Test Product')
    expect(wrapper.text()).toContain('Qty: 2')
  })

  it('shows empty cart message when cart is empty', () => {

    wrapper = mountComponent([])

    expect(wrapper.text()).toContain('Your cart is empty')
  })

  it('emits close event when close button is clicked', async () => {
    wrapper = mountComponent([
      {
        product: mockProduct,
        quantity: 2,
      },
    ])

    await wrapper.find('.close-btn').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('calls removeFromCart when remove button is clicked', async () => {
    wrapper = mountComponent([
      {
        product: mockProduct,
        quantity: 2,
      },
    ])
    const store = useStore()
    const addToCartSpy = vi.spyOn(store, 'removeFromCart')
    const removeBtns = wrapper.findAll('.product-item .close-btn')
    expect(removeBtns.length).toBeGreaterThan(0)
    await removeBtns[0].trigger('click')
    // expect(mockStore.dispatch).toHaveBeenCalledWith('removeFromCart', 1)
    expect(addToCartSpy).toHaveBeenCalledWith(1)
  })
})
