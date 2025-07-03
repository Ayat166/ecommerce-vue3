import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import SortDropdown from '../SortDropdown.vue'

describe('SortDropdown', () => {
  it('renders all sort options', () => {
    const wrapper = shallowMount(SortDropdown, {
      props: { modelValue: 'default' },
    })
    const options = wrapper.findAll('option')
    expect(options).toHaveLength(4)
    expect(options[0].text()).toBe('All Products')
    expect(options[1].text()).toBe('Price: Low to High')
    expect(options[2].text()).toBe('Price: High to Low')
    expect(options[3].text()).toBe('Highest Rated')
  })

  it('emits update:modelValue event with correct value when changed', async () => {
    const wrapper = shallowMount(SortDropdown, {
      props: { modelValue: 'default' },
    })
    const select = wrapper.find('select')
    await select.setValue('price-asc')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['price-asc'])
    await select.setValue('rating')
    expect(wrapper.emitted('update:modelValue')![1]).toEqual(['rating'])
  })

  it('has default selected value as "default"', () => {
    const wrapper = shallowMount(SortDropdown, {
      props: { modelValue: 'default' },
    })
    const select = wrapper.find('select')
    expect((select.element as HTMLSelectElement).value).toBe('default')
  })
})
