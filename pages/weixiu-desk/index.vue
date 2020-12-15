<template>
	<view class="container">
    <tabs :tab-list="tabList" :tabCur.sync="TabCur" select-class="text-orange" @change="tabChange"></tabs>
    <view class="tab-content">
      <view class="list">
        <view class="list-item" v-for="item in tasks">
          <view class="header">{{item.name}}</view>
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
  import Tabs from 'components/wuc-tab'
	export default {
    components: {
      Tabs,
    },
		data() {
			return {
        TabCur: '',
        tabList: [
          { name: '未完成' },
          { name: '已完成' },
        ],
        tasks: [
          { name: 'dksajdgksahda', content: '大胜靠德萨迪克就撒的巴克斯打开失败带把伞快点吧山东省考大奖是不打算',
          date: '2019-32-3232', author: '张三'},
          { name: 'dksajdgksahda', content: '大胜靠德萨迪克就撒的巴克斯打开失败带把伞快点吧山东省考大奖是不打算',
            date: '2019-32-3232', author: '张三'},
          { name: 'dksajdgksahda', content: '大胜靠德萨迪克就撒的巴克斯打开失败带把伞快点吧山东省考大奖是不打算',
            date: '2019-32-3232', author: '张三'},
          { name: 'dksajdgksahda', content: '大胜靠德萨迪克就撒的巴克斯打开失败带把伞快点吧山东省考大奖是不打算',
            date: '2019-32-3232', author: '张三'},
          { name: 'dksajdgksahda', content: '大胜靠德萨迪克就撒的巴克斯打开失败带把伞快点吧山东省考大奖是不打算',
            date: '2019-32-3232', author: '张三'},
          { name: 'dksajdgksahda', content: '大胜靠德萨迪克就撒的巴克斯打开失败带把伞快点吧山东省考大奖是不打算',
            date: '2019-32-3232', author: '张三'},
          { name: 'dksajdgksahda', content: '大胜靠德萨迪克就撒的巴克斯打开失败带把伞快点吧山东省考大奖是不打算',
            date: '2019-32-3232', author: '张三'},
          { name: 'dksajdgksahda', content: '大胜靠德萨迪克就撒的巴克斯打开失败带把伞快点吧山东省考大奖是不打算',
            date: '2019-32-3232', author: '张三'},
          { name: 'dksajdgksahda', content: '大胜靠德萨迪克就撒的巴克斯打开失败带把伞快点吧山东省考大奖是不打算',
            date: '2019-32-3232', author: '张三'},
          { name: 'dksajdgksahda', content: '大胜靠德萨迪克就撒的巴克斯打开失败带把伞快点吧山东省考大奖是不打算',
            date: '2019-32-3232', author: '张三'},
        ]
      }
		},
		methods: {
      tabChange(index) {
        this.TabCur = index;
      },
		}
	}
</script>

<style lang="scss">
  .tab-content{
    padding: 30upx;
    .list{

    }
  }
  .list-item{
    .header{

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
