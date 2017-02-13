var app = getApp();
Page({
  data: {
    alldata:
    {
      access_token: 'token'
    },
    URL: null,
    token: null,
    userinfo: null,
    username: '未登录',
    UserPicture: null
  },
  initData: function () {
    this.setData({ token: null })
    this.setData({ userinfo: null })
    this.setData({ username: '未登录' })
    this.setData({ UserPicture: '/user/defaltoux.jpg' })
  },
  editButtonClick: function () {
    var that = this
    if (that.data.token == null) {
      console.log(that.data.token)
      wx.navigateTo({
        url: "../login/login",
      })
    }
    else {
      wx.navigateTo({
        url: '../userinfo/userinfo',
      })
    }
  },
  onShow: function () {
    var that = this
    try {
      var token = wx.getStorageSync('token')
      console.log(token)
      var role = wx.getStorageSync('role')
      if (token) {
        this.data.URL = 'https://apis.ziyawang.com/zll/auth/me' + '?token=' + token
        this.data.token = token
        wx.request({
          url: this.data.URL,
          data: this.data.alldata,
          method: 'POST',
          success: function (res) {
            console.log(res.data)
            that.setData({ userinfo: res.data })
            that.setData({ UserPicture: res.data.user.UserPicture })
            if (res.data.user.username == "") {
              res.data.user.username = "未设置"
            }
            that.setData({ username: res.data.user.username })
            wx.setStorageSync('role', res.data.role)
            wx.setStorageSync('right', res.data.user.right)
            app.globalData.token = token
          },
        })
      } else {
        that.initData()
      }
    }
    catch (e) {
    }
  },
  nameviewtap: function () {
    var that = this
    if (that.data.token == null) {
      wx.navigateTo({
        url: "../login/login",
      })
    }
  },
  onShareAppMessage: function () {
    return {
      title: "分享资芽",
      desc: "资芽网",
      path: '/page/benben/FindInfo/FindInfo'
    }
  },
  goPub: function () {
    wx.showModal({
      content: "请去官网http://ziyawang.com或者下载资芽App发布信息。"
    })
  },
  goStar: function () {
    wx.showModal({
      content: "请去官网http://ziyawang.com或者下载资芽App进行星级认证。"
    })
  },
  hasLogin: function (e) {
    var that = this
    var url = e.target.dataset.url
    if (that.data.token == null) {
      wx.navigateTo({
        url: "../login/login"
      })
    } else {
      wx.navigateTo({
        url: url
      })
    }
  },
  confirmClick: function () {
    var that = this
    if (that.data.token == null) {
      wx.navigateTo({
        url: "../login/login"
      })
    } else {
      var roles = wx.getStorageSync("role");
      if (roles == 0) {
        wx.navigateTo({
          url: '../../lds/confirm/confirm'
        })
      } else {
        wx.navigateTo({
          url: '../../lds/reConfirm/reConfirm'
        })
      }
    }
  }
})
