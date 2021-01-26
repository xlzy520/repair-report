<template>
	<view class="container">
    <divider-box />
    <view class="u-p-30 report-textarea">
      <view class="c3 f32 lh-45 u-p-b-30 lz-border-bottom report-header">
        填写日报
      </view>
      <view class="report-input-main">
        <u-input v-model="content" type="textarea" placeholder="请输入今日日报总结" />
      </view>
    </view>
    <view class="layout-slide fixed footer">
      <view class="layout-cc view-report" @click="viewReport">
        <u-image src="/static/icon/ribao-blue.png" width="38" height="43" />
        <view class="f20 c9 lh-28 u-m-t-4">看日报</view>
      </view>
      <u-button class="confirm-btn" :disabled="btnLoading" :loading="btnLoading" @click="submit">
        提交日报
      </u-button>
    </view>
	</view>
</template>

<script>
import reapirApi from '../../api/reapir'

export default {
  data() {
    return {
      btnLoading: false,
      content: '',
    }
  },
  methods: {
    submit() {
      this.btnLoading = true
      reapirApi.dailyAdd({
        content: this.content,
      }).then(res => {
        this.$showToast('提交日报成功')
        uni.navigateTo({ url: '/pages/report-list/index' })
      }).finally(() => {
        this.btnLoading = false
      })
    },
    viewReport() {
      uni.navigateTo({ url: '/pages/report-list/index' })
    },
  },
}
</script>

<style lang="scss" scoped>
	.container {

	}
  .footer{
    left: 0;
    bottom: 0;
    width: 100%;
    height: 98upx;
    background: #F7F7FA;
    padding: 0 50upx 0 70upx;
    .confirm-btn{
      width: 525upx;
      height: 67upx!important;
      line-height: 67upx!important;
      margin: 0;
    }
  }
</style>
