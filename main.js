import Vue from 'vue'
import uView from 'uview-ui'
import dayjs from 'dayjs'
import setting from './setting'
// import formRules from './utils/formRules'
import './style/index.scss'
import './components'

// uniapp 组件及自定义组件
import uniList from 'components/uni-list/uni-list'
import uniListItem from 'components/uni-list-item/uni-list-item'
import DividerBox from 'components/base/divider-box'
import LzTabs from 'components/base/lz-tabs'
import deskList from 'components/base/desk-list'
import App from './App'

Vue.component('divider-box', DividerBox)
Vue.component('uniList', uniList)
Vue.component('uniListItem', uniListItem)
Vue.component('LzTabs', LzTabs)
Vue.component('desk-list', deskList)

Vue.config.productionTip = false
Vue.prototype.$dayjs = dayjs
// Vue.prototype.$rules = formRules
Vue.prototype.$imgBaseUrl = 'https://youngj.oss-cn-huhehaote.aliyuncs.com/'
Vue.prototype.$uploadUrl = setting.baseUrl + 'api/common/file/upload'
Vue.prototype.$showToast = (title, icon = 'none', otherOptions) => {
  uni.showToast({ title, icon, ...otherOptions })
}
Vue.use(uView)

App.mpType = 'app'

const app = new Vue({
  ...App,
})
app.$mount()
