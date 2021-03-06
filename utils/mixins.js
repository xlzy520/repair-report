export const getList = {
  data() {
    return {
      pageOption: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      totalPages: 0,
      list: [],
    }
  },
  mounted() {
    this.getList()
  },
  onPullDownRefresh() {
    this.pageOption = {
      pageNum: 1,
      pageSize: 10,
    }
    this.getList(true)
  },
  onReachBottom() {
    if (this.pageOption.pageNum < this.totalPages) {
      this.pageOption.pageNum++
      this.getList()
    }
  },
}

export const uploadMediaMixins = {
  data() {
    return {
      pageOption: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      totalPages: 0,
      list: [],
    }
  },
  methods: {
    uploadVideoSuccess(data) {
      this.form.videoList.push(data.data)
    },
    uploadImgSuccess(data) {
      this.form.imgList.push(data.data)
    },
    removeVideo(index) {
      this.form.videoList.splice(index, 1)
    },
    removeImg(index) {
      this.form.imgList.splice(index, 1)
    },
  },
}
