var app = getApp()
Page({
  data: {
    phonenumber: null,
    password: null,
    dataInfo: null
  },
  phonenumerInput: function (e) {
    this.data.phonenumber = e.detail.value
  },
  passwordInput: function (e) {
    this.data.password = e.detail.value
  },
  loginButtonClick: function () {
    var that = this
    var requestData =
      {
        phonenumber: this.data.phonenumber,
        password: this.data.password,
        access_token: 'token'
      }
    //正则判断
    var myreg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/
    if (!myreg.test(this.data.phonenumber)) {
      wx.showToast({
        title: '请输入有效的手机号码！',
        icon: 'success',
        duration: 2000
      })
      return false;
    }
    wx.request({
      url: 'https://apis.ziyawang.com/zll/auth/login',
      data: requestData,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res.data)
        that.setData({ dataInfo: res.data })
        console.log(that.data.dataInfo)
        if (that.data.dataInfo.status_code == '200') {
          //登录成功
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000
          })

            if(that.data.dataInfo.UserName == ""){
              that.data.dataInfo.UserName = "未设置"
            }
          try {
            wx.setStorageSync('token', that.data.dataInfo.token)
            wx.setStorageSync('role', that.data.dataInfo.role)
            wx.setStorageSync('UserName', that.data.dataInfo.UserName)
            wx.setStorageSync('UserID', that.data.dataInfo.UserID)
            wx.setStorageSync('right', that.data.dataInfo.right)
            wx.setStorageSync('isLogin', true)    
          } catch (e) {
            console.log(e.detail.value)
          }
          app.globalData.token = that.data.dataInfo.token
          console.log(app.globalData.token)
          wx.navigateBack({
            delta: 0, // 回退前 delta(默认为1) 页面
          })
        }
        else if (that.data.dataInfo.status_code == '404') {
          wx.showToast({
            title: '用户名或密码错误',
            duration: 2000
          })
        }
        else if (that.data.dataInfo.status_code == '406') {
          wx.showToast({
            title: '该手机号尚未注册',
            duration: 2000
          })
        }
        else {
          wx.showToast({
            title: '服务器异常，请稍后再试',
            duration: 2000
          })
        }
      },
    })
  },
  registButtonClick: function () {
    wx.navigateTo({
      url: '../regist/regist',
    })
  }
})