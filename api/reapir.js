import request from 'utils/request'

const BaseUrl = '/repair/'

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
  getOrderDetail(data) {
    return request(`${BaseUrl}order/detail`, data, 'get')
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
  // 小程序日报提交 content
  dailyAdd(data) {
    return request(`${BaseUrl}daily/acceptance`, data)
  },
  getDaily(data) {
    return request(`${BaseUrl}daily/yanshou/list`, data, 'get')
  },
  // 区域识别
  areaSearch(data) {
    return request(`${BaseUrl}exhibition/area/search`, data, 'get')
  },
  // 区域识别
  imageSearch(data) {
    return request(`${BaseUrl}exhibition/image/search`, data, 'get')
  },
  

}
