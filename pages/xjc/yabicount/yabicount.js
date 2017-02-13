var app = getApp();
Page({
  data: {
    Account: null
  },
  getUserInfo: function () {
    var that = this
    try {
      var token = wx.getStorageSync('token')
      if (token) {
        this.data.URL = 'https://apis.ziyawang.com/zll/auth/me' + '?token=' + token
        this.data.token = token
        wx.request({
          url: 'https://apis.ziyawang.com/zll/auth/me' + '?token=' + token,
          data: {
            access_token: 'token'
          },
          method: 'POST',
          success: function (res) {
            that.setData({ Account: res.data.user.Account })
          },
        })
      }
    }
    catch (e) {}
  },
  onShow: function () {
    this.getUserInfo()
  },
  detailButtonClick: function () {
    wx.navigateTo({
      url: '../costDetail/costDetail',
    })
  },
  rechargeButtonClick: function () {
    wx.navigateTo({
      url: '../recharge/recharge',
    })
  },
})