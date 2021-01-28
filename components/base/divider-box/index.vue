<template>
  <view class="divider-box" :class="ml?'ml-30':''"
        :style="{height: height, width: width, backgroundColor: bgColor}"></view>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  props: {
    bgColor: {
      type: String,
      default: '#F9F9F9',
    },
    width: {
      type: String,
      default: '750rpx',
    },
    height: {
      type: String,
      default: '20rpx',
    },
    ml: {
      type: Boolean,
      default: false,
    },

  },
  methods: {},
}
</script>
<style lang="scss" scoped>
  .divider-box{
  }
  .ml-30{
    margin-left: -40upx;
  }

</style>
