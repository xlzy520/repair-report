<template>
	<view class="container">
    <view class="bg-header">
      <view class="layout-sc user-info">
        <u-image :src="avatar" width="100" border-radius="50" height="100"></u-image>
        <view class="base-title user-name">{{userInfo.userName}}</view>
      </view>
    </view>
    <view class="float-card">
      <view class="layout-slide u-flex-wrap float-card-wrap">
        <view class="entry-item" v-for="item in entryList" :key="item.title"
              @click="entryClick(item)">
          <u-image :src="item.img" class="item-icon" width="110" height="110" />
          <view class="right-content">
            <view class="base-title lh-45">{{item.title}}</view>
            <view class="base-subtitle">{{item.subtitle}}</view>
          </view>
        </view>
      </view>
    </view>
    <divider-box />
    <view class="tab-list">
      <view class="tabs">
        <lz-tabs :current="current" :tab-list="tabList" @tabChange="tabChange" />
      </view>
      <view class="list-content">
        <desk-list :list=deskList @itemClick="itemClick" />
      </view>
    </view>
	</view>
</template>

<script>
import reapirApi from 'api/reapir'
import commonApi from 'api/common'
import { getFormatImgUrl } from '../../utils'

export default {
  data() {
    return {
      current: 0,
      entryList: [
        {
          img: '/static/icon/nav/baoxiu.png', title: '报修', subtitle: '讲解员上报维修', url: 'baoxiu',
        },
        {
          img: '/static/icon/nav/weixiu.png', title: '维修', subtitle: '维修科技展项', url: 'desk', deskType: 1,
        },
        {
          img: '/static/icon/nav/yanshou.png', title: '验收', subtitle: '验收展项维修', url: 'desk', deskType: 2,
        },
        {
          img: '/static/icon/nav/scan.png', title: '扫一扫', subtitle: '扫一扫二维码', url: 'scan',
        },
        {
          img: '/static/icon/nav/ribao.png', title: '日报', subtitle: '记录展项维修', url: 'daily-report',
        }
        // {
        //   img: '/static/icon/nav/gongdan.png', title: '展项工单', subtitle: '查询工单', url: 'gongdan',
        // }
      ],
      tabList: [{ name: '报修工单' }, { name: '维修工单' }],
      deskList: [],
      userInfo: {},
    }
  },
  computed: {
    avatar() {
      return getFormatImgUrl(this.userInfo.headerPath)
    },
  },
  onShow() {
    this.getUserInfoFromLocal()
    this.getList()
  },
  onLoad() {
  },
  mounted() {

  },
  methods: {
    getUserInfoFromLocal() {
      const userInfoStr = uni.getStorageSync('userInfo')
      if (userInfoStr) {
        this.userInfo = JSON.parse(userInfoStr)
      }
    },
    tabChange(index) {
      this.current = index
      this.getList()
    },
    itemClick(item) {
      console.log(item)
      const type = this.current + 1
      uni.navigateTo({ url: '/pages/desk-detail/index?id=' + item.orderNo + '&orderType=' + type })
    },
    entryClick(item) {
      if (item.url === 'scan') {
        uni.scanCode({
          success: (res) => {
            commonApi.scan({
              // qr: 'wsx',
              qr: res.result,
            }).then(res => {
              console.log(res)
              if (res) {
                if (res.exhibitionName) {
                  uni.navigateTo({
                    url: `/pages/baoxiu/index?from=work-bench&qr=${res.result}`,
                  })
                }
              }
            })
            console.log('条码类型：' + res.scanType)
            console.log('条码内容：' + res.result)
          },
        })
        return
      }
      uni.navigateTo({
        url: `/pages/${item.url}/index?from=work-bench&deskType=${item.deskType}`,
      })
      console.log(item)
    },
    getList() {
      uni.showLoading({ title: '数据加载中...' })
      const requestMapping = [reapirApi.getBaoXiuList, reapirApi.getWeiXiuList,
        reapirApi.getYanShouList]
      requestMapping[this.current]().then(res => {
        this.deskList = res
        console.log(res)
      }).finally(() => {
        uni.hideLoading()
      })
    },
  },
}
</script>

<style lang="scss">
  .bg-header{
    height: 400upx;
    background-image: url("https://youngj.oss-cn-huhehaote.aliyuncs.com/casic/banner_icon/14.jpg");
    background-position: center;
    background-size: cover;
    .user-info{
      padding-left: 38upx;
      padding-top: 80upx;
    }
    .user-name{
      margin-left: 28upx;
    }
  }
  .bg-footer{
    height: 50%;
  }
  .float-card{
    height: 400upx;
    margin: auto;
    background: #fff;
    box-sizing: border-box;
    padding-bottom: 78upx;
    .float-card-wrap{
      position: relative;
      top: -162upx;
      margin: auto;
      width: 690upx;
      height: 480upx;
      padding: 40upx 22upx;
      border-radius: 14upx;
      box-shadow: 0px 0px 20upx 0px rgba(88, 149, 230, 0.17);
      background: #fff;
    }
    .entry-item{
      width: 320upx;
      display: flex;
      margin-bottom: 32upx;
      padding-left: 30upx;
      &:nth-child(2n+1){
        border-right: 1px solid #eee;
        padding-right: 10upx;
        padding-left: 0;
      }
      .right-content{
        padding-top: 6upx;
        margin-left: 20upx;
      }
      .base-subtitle{
        margin-top: 6upx;
        line-height: 33upx;
      }
    }
    .item-icon{
      width: 110upx;
      height: 110upx;
      background: #2b85e4;
    }
  }
  .tab-list{
    min-height: 300upx;
  }
  .list-content{
    padding-top: 46upx;
  }
</style>
