<template>
	<view class="container">
    <divider-box />
    <view class="list-content">
      <desk-list :list=deskList :deskType="deskType" @itemClick="itemClick" />
    </view>
    <u-empty v-if="!deskList.length" text="暂无数据" />
	</view>
</template>

<script>
import repairApi from '../../api/repair'
import { DeskTypeEnum } from '../../utils/enum'
import UEmpty from '../../uview-ui/components/u-empty/u-empty'

export default {
  components: { UEmpty },
  data() {
    return {
      deskList: [],
      deskType: '',
      form: '',
    }
  },
  methods: {
    itemClick(item) {
      let path = 'desk-detail'
      if (this.action === 'operate') {
        path = 'operate'
      }
      const orderType = this.deskType + 1
      uni.navigateTo({ url: `/pages/${path}/index?orderNo=${item.orderNo}&orderType=${1}` })
    },
    getList() {
      uni.showLoading({ title: '数据加载中...' })
      const requestMapping = [
        repairApi.getBaoXiuList,
        repairApi.getWeiXiuList,
        repairApi.getYanShouList
      ]
      requestMapping[this.deskType]().then(res => {
        this.deskList = res
        if (this.from === 'work-bench') {
          const len = res && res.length
          if (len) {
            // const data = res[0]
            // this.itemClick(data)
          } else {
            this.$showToast('暂无报修工单，请先添加报修工单')
          }
        }
        console.log(res)
      }).finally(() => {
        uni.hideLoading()
      })
    },

  },
  onShow() {
    this.getList()
  },
  onLoad(options) {
    if (options) {
      const { deskType, action } = options
      uni.setNavigationBarTitle({
        title: DeskTypeEnum[deskType],
      })
      this.deskType = Number(deskType)
      this.action = action
    }
  },
}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
</style>
