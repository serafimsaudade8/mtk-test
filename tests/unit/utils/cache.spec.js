import {
  retrieveFromCache,
  storeToCache
} from '@/utils/cache'

afterEach(() => {
  jest.clearAllMocks()
})

describe('UTILS ::: CACHE', () => {
  it('function "retrieveFromCache" for VARIABLE based cache should get the stored information properly', () => {
    const res = retrieveFromCache('variable', 'favourites')
    expect(res).toEqual(null)
  })

  it('function "retrieveFromCache" for LOCALSTORAGE based cache should get the stored information properly', () => {
    window.localStorage.__proto__.getItem = jest.fn(() => {
      return JSON.stringify({
        'some-id': true
      })
    })
    const res = retrieveFromCache('localStorage', 'favourites')
    expect(res).toEqual({
      'some-id': true
    })
  })

  it('function "retrieveFromCache" for SESSIONSTORAGE based cache should get the stored information properly', () => {
    window.sessionStorage.__proto__.getItem = jest.fn(() => {
      return JSON.stringify({
        'some-id': true
      })
    })
    const res = retrieveFromCache('sessionStorage', 'favourites')
    expect(res).toEqual({
      'some-id': true
    })
  })

  it('function "retrieveFromCache" for WITHOUT valid cacheType should console.error', () => {
    console.error = jest.fn()
    const res = retrieveFromCache('dummyCacheName', 'favourites')
    expect(res).toEqual(null)
    expect(console.error).toHaveBeenCalledWith('Unknown cache type while retrieving from cache ::: dummyCacheName')
  })

  it('function "storeToCache" for VARIABLE based cache should store information properly', () => {
    const res = storeToCache('variable', 'favourites', { 'some-id': true })
    expect(res).toEqual({
      type: 'variable',
      success: true
    })
  })

  it('function "storeToCache" for LOCALSTORAGE based cache WITHOUT ERROR should store information properly', () => {
    window.localStorage.__proto__.setItem = jest.fn()
    const res = storeToCache('localStorage', 'favourites', { 'some-id': true })
    expect(res).toEqual({
      type: 'localStorage',
      success: true
    })
    expect(localStorage.setItem).toHaveBeenCalledWith('favourites', JSON.stringify({ 'some-id': true }))
  })

  it('function "storeToCache" for LOCALSTORAGE based cache WITH ERROR CODE 22 should return success FALSE', () => {
    console.error = jest.fn()
    window.localStorage.__proto__.setItem = jest.fn(() => {
      throw ({
        code: 22
      })
    })
    const res = storeToCache('localStorage', 'favourites', { 'some-id': true })
    expect(res).toEqual({
      type: 'localStorage',
      success: false
    })
    expect(localStorage.setItem).toHaveBeenCalledWith('favourites', JSON.stringify({ 'some-id': true }))
    expect(console.error).toHaveBeenCalledWith('localStorage is full (new data) ::: ', {
      code: 22
    })
  })

  it('function "storeToCache" for SESSIONSTORAGE based cache should store information properly', () => {
    window.sessionStorage.__proto__.setItem = jest.fn()
    const res = storeToCache('sessionStorage', 'favourites', { 'some-id': true })
    expect(res).toEqual({
      type: 'sessionStorage',
      success: true
    })
    expect(sessionStorage.setItem).toHaveBeenCalledWith('favourites', JSON.stringify({ 'some-id': true }))
  })

  it('function "storeToCache" for SESSIONSTORAGE based cache WITH ERROR CODE 22 should return success FALSE', () => {
    console.error = jest.fn()
    window.sessionStorage.__proto__.setItem = jest.fn(() => {
      throw ({
        code: 22
      })
    })
    const res = storeToCache('sessionStorage', 'favourites', { 'some-id': true })
    expect(res).toEqual({
      type: 'sessionStorage',
      success: false
    })
    expect(sessionStorage.setItem).toHaveBeenCalledWith('favourites', JSON.stringify({ 'some-id': true }))
    expect(console.error).toHaveBeenCalledWith('sessionStorage is full (new data) ::: ', {
      code: 22
    })
  })

  it('function "storeToCache" for WITHOUT valid cacheType should console.error', () => {
    console.error = jest.fn()
    const res = storeToCache('dummyCacheName', 'favourites', {})
    expect(res).toEqual({
      type: 'dummyCacheName',
      success: false
    })
    expect(console.error).toHaveBeenCalledWith('Unknown cache type while saving to cache ::: dummyCacheName')
  })

})
