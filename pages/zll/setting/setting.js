// pages/zll/setting/setting.js
Page({
  data: {
    isLogin:null
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var isLogin = wx.getStorageSync('isLogin')
    this.setData({
      isLogin:isLogin
    })
  },
  clearCache: function () {
    wx.clearStorageSync()
    wx.showToast({
      title: '清理缓存成功',
      icon: 'success',
      duration: 2000
    })
  },
  logout: function () {
    wx.showModal({
      title: '温馨提示',
      content: '确定退出吗？',
      success: function (res) {
        if (res.confirm) {
        wx.clearStorageSync()
          wx.switchTab({
            url: '../../xjc/user/user'
          })
        }
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: "分享资芽",
      desc: "资芽网",
      path: '/page/zll/ucenter/ucetner'
    }
  }
})