import Vue from 'vue'
import uView from 'uview-ui'
import dayjs from 'dayjs'
import App from './App'
// import formRules from './utils/formRules'
import './style/index.scss'
import './components'

// import isToday from 'dayjs/plugin/isToday'
// import isTomorrow from 'dayjs/plugin/isTomorrow'

// dayjs.extend(isToday)
// dayjs.extend(isTomorrow)

Vue.config.productionTip = false
Vue.prototype.$dayjs = dayjs
// Vue.prototype.$rules = formRules
Vue.prototype.$imgBaseUrl = 'https://youngj.oss-cn-huhehaote.aliyuncs.com/'
Vue.prototype.$showToast = (title, icon = 'none', otherOptions) => {
  uni.showToast({ title, icon, ...otherOptions })
}
Vue.use(uView)

App.mpType = 'app'

const app = new Vue({
  ...App,
})
app.$mount()
