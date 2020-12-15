<template>
	<view class="container">
    <view class="bg-header"></view>
    <view class="bg-footer"></view>
    <view class="main">
      <view class="entry-item" v-for="item in list" :key="item.title" @click="entryClick(item)">
        <view class="icon">
          <image :src="item.img" />
        </view>
        <view class="right">
          <view class="title">{{item.title}}</view>
          <view class="sub-title">{{item.subtitle}}</view>
        </view>
      </view>
    </view>

<!--		<view class="intro">本项目已包含uni ui组件，无需import和注册，可直接使用。在代码区键入字母u，即可通过代码助手列出所有可用组件。光标置于组件名称处按F1，即可查看组件文档。</view>-->
<!--		<text class="intro">详见：</text>-->
<!--		<uni-link :href="href" :text="href"></uni-link>-->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
        list: [
          { img: '/static/c1.png', title: '报修', subtitle: '一键报修', url: 'baoxiu' },
          { img: '/static/c1.png', title: '维修', subtitle: '一键维修', url: 'weixiu' },
          { img: '/static/c1.png', title: '验收', subtitle: '一键验收', url: 'yanshou' },
          { img: '/static/c1.png', title: '扫一扫', subtitle: '工作、验票', url: 'scan' },
          { img: '/static/c1.png', title: '日报', subtitle: '填写日报', url: 'report' },
        ]
			}
		},
		methods: {
      entryClick(item){
        if (item.url === 'scan') {
          uni.scanCode({
            success: function (res) {
              console.log('条码类型：' + res.scanType);
              console.log('条码内容：' + res.result);
            }
          });
          return
        }
        wx.navigateTo({
          url: `/pages/${item.url}/index`
        })
        console.log(item);
      }
		}
	}
</script>

<style lang="scss">
  .bg-header{
    height: 50%;
    background: #E6A23C;
  }
  .bg-footer{
    height: 50%;
  }
  .main{
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    bottom: 20%;
    width: 80%;
    height: 50%;
    background: #fff;
    border: 1px solid #eee;
    display: flex;
    flex-wrap: wrap;
    padding: 60upx;
    box-sizing: border-box;
    .entry-item{
      display: flex;
      margin-right: 20upx;
      margin-bottom: 20upx;
      .icon, image{
        width: 60upx;
        height: 60upx;
      }
      .right{

      }
      .title{
        font-size: 14px;
        color: #333;

      }
      .sub-title{
        color: #999;
        font-size: 12px;
      }
    }
  }
</style>
