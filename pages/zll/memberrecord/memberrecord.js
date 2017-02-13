var app = getApp()
Page({
  data: {
    lists: [],
    pages: null,
    currentPage: 0,
    nextPage: 1
  },
  initData: function(){
    this.setData({
      lists:[],
      currentPage:0,
      nextPage:1
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.memberRecord();
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  memberRecord: function () {
    //如果到最后一页了
    if(this.data.currentPage == this.data.nextPage){
      wx.showModal({
        content:"没有更多记录了！"
      })
      return false
    }
    var _that = this
    wx.request({
      url: app.globalData.apiprefix + '/pay/member/list?token=' + app.globalData.token, //仅为示例，并非真实的接口地址
      data: {
        access_token: 'token',
        pagecount: 8,
        startpage: _that.data.nextPage
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        var next = res.data.currentpage + 1
        if(next > parseInt(_that.data.pages)){
          next = _that.data.pages
        }
        var data = _that.data.lists.concat(res.data.data)
        _that.setData({
          lists: data,
          pages: res.data.pages,
          currentPage: res.data.currentpage,
          nextPage: next
        })
      }
    })
  },
  onReachBottom: function() {
    console.log("上拉加载")
    this.memberRecord()
  },
  onPullDownRefresh: function() {
    console.log("刷新")
    this.initData()
    this.memberRecord()
  }

})