import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { mockedData } from '@/api/mockData'
import SearchPageView from '@/views/SearchPageView.vue'
import List from '@/components/List.vue'
import Filters from '@/components/Filters.vue'

const actions = {
  initListData: jest.fn(() => {
    return Promise.resolve()
  }),
  loadListData: jest.fn(() => {
    return Promise.resolve()
  }),
  updateFilters: jest.fn(() => {
    return Promise.resolve()
  })
}

const getters = {
  filters: jest.fn(() => {
    return Promise.resolve({
      unitOfMeasure: 'km'
    })
  }),
  listData: jest.fn(() => {
    return Promise.resolve(mockedData)
  })
}

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store({
  store: {},
  actions,
  getters
})

describe('SearchPageView.vue', () => {
  it('should render view properly when data is loaded correctly', () => {
    const wrapper = shallowMount(SearchPageView, {
      localVue,
      store
    })

    expect(wrapper.find('.l-SearchPageView').exists()).toBe(true)
    expect(wrapper.find('.l-SearchPageView h1').exists()).toBe(true)
    expect(wrapper.find('.l-SearchPageView h1').text()).toEqual('Search page')
    expect(wrapper.find('.l-SearchPageView__mainContainer').exists()).toBe(true)
    expect(wrapper.find(Filters).exists()).toBe(true)
    expect(wrapper.find('.l-SearchPageView__filters').exists()).toBe(true)
    expect(wrapper.find(List).exists()).toBe(true)
    expect(wrapper.find('.l-SearchPageView__list').exists()).toBe(true)
    expect(actions.initListData).toHaveBeenCalled()
    expect(wrapper.vm.withError).toEqual(false)
  })

  it('should set withError to TRUE if initListData rejects', async () => {
    const newStore = new Vuex.Store({
      store: {},
      actions: {
        initListData: jest.fn(() => {
          return Promise.reject(new Error('some-error'))
        })
      },
      getters
    })

    const wrapper = shallowMount(SearchPageView, {
      localVue,
      store: newStore
    })

    await wrapper.vm.$nextTick()
    expect(actions.initListData).toHaveBeenCalled()
    expect(wrapper.vm.withError).toEqual(true)
  })

  it('triggering "handleFiltersChange" should dispatch action "updateFilters" with the appropriate payload', async () => {
    const wrapper = shallowMount(SearchPageView, {
      localVue,
      store
    })

    wrapper.vm.handleFiltersChange({
      search: 'some-search'
    })
    expect(actions.updateFilters).toHaveBeenCalled()
    expect(actions.updateFilters.mock.calls[0][1]).toEqual(expect.objectContaining({
      data: {
        search: 'some-search'
      }
    }))
  })
})
