import { mockedData } from '@/api/mockData'

export const API = {
  loadListData (filters) {
    // here we should have an axios call to the server with the filters we want to apply
    // ex: return axios.get('https://some-api.com/list', payload)

    // uncomment this and comment the next lines to mock error on server
    // return Promise.reject(new Error({
    //   code: '400',
    //   text: 'some error occurred'
    // }))

    // for this example we use mocked data
    if (filters.search) {
      const regex = new RegExp(filters.search, 'gi')

      return Promise.resolve(mockedData.filter(item => {
        if (
          (item.make && item.make.match(regex)) ||
          (item.model && item.model.match(regex)) ||
          (item.version && item.version.match(regex))) {
          return item
        }
      }))
    }

    return Promise.resolve(mockedData)
  }
}
