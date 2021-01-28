<template>
  <view class="desk-info">
    <DeskTitle :title="title" />
    <view class="baoxiu">
      <uni-list>
        <uni-list-item title="工单号" :right-text="orderDetail.orderNo"></uni-list-item>
        <uni-list-item title="展项照片">
          <template slot="footer">
            <view class="layout-cc present" v-for="item in orderDetail.imgList" :key="item">
              <u-image :src="formatUrl(item)" width="151" height="151" alt="" />
            </view>
          </template>
        </uni-list-item>
        <uni-list-item title="展项视频">
          <template slot="footer">
            <view class="layout-cc present" v-for="item in orderDetail.videoList" :key="item">
              <video :controls="false" :show-center-play-btn="false" :src="formatUrl(item)" class="w-h-151" width="151" height="151" alt="" />
            </view>
          </template>
        </uni-list-item>

        <uni-list-item class="desk-desc" title="维修备注" :right-text="orderDetail.description"/>
      </uni-list>

    </view>
  </view>
</template>

<script>

import reapirApi from 'api/reapir'
import DeskTitle from 'components/base/desk-title'
import {formatTimeYY, getFormatImgUrl} from '../../../utils'

export default {
  components: {
    DeskTitle,
  },
  props: {
    orderType: {
      type: String,
      default: '',
    },
    orderNo: {
      type: String,
      default: '',
    },
  },
  computed: {
    title() {
      return this.orderType > 1 ? '维修工单': '验收工单'
    }
  },
  data() {
    return {
      orderDetail: {
        orderNo: 'dasdasdasdjhasodjals',
        imgList: ['/casic/homephoto1611586560131.png?Expires=1926946556&OSSAccessKeyId=LTAIcJhIvHfvkTao&Signature=k1iIL1zp6fQKf0GW9E32iXiAMTo%3D',
          '/casic/homephoto1611586560131.png?Expires=1926946556&OSSAccessKeyId=LTAIcJhIvHfvkTao&Signature=k1iIL1zp6fQKf0GW9E32iXiAMTo%3D'],
        videoList: ['/casic/homephoto1611588037969.mov?Expires=1926948030&OSSAccessKeyId=LTAIcJhIvHfvkTao&Signature=JjhoNf3zoLuYYa63ZMwQAtmNN8k%3D'],
        audioList: [],
        description: '312312321',
      },
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
      }).finally(() => {
        uni.hideLoading()
      })
    },
  },
}
</script>
<style lang="scss" scoped>
  .desk-info{
    padding-bottom: 58upx;
    ::v-deep .uni-list{
      .uni-list--border-top, .uni-list--border-bottom{
        display: none;
      }
      .uni-list-item__container{
        padding-left: 0;
        padding-right: 0;
      }
      .uni-list-item__content-title, .uni-list-item__extra-text{
        font-size: 32upx;
        color: #333333;
        line-height: 45upx;
      }
      .desk-desc {
        .uni-list-item__extra-text{
          color: #999;
        }
      }

    }
    .present{
      margin-left: 30upx;
    }

  }
</style>
