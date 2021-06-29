import { API } from '@/api/api'
import { mockedData } from '@/api/mockData'

afterEach(() => {
  jest.clearAllMocks()
})

describe('API ::: API', () => {
  it('function "loadListData" without filters should correctly load data from the server', async () => {
    const res = await API.loadListData({})
    expect(res).toEqual(mockedData)
  })

  it('function "loadListData" with search filter "i20" should load only 2 items', async () => {
    const res = await API.loadListData({
      search: 'i20'
    })
    expect(res.length).toEqual(2)
  })
})
