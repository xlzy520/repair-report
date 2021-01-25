<template>
	<view class="container">
    <divider-box />
    <view class="list-content">
      <desk-list :list=deskList :deskType="deskType" @itemClick="itemClick" />
    </view>
	</view>
</template>

<script>
import homeApi from '../../api/home'
import { DeskTypeEnum } from '../../utils/enum'

export default {
  data() {
    return {
      deskList: [],
      deskType: ''
    }
  },
  methods: {
    itemClick(item) {
      console.log(item)
    },
    getList() {
      uni.showLoading({ title: '数据加载中...' })
      const requestMapping = [homeApi.getBaoXiuList, homeApi.getWeiXiuList, homeApi.getYanShouList]
      requestMapping[this.deskType]().then(res => {
        this.deskList = res
        console.log(res)
      }).finally(() => {
        uni.hideLoading()
      })
    },

  },
  mounted() {
    this.getList()
  },
  onLoad(options) {
    const deskType = options && Number(options.deskType)
    uni.setNavigationBarTitle({
      title: DeskTypeEnum[deskType],
    })
    this.deskType = deskType
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
