import getters from '@/store/getters'

const state = {
  loading: false,
  filters: {
    search: '',
    unitOfMeasure: 'km'
  },
  listData: []
}

describe('Store (Vuex) ::: getters', () => {
  it('getter for "loading" should return loading data', () => {
    const actual = getters.loading(state)
    expect(actual).toEqual(state.loading)
  })
  it('getter for "filters" should return filters data', () => {
    const actual = getters.filters(state)
    expect(actual).toEqual(state.filters)
  })
  it('getter for "listData" should return list data', () => {
    const actual = getters.listData(state)
    expect(actual).toEqual(state.listData)
  })
})
