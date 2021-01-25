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
  // 小程序验收提交
  acceptance(data) {
    return request(`${BaseUrl}acceptance`, data)
  },
  // 小程序报修申请
  add(data) {
    return request(`${BaseUrl}add`, data)
  },
  // 小程序维修提交
  maintenance(data) {
    return request(`${BaseUrl}maintenance`, data)
  },
  

}
