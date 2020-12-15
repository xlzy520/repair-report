<template>
	<view class="container">
		<view class="header">
      <view class="header-left">
        <view class="name">路工</view>
        <view class="title">部门领导</view>
      </view>
      <view class="header-right">
        <image src="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png" class="avatar"></image>
      </view>
    </view>
    <view class="list">
      <uni-list>
        <uni-list-item :title="item.title" :rightText="count[index]" link :to="item.to" :thumb="item.icon" thumb-size="lg"
                       class="list-item" v-for="(item, index) in list" :key="item.title"/>
      </uni-list>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			  list: [
          { title: '报修工单', to: '/pages/baoxiu-desk/index',
            icon: 'https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png' },
          { title: '维修工单', to: '/pages/weixiu-desk/index',
            icon: 'https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png' },
          { title: '验收工单', to: '/pages/yanshou-desk/index',
            icon: 'https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png' },
          { title: '日报', to: '/pages/report/index',
            icon: 'https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png' },
          { title: '损坏率', to: '/pages/loss-rate/index',
            icon: 'https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png' },
        ],
        count: [1,2,3,4,5,6,7]
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
  .container{
    background: #eee;
    height: 100%;
  }
	.header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40upx;
    background: #fff;
    &-left{
      .name{
        font-size: 60upx;
      }
      .title{
        font-size: 40upx;
      }
    }
    .header-right{

    }
    .avatar{
      width: 100upx;
      height: 100upx;
    }
  }
  .list{
    background: #fff;
    margin-top: 40upx;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
</style>
