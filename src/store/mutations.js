import Vue from 'vue'

const mutations = {
  updateLoading (state, payload) {
    Vue.set(state, 'loading', payload)
  },
  updateFilters (state, payload) {
    Vue.set(state, 'filters', payload)
  },
  updateListData (state, payload) {
    Vue.set(state, 'listData', payload)
  }
}

export default mutations
