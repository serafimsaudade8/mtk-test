import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { mockedData } from '@/api/mockData'
import List from '@/components/List.vue'

const actions = {
  updateFavourites: jest.fn(() => {
    return Promise.resolve()
  })
}

const listData = mockedData
const unitOfMeasure = 'km'
const withError = false

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store({
  store: {},
  actions
})

describe('List.vue', () => {
  it('should render component properly when data without error is passed correctly', () => {
    const wrapper = shallowMount(List, {
      propsData: {
        listData,
        unitOfMeasure,
        withError
      }
    })

    expect(wrapper.find('.c-List').exists()).toBe(true)
    expect(wrapper.find('.c-List__mainContainer').exists()).toBe(true)
    expect(wrapper.findAll('.c-List__item').length).toEqual(7)
    expect(wrapper.find('.c-List__imgContainer').exists()).toBe(true)
    expect(wrapper.find('.c-List__imgContainer img').exists()).toBe(true)
    expect(wrapper.find('.c-List__imgContainer > div').exists()).toBe(true)
    expect(wrapper.find('.c-List__imgContainer > div i').exists()).toBe(true)
    expect(wrapper.find('.c-List__imgContainer > div span').exists()).toBe(true)
    expect(wrapper.find('.c-List__imgContainer > i').exists()).toBe(true)
    expect(wrapper.find('.c-List__mainContent').exists()).toBe(true)
    expect(wrapper.find('.c-List__makeModel').exists()).toBe(true)
    expect(wrapper.find('.c-List__version').exists()).toBe(true)
    expect(wrapper.find('.c-List__separator').exists()).toBe(true)
    expect(wrapper.find('.c-List__priceFavContainer').exists()).toBe(true)
    expect(wrapper.find('.c-List__priceFavContainer .c-List__priceContainer').exists()).toBe(true)
    expect(wrapper.find('.c-List__priceFavContainer .c-List__priceContainer span').exists()).toBe(true)
    expect(wrapper.find('.c-List__priceFavContainer .c-List__priceContainer span').text()).toEqual('A partire da')
    expect(wrapper.find('.c-List__priceFavContainer .c-List__priceContainer p').exists()).toBe(true)
    expect(wrapper.find('.c-List__priceFavContainer .c-List__favContainer').exists()).toBe(true)
    expect(wrapper.find('.c-List__priceFavContainer .c-List__favContainer i').exists()).toBe(true)
    expect(wrapper.find('.c-List__detailsContainer').exists()).toBe(true)
    expect(wrapper.find('.c-List__mainDetails').exists()).toBe(true)
    expect(wrapper.find('.c-List__consumptionRatingContainer').exists()).toBe(true)
    expect(wrapper.find('.c-List__consumptionContainer').exists()).toBe(true)
    expect(wrapper.find('.c-List__ratingContainer').exists()).toBe(true)
    expect(wrapper.find('.c-List__ratingContainer span').exists()).toBe(true)
    expect(wrapper.find('.c-List__ratingContainer span').text()).toEqual('A+')
  })

  it('should render error message if error prop is true', () => {
    const wrapper = shallowMount(List, {
      propsData: {
        listData,
        unitOfMeasure,
        withError: true
      }
    })

    expect(wrapper.find('.c-List').exists()).toBe(true)
    expect(wrapper.find('.c-List__mainContainer').exists()).toBe(false)
    expect(wrapper.find('.c-List__error').exists()).toBe(true)
    expect(wrapper.find('.c-List__error').text()).toEqual('An error occurred, please try again')
  })

  it('triggering "handleFavourite" should dispatch acion "updateFavourites" with the appropriate payload', () => {
    const wrapper = shallowMount(List, {
      localVue,
      store,
      propsData: {
        listData,
        unitOfMeasure,
        withError
      }
    })

    const expectedPayload = {
      3851370: true
    }

    wrapper.find('.c-List__item:nth-child(1) .c-List__favContainer').trigger('click')
    expect(actions.updateFavourites).toHaveBeenCalled()
    expect(actions.updateFavourites.mock.calls[0][1]).toEqual(expectedPayload)
  })

  it('props default types should match correctly', () => {
    const wrapperNoProps = shallowMount(List)

    expect(wrapperNoProps.props().listData).toEqual([])
    expect(wrapperNoProps.props().unitOfMeasure).toEqual('')
    expect(wrapperNoProps.props().withError).toEqual(false)
  })
})
