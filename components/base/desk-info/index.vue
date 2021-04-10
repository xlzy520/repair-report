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
              <video :controls="false" :show-center-play-btn="false"
                     :src="formatUrl(item)" class="w-h-151" width="151" height="151" alt="" />
            </view>
          </template>
        </uni-list-item>

        <uni-list-item class="desk-desc" title="备注" :right-text="orderDetail.description"/>
      </uni-list>

    </view>
  </view>
</template>

<script>

import DeskTitle from 'components/base/desk-title'
import { getFormatImgUrl } from '../../../utils'

export default {
  components: {
    DeskTitle,
  },
  props: {
    orderType: {
      type: String,
      default: '',
    },
    orderDetail: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    title() {
      return this.titleMapping[this.orderType - 1] + '工单'
    },
  },
  data() {
    return {
      titleMapping: ['报修', '维修', '验收'],
    }
  },

  methods: {
    formatUrl(url) {
      return getFormatImgUrl(url)
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
