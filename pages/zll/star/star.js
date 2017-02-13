// pages/ucenter/star/index.js
Page({
  goToApp: function () {
    wx.showModal({
      title: '提示',
      content: '请先下载资芽APP，在APP内进行星级认证！',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  }
})