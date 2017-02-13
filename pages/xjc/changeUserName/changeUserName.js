Page({
  data: {
    username: null
  },
  usernameInput: function (e) {
    this.data.username = e.detail.value
  },
  sureButtonClick: function () {
    var that = this
    try {
      var token = wx.getStorageSync('token')
      if (token) {
        this.data.token = token
        wx.request({
          url: 'https://apis.ziyawang.com/zll/auth/chusername' + '?token=' + token,
          data: {
            access_token: 'token',
            username: that.data.username
          },
          method: 'POST',
          success: function (res) {
            console.log(res.data)
            wx.showToast({
              title: '修改成功！',
              icon: 'success',
              duration: 30
            })
            wx.navigateBack({
              delta: 0,
            })
          },
        })
      }
    }
    catch (e) {}
  },
})