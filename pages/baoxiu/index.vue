<template>
	<view class="container">
    <view class="form-main">
      <u-form :model="form" ref="uForm" label-position="top" class="lzy-form">
        <u-form-item label="选择识别方式" required prop="method">
          <view class="layout-slide recognition-methods">
            <view class="layout-cc recognition-item" v-for="item in methods" :key="item.title"
                  @click="checkMethod(item)">
              <u-image :src="getMethodImg(item)" width="101" height="100" />
              <view class="f28 c9 lh-40 u-m-t-20">{{item.label}}</view>
            </view>
          </view>
        </u-form-item>
        <u-form-item label="选择展项" required prop="exhibitionId">
          <u-select v-model="exhibitionShow" :list="exhibitionOptions"
                    @confirm="changeExhibition" />
          <u-cell-group class="cell-group-placeholder">
            <u-cell-item class="cell-placeholder" :title="cellTitles.exhibition" arrow
                         :class="form.exhibitionId?'cell-has-value':''"
                         @click="exhibitionShow = true"/>
          </u-cell-group>
        </u-form-item>
        <u-form-item label="上传照片" required prop="imgList" class="form-item-desc">
          <template slot="right">最多上传3张图片</template>
          <u-upload :action="action" :header="header" :file-list="form.imgList" :custom-btn="true"
                    max-count="3" :show-progress="false">
            <view class="layout-cc upload-btn-img" slot="addBtn">
              <u-image src="/static/icon/camera.png" width="65" height="54" ></u-image>
            </view>
          </u-upload>
        </u-form-item>
        <u-form-item label="上传视频" required prop="videoList" class="form-item-desc">
          <template slot="right">最多上传3个视频</template>
          <u-upload :action="action" :header="header" upload-type="video" :file-list="form.videoList"
                    :custom-btn="true" max-count="3" :show-progress="false">
            <view class="layout-cc upload-btn-img" slot="addBtn">
              <u-image src="/static/icon/video.png" width="72" height="72" ></u-image>
            </view>
          </u-upload>
        </u-form-item>
        <u-form-item label="上传音频" prop="audioList" class="form-item-desc row-no-reverse">
          <template slot="right">最多上传3段音频</template>
          <u-upload :action="action" upload-type="media" :custom-btn="true"
                    max-count="3" :show-progress="false">
            <view class="layout-cc upload-btn-img" slot="addBtn">
              <u-image src="/static/icon/audio.png" width="57" height="46" ></u-image>
            </view>
          </u-upload>
        </u-form-item>

        <u-form-item label="备注" prop="description" :border-bottom="false" class="row-no-reverse">
          <u-input type="textarea" border height="200" v-model="form.description" placeholder="请输入您的备注信息……" />
        </u-form-item>

      </u-form>

      <view class="footer">
        <u-button class="confirm-btn" :disabled="btnLoading" :loading="btnLoading" @click="submit">
          提交报修
        </u-button>
      </view>

    </view>

	</view>
</template>

<script>
import commonApi from '../../api/common'
import reapirApi from '../../api/reapir'
import { getLocation } from '../../utils'

export default {
  components: {
  },
  data() {
    return {
      action: '/api/common/file/upload',
      form: {
        exhibitionId: '',
        imgList: ['/casic/homephoto1611586560131.png?Expires=1926946556&OSSAccessKeyId=LTAIcJhIvHfvkTao&Signature=k1iIL1zp6fQKf0GW9E32iXiAMTo%3D'],
        videoList: ['/casic/homephoto1611588037969.mov?Expires=1926948030&OSSAccessKeyId=LTAIcJhIvHfvkTao&Signature=JjhoNf3zoLuYYa63ZMwQAtmNN8k%3D'],
        audioList: [],
        description: '',
      },
      fileList: [],
      exhibitionShow: false,
      exhibitionOptions: [
        { label: '一年', value: '1' },
        { label: '两年', value: '2' },
        { label: '三年', value: '3' },
        { label: '四年', value: '4' }
      ],
      cellTitles: {
        exhibition: '请选择报修展项',
      },
      btnLoading: false,
      rules: {
        exhibitionId: [
          {
            validator: () => (!!this.form.exhibitionId),
            message: '请选择展项',
            trigger: ['blur', 'change'],
          }
        ],
        imgList: [
          {
            validator: (rule, value, callback) => {
              if (this.form.imgList.length) {
                callback()
              }
              callback('请上传至少一张图片')
            },
            trigger: ['blur', 'change'],
          }
        ],
        videoList: [
          {
            validator: (rule, value, callback) => {
              if (this.form.videoList.length) {
                callback()
              }
              callback('请上传至少一个视频')
            },
            trigger: ['blur', 'change'],
          }
        ],
      },
      baseMethodsIconPath: '/static/icon/methods/',
      methods: [
        { label: 'GPS定位', url: 'gps' },
        { label: '区域识别', url: 'quyu' },
        { label: '二维码识别', url: 'qrcode' },
        { label: '照片识别', url: 'photo' }
      ],
      checkedMethod: 'GPS定位',
      showItems: ['展品1', '展品2'],
      header: {
        token: uni.getStorageSync('accessToken'),
      },
    }
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules)
  },
  mounted() {
    this.getLocation()
    this.getExhibition()
  },
  methods: {
    // 获取当前定位
    getLocation() {
      getLocation().then(res => {
        const { longitude, latitude } = res
        console.log(res)
      })
    },
    getMethodImg(item) {
      const baseUrl = item.url
      const url = item.label === this.checkedMethod ? baseUrl : baseUrl + '_grey'
      return this.baseMethodsIconPath + url + '.png'
    },
    checkMethod(item) {
      this.checkedMethod = item.label
      this.getExhibition()
    },
    changeExhibition(data) {
      this.form.exhibitionId = data[0].value
      this.cellTitles.exhibition = data[0].label
    },

    openCalendar() {
      this.calendarShow = true
    },
    getExhibition() {
      commonApi.near({}).then(res => {
        this.exhibitionOptions = res.map(v => ({
          label: v.exhibitionName,
          value: v.id,
        }))
        console.log(res)
      })
    },
    submit() {
      this.$refs.uForm.validate(valid => {
        if (valid) {
          this.btnLoading = true
          reapirApi.add(this.form).then(res => {
            console.log(res)
            // uni.showToast({ title: '提交'})
          }).finally(() => {
            this.btnLoading = false
          })
          console.log(this.form)
        }
      })
    },
  },
}
</script>

<style lang="scss">
  .container{
    padding-left: 40upx;
    padding-right: 30upx;
    margin: auto;
    .recognition-methods{
      width: 660upx;
    }
    .u-upload{
      ::v-deep .u-list-item{
        width: 151upx!important;
        height: 151upx!important;
      }
    }
    .footer{
      padding-top: 40upx;
      padding-bottom: 40upx;
    }
  }
</style>
