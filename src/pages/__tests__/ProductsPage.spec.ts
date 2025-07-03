import { describe, it, expect, vi, beforeEach } from 'vitest'
import { shallowMount, VueWrapper } from '@vue/test-utils'
import Products from '../ProductsPage.vue'

// Mock products data
const mockProducts = [
  { id: 1, title: 'A', price: 10, rating: { rate: 4.5 } },
  { id: 2, title: 'B', price: 20, rating: { rate: 3.5 } },
  { id: 3, title: 'C', price: 5, rating: { rate: 5 } },
]

// Mock store object
const mockStore = {
  getters: {
    allProducts: mockProducts,
  },
  dispatch: vi.fn().mockResolvedValue(undefined),
}

// Mock the vuex module, including mapActions
vi.mock('vuex', () => ({
  useStore: () => mockStore,
  mapActions: () => ({
    fetchProducts: vi.fn(),
  }),
}))

describe('ProductsPage.vue', () => {
  let wrapper: VueWrapper<any>

  beforeEach(async () => {
    wrapper = shallowMount(Products, {
      global: {
        stubs: ['ProductCard', 'SortDropdown'],
      },
    })
    await wrapper.vm.$nextTick()
  })

  it('renders the correct number of ProductCard components', () => {
    expect(wrapper.findAllComponents({ name: 'ProductCard' }).length).toBe(3)
  })

  it('updates products order when sort option changes to price ascending', async () => {
    const sortDropdown = wrapper.findComponent({ name: 'SortDropdown' })
    await sortDropdown.vm.$emit('update:modelValue', 'price-asc')
    await wrapper.vm.$nextTick()
    const productCards = wrapper.findAllComponents({ name: 'ProductCard' })
    const prices = productCards.map((card: any) => card.props('product').price)
    expect(prices).toEqual([5, 10, 20])
  })

  it('updates products order when sort option changes to price descending', async () => {
    const sortDropdown = wrapper.findComponent({ name: 'SortDropdown' })
    await sortDropdown.vm.$emit('update:modelValue', 'price-desc')
    await wrapper.vm.$nextTick()
    const productCards = wrapper.findAllComponents({ name: 'ProductCard' })
    const prices = productCards.map((card: any) => card.props('product').price)
    expect(prices).toEqual([20, 10, 5])
  })

  it('updates products order when sort option changes to rating', async () => {
    const sortDropdown = wrapper.findComponent({ name: 'SortDropdown' })
    await sortDropdown.vm.$emit('update:modelValue', 'rating')
    await wrapper.vm.$nextTick()
    const productCards = wrapper.findAllComponents({ name: 'ProductCard' })
    const ratings = productCards.map((card: any) => card.props('product').rating.rate)
    expect(ratings).toEqual([5, 4.5, 3.5])
  })

  it('resets products order to default when sort option changes to default', async () => {
    const sortDropdown = wrapper.findComponent({ name: 'SortDropdown' })
    await sortDropdown.vm.$emit('update:modelValue', 'price-desc')
    await wrapper.vm.$nextTick()
    await sortDropdown.vm.$emit('update:modelValue', 'default')
    await wrapper.vm.$nextTick()
    const productCards = wrapper.findAllComponents({ name: 'ProductCard' })
    const ids = productCards.map((card: any) => card.props('product').id)
    expect(ids).toEqual([1, 2, 3])
  })
})
