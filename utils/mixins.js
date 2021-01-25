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
