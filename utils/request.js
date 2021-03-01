const baseUrl = 'http://124.204.48.137:9001' // 正式环境
// const baseUrl = ''

const GET = 'GET'
const POST = 'POST'
const PUT = 'PUT'
const FORM = 'FORM'
const DELETE = 'DELETE'
const UPLOAD = 'UPLOAD'
const SUCCESS_CODES = [200, 4000]
const RefreshCode = 506
const LogoutCode = 503

const getHeader = (method, url) => {
  const contentType = 'application/json'
  const userId = uni.getStorageSync('uid')
  const accessToken = uni.getStorageSync('accessToken') || '' // let headers = {
  //   'content-type': contentType,
  //   'userId': userId,
  //   'accessToken': accessToken
  // }

  const headers = {
    'content-type': contentType,
    userid: uni.getStorageSync('uid') || '',
    token: accessToken,
  }
  return headers
}
/**
 *
 * @param {string} method 请求方法
 * @param {string} url api地址
 * @param {string} data 入参
 */

const request = (url, data, method = POST) => new Promise((resolve, reject) => {
  if (method !== UPLOAD) {
    uni.request({
      url: `${baseUrl}/api${url}`,
      method,
      data,
      header: getHeader(method, url),
      success(res) {
        // 请求成功
        const data = res.data
        if (SUCCESS_CODES.indexOf(data.code) !== -1) {
          resolve(data.data)
        } else {
          // 其他异常
          console.log(data);
          if (data.code === RefreshCode) {
          
          } else if (data.code === LogoutCode) {
            uni.navigateTo({url: '/pages/login/index'})
          } else {
            uni.showToast({ title: data.msg, icon: 'none' })
          }
          uni.showToast({ title: data.msg, icon: 'none' })
          reject(data)
        }
      },

      fail(err) {
        // 请求失败
        reject('请检查网络')
      },

    })
  } else {
    console.log(data);
    uni.uploadFile({
      filePath: data,
      name: 'file',
      url: `/api${url}`,
      header: getHeader(method, url),
      success: resObj => {
        const res = JSON.parse(resObj.data)

        if (SUCCESS_CODES.indexOf(res.data.code) !== -1) {
          resolve(res.data)
        } else {
          // 其他异常
          reject(res.msg)
        }
      },
      fail: () => {
        // 请求失败
        reject('图片上传失败')
      },
    })
  }
})

export default request
