<template>
  <u-form :model="form" ref="uForm" label-position="top" class="lzy-form">
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
      <u-input type="textarea" border height="200" v-model="form.description"
               placeholder="请输入您的备注信息……" />
    </u-form-item>

  </u-form>
</template>

<script>

import reapirApi from 'api/reapir'

export default {
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
      header: {
        token: uni.getStorageSync('accessToken'),
      },
      btnLoading: false,
      rules: {
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
    }
  },
  props: {
    tabList: {
      type: Array,
      default: () => ([]),
    },
    text: {
      type: String,
      default: '',
    },

  },
  methods: {
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
<style lang="scss" scoped>
  ::v-deep .u-preview-wrap{
    width: 151upx!important;
    height: 151upx!important;
  }
</style>
