var app = getApp();
Page({
  data: {
    dataInfo: null,
    phonenumber: null,
    smscode: null,
    password: null,
    repassword: null
  },
  phonenumerInput: function (e) {
    this.data.phonenumber = e.detail.value
  },
  smscodeInput: function (e) {
    this.data.smscode = e.detail.value
  },
  passwordInput: function (e) {
    this.data.password = e.detail.value
  },
  repasswordInput: function (e) {
    this.data.repassword = e.detail.value
  },
  smscodeButtonClick: function () {
    //正则判断
    var myreg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/
    if (!myreg.test(this.data.phonenumber)) {
      wx.showToast({
        title: '请输入有效的手机号码！',
        duration: 2000
      })
      return false;
    }
    var that = this
    var requestData = {
        phonenumber: this.data.phonenumber,
        access_token: 'token',
        action: 'register'
      }
    wx.request({
      url: 'https://apis.ziyawang.com/zll/auth/getsmscode',
      data: requestData,
      method: 'POST', 
      success: function (res) {
        that.setData({ dataInfo: res.data })
        console.log(that.data.dataInfo.status_code)
        if (that.data.dataInfo.status_code == '200') {
          //登录成功
          wx.showToast({
            title: '验证码发送成功,60s后可重新获取',
            icon: 'success',
            duration: 2000
          })
        }else if (that.data.dataInfo.status_code == '405') {
          wx.showToast({
            title: '该账号已注册，请直接登录',
            duration: 2000
          })
        }else {
          wx.showToast({
            title: '服务器异常，请稍后再试',
            duration: 2000
          })
        }
      },
    })
  },
  registButtonClick: function () {
    var that = this
    var requestData = {
        phonenumber: this.data.phonenumber,
        password: this.data.password,
        smscode: this.data.smscode,
        access_token: 'token'
      }
    //正则判断
    var myreg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/
    if (!myreg.test(this.data.phonenumber)) {
      wx.showToast({
        title: '请输入有效的手机号码！',
        duration: 2000
      })
      return false;
    }
    if (this.data.smscode == null) {
      wx.showToast({
        title: '请输入验证码',
        duration: 2000
      })
      return false;
    }
    if (this.data.password == null) {
      wx.showToast({
        title: '请输入密码',
        duration: 2000
      })
      return false;
    }

    if (this.data.repassword != this.data.password) {
      wx.showToast({
        title: '两次输入的密码不一致',
        duration: 2000
      })
      return false;
    }
    wx.request({
      url: 'https://apis.ziyawang.com/zll/auth/register',
      data: requestData,
      method: 'POST',
      success: function (res) {
        that.setData({ dataInfo: res.data })
        if (that.data.dataInfo.status_code == '200') {
          //登录成功
          wx.showToast({
            title: '注册成功',
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

          wx.switchTab({
            url: '../user/user'
          })
        }else if (that.data.dataInfo.status_code == '405') {
          wx.showToast({
            title: '该账号已注册',
            duration: 2000
          })
        }else if (that.data.dataInfo.status_code == '402') {
          wx.showToast({
            title: '验证码不正确',
            duration: 2000
          })
        }else if (that.data.dataInfo.status_code == '503') {
          wx.showToast({
            title: '验证码已发送成功，请勿频繁操作',
            duration: 2000
          })
        }else {
          wx.showToast({
            title: '服务器异常，请稍后再试',
            duration: 2000
          })
        }
      },
    })
  },
})