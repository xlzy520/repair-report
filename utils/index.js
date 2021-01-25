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
