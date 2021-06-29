import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import App from '@/App.vue'
import Loading from '@/components/Loading.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('App.vue', () => {
  it('should render view properly when data is loaded correctly', () => {
    const wrapper = shallowMount(App, {
      localVue,
      store: new Vuex.Store({
        store: {},
        getters: {
          loading: jest.fn(() => false)
        }
      }),
      stubs: ['router-view']
    })

    expect(wrapper.find('#app').exists()).toBe(true)
    expect(wrapper.find(Loading).exists()).toBe(true)
    expect(wrapper.find(Loading).isVisible()).toBe(false)
  })

  it('if loading is TRUE, Loading component should be visible', () => {
    const wrapper = shallowMount(App, {
      localVue,
      store: new Vuex.Store({
        store: {},
        getters: {
          loading: jest.fn(() => true)
        }
      }),
      stubs: ['router-view']
    })

    expect(wrapper.find(Loading).exists()).toBe(true)
    expect(wrapper.find(Loading).isVisible()).toBe(true)
    expect(wrapper.find('#app').classes()).toContain('isLoading')
  })
})
