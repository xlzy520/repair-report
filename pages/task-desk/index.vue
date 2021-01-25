<template>
	<view class="container">
		<view class="layout-slide header">
      <view class="header-left">
        <view class="base-title name">路工</view>
        <view class="base-subtitle position">部门领导</view>
      </view>
      <view class="header-right">
        <image src="" class="avatar"></image>
      </view>
    </view>
    <divider-box />
    <view class="layout-column u-flex-1 nav-list">
      <uni-list>
        <uni-list-item :title="item.title" :rightText="count[index]" link :to="item.to"
                       :thumb="item.icon" thumb-size="lg" class="list-item"
                       v-for="(item, index) in list" :key="item.title"/>
      </uni-list>
    </view>
	</view>
</template>

<script>
  import commonApi from "api/common";
  import {TaskDeskStatisticsEnum} from "../../utils/enum";
export default {
  data() {
    return {
      list: [
        {
          title: '报修工单',
          to: '/pages/baoxiu-desk/index?deskType=0',
          icon: '/static/icon/icon-sign.png',
        },
        {
          title: '维修工单',
          to: '/pages/baoxiu-desk/index?deskType=1',
          icon: '/static/icon/icon-sign.png',
        },
        {
          title: '验收工单',
          to: '/pages/baoxiu-desk/index?deskType=2',
          icon: '/static/icon/icon-sign.png',
        },
        {
          title: '日报',
          to: '/pages/report/index',
          icon: '/static/icon/icon-sign.png',
        },
        {
          title: '损坏率',
          to: '/pages/loss-rate/index',
          icon: '/static/icon/icon-sign.png',
        }
      ],
      count: [1, 2, 3, 4, 5].map(String),
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      uni.showLoading({ title: '数据加载中...' })
      commonApi.statistics().then(res => {
        let newCountArr = []
        TaskDeskStatisticsEnum.forEach((v, index)=>{
          newCountArr[index] = String(res[v])
          this.count = newCountArr
        })
        console.log(res)
      }).finally(() => {
        uni.hideLoading()
      })
    },
  },
}
</script>

<style lang="scss">
  .container{
    background: #fff;
    padding: 0;
  }
	.header{
    height: 200upx;
    padding: 15px 40upx 0;
    .name{
      font-size: 40upx;
      line-height: 56upx;
    }
    .position{
      font-size: 28upx;
      line-height: 40upx;
      margin-top: 20upx;
    }
    .header-right{

    }
  }
  .nav-list{
    ::v-deep .uni-list{
      .uni-list--border-top{
        display: none;
      }
      .uni-list-item__content-title{
        font-size: 33upx;
        color: #333333;
        line-height: 46upx;
      }
      .uni-list-item__extra-text{
        font-size: 30upx;
        line-height: 42upx;
      }
    }
  }
</style>
