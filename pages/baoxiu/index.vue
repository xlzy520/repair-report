<template>
	<view class="container">
    <view class="form-main">
      <u-form :model="form" ref="uForm" label-position="top" class="lzy-form">
        <u-form-item label="选择识别方式" required prop="method">
          <view class="layout-slide recognition-methods">
            <view class="layout-cc recognition-item" v-for="item in methods"
                  @click="checkMethod(item)">
              <u-image :src="getMethodImg(item)" width="101" height="100" />
              <view class="f28 c9 lh-40 u-m-t-20">{{item.label}}</view>
            </view>
          </view>
        </u-form-item>
        <u-form-item v-if="checkMethodIsImg" label="请选择图片" required>
          <u-upload :action="imgCheckAction" :header="header"
                    name="image" :file-list="fileList" :custom-btn="true"
                    max-count="1" :show-progress="false" @on-success="uploadCheckImgSuccess">
            <view class="layout-cc upload-btn-img" slot="addBtn">
              <u-image src="/static/icon/camera.png" width="65" height="54" ></u-image>
            </view>
          </u-upload>
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
<!--        <u-form-item label="上传音频" prop="audioList" class="form-item-desc row-no-reverse">-->
<!--          <template slot="right">最多上传3段音频</template>-->
<!--          <u-upload :action="action" upload-type="media" :custom-btn="true"-->
<!--                    max-count="3" :show-progress="false">-->
<!--            <view class="layout-cc upload-btn-img" slot="addBtn">-->
<!--              <u-image src="/static/icon/audio.png" width="57" height="46" ></u-image>-->
<!--            </view>-->
<!--          </u-upload>-->
<!--        </u-form-item>-->

        <u-form-item label="备注" prop="description" :border-bottom="false" class="row-no-reverse">
          <u-input type="textarea" border height="200" v-model="form.description"
                   maxlength="100"
                   placeholder="请输入您的备注信息……" />
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
import commonApi from 'api/common'
import repairApi from 'api/repair'
import { getLocation } from 'utils'
import { uploadMediaMixins } from 'utils/mixins'

export default {
  components: {
  },
  mixins: [uploadMediaMixins],
  data() {
    return {
      action: this.$uploadUrl,
      imgCheckAction: this.$baseUrl + '/api/repair/exhibition/image/search',
      form: {
        exhibitionId: '',
        imgList: [],
        videoList: [],
        // audioList: [],
        description: '',
      },
      fileList: [],
      exhibitionShow: false,
      exhibitionOptions: [],
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
      baseMethodsIconPath: '/static/icon/methods/',
      methods: [
        { label: 'GPS定位', url: 'gps', method: this.getExhibition },
        { label: '区域识别', url: 'quyu', method: this.areaSearch },
        { label: '二维码识别', url: 'qrcode', method: this.scanQRcode },
        { label: '照片识别', url: 'photo', method: this.imageSearch }
      ],
      checkedMethod: 'GPS定位',
      showItems: ['展品1', '展品2'],
      header: {
        token: uni.getStorageSync('accessToken'),
      },
      qr: '',
      loading: false,
    }
  },
  computed: {
    checkMethodIsImg() {
      return this.checkedMethod === '照片识别'
    },
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules)
  },
  mounted() {
    if (!this.qr) {
      this.getExhibition()
    }
  },
  onLoad(options) {
    if (options) {
      const { qr } = options
      if (qr) {
        this.qr = qr
        this.checkedMethod = '二维码识别'
        this.scanRequest(qr)
      }
    }
  },
  methods: {
    format(data) {
      return data.map(v => ({
        label: v.exhibitionName,
        value: v.id,
      }))
    },
    uploadCheckImgSuccess(res) {
      if (res.data) {
        this.exhibitionOptions = this.format(res.data)
      }
    },
    getMethodImg(item) {
      const baseUrl = item.url
      const url = item.label === this.checkedMethod ? baseUrl : baseUrl + '_grey'
      return this.baseMethodsIconPath + url + '.png'
    },
    checkMethod(item) {
      this.checkedMethod = item.label
      item.method()
    },
    changeExhibition(data) {
      if (data[0].label) {
        this.form.exhibitionId = data[0].value
        this.cellTitles.exhibition = data[0].label
      }else {
        uni.showToast({ title: '暂无展项数据', icon: 'none' })
      }
    },
    getExhibition() {
      this.loading = true
      getLocation().then(res => {
        const { longitude, latitude } = res
        commonApi.near({
          lat: latitude,
          lon: longitude,
        }).then(res => {
          this.exhibitionOptions = this.format(res)
          console.log(res)
        }).finally(() => {
          this.loading = false
        })
      })
    },
    areaSearch() {
      repairApi.areaSearch().then(res => {
        console.log(res)
        this.exhibitionOptions = this.format(res)
      })
    },
    imageSearch() {},
    scanRequest(qr) {
      commonApi.scan({ qr }).then(res => {
        if (res) {
          this.exhibitionOptions = this.format([res])
        }
        console.log(res)
      })
    },
    scanQRcode() {
      uni.scanCode({
        success: (res) => {
          this.scanRequest(res.result)
        },
      })
    },
    submit() {
      if (this.loading) {
        return
      }
      this.$refs.uForm.validate(valid => {
        if (valid) {
          this.btnLoading = true
          repairApi.add(this.form).then(res => {
            console.log(res)
            uni.showToast({ title: '提交成功' })
            setTimeout(() => {
              uni.navigateBack()
            }, 500)
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
