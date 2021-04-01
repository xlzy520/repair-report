<template>
  <u-form :model="form" ref="uForm" label-position="top" class="lzy-form media-form">
    <u-form-item label="上传照片" prop="imgList" class="row-no-reverse form-item-desc">
      <template slot="right">最多上传3张图片</template>
      <u-upload :action="action" :header="header" :custom-btn="true"
                max-count="3" :show-progress="false"
                @on-remove="removeImg"
                @on-success="uploadImgSuccess">
        <view class="layout-cc upload-btn-img" slot="addBtn">
          <u-image src="/static/icon/camera.png" width="65" height="54" ></u-image>
        </view>
      </u-upload>
    </u-form-item>
    <u-form-item label="上传视频" prop="videoList" class="row-no-reverse form-item-desc">
      <template slot="right">最多上传3个视频</template>
      <u-upload :action="action" :header="header" upload-type="video"
                @on-success="uploadVideoSuccess"
                @on-remove="removeVideo"
                :custom-btn="true" max-count="3" :show-progress="false">
        <view class="layout-cc upload-btn-img" slot="addBtn">
          <u-image src="/static/icon/video.png" width="72" height="72" ></u-image>
        </view>
      </u-upload>
    </u-form-item>
<!--    <u-form-item label="上传音频" prop="audioList" class="form-item-desc row-no-reverse">-->
<!--      <template slot="right">最多上传3段音频</template>-->
<!--      <u-upload :action="action" upload-type="file" :custom-btn="true" :limitType="audioLimitType"-->
<!--                max-count="3" :show-progress="false">-->
<!--        <view class="layout-cc upload-btn-img" slot="addBtn">-->
<!--          <u-image src="/static/icon/audio.png" width="57" height="46" ></u-image>-->
<!--        </view>-->
<!--      </u-upload>-->
<!--    </u-form-item>-->

    <u-form-item label="备注" prop="description" :border-bottom="false" class="row-no-reverse">
      <u-input type="textarea" border height="200" v-model="form.description"
               placeholder="请输入您的备注信息……" />
    </u-form-item>
    <view class="layout-slide footer" v-if="orderType === '1'">
      <u-button class="confirm-btn" :disabled="btnLoading" :loading="btnLoading" @click="submit">
        提交维修
      </u-button>
      <u-button class="confirm-btn contact" @click="contact">
        联系厂家
      </u-button>
    </view>
    <view class="layout-slide footer" v-if="orderType === '2'">
      <u-button class="confirm-btn" :disabled="btnLoading" :loading="btnLoading" @click="submit(2)">
        通过
      </u-button>
      <u-button class="confirm-btn contact" @click="reject">
        驳回
      </u-button>
    </view>
  </u-form>
</template>

<script>

import { uploadMediaMixins } from 'utils/mixins'

export default {
  mixins: [uploadMediaMixins],
  data() {
    return {
      action: this.$uploadUrl,
      form: {
        exhibitionId: '',
        imgList: [],
        videoList: [],
        // audioList: [],
        description: '',
      },
      fileList: [],
      header: {
        token: uni.getStorageSync('accessToken'),
      },
      btnLoading: false,
      audioLimitType: ['mp3', 'wma', 'avi'],
      rules: {
        // imgList: [
        //   {
        //     validator: (rule, value, callback) => {
        //       if (this.form.imgList.length) {
        //         callback()
        //       } else {
        //         callback('请上传至少一张图片')
        //       }
        //     },
        //     trigger: ['blur', 'change'],
        //   }
        // ],
        // videoList: [
        //   {
        //     validator: (rule, value, callback) => {
        //       if (this.form.videoList.length) {
        //         callback()
        //       } else {
        //         callback('请上传至少一个视频')
        //       }
        //     },
        //     trigger: ['blur', 'change'],
        //   }
        // ],
      },
    }
  },
  props: {
    orderType: {
      type: String,
      default: '',
    },
    orderDetail: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    this.$refs.uForm.setRules(this.rules)
  },
  methods: {
    submit(status) {
      this.$refs.uForm.validate(valid => {
        if (valid) {
          const basePayload = this.form
          if (status) {
            basePayload.status = status
          }
          this.$emit('submit', basePayload)
        }
      })
    },
    contact() {
      const phone = this.orderDetail.phone
      if (!phone) {
        uni.showToast({ title: '运营商数据为空', icon: 'none'})
        return
      }
      uni.makePhoneCall({ phoneNumber: phone })
    },
    reject() {
      this.$emit('submit', {
        ...this.form,
        status: -1,
      })
    },
  },
}
</script>
<style lang="scss">
  .footer{
    padding-top: 72upx;
  }
</style>
