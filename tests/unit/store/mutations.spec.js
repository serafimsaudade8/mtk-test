import mutations from '@/store/mutations'

const state = {
  loading: false,
  filters: {
    search: '',
    unitOfMeasure: 'km'
  },
  listData: []
}

describe('Store (Vuex) ::: mutations', () => {
  it('mutation for "updateLoading" should set "loading" state with the appropriate payload', () => {
    const payload = true
    mutations.updateLoading(state, payload)
    expect(state.loading).toEqual(payload)
  })
  it('mutation for "updateFilters" should set "filters" state with the appropriate payload', () => {
    const payload = {
      search: 'some-search',
      unitOfMeasure: 'mi'
    }
    mutations.updateFilters(state, payload)
    expect(state.filters).toEqual(payload)
  })
  it('mutation for "updateListData" should set "listData" state with the appropriate payload', () => {
    const payload = [
      'item1', 'item2'
    ]
    mutations.updateListData(state, payload)
    expect(state.listData).toEqual(payload)
  })
})
