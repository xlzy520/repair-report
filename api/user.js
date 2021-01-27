import request from 'utils/request'

export default {
  login(data) {
    return request('/login', data)
  },
  getLogin(data) {
    return request('/user/login', data, 'get')
  },
  logout(data) {
    return request('/logout', data)
  },
  tokenRefresh(data) {
    return request('/user/token/refresh', data, 'get')
  },
  register(data) {
    return request('/register', data)
  },
  resetPwd(data) {
    return request('/resetPwd', data)
  },
  sendSmsCode(data) {
    return request('/common/sendSmsCode', data)
  },
  findUserInfo(data) {
    return request('/user/findUserInfo', data, 'get')
  },
  updateUserInfo(data) {
    return request('/user/updateUserInfo', data)
  },

}
