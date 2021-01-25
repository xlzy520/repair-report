import request from 'utils/request'

const BaseUrl = '/audience/'

export default {
  statistics(data) {
    return request(`${BaseUrl}taskhomepage/statistics`, data, 'get')
  },
  
  
  
}
