// pages/shaxiangqun/DetailsFindService/DetailsFindService.js
var app = getApp()
Page({
  data: {
    Object: '',
  },
  onLoad: function (options) {
    var that = this
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 6000
    })
    var datas = {
      access_token: "token",
      token: wx.getStorageSync('token'),
    }
    var url = 'https://apis.ziyawang.com/zll/service/list/' + options.id
    wx.request({
      url: url,
      method: 'GET',
      data: datas,
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        wx.hideToast()
        that.data.Object = res.data;
        console.log(res.data)
        if (res.data.CollectFlag == '1') {
          var src = "../../../image/v2shouc.png"
        } else {
          var src = "../../../image/v2shoucang.png"
        }
        that.data.Object['showRightPic'] = []
        for (var i = 0; i < that.data.Object.showrightios.length; i++) {
          that.data.Object['showRightPic'].push("../../../image/right_" + that.data.Object.showrightios[i] + ".png");
        }
        that.setData({
          Object: that.data.Object,
          src: src
        });
      },
      complete: function () {
      }
    })
  },
  //收藏功能
  bindsha: function (e) {
    //console.log(e.currentTarget.dataset.id)
    var that = this
    if (!wx.getStorageSync('isLogin')) {
      that.jumpLogin()
    } else {
      wx.request({
        url: 'https://apis.ziyawang.com/zll/collect' + '?token=' + wx.getStorageSync('token'),
        data: {
          access_token: "token",
          itemID: e.currentTarget.dataset.id,
          type: "4"
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          if (res.data.msg == '收藏成功！') {
            var src = "../../../image/v2shouc.png"
            wx.showToast({
              title: "收藏成功"
            })
          } else {
            var src = "../../../image/v2shoucang.png"
            wx.showToast({
              title: "取消收藏成功"
            })
          }
          that.setData({
            src: src
          });
        },
      })
    }

  },
  //分享
  onShareAppMessage: function () {
    return {
      title: '标题',
      desc: '描述',
      path: '/pages/benben/FindInfo/FindInfo'
    }
  },
  //约谈
  call: function (e) {
    var that = this
    if (!wx.getStorageSync('isLogin')) {
      that.jumpLogin()
    } else {
      if (e.currentTarget.dataset.insider == '0') {
        wx.showToast({
          title: "服务方还未开通会员"
        })
      } else {
        wx.makePhoneCall({
          phoneNumber: e.currentTarget.dataset.phone
        })
      }

    }

  },
  //跳转到登录页面
  jumpLogin: function () {
    wx.navigateTo({
      url: '../../xjc/login/login'
    })
  },
})