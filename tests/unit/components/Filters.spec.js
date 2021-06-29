import { shallowMount } from '@vue/test-utils'
import Filters from '@/components/Filters.vue'

const filters = {
  unitOfMeasure: 'km'
}

describe('Filters.vue', () => {
  it('should render component properly when full data is passed correctly', () => {
    const wrapper = shallowMount(Filters, {
      propsData: { filters }
    })

    expect(wrapper.find('.c-Filters').exists()).toBe(true)
    expect(wrapper.find('.c-Filters__title').exists()).toBe(true)
    expect(wrapper.find('.c-Filters__title i').exists()).toBe(true)
    expect(wrapper.find('.c-Filters__title span').exists()).toBe(true)
    expect(wrapper.find('.c-Filters__title span').text()).toEqual('Filters')
    expect(wrapper.find('.c-Filters__filterBlock--search').exists()).toBe(true)
    expect(wrapper.find('.c-Filters__filterBlock--search h2').exists()).toBe(true)
    expect(wrapper.find('.c-Filters__filterBlock--search h2').text()).toEqual('Search')
    expect(wrapper.find('.c-Filters__filterBlock--search input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('.c-Filters__filterBlock--search input[type="text"]').attributes('placeholder')).toBe('Search here')
    expect(wrapper.find('.c-Filters__filterBlock').exists()).toBe(true)
    expect(wrapper.find('.c-Filters__filterBlock h2').exists()).toBe(true)
    expect(wrapper.find('.c-Filters__filterBlock h2').text()).toEqual('Unit of measure')
    expect(wrapper.find('.c-Filters__btnsGroup').exists()).toBe(true)
    expect(wrapper.findAll('.c-Filters__btnsGroup button').length).toEqual(2)
    expect(wrapper.find('.c-Filters__btnsGroup button:first-child span').text()).toEqual('Miles')
    expect(wrapper.find('.c-Filters__btnsGroup button:last-child span').text()).toEqual('Km')
  })

  it('triggering "handleSearchString" should emit "changeFilters" event with the appropriate value', () => {
    const wrapper = shallowMount(Filters, {
      propsData: { filters }
    })

    wrapper.find('.c-Filters__filterBlock--search input[type="text"]').setValue('some-text')
    expect(wrapper.emitted().changeFilters[0]).toBeTruthy()
    expect(wrapper.emitted().changeFilters[0]).toEqual([{
      search: 'some-text'
    }])
  })

  it('triggering "changeUnitOfMeasure" should emit "changeFilters" event with the appropriate value', () => {
    const wrapper = shallowMount(Filters, {
      propsData: { filters }
    })

    wrapper.find('.c-Filters__btnsGroup button:first-child').trigger('click')
    expect(wrapper.emitted().changeFilters[0]).toBeTruthy()
    expect(wrapper.emitted().changeFilters[0]).toEqual([{
      unitOfMeasure: 'mi'
    }])
  })

  it('props default types should match correctly', () => {
    const wrapperNoProps = shallowMount(Filters)

    expect(wrapperNoProps.props().filters).toEqual({})
  })
})
