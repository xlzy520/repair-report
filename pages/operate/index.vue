<template>
  <view class="container">
    <desk-info :order-type="orderType" :order-detail="orderDetail" />
    <divider-box ml height="40rpx" />
    <view class="weixiu">
      <desk-title :title="formInfo.title" :img="formInfo.icon" />
      <mediaForm @submit="submit" :order-type="orderType" :order-detail="orderDetail"  />
    </view>
  </view>
</template>

<script>
import DeskInfo from 'components/base/desk-info'
import DeskTitle from 'components/base/desk-title'
import mediaForm from 'components/base/mediaForm'
import reapirApi from '../../api/reapir'
import {formatTimeYY, getFormatImgUrl} from "../../utils";

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
      orderDetail: {
        orderNo: 'dasdasdasdjhasodjals',
        imgList: ['/casic/homephoto1611586560131.png?Expires=1926946556&OSSAccessKeyId=LTAIcJhIvHfvkTao&Signature=k1iIL1zp6fQKf0GW9E32iXiAMTo%3D',
          '/casic/homephoto1611586560131.png?Expires=1926946556&OSSAccessKeyId=LTAIcJhIvHfvkTao&Signature=k1iIL1zp6fQKf0GW9E32iXiAMTo%3D'],
        videoList: ['/casic/homephoto1611588037969.mov?Expires=1926948030&OSSAccessKeyId=LTAIcJhIvHfvkTao&Signature=JjhoNf3zoLuYYa63ZMwQAtmNN8k%3D'],
        audioList: [],
        description: '312312321',
      },
      titleMapping: ['报修', '维修', '验收'],
      id: ''
    }
  },
  computed: {
    formInfo() {
      const isWeixiu =  this.orderType > 1
      const iconName = isWeixiu ? 'weixiu': 'yanshou'
      return {
        title: isWeixiu ? '验收' : '维修工单',
        icon: `/static/icon/title/${iconName}.png`
      }
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
  mounted() {
    this.getDetail()
  },
  methods: {
    formatUrl(url) {
      return getFormatImgUrl(url)
    },
    getDetail() {
      uni.showLoading({ title: '数据加载中...' })
      reapirApi.getOrderDetail({
        orderType: this.orderType,
        orderNo: this.orderNo,
      }).then(res => {
        console.log(res)
        const detail = res
        detail.orderNo = detail.orderNo.substr(0, 20)+'...'
        detail.imgList = res.imgUrl?.split(',')
        detail.videoList = res.videoUrl?.split(',')
        detail.audioList = res.audioUrl?.split(',')
        detail.formatedTime = formatTimeYY(Number(detail.createTime), 'YYYY/MM/DD HH:mm:ss')
        this.orderDetail = detail
        this.id = res.id
        // this.$emit('getId', detail.orderNo);
      }).finally(() => {
        uni.hideLoading()
      })
    },
    submit(formData) {
      uni.showLoading({ title: '数据提交中...' })
      const service = this.orderType > 1 ? reapirApi.acceptance : reapirApi.maintenance
      service({ ...formData, repairLogId: this.id }).then(res => {
        console.log(res)
        uni.showToast({ title: '提交成功'})
        uni.navigateTo({ url: `/pages/desk/index?form=detail&orderType=${this.orderType}` })
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
