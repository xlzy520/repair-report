<template>
  <view class="container">
    <divider-box />
    <view class="list-content">
      <view class="report-item" v-for="item in list" :key="item.id">
        <view class="c6 f32 lh-45 u-p-b-30 lz-border-bottom">
          {{item.time}}
        </view>
        <view class="f36 c3 report-item-content">
          {{item.content}}
        </view>
      </view>
<!--      <desk-list :list=deskList :deskType="deskType" @itemClick="itemClick" />-->
    </view>
  </view>
</template>

<script>
  import repairApi from '../../api/repair'
  import { DeskTypeEnum } from '../../utils/enum'
  import { getList } from '../../utils/mixins'
  import {formatTimeYY} from "../../utils";


  export default {
    mixins: [getList],
    data() {
      return {
        deskList: [],
        deskType: ''
      }
    },
    methods: {
      itemClick(item) {
        console.log(item)
      },
      getList(isRefresh) {
        uni.showLoading({ title: '数据加载中...' })
        repairApi.getDaily(this.pageOption,).then(res => {
          const { list, pages = 0, pageNum } = res
          this.totalPages = pages
          this.pageNum = pageNum
          const transformedList = (list || []).map(v => ({
            ...v,
            // text: '人已预约',
            // views: v.reservationPerson,
            // title: v.activityName,
            // address: v.activityAddress,
            time: formatTimeYY(v.createTime, 'YYYY年MM月DD日'),
            // imgUrl: getFormatImgUrl(v.listImg),
          }))
          if (isRefresh) {
            this.list = transformedList
          } else {
            this.list = this.list.concat(transformedList)
          }
          console.log(res)
        }).finally(() => {
          uni.hideLoading()
          uni.stopPullDownRefresh()

        })
      },

    },
    mounted() {
    },
    onLoad(options) {

    },
  }
</script>

<style lang="scss" scoped>
  .list-content{
    background: #f9f9f9;
  }
  .report-item{
    background: #fff;
    padding: 33upx 40upx 85upx;
    margin-bottom: 20upx;
  }
  .report-item-content{
    line-height: 70upx;
    padding-top: 22upx;
  }
  .report-line{
    margin-left: -40upx;
  }
  .container {

  }
</style>
