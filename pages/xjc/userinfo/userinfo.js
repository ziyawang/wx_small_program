Page({
  data: {
    UserPicture: 'http://images.ziyawang.com',
    username: null,
    phonenumber: null,
    showright: null,
    userinfo: null,
    token: null,
    rightCount: null,
    rightArr: null
  },
  onShow: function () {
    this.getUserInfo()
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
            console.log('编辑界面')
            console.log(res.data)
            if(res.data.user.username == ""){
              res.data.user.username = "未设置"
            }
            that.setData({ userinfo: res.data })
            that.setData({ UserPicture: "http://images.ziyawang.com"+res.data.user.UserPicture })
            that.setData({ username: res.data.user.username })
            that.setData({ phonenumber: res.data.user.phonenumber })
            that.setData({ rightArr: res.data.user.showrightios })
          },
          complete: function () {
            // that.data.UserPicture = "http://images.ziyawang.com" + that.data.UserPicture
            // that.setData({
            //   UserPicture: that.data.UserPicture
            // })
          }
        })
      }
    }
    catch (e) { }
  },
  usericonClick: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths[0]
        that.setData({
          UserPicture: res.tempFilePaths
        })
        wx.uploadFile({
          url: 'https://apis.ziyawang.com/zll/upload?token=' + that.data.token,
          filePath: tempFilePaths,
          name: 'UserPicture',
          formData: {
            'access_token': 'token'
          },
        })

      },
    })
  },
  usernameClick: function () {
    wx.navigateTo({
      url: '../changeUserName/changeUserName',
    })
  },
  passwordClick: function () {
    wx.navigateTo({
      url: '../changePassWord/changePassWord',
    })
  },
})