import { describe, it, expect, vi, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Products from '../Products.vue'

const mockProducts = [
  { id: 1, title: 'A', price: 10, rating: { rate: 4.5 } },
  { id: 2, title: 'B', price: 20, rating: { rate: 3.5 } },
  { id: 3, title: 'C', price: 5, rating: { rate: 5 } },
]

// Helper type to access component instance with custom properties
type ProductsVm = InstanceType<typeof Products>

import type { VueWrapper } from '@vue/test-utils'

describe('Products.vue', () => {
  let fetchProducts: ReturnType<typeof vi.fn>
  let wrapper: VueWrapper<ProductsVm>

  beforeEach(async () => {
    fetchProducts = vi.fn().mockResolvedValue(undefined)
    wrapper = shallowMount(Products, {
      global: {
        stubs: ['ProductCard', 'SortDropdown'],
        mocks: {
          $store: {
            getters: { allProducts: mockProducts },
            dispatch: fetchProducts,
          },
        },
      },
    }) as VueWrapper<ProductsVm>
    // Simulate fetchProducts and set products
    await (wrapper.vm as ProductsVm).fetchProducts()
    ;(wrapper.vm as ProductsVm).products = [...mockProducts]
    await wrapper.vm.$nextTick()
  })

  it('renders the correct number of ProductCard components', () => {
    // ProductCard is stubbed, so check for the stub elements instead
    // Vue Test Utils converts kebab-case to PascalCase for stub tags
    expect(wrapper.findAllComponents({ name: 'ProductCard' }).length).toBe(3)
    expect((wrapper.vm as ProductsVm).products.length).toBe(3)
  })

  it('sorts products by price ascending', async () => {
    await (wrapper.vm as ProductsVm).sortProducts('price-asc')
    expect((wrapper.vm as ProductsVm).products.map((p: { price: number }) => p.price)).toEqual([
      5, 10, 20,
    ])
  })

  it('sorts products by price descending', async () => {
    await (wrapper.vm as ProductsVm).sortProducts('price-desc')
    expect((wrapper.vm as ProductsVm).products.map((p: { price: number }) => p.price)).toEqual([
      20, 10, 5,
    ])
  })

  it('sorts products by rating', async () => {
    await (wrapper.vm as ProductsVm).sortProducts('rating')
    expect(
      (wrapper.vm as ProductsVm).products.map((p: { rating: { rate: number } }) => p.rating.rate),
    ).toEqual([5, 4.5, 3.5])
  })

  it('resets to all products when default is selected', async () => {
    await (wrapper.vm as ProductsVm).sortProducts('price-desc')
    await (wrapper.vm as ProductsVm).sortProducts('default')
    expect((wrapper.vm as ProductsVm).products).toEqual(mockProducts)
  })
})
