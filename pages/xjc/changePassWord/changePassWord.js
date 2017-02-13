Page({
  data: {
    password: null
  },
  passwordInput: function (e) {
    this.data.password = e.detail.value
  },
  sureButtonClick: function () {
    var that = this
    try {
      var token = wx.getStorageSync('token')
      if (token) {
        this.data.URL = 'https://apis.ziyawang.com/zll/auth/chpwd' + '?token=' + token
        this.data.token = token
        wx.request({
          url: 'https://apis.ziyawang.com/zll/auth/chpwd' + '?token=' + token,
          data: {
            access_token: 'token',
            password: that.data.password
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
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
    catch (e) {
    }
  },
})