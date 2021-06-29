import { API } from '@/api/api'
import {
  parseURLparams,
  updateURLparams,
  parseListData
} from '@/utils/utils'
import { retrieveFromCache, storeToCache } from '@/utils/cache'

function handleDataLoading (commit, filters) {
  commit('updateLoading', true)

  return API.loadListData(filters).then((res) => {
    const parsedData = parseListData(res)
    commit('updateListData', parsedData)

    // setTimeout to mock async nature of the function in order to display loader
    setTimeout(() => {
      commit('updateLoading', false)
      return parsedData
    }, 800)
  }).catch((err) => {
    commit('updateLoading', false)
    return Promise.reject(err)
  })
}

const actions = {
  initListData ({ state, commit }, ctx) {
    // read url params and set filters
    if (Object.keys(ctx.$route?.query).length) {
      const newFilters = {
        ...state.filters
      }

      const filters = parseURLparams(ctx)
      Object.keys(filters).forEach(key => {
        newFilters[key] = filters[key]
      })

      commit('updateFilters', newFilters)
    }

    // add missing url params if needed
    const paramUpdates = {}

    Object.keys(state.filters).forEach(key => {
      if (!ctx.$route.query[key] && state.filters[key]) {
        paramUpdates[key] = state.filters[key]
      }
    })

    if (Object.keys(paramUpdates).length) {
      updateURLparams(ctx, paramUpdates)
    }

    // load data
    return handleDataLoading(commit, state.filters)
  },
  loadListData ({ state, commit }) {
    return handleDataLoading(commit, state.filters)
  },
  updateFavourites ({ state, commit }, payload) {
    // store in cache
    let cachedData = retrieveFromCache('localStorage', 'favourites')

    if (!cachedData) {
      cachedData = {}
    }

    const id = Object.keys(payload)[0]
    const val = payload[id]

    if (val) {
      cachedData[id] = val
    } else if (cachedData[id] && !val) {
      delete cachedData[id]
    }

    storeToCache('localStorage', 'favourites', cachedData)

    // update store list data
    const parsedData = parseListData(state.listData)
    commit('updateListData', parsedData)
    return parsedData
  },
  updateFilters ({ state, commit }, payload) {
    // update store filters
    const newFilters = {
      ...state.filters
    }

    const key = Object.keys(payload.data)[0]
    newFilters[key] = payload.data[key]

    commit('updateFilters', newFilters)

    // update url params
    return updateURLparams(payload.ctx, newFilters)
  }
}

export default actions
