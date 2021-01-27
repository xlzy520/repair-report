<template>
	<view class="container">
    <divider-box />
    <view class="desk-detail">
      <view class="info-card">
        <view class="title">天文望远镜</view>
        <view class="f36 lh-50 c9">工单号：KJG-IH9NWQ</view>
        <view class="layout-slide position">
          <view class="f32 c3 lh-50">
            展品位置：
          </view>
          <view class="f32 c9 lh-50">
            三层4展区
          </view>
        </view>
        <view class="layout-slide position">
          <view class="f32 c3 lh-50">
            派单时间：
          </view>
          <view class="f32 c9 lh-50">
            2020/08/26 12:25:36
          </view>
        </view>
      </view>
      <view class="info-item-title u-m-t-20">展项照片</view>
      <view class="info-item-content">
        <view class="layout-cc present" v-for="item in orderDetail.imgList" :key="item">
          <u-image src="/static/icon/audio.png" width="151" height="151" alt="" />
        </view>
      </view>
      <view class="info-item-title">展项视频</view>
      <view class="info-item-content">
        <view class="layout-cc present" v-for="item in orderDetail.videoList" :key="item">
          <u-image src="/static/icon/audio.png" width="151" height="151" alt="" />
          <!--          <img src="./play.png" class="play-icon" alt="">-->
        </view>
      </view>
      <view class="info-item-title">展项音频</view>
      <view class="info-item-content">
        <view class="layout-cc present" v-for="item in orderDetail.audioList" :key="item">
          <u-image src="/static/icon/audio.png" width="151" height="151" alt="" />
        </view>
      </view>
      <view class="remarks info-item-title" >
        维修备注
      </view>
      <view class="info-item-content f32 c3 lh-45 u-m-t-28">
        {{orderDetail.description}}
      </view>
      <view class="footer">
        <u-button class="confirm-btn" :disabled="btnLoading" :loading="btnLoading" @click="submit">
          上报
        </u-button>
      </view>
    </view>
	</view>
</template>

<script>
import reapirApi from '../../api/reapir'

export default {
  data() {
    return {
      orderNo: '',
      orderType: '',
      orderDetail: {},
      btnLoading: false,
    }
  },
  methods: {
    getDetail() {
      uni.showLoading({ title: '数据加载中...' })
      reapirApi.getOrderDetail({
        orderType: this.orderType,
        orderNo: this.orderNo,
      }).then(res => {
        console.log(res)
        const detail = res
        detail.imgList = res.imgUrl.split(',')
        detail.videoList = res.videoUrl.split(',')
        detail.audioList = res.audioUrl.split(',')
        this.orderDetail = detail
      }).finally(() => {
        uni.hideLoading()
      })
    },
    submit() {
      // uni.navigateTo({ url: '' })
      uni.navigateBack()
    },

  },
  onLoad(options) {
    if (options) {
      const { id, orderType } = options
      this.orderNo = id
      this.orderType = orderType
    }
    this.getDetail()
  },
}
</script>

<style lang="scss" scoped>
	.container {
    width: 100%;
    background: #fff;
	}
  .info-card{
    width: 690upx;
    margin: auto;
    height: 400upx;
    background: #f9f9f9;
    border-radius: 16upx;
    margin-top: 50upx;
    padding: 26upx 16upx 30upx;
    .title{
      font-size: 46upx;
      font-weight:600;
      color: #333333;
      line-height: 75upx;
      padding-left: 12upx;
      padding-bottom: 25upx;
    }
    .position{
      padding-bottom: 26upx;
      border-bottom: 1upx solid #E4E4E4;
      padding-top: 28upx;
    }
  }
  .info-item-title{
    font-size: 36upx;
    font-weight: 600;
    color: #333333;
    line-height: 50upx;
    margin-left: 30upx;
    margin-top: 40upx;
  }
  .info-item-content{
    display: flex;
    margin-left: 30upx;
  }
  .present{
    width: 151upx;
    height: 151upx;
    background: #D8D8D8;
    margin-top: 31upx;
    margin-right: 22upx;
  }
  .remarks{
    margin-top: 93upx;
  }
  .footer{
    padding: 167upx 0 116upx;
  }
</style>
