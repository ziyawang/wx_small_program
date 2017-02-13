var app = getApp()
Page({
  data: {
    userInfo: null,
    showRightPic: null,
    showRightTime: null
  },
  onShow: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.authMe()
  },
  authMe: function () {
    var _that = this
    wx.request({
      url: app.globalData.apiprefix + '/auth/me?token=' + app.globalData.token, //仅为示例，并非真实的接口地址
      data: {
        access_token: 'token'
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        var showRightPic = [];
        for (var i = 0; i < res.data.user.showrightios.length; i++) {
          showRightPic.push("../../../image/right_" + res.data.user.showrightios[i] + ".png")
        }
        _that.setData({
          userInfo: res.data,
          showRightPic: showRightPic,
          showRightTime: res.data.user.showrightarr
        })
        app.globalData.userInfo = res.data
      }
    })
  },
  showTime: function(obj){
    console.log(obj)
    var index = obj.target.dataset.index
    wx.showModal({
      content:this.data.showRightTime[index][0] + "会员到期时间：" + this.data.showRightTime[index][1]
    })
  }
})