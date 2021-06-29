const cache = {}

export function retrieveFromCache (cacheType, dataType) {
  let result = null
  let localData = null
  let sessionData = null
  switch (cacheType) {
    case 'variable':
      if (cache[dataType]) {
        result = cache[dataType]
      }
      break
    case 'localStorage':
      localData = localStorage.getItem(dataType)
      if (localData && JSON.parse(localData)) {
        result = JSON.parse(localData)
      }
      break
    case 'sessionStorage':
      sessionData = sessionStorage.getItem(dataType)
      if (sessionData && JSON.parse(sessionData)) {
        result = JSON.parse(sessionData)
      }
      break
    default:
      console.error(`Unknown cache type while retrieving from cache ::: ${cacheType}`)
      break
  }
  return result
}

export function storeToCache (cacheType, dataType, data) {
  const result = {
    type: cacheType,
    success: false
  }
  switch (cacheType) {
    case 'variable':
      cache[dataType] = data
      result.success = true
      break
    case 'localStorage':
      try {
        localStorage.setItem(dataType, JSON.stringify(data))
        result.success = true
      } catch (error) {
        if (error && (error.code === 22 || error.code === 1014)) {
          console.error('localStorage is full (new data) ::: ', error)
        }
      }
      break
    case 'sessionStorage':
      try {
        sessionStorage.setItem(dataType, JSON.stringify(data))
        result.success = true
      } catch (error) {
        if (error && (error.code === 22 || error.code === 1014)) {
          console.error('sessionStorage is full (new data) ::: ', error)
        }
      }
      break
    default:
      console.error(`Unknown cache type while saving to cache ::: ${cacheType}`)
      break
  }
  return result
}
