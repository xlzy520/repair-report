<template>
  <view class="container">
    <view class="list-title">报修工单</view>
    <view class="baoxiu">
      <uni-list>
        <uni-list-item title="工单号" right-text="dsakjdhaskjdhsakdkasgdaskdbas"></uni-list-item>
        <uni-list-item title="照片">
          <template slot="footer">
            <image class="baoxiu-img" src="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png"></image>
          </template>
        </uni-list-item>

        <uni-list-item title="备注">
          <template slot="footer">
            <view class="uni-textarea">
              <input @input="changeInput" placeholder="备注" auto-height />
            </view>
          </template>
        </uni-list-item>
      </uni-list>

    </view>
    <view class="list-title">维修工单</view>
    <view class="form-main">
      <uni-list>
        <uni-list-item title="上传照片">
          <template slot="footer">
            <easy-upload
                :dataList="imageList" uploadUrl="http://localhost:8081/file_upload" types="image"
                deleteUrl='http://localhost:3000/upload' :uploadCount="6"
                @successImage="successImage"
            ></easy-upload>
          </template>
        </uni-list-item>
        <uni-list-item title="上传视频">
          <template slot="footer">
            <easy-upload
                :dataList="videoList" uploadUrl="http://localhost:3000/upload" types="video"
                deleteUrl='http://localhost:3000/upload' :uploadCount="6"
                @successVideo="successVideo"
            ></easy-upload>
          </template>
        </uni-list-item>
        <uni-list-item title="上传音频">
          <template slot="footer">
            <easy-upload
                :dataList="audioList" uploadUrl="http://localhost:3000/upload" types="audio"
                deleteUrl='http://localhost:3000/upload' :uploadCount="6"
                @successAudio="successAudio"
            ></easy-upload>
          </template>
        </uni-list-item>


        <uni-list-item title="备注">
          <template slot="footer">
            <view class="uni-textarea">
              <input @input="changeInput" placeholder="备注" auto-height />
            </view>
          </template>
        </uni-list-item>
      </uni-list>
      <view class="footer">
        <button @click="submit" class="primary-btn">完成</button>
      </view>
    </view>

  </view>
</template>

<script>
  import EasyUpload from 'components/a-my/easy-upload'
  export default {
    components: {
      EasyUpload,
    },
    data() {
      return {
        methods: ['位置识别', '区域识别', '图片识别', '扫描二维码'],
        showItems: ['展品1', '展品2',],
        currentMethod: 1,
        currentShowItem: 1,
        imageList: [],
        videoList: [],
        audioList: [],
        category: 'image',
        mark: ''
      }
    },
    methods: {
      successImage (){

      },
      successVideo (){

      },
      successAudio (){

      },
      changeInput(e) {
        this.mark = e.detail.value
      },
      changeShowItem(e){
        console.log(e);
        this.currentShowItem = e.target.value
      },
      changeMethod(e){
        this.currentMethod = e.target.value
      },
      submit(){

      }
    }
  }
</script>

<style lang="scss">
  page{
    background: #eee;
  }
  .container{
    width: 90%;
    margin: auto;
    .list-title{
      color: #ccc;
      padding: 30upx;
      font-size: 12px;
    }
    .baoxiu{
      /*margin: 30upx;*/
    }
    .footer{
      border-top: 1px solid #eee;
      margin-top: 40upx;
      margin-bottom: 40upx;
    }
    .baoxiu-img{
      width: 300upx;
      height: 200upx;
    }
  }
</style>
