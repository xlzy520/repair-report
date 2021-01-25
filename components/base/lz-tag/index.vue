<template>
  <view class="lz-tag" :style="{background: bgColor, color: color}">
    {{text}}
  </view>
<script>

export default {
  data() {
    return {
    }
  },
  props: {
    tabList: {
      type: Array,
      default: () => ([]),
    },
    current: {
      type: Number,
      default: 0,
    },
    bgColor: {
      type: String,
      default: ''
    },
    // 标签字体颜色，默认为空字符串，即不处理
    color: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: '',
    },

  },
  methods: {
    tabChange(index) {
      this.$emit('tabChange', index)
    },
  },
}
</script>
<style lang="scss" scoped>


</style>
