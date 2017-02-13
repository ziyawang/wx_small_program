// pages/ucenter/index.js
Page({
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    try {
      wx.setStorageSync('isLogin', true)
    } catch (e) {

    }
  },
  goApp: function(){
    wx.showModal({
      content: "请去官网http://ziyawang.com或者下载资芽App发布信息。"
    })
  }
})