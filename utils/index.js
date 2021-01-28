import dayjs from 'dayjs'

const BaseImgUrl = 'https://youngj.oss-cn-huhehaote.aliyuncs.com/'

export const getFormatImgUrl = (url) => (/http/.test(url) ? url : BaseImgUrl + url)

export const formatTimeYY = (time, template = 'YY/MM/DD HH:mm:ss') => dayjs(time).format(template)

export const concatTimeString = (begin, end, format = 'YYYY/MM/DD HH:MM') => {
  if (!begin || !end) {
    return ''
  }
  const beginText = dayjs(begin).format(format)
  const endText = dayjs(end).format(format)
  return beginText + ' - ' + endText
}

/**
 * 授权请求
 *
 * @export
 * @param {*} authorizeScope 更多scope参考：https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html
 * @param {*} modal modal弹窗参数信息
 * @returns
 */
export function setAuthorize(authorizeScope, modal) {
  return new Promise((resolve, reject) => {
    if (!modal) {
      modal = {
        title: '授权',
        content: '需要您设置授权已使用相应功能',
        confirmText: '设置',
      }
    }
    uni.getSetting({
      success(res) {
        // hasAuthor === undefined  表示 初始化进入，从未授权
        // hasAuthor === true       表示 已授权
        // hasAuthor === false      表示 授权拒绝
        const hasAuthor = res.authSetting[authorizeScope]
        switch (hasAuthor) {
          case undefined:
            uni.authorize({
              scope: authorizeScope,
              success: res => {
                resolve(res)
              },
              fail: err => {
                uni.showToast({
                  title: '授权失败',
                  icon: 'none',
                  duration: 3000,
                })
                reject(err)
              },
            })
            break
          case true:
            resolve()
            break
          case false:
            uni.showModal({
              ...modal,
              success: res => {
                if (res.confirm) {
                  uni.openSetting({
                    success: res => {
                      if (res.authSetting[authorizeScope]) {
                        resolve(res)
                      } else {
                        reject(res)
                        uni.showToast({
                          title: '授权失败',
                          icon: 'none',
                          duration: 3000,
                        })
                      }
                    },
                    fail: err => {
                      reject(err)
                      uni.showToast({
                        title: '打开设置异常',
                        icon: 'none',
                        duration: 3000,
                      })
                    },
                  })
                } else {
                  reject(res)
                  uni.showToast({
                    title: '授权失败',
                    icon: 'none',
                    duration: 3000,
                  })
                }
              },
              fail: err => {
                reject(err)
                uni.showToast({
                  title: '弹窗异常',
                  icon: 'none',
                  duration: 3000,
                })
              },
            })
            break
        }
      },
      fail: err => {
        reject(err)
        uni.showToast({
          title: '获取当前设置异常',
          icon: 'none',
          duration: 3000,
        })
      },
    })
  })
}

/**
 * 获取用户当前位置信息
 *
 * @export
 */
export function getLocation() {
  return new Promise((resolve, reject) => {
    const scope = 'scope.userLocation'
    const modal = {
      title: '授权',
      content: '需要您授权使用位置信息',
      confirmText: '设置',
    }
    setAuthorize(scope, modal)
      .then(() => {
        uni.getLocation({
          altitude: true,
          success: res => {
            resolve(res)
          },
          fail: err => {
            reject(err)
            uni.showToast({
              title: '获取位置信息失败',
              icon: 'none',
              duration: 3000,
            })
          },
        })
      })
      .catch(err => {
        reject(err)
      })
  })
}
