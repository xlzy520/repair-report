<template>
	<view class="login">
    <login-top />
    <view class="tabs">
      <view class="tab-item">
        <view class="item-text">密码登录</view>
        <view class="item-line"></view>
      </view>

    </view>
		<view class="login-content ftf">
			<view class="main">
        <view class="login-type-form">
          <u-form :model="loginParams" :rules="rules" ref="uForm" class="" :border-bottom="false">
            <u-form-item prop="account" left-icon="/static/icon/login/account.png"
                         :left-icon-style="leftIconStyle">
              <u-input v-model="loginParams.account" clearable
                       left-icon="/static/login/account.png" placeholder="请输入手机号"></u-input>
<!--              <u-input v-model="loginParams.account" type="number" clearable-->
<!--                       left-icon="/static/login/account.png" placeholder="请输入手机号"-->
<!--                       maxlength="11"></u-input>-->
            </u-form-item>
            <u-form-item prop="password" left-icon="/static/icon/login/pwd.png"
                         :left-icon-style="leftIconStyle">
              <u-input placeholder="请输入密码" v-model="loginParams.password" :type="pwdType"
                       @click-icon="togglePwd" :password-icon="false"
                       maxlength="20"></u-input>
              <template slot="right">
                <u-image :src="eyeImg" width="50" height="50" @click="togglePwd" />
              </template>
            </u-form-item>
          </u-form>
          <view class="input-item input-item-sms-code" v-if="!loginByPass">
            <text class="iconfont iconyanzhengma"></text>
            <view class="input-wrapper">
              <view class="rf-input-wrapper">
                <input
                    type="number"
                    class="login-type-input"
                    v-model="loginParams.code"
                    placeholder="请输入验证码"
                    maxlength="4"
                />
              </view>
              <button
                  class="sms-code-btn"
                  @tap.stop="getSmsCode('login')"
              >
                <text>获取验证码</text>
              </button>
            </view>
          </view>
        </view>
        <u-button class="confirm-btn" :disabled="loading" :loading="loading" @tap="toLogin">
          登录
        </u-button>
        <view class="login-footer">
          <view class="login-footer-left" @tap="register">
            立即注册
          </view>
          <text class="forget" @click="forget">忘记密码</text>
        </view>
      </view>
		</view>
	</view>
</template>
<script>
import LoginTop from './components/LoginTop.vue'
import userApi from '../../api/user'

export default {
  components: { LoginTop },
  data() {
    return {
      loginParams: {
        account: 'oB6Ug5ebkvSB8gi1OhZrLvRIe1ZI',
        accountType: '7',
        password: 'oB6Ug5ebkvSB8gi1OhZrLvRIe1ZI',
      },
      pwdType: 'password',
      loading: false,
      codeSeconds: 0, // 验证码发送时间间隔
      loginByPass: true,
      smsCodeBtnDisabled: true,
      userInfo: null,
      tabCurrentIndex: 0,
      rules: {
        account: [
          {
            required: true,
            message: '请输入手机号',
            trigger: ['change', 'blur'],
          },
          // {
          //   validator: (rule, value, callback) => this.$u.test.mobile(value),
          //   message: '手机号码不正确',
          //   trigger: ['change', 'blur'],
          // }
        ],
        password: [
          {
            min: 6,
            message: '密码不能少于6个字',
            trigger: 'change',
          }
        ],
      },
      typeList: [
        {
          text: '登录',
        },
        {
          text: '注册',
        }
      ],
      leftIconStyle: {
        width: '50rpx',
        height: '50rpx',
      },
    }
  },
  onLoad(options) {
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules)
  },
  computed: {
    eyeImg() {
      return this.pwdType ? '/static/icon/login/eye.png' : '/static/icon/login/eye-open.png'
    },
  },
  methods: {
    togglePwd() {
      this.pwdType = this.pwdType ? '' : 'password'
    },
    // 发送验证码并进入倒计时
    getSmsCode(usage = 'login') {
      uni.showToast({ title: '点击了获取验证码' })
    },
    // 返回上一页
    navBack() {
      uni.navigateBack()
    },
    // 统一跳转路由
    navTo(url) {
      uni.navigateTo({ url })
    },
    // 提交表单
    toLogin() {
      this.$refs.uForm.validate(valid => {
        if (valid) {
          this.loading = true
          userApi.login({
            ...this.loginParams,
          }).then(res => {
            console.log(res)
            uni.switchTab({ url: '/pages/work-bench/index' })
            this.navTo('/pages/home/index')
            uni.setStorageSync('accessToken', res.accessToken)
            this.findUserInfo()
          }).finally(() => {
            this.loading = false
          })
        }
      })
    },
    register() {
      this.navTo('/pages/register-forget/index')
    },
    forget() {
      this.navTo('/pages/register-forget/index?type=forget')
    },
    findUserInfo() {
      userApi.findUserInfo().then(res => {
        uni.setStorageSync('userInfo', JSON.stringify(res))
      })
    },
  },
}
</script>
<style lang="scss">
	.login {
    min-height: 100vh;
    padding: 25rpx 30rpx;
    .tabs{
      padding: 0 20rpx;
      .tab-item{
        display: inline-block;
        font-size: 36rpx;
        font-weight: 600;
        color: #333333;
        line-height: 50rpx;
      }
      .item-text{
        padding-bottom: 11rpx;
      }
      .item-line{
        width: 50%;
        margin: auto;
        height: 2rpx;
        background: $uni-border-bottom-color;
      }
    }
		.login-content {
			.main {
				.login-type-form {
          padding: 0 20rpx;
          margin-bottom: 53upx;
          .input-item {
						position: relative;
						height: 90rpx;
						line-height: 90rpx;
						margin-bottom: 30rpx;
						.iconfont {
							font-size: 50rpx;
							position: absolute;
							left: 0;
						}
						.login-type-input {
							height: 90rpx;
							padding-left: 80rpx;
							border-bottom: 1rpx solid rgba(0, 0, 0, .1);
						}
						.sms-code-btn, sms-code-resend {
							width: 240rpx;
							font-size: 26rpx;
						}
					}
				}
				.login-footer {
          margin-top: 25rpx;
          padding: 0 50rpx;
					display: flex;
					justify-content: space-between;
          font-size: 32upx;
          color: #666;
          .login-footer-left{
            color: #333333;
          }
          .forget{
            color: #FE981F;
          }
				}
			}
		}
    ::v-deep .u-form-item--left__content__icon{
      display: flex;
    }
    // 发送验证码样式
    .input-item-sms-code {
      .input-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .sms-code-btn {
        width: 200upx;
        background-color: #fff;
        display: flex;
        padding: 15upx 0;
        justify-content: center;
        align-items: center;
        border-radius: 12upx;
      }

      .sms-code-resend {
        color: #666;
      }
    }
	}
</style>
