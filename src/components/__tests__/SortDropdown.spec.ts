import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import SortDropdown from '../SortDropdown.vue'

describe('SortDropdown', () => {
  it('renders all sort options', () => {
    const wrapper = shallowMount(SortDropdown)
    const options = wrapper.findAll('option')
    expect(options).toHaveLength(4)
    expect(options[0].text()).toBe('All Products')
    expect(options[1].text()).toBe('Price: Low to High')
    expect(options[2].text()).toBe('Price: High to Low')
    expect(options[3].text()).toBe('Highest Rated')
  })

  it('emits sort event with correct value when changed', async () => {
    const wrapper = shallowMount(SortDropdown)
    const select = wrapper.find('select')
    await select.setValue('price-asc')
    expect(wrapper.emitted('sort')).toBeTruthy()
    expect(wrapper.emitted('sort')![0]).toEqual(['price-asc'])
    await select.setValue('rating')
    expect(wrapper.emitted('sort')![1]).toEqual(['rating'])
  })

  it('has default selected value as "default"', () => {
    const wrapper = shallowMount(SortDropdown)
    const select = wrapper.find('select')
    expect((select.element as HTMLSelectElement).value).toBe('default')
  })
})
