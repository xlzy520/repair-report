export default {
  required: (text, method = ['blur', 'change']) => ({ required: true, message: text, trigger: method }),
  chinese: { pattern: /[\u4e00-\u9fa5]/g, message: '请输入汉字', trigger: 'change' },
  word_number: { pattern: /^\w+$/g, message: '请输入字母、数字' },
  float: { pattern: /^(([1-9]\d*)(\.\d{1,2})?|0\.\d{1,2})$/g, message: '请输入最多两位小数，且不为0', trigger: 'change' }, // 正整数或小数
  number: { pattern: /^[1-9]\d*$/g, message: '请输入正整数', trigger: 'change' }, // 正整数
  float2: { pattern: /^(([1-9]\d*)(\.\d{1,2})?|0\.\d{1,2})$/g, message: '请输入两位小数', trigger: 'change' }, // 只能输入两位小数
  number5: { pattern: /^[1-9]\d{0,3}$/g, message: '请输入范围1~9999的整数', trigger: 'change' }, // 5代表整数部分不超过五位数
  float5: { pattern: /^(([1-9]\d{0,3})(\.\d{1,2})?|0\.\d{1,2})$/g, message: '请输入范围0~9999的数', trigger: 'change' }, // 包括小数
  word_number_chinese: { pattern: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/g, message: '请输入数字、字母、汉字' },
  phone: {
    pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
    message: '请填写符合要求的11位手机号',
    trigger: 'blur',
  },
  idCard: {
    pattern: /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/,
    message: '请填写符合要求的身份证号',
    trigger: 'blur',
  }
}
