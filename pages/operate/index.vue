<template>
  <view class="container">
    <desk-info :order-no="orderNo" :order-type="orderType" />
    <divider-box ml height="40rpx" />
    <view class="weixiu">
      <desk-title :title="formTitle"
                  img="/static/icon/desk/weixiu.png" />
      <mediaForm @submit="submit" :order-type="orderType" />
    </view>
  </view>
</template>

<script>
import DeskInfo from 'components/base/desk-info'
import DeskTitle from 'components/base/desk-title'
import mediaForm from 'components/base/mediaForm'
import reapirApi from '../../api/reapir'

export default {
  components: {
    DeskInfo,
    DeskTitle,
    mediaForm,
  },
  data() {
    return {
      orderNo: '',
      orderType: 1,
      titleMapping: ['报修', '维修', '验收'],
    }
  },
  computed: {
    formTitle() {
      return this.orderType > 1 ? '验收' : '维修工单'
    },
  },
  onLoad(options) {
    if (options) {
      const { orderNo, orderType } = options
      this.orderNo = orderNo
      this.orderType = orderType
      uni.setNavigationBarTitle({
        title: this.titleMapping[orderType],
      })
    }
  },
  methods: {
    submit(formData) {
      uni.showLoading({ title: '数据提交中...' })
      const service = this.orderType > 1 ? reapirApi.acceptance : reapirApi.maintenance
      service({ ...formData, repairLogId: this.orderNo }).then(res => {
        console.log(res)
        // uni.showToast({ title: '提交'})
      }).finally(() => {
        uni.hideLoading()
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .container{
    padding: 34upx 30upx 30upx 40upx;
    .weixiu{
      padding-top: 36upx;
    }
    .footer{
      border-top: 1px solid #eee;
      margin-top: 40upx;
      margin-bottom: 40upx;
    }
  }
</style>
