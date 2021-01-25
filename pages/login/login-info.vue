<template>
	<view class="register container">
    <title-header :title="title"/>
		<view class="main-content ftf">
      <view class="register-form">
        <u-form :model="form" ref="uForm" label-position="top" class="lzy-form">
          <u-form-item label="姓名" required class="user-name-row lzy-form-item" prop="name">
            <div class="u-flex u-col-center u-row-between user-name-row w90">
              <u-input required v-model="form.name" placeholder="请输入您的姓名" />
              <u-radio-group v-model="form.gender" active-color="#fff" class="lzy-radio">
                <u-radio name="male">男</u-radio>
                <u-radio name="female">女</u-radio>
              </u-radio-group>
            </div>
          </u-form-item>
          <u-col span="6">
            <u-form-item label="年龄" required prop="age">
              <u-input required v-model="form.age" placeholder="请输入您的年龄" class="w50" maxlength="3" />
              <template slot="right">岁</template>
            </u-form-item>
          </u-col>
          <u-form-item label="身份证号" required prop="cardId">
            <u-input required v-model="form.cardId" placeholder="请输入您的身份证号" maxlength="18" />
          </u-form-item>
          <u-form-item label="家庭地址" required prop="address">
            <u-input required v-model="form.address" placeholder="请输入您的联系地址" />
          </u-form-item>

        </u-form>
      </view>
		</view>
    <view class="footer">
      <u-button class="confirm-btn" :disabled="btnLoading" :loading="btnLoading" @click="submit">
        确定
      </u-button>
    </view>
	</view>
</template>
<script>
  export default {
    data() {
			return {
			  form: {
			    name: '',
          gender: 'male',
          age: ''
        },
				registerParams: {
					mobile: '',
					password: '',
					password_repetition: '',
					code: ''
				},
				btnLoading: false,
        title: '完善您的信息哦~',
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur'}
          ],
          age: [
            { pattern: /^([1-9][0-9]{0,1}|120)$/g, message: '年龄只能为0到120', trigger: 'change'}
          ],
          cardId: [
            this.$rules.required('请输入身份证号'),
            { type: 'number', len: 18, message: '请输入正确的身份证号' }
          ],
          address: [
            this.$rules.required('请输入家庭地址')
          ]
        }

			};
		},
    computed: {
    },
		onLoad(options) {
		},
    onUnload(){

    },
    onReady() {
      this.$refs.uForm.setRules(this.rules);
    },
		methods: {
      submit() {
        this.$refs.uForm.validate(valid => {
          if (valid) {
            console.log(this.form);
          } else {
            console.log('验证失败');
          }
        });
			},
		}
	};
</script>
<style lang="scss">
	.register {
		.main-content {
      font-family: $ftf;
      margin-top: 51rpx;
      .register-form {
        padding-left: 20rpx;
        margin-bottom: 53upx;
        .user-name-row{
          .u-border-bottom:after{
            width: 100%;
          }
        }
      }
		}
    .footer{
      margin-top: 114upx;
    }
  }
</style>
