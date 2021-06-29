import { retrieveFromCache } from '@/utils/cache'

export function debounce (callback, time) {
  let interval
  return (...args) => {
    clearTimeout(interval)
    interval = setTimeout(() => {
      interval = null
      // eslint-disable-next-line
      callback(...args)
    }, time)
  }
}

export function parseURLparams (ctx) {
  const filters = {}
  const urlParams = Object.assign({}, ctx.$route.query)

  // update filter values
  Object.keys(urlParams).forEach(key => {
    if (key === 'search' || key === 'unitOfMeasure') {
      filters[key] = urlParams[key]
    }
  })

  return filters
}

export function updateURLparams (ctx, params) {
  return new Promise((resolve, reject) => {
    let hasChanged = false

    if (!Object.keys(params).length) {
      resolve()
    } else {
      const queryParams = Object.assign({}, ctx.$route.query)

      Object.keys(params).forEach(key => {
        if (params[`${key}`] !== queryParams[`${key}`]) {
          hasChanged = true
        }

        if (params[`${key}`]) {
          queryParams[`${key}`] = params[`${key}`]
        } else {
          delete queryParams[`${key}`]
        }
      })

      if (!hasChanged) {
        return resolve()
      }

      ctx.$router.replace({
        name: 'SearchPageView',
        query: queryParams
      }, () => {
        resolve()
      }, () => {
        reject(new Error('could not update filters as route params'))
      })
    }
  })
}

export function parseListData (listData) {
  const cachedData = retrieveFromCache('localStorage', 'favourites')
  const kmToMiles = 0.621371192
  const litersToMpg = 235.22

  return listData.map(item => {
    const newItem = {
      ...item
    }

    // units adjustments
    if (item.price) {
      newItem.price = parseInt(item.price)
    }
    if (item.km) {
      newItem.km = parseInt(item.km)
    }
    if (item.co2) {
      newItem.co2 = parseInt(item.co2)
    }
    if (item.homologationStandard?.wltp?.consumption?.combined) {
      newItem.homologationStandard.wltp.consumption.combined = parseFloat(item.homologationStandard.wltp.consumption.combined)
    }

    // Kms to Mi
    newItem.parsedKm = newItem.km < 0 ? 'Nuovo' : `${new Intl.NumberFormat('it').format(newItem.km)} Km`
    newItem.parsedMi = newItem.km < 0 ? 'Nuovo' : `${new Intl.NumberFormat('it').format(parseInt(newItem.km * kmToMiles))} Mi`
    newItem.parsedCo2Km = `${newItem.co2} g/km`
    newItem.parsedCo2Mi = `${parseInt(newItem.co2 * kmToMiles)} g/Mi`
    newItem.parsedConsumptionKm = newItem.homologationStandard?.wltp?.consumption?.combined ? `${newItem.homologationStandard?.wltp?.consumption?.combined} l/100km` : 'no info'
    newItem.parsedConsumptionMpg = newItem.homologationStandard?.wltp?.consumption?.combined ? `${parseInt(litersToMpg / newItem.homologationStandard?.wltp?.consumption?.combined)} mpg` : 'no info'

    // favourited prop
    newItem.isFavourited = (cachedData && cachedData[item.id]) || false

    return newItem
  })
}
