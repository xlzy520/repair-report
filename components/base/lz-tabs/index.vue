<template>
  <u-tabs :list="tabList" :is-scroll="false" active-color="#6A88F3" inactive-color="#999999"
          :current="current" @change="tabChange"></u-tabs>
</template>

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
    height: {
      type: String,
      default: '20rpx',
    },

  },
  methods: {
    tabChange(index) {
      console.log(index);
      this.$emit('tabChange', index)
    },
  },
}
</script>
<style lang="scss" scoped>


</style>
