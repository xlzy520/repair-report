<template>
	<view class="container">
    <divider-box />
    <view class="desk-detail">
      <view class="info-card">
        <view class="title">{{orderDetail.exhibitionName}}</view>
        <view class="ellipsis f36 lh-50 c9 w100">工单号：    {{orderDetail.orderNo}}</view>
        <view class="layout-slide position">
          <view class="f32 c3 lh-50">
            展品位置：
          </view>
          <view class="f32 c9 lh-50">
            {{orderDetail.floor}}{{orderDetail.areaName}}
          </view>
        </view>
        <view class="layout-slide position">
          <view class="f32 c3 lh-50">
            派单时间：
          </view>
          <view class="f32 c9 lh-50">
            {{orderDetail.formatedTime}}
          </view>
        </view>
      </view>
      <view class="info-item-title u-m-t-20">展项照片</view>
      <view class="info-item-content">
        <view class="layout-cc present" v-for="item in orderDetail.imgList" :key="item">
          <u-image :src="formatUrl(item)" width="151" height="151" alt="" />
        </view>
      </view>
      <view class="info-item-title">展项视频</view>
      <view class="info-item-content">
        <view class="layout-cc present" v-for="item in orderDetail.videoList" :key="item">
          <video :show-center-play-btn="false" :src="formatUrl(item)" class="w-h-151" width="151" height="151" alt="" />
          <!--          <img src="./play.png" class="play-icon" alt="">-->
        </view>
      </view>
<!--      <view class="info-item-title">展项音频</view>-->
<!--      <view class="info-item-content">-->
<!--        <view class="layout-cc present" v-for="item in orderDetail.audioList" :key="item">-->
<!--          <u-image src="/static/icon/audio.png" width="151" height="151" alt="" />-->
<!--        </view>-->
<!--      </view>-->
      <view class="remarks info-item-title" >
        维修备注
      </view>
      <view class="info-item-content f32 c3 lh-45 u-m-t-28">
        {{orderDetail.description}}
      </view>
      <view class="footer">
<!--        <u-button class="confirm-btn" :disabled="btnLoading" :loading="btnLoading" @click="submit">-->
<!--          上报-->
<!--        </u-button>-->
      </view>
    </view>
	</view>
</template>

<script>
import repairApi from '../../api/repair'
import {formatTimeYY, getFormatImgUrl} from "../../utils";

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
    formatUrl(url){
      return getFormatImgUrl(url)
    },
    getDetail() {
      uni.showLoading({ title: '数据加载中...' })
      repairApi.getOrderDetail({
        orderType: this.orderType,
        orderNo: this.orderNo,
      }).then(res => {
        console.log(res)
        const detail = res
        detail.imgList = res.imgUrl?.split(',')
        detail.videoList = res.videoUrl?.split(',')
        // detail.audioList = res.audioUrl?.split(',')
        detail.formatedTime = formatTimeYY(Number(detail.createTime), 'YYYY/MM/DD HH:mm:ss')
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
      const { orderNo, orderType } = options
      this.orderNo = orderNo
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
