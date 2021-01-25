import request from 'utils/request'

const BaseUrl = '/audience/'

export default {
  statistics(data) {
    return request(`${BaseUrl}taskhomepage/statistics`, data, 'get')
  },
  // lat lon
  near(data) {
    data = { lat: 136.634525, lon: 36.786533 }
    return request(`${BaseUrl}exhibition/near`, data, 'get')
  },
  upload(data) {
    return request('/common/file/upload', data, 'UPLOAD')
  },
}
