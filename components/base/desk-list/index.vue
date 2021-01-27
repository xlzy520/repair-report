<template>
  <view class="desk-list">
    <view class="df desk-item" v-for="item in list" :key="item.orderNo" @click="handleItemClick(item)">
      <view class="desk-item-left">
        <u-image src="/static/icon/report.png" width="49" height="49" />
      </view>
      <view class="layout-column u-flex-1 desk-item-center">
        <view class="layout-qz title-row">
          <view class="base-title-36 desk-title">{{item.exhibitionName}}</view>
          <view class="desk-status">
            <u-tag v-if="item.status === '2'" text="已完成" color="#fff" bg-color="#44D7B6" />
            <u-tag v-else-if="item.status === '0'" text="待维修" color="#0590DF" bg-color="#DCF2FF" />
            <u-tag v-else-if="item.status === '1'" text="待验收" color="#6D99F9" bg-color="#DCE7FF" />
            <u-tag v-else text="驳回" color="#FB7272" bg-color="#FFDCDC" />
          </view>
        </view>
        <view class="layout-qz base-subtitle f30 address-row">
          <view class="">位置: {{item.floor}}层{{item.areaName}}展区</view>
          <view class="ellipsis order-no">单号: {{item.orderNo}}</view>
        </view>
        <view class="base-subtitle f28 layout-slide time-row" v-if="deskType">
          <view class="layout-qz">
            {{getDeskTypeText}}：
            <view class="base-title lh-45 c-red">{{item.operator || item.acceptanceUser}}</view>
          </view>
          {{formatTime(item.createTime)}}
        </view>
        <view class="base-subtitle f28 time-row" v-else>派单时间：{{formatTime(item.createTime)}}</view>

      </view>
      <view class="desk-item-right">
        <u-icon name="arrow-right" color="#ccc"></u-icon>
      </view>
    </view>
  </view>
</template>

<script>

import { WeiXiuStatusEnum } from 'utils/enum'
import { formatTimeYY } from '../../../utils'

export default {
  data() {
    return {
    }
  },
  props: {
    list: {
      type: Array,
      default: () => ([]),
    },
    deskType: {
      type: Number,
      default: null,
    },

  },
  computed: {
    getDeskTypeText() {
      return this.deskType === 1 ? '维修' : '验收'
    },
  },
  methods: {
    handleItemClick(item) {
      this.$emit('itemClick', item)
    },
    getStatusText(item) {
      return WeiXiuStatusEnum.find(v => v.value === item.status) || ''
    },
    formatTime(time) {
      return formatTimeYY(Number(time), 'YYYYMM-DD HH:mm:ss')
    },
  },
}
</script>
<style lang="scss" scoped>
  .desk-list{
    background: #fff;
  }
  .desk-item{
    width: 690upx;
    margin: auto;
    margin-bottom: 36upx;
    padding: 24upx;
    background: #F9F9F9;
    border-radius: 10upx;
    flex: 1;
    .desk-title{
      line-height: 50upx;
    }
    .order-no{
      margin-left: 33upx;
      width: 300upx;
    }
    .desk-status{
      margin-left: 28upx;
      ::v-deep .u-size-default{
        padding: 5upx 7upx;
        font-size: 28upx;
        line-height: 40upx;
        height: 50upx;
        border-radius: 5upx;
        border: none;
      }
    }
  }
  .desk-item-center{
    margin-left: 28upx;
  }
  .desk-item-right{
    /*margin-left: 50upx;*/
  }
  .title-row, .address-row{
    margin-bottom: 18upx;
  }
  .address-row{
    line-height: 42upx;
  }
  .time-row{
    line-height: 40upx;
  }

</style>
