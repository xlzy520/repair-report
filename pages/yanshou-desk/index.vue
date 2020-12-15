<template>
  <view class="container">
    <view class="tab-content">
      <view class="list">
        <view class="list-item" v-for="item in tasks">
          <view class="header">
            <view class="name">{{item.name}}</view>
            <view class="status">
              <uni-tag :text="statusLabel(item.status)" :type="statusType(item.status)" size="small"
                       @click="tagClick(item)"></uni-tag>
            </view>
          </view>
          <view class="content">{{item.content}}</view>
          <view class="footer">
            <view class="date">{{item.date}}</view>
            <view class="author">{{item.author}}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  const statusMapping = {
    '01': {
      name: '已验收',
      type: 'success'
    },
    '02': {
      name: '未验收',
      type: 'warning'
    },
  }
  export default {
    data() {
      return {
        tasks: [
          { name: 'dksajdgksahhldahskdsahldhda', content: '大胜靠德萨迪克就撒的巴克斯打开失败带把伞快点吧山东省考大奖是不打算',
            date: '2019-32-3232', author: '张三', status: '01'},
          { name: 'dksajdgksahda', content: '大胜靠德萨迪克就撒的巴克斯打开失败带把伞快点吧山东省考大奖是不打算',
            date: '2019-32-3232', author: '张三', status: '02'},
          { name: 'dksajdgksahda', content: '大胜靠德萨迪克就撒的巴克斯打开失败带把伞快点吧山东省考大奖是不打算',
            date: '2019-32-3232', author: '张三', status: '01'},
          { name: 'dksajdgksahda', content: '大胜靠德萨迪克就撒的巴克斯打开失败带把伞快点吧山东省考大奖是不打算',
            date: '2019-32-3232', author: '张三', status: '01'},
          { name: 'dksajdgksahda', content: '大胜靠德萨迪克就撒的巴克斯打开失败带把伞快点吧山东省考大奖是不打算',
            date: '2019-32-3232', author: '张三', status: '01'},
          { name: 'dksajdgksahda', content: '大胜靠德萨迪克就撒的巴克斯打开失败带把伞快点吧山东省考大奖是不打算',
            date: '2019-32-3232', author: '张三', status: '01'},
          { name: 'dksajdgksahda', content: '大胜靠德萨迪克就撒的巴克斯打开失败带把伞快点吧山东省考大奖是不打算',
            date: '2019-32-3232', author: '张三', status: '01'},
          { name: 'dksajdgksahda', content: '大胜靠德萨迪克就撒的巴克斯打开失败带把伞快点吧山东省考大奖是不打算',
            date: '2019-32-3232', author: '张三', status: '01'},
          { name: 'dksajdgksahda', content: '大胜靠德萨迪克就撒的巴克斯打开失败带把伞快点吧山东省考大奖是不打算',
            date: '2019-32-3232', author: '张三', status: '01'},
          { name: 'dksajdgksahda', content: '大胜靠德萨迪克就撒的巴克斯打开失败带把伞快点吧山东省考大奖是不打算',
            date: '2019-32-3232', author: '张三', status: '01'},
        ]
      }
    },
    methods: {
      tagClick(item) {

      },
      statusLabel(status){
        return statusMapping[status].name
      },
      statusType(status){
        return statusMapping[status].type
      }
    }
  }
</script>

<style lang="scss">
  .tab-content{
    padding: 30upx;
  }
  .list-item{
    .header{
      display: flex;
      justify-content: space-between;
    }
    .content, .footer{
      color: #ccc;
      font-size: 12px;
    }
    &>view{
      margin-bottom: 30upx;
    }
    .footer{
      display: flex;
      justify-content: space-between;
    }
  }
</style>
