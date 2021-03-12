import request from 'utils/request'

const BaseUrl = '/repair/'

export default {
  statistics(data) {
    return request(`${BaseUrl}taskhomepage/statistics`, data, 'get')
  },
  // lat lon
  near(data) {
    // data = { lat: 36.786533, lon: 136.634525 }
    return request(`${BaseUrl}exhibition/near`, data, 'get')
  },
  upload(data) {
    return request('/common/file/upload', data, 'UPLOAD')
  },
  scan(data) {
    return request(`${BaseUrl}/scan`, data)
  },
}
