<template>
  <view class="layout-qz">
    <u-image :src="img" :width="width" :height="height"></u-image>
    <view class="base-title lh-50 u-m-l-38">{{title}}</view>
  </view>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  props: {
    title: {
      type: String,
      default: '报修工单',
    },
    img: {
      type: String,
      default: '/static/icon/title/baoxiu.png',
    },
    width: {
      type: String,
      default: '41rpx',
    },
    height: {
      type: String,
      default: '43rpx',
    },

  },
  methods: {},
}
</script>
<style lang="scss" scoped>


</style>
