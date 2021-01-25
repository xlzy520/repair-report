<template>
	<view class="container">
    <view class="report-main">
      <view class="report-main-header">
        <view class="title">内容</view>
        <view class="uni-textarea">
          <textarea @blur="bindTextAreaBlur" auto-height />
        </view>
      </view>
      <view class="submit">
        <button @click="submit" class="primary-btn">保存</button>
      </view>
    </view>
<!--    <view class="uni-title uni-common-pl">占位符字体是红色的textarea</view>-->
<!--    <view class="uni-textarea">-->
<!--      <textarea placeholder-style="color:#F76260" placeholder="占位符字体是红色的"/>-->
<!--    </view>-->
	</view>
</template>

<script>
  // import fetch from 'api/index'
	export default {
		data() {
			return {
			  content: ''
			}
		},
		methods: {
      bindTextAreaBlur(e) {
        this.content = e.detail.value
      },
      submit (){
        // fetch.getData().then(res => {
        //   console.log(res);
        // })
      },
		}
	}
</script>

<style lang="scss">
  .report-main-header{
    display: flex;
    margin: 40upx;
    border-bottom: 1px solid #eee;
    min-height: 120upx;
    .title{
      flex: 1;
      justify-content: flex-start;
      padding: 30upx;
      flex-basis: 300upx;
      margin-right: 60upx;
      color: #ccc;
    }
  }
	.uni-textarea{
    padding: 30upx;
    background: #fff;
    textarea{
      width: 400upx;
    }
  }
  .submit{
    width: 90%;
    margin: auto;
    margin-top: 60upx;
    .primary-btn{
      background: #007aff;
      color: #fff;
    }
  }
</style>
