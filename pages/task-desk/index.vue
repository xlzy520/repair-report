<template>
	<view class="container">
		<view class="layout-slide header">
      <view class="header-left">
        <view class="base-title name">{{userInfo.userName}}</view>
        <view class="base-subtitle position">部门领导</view>
      </view>
      <view class="header-right">
        <u-image :src="avatar" width="100" border-radius="50" height="100"></u-image>
      </view>
    </view>
    <divider-box />
    <view class="layout-column u-flex-1 nav-list">
      <uni-list>
        <uni-list-item :title="item.title" :rightText="count[index]" link :to="item.to"
                       :thumb="item.icon" class="list-item"
                       v-for="(item, index) in list" :key="item.title"/>
      </uni-list>
      <divider-box />
      <u-button class="confirm-btn logout" @click="logout">
        退出登录
      </u-button>
    </view>
	</view>
</template>

<script>
import commonApi from 'api/common'
import userApi from 'api/user'
import { TaskDeskStatisticsEnum } from '../../utils/enum'
import { getFormatImgUrl } from '../../utils'

export default {
  data() {
    return {
      list: [
        {
          title: '报修工单',
          to: '/pages/desk/index?deskType=0',
          icon: '/static/icon/desk/baoxiu.png',
        },
        {
          title: '维修工单',
          to: '/pages/desk/index?deskType=1',
          icon: '/static/icon/desk/weixiu.png',
        },
        {
          title: '验收工单',
          to: '/pages/desk/index?deskType=2',
          icon: '/static/icon/desk/yanshou.png',
        },
        {
          title: '日报',
          to: '/pages/report-list/index',
          icon: '/static/icon/desk/ribao.png',
        }
        // {
        //   title: '展项统计',
        //   to: '/pages/loss-rate/index',
        //   icon: '/static/icon/desk/zhanxiang.png',
        // }
      ],
      count: [0, 0, 0, 0, 0].map(String),
      userInfo: {},
    }
  },
  mounted() {
    this.getUserInfoFromLocal()
    this.getDetail()
  },
  computed: {
    avatar() {
      return getFormatImgUrl(this.userInfo.headerPath)
    },
  },
  methods: {
    logout() {
      userApi.logout().then(res => {
        uni.clearStorageSync()
        uni.navigateTo({ url: '/pages/login/index' })
      })
    },
    getUserInfoFromLocal() {
      const userInfoStr = uni.getStorageSync('userInfo')
      if (userInfoStr) {
        this.userInfo = JSON.parse(userInfoStr)
      }
    },
    getDetail() {
      uni.showLoading({ title: '数据加载中...' })
      commonApi.statistics().then(res => {
        const newCountArr = []
        TaskDeskStatisticsEnum.forEach((v, index) => {
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
