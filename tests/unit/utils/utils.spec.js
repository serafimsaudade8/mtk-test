import {
  parseURLparams,
  updateURLparams,
  parseListData
} from '@/utils/utils'
import { mockedData } from '@/api/mockData'

afterEach(() => {
  jest.clearAllMocks()
})

describe('UTILS ::: UTILS', () => {
  it('function "parseURLparams" should correctly parse the query params', () => {
    const ctx = {
      $route: {
        query: {
          unitOfMeasure: 'mi',
          search: 'some-search'
        }
      }
    }

    const res = parseURLparams(ctx)
    expect(res).toEqual({
      unitOfMeasure: 'mi',
      search: 'some-search'
    })
  })

  it('function "updateURLparams" should correctly update the url query params', async () => {
    const ctx = {
      $router: {
        replace: jest.fn((params, cb) => {
          cb()
        })
      },
      $route: {
        query: {
          unitOfMeasure: 'km',
          search: 'some-search'
        }
      }
    }

    const params = {
      unitOfMeasure: 'mi',
      search: ''
    }

    await updateURLparams(ctx, params)
    expect(ctx.$router.replace.mock.calls[0][0]).toEqual(expect.objectContaining({
      name: 'SearchPageView',
      query: {
        unitOfMeasure: 'mi'
      }
    }))
  })

  it('function "updateURLparams" without params should not update', async () => {
    const ctx = {
      $router: {
        replace: jest.fn((params, cb) => {
          cb()
        })
      },
      $route: {
        query: {
          unitOfMeasure: 'km'
        }
      }
    }

    const params = {}

    await updateURLparams(ctx, params)
    expect(ctx.$router.replace).not.toHaveBeenCalled()
  })

  it('function "updateURLparams" without changes should not update', async () => {
    const ctx = {
      $router: {
        replace: jest.fn((params, cb) => {
          cb()
        })
      },
      $route: {
        query: {
          unitOfMeasure: 'mi',
          search: 'some-search'
        }
      }
    }

    const params = {
      unitOfMeasure: 'mi',
      search: 'some-search'
    }

    await updateURLparams(ctx, params)
    expect(ctx.$router.replace).not.toHaveBeenCalled()
  })

  it('function "parseListData" should correctly parse the list data', async () => {
    const parsedObj = {
      id: 3851370,
      make: 'Hyundai',
      model: 'i20',
      type: 'USED',
      version: ' 1.4 CRDi 5 porte Go! Plus',
      seats: 5,
      classCode: 'auto',
      price: 20200,
      km: 38475,
      co2: 102,
      isKm0: false,
      status: 'FREE',
      image: 'https://cdn.dealerk.it/dealer/datafiles/vehicle/images/$original$/32841/1594394984326.jpg',
      homologationStandard: {
        wltp: {
          consumption: {
            combined: 3.9,
            unitOfMeasure: 'l/100km'
          }
        }
      },
      parsedKm: '38,475 Km',
      parsedMi: '23,907 Mi',
      parsedCo2Km: '102 g/km',
      parsedCo2Mi: '63 g/Mi',
      parsedConsumptionKm: '3.9 l/100km',
      parsedConsumptionMpg: '60 mpg'
    }

    const res = parseListData(mockedData)
    expect(res[0]).toMatchObject(parsedObj)
  })
})
