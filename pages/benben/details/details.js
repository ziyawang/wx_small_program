// pages/details/details.js
var app = getApp();
var WxParse = require('../../../wxParse/wxParse.js')
Page({
  data: {
    NewsContent: "",
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
      token: wx.getStorageSync('token') ,
    }
    console.log(options.type)
    that.setData({
      TypeID: options.type
    })
    switch (options.type) {
      case "99":
        var url = 'https://apis.ziyawang.com/zll/news/list/' + options.id
        break
      default:
        var url = 'https://apis.ziyawang.com/zll/project/list/' + options.id
        break
    }
    wx.request({
      url: url,
      method: 'GET',
      data: datas,
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        wx.hideToast()
        wx.stopPullDownRefresh()
        switch (options.type) {
          case "99":
            that.data.NewsContent = res.data.data.NewsContent;
            that.setData({
              Object: res.data.data,
            });
            break
          default:
            if (res.data.CollectFlag == '1') {
              var src = "../../../image/v2shouc.png"
            } else {
              var src = "../../../image/v2shoucang.png"
            }
            that.setData({
              Object: res.data,
              src: src
            });
            break
        }
      },
      complete: function () {
        WxParse.wxParse('article', 'html', that.data.NewsContent, that, 0);
      }
    })
  },
  //约谈
  call: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    })
  },
  //收藏功能
  bindsha: function (e) {
    //console.log(e.currentTarget.dataset.id)
    var that = this
    wx.request({
      url: 'https://apis.ziyawang.com/zll/collect' + '?token=' + wx.getStorageSync('token') ,
      data: {
        access_token: "token",
        itemID: e.currentTarget.dataset.id ,
        type: "1"
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
  },
  //分享
    onShareAppMessage: function () {
        return {
            title: '资芽',
            desc: '全球不良资产超级综服平台',
            path: '/pages/benben/FindInfo/FindInfo'
        }
    },
})