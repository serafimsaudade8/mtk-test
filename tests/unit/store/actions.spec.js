import storeState from '@/store/state'
import actions from '@/store/actions'
import { API } from '@/api/api'

const commit = jest.fn()
const state = storeState

afterEach(() => {
  jest.clearAllMocks()
})

jest.mock('@/utils/utils', () => ({
  parseURLparams: jest.fn().mockImplementation(() => {
    return {
      search: 'some-search'
    }
  }),
  updateURLparams: jest.fn().mockImplementation(() => {
    return {
      unitOfMeasure: 'mocked-update-km'
    }
  }),
  parseListData: jest.fn().mockImplementation(() => {
    return [
      {
        id: 'some-parsed-id-1'
      },
      {
        id: 'some-parsed-id-2'
      }
    ]
  })
}))

jest.mock('@/utils/cache', () => ({
  retrieveFromCache: jest.fn().mockImplementation(() => {
    return {
      'some-id-1': true
    }
  }),
  storeToCache: jest.fn().mockImplementation(() => {
    return true
  })
}))

describe('Store (Vuex) ::: actions', () => {
  it('action for "initListData" returning a valid result should resolve', async () => {
    jest.useFakeTimers()

    const apiLoadListData = jest.spyOn(API, 'loadListData')
    apiLoadListData.mockResolvedValueOnce([
      {
        id: 'some-id-1'
      },
      {
        id: 'some-id-2'
      }
    ])

    const ctx = {
      $route: {
        query: {
          search: 'some-search'
        }
      }
    }

    await actions.initListData({ state, commit }, ctx)
    jest.runAllTimers()
    expect(commit.mock.calls[0]).toEqual(['updateFilters', {
      search: 'some-search',
      unitOfMeasure: 'km'
    }])
    expect(commit.mock.calls[1]).toEqual(['updateLoading', true])
    expect(commit.mock.calls[2]).toEqual(['updateListData', [
      expect.objectContaining({ id: 'some-parsed-id-1' }),
      expect.objectContaining({ id: 'some-parsed-id-2' })
    ]])
    expect(commit.mock.calls[3]).toEqual(['updateLoading', false])
  })

  it('action for "initListData" returning error on request should reject', async () => {
    const apiLoadListData = jest.spyOn(API, 'loadListData')
    apiLoadListData.mockRejectedValueOnce(new Error('some-error'))

    const ctx = {
      $route: {
        query: {
          search: 'some-search'
        }
      }
    }

    try {
      await actions.initListData({ state, commit }, ctx)
    } catch (err) {
      expect(err).toEqual(new Error('some-error'))
    }
  })

  it('action for "loadListData" returning a valid result should resolve', async () => {
    jest.useFakeTimers()

    const apiLoadListData = jest.spyOn(API, 'loadListData')
    apiLoadListData.mockResolvedValueOnce([
      {
        id: 'some-id-1'
      },
      {
        id: 'some-id-2'
      }
    ])

    await actions.loadListData({ state, commit })
    jest.runAllTimers()
    expect(commit.mock.calls[0]).toEqual(['updateLoading', true])
    expect(commit.mock.calls[1]).toEqual(['updateListData', [
      expect.objectContaining({ id: 'some-parsed-id-1' }),
      expect.objectContaining({ id: 'some-parsed-id-2' })
    ]])
    expect(commit.mock.calls[2]).toEqual(['updateLoading', false])
  })

  it('action for "loadListData" returning error on request should reject', async () => {
    const apiLoadListData = jest.spyOn(API, 'loadListData')
    apiLoadListData.mockRejectedValueOnce(new Error('some-error'))

    try {
      await actions.loadListData({ state, commit })
    } catch (err) {
      expect(err).toEqual(new Error('some-error'))
    }
  })

  it('action for "updateFavourites" with new item to store should add it to cache', async () => {
    const payload = {
      'some-id-2': true
    }
    const res = await actions.updateFavourites({ state, commit }, payload)
    expect(commit.mock.calls[0]).toEqual(['updateListData', [
      expect.objectContaining({ id: 'some-parsed-id-1' }),
      expect.objectContaining({ id: 'some-parsed-id-2' })
    ]])
    expect(res).toEqual([
      expect.objectContaining({ id: 'some-parsed-id-1' }),
      expect.objectContaining({ id: 'some-parsed-id-2' })
    ])
  })

  it('action for "updateFavourites" with new item to store should remove it from cache', async () => {
    const payload = {
      'some-id-1': false
    }
    const res = await actions.updateFavourites({ state, commit }, payload)
    expect(commit.mock.calls[0]).toEqual(['updateListData', [
      expect.objectContaining({ id: 'some-parsed-id-1' }),
      expect.objectContaining({ id: 'some-parsed-id-2' })
    ]])
    expect(res).toEqual([
      expect.objectContaining({ id: 'some-parsed-id-1' }),
      expect.objectContaining({ id: 'some-parsed-id-2' })
    ])
  })

  it('action for "updateFilters" should update filters accordingly', async () => {
    const res = await actions.updateFilters({ state, commit }, {
      ctx: {},
      data: {
        search: 'some-search-1'
      }
    })
    expect(commit.mock.calls[0]).toEqual(['updateFilters', {
      search: 'some-search-1',
      unitOfMeasure: 'km'
    }])
    expect(res).toEqual({ unitOfMeasure: 'mocked-update-km' })
  })
})
