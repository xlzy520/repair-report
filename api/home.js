import request from 'utils/request'

const BaseUrl = '/audience/reapir/'

export default {
  getWeiXiuList(data) {
    return request(`${BaseUrl}weixiu/list`, data, 'get')
  },
  
  getBaoXiuList(data) {
    return request(`${BaseUrl}baoxiu/list`, data, 'get')
  },
  getYanShouList(data) {
    return request(`${BaseUrl}yanshou/list`, data, 'get')
  },
  

}
