var app = getApp()
Page({
  data: {
    memberName: null,
    memberPicture: null,
    memberPayList: null,
    payId: null,
    payType: "member",
    payName: null
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      memberName: options.memberName,
      memberPicture: options.picture
    })
    // 初始化付款项目
    var payList = []
    switch (options.memberName) {
      case "资产包":
        payList = [['月度会员', 6498, 7], ['年度会员', 70000, 8, true]]
        this.setData({
          payId: 8,
          payName: "资产包"
        })
        break;
      case "企业商账":
        payList = [['季度会员', 1498, 9], ['年度会员', 4998, 10, true]]
        this.setData({
          payId: 10,
          payName: "企业商账"
        })
        break;
      case "固定资产":
        payList = [['月度会员', 6498, 5], ['年度会员', 70000, 6, true]]
        this.setData({
          payId: 6,
          payName: "固定资产"
        })
        break;
      case "融资信息":
        payList = [['季度会员', 998, 3], ['年度会员', 2998, 4, true]]
        this.setData({
          payId: 4,
          payName: "融资信息"
        })
        break;
      case "个人债权":
        payList = [['季度会员', 998, 1], ['年度会员', 2998, 2, true]]
        this.setData({
          payId: 2,
          payName: "个人债权"
        })
        break;
    }
    this.setData({
      memberPayList: payList
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  payIdChange: function (e) {
    this.setData({
      payId: e.detail.value
    })
  },
  memberPay: function () {
    var _that = this
    wx.login({
      success: function (loginCode) {
        var appid = 'wx0c117367aa543268'; //填写微信小程序appid  
        var secret = '693499fa7a4266c57440bf76c896014d'; //填写微信小程序secret  

        //调用request请求api转换登录凭证  
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&grant_type=authorization_code&js_code=' + loginCode.code,
          header: {
            'content-type': 'application/json'
          },
          success: function (re) {
            console.log(re.data.openid) //获取openid  
            wx.request({
              url: app.globalData.apiprefix + '/wechat/pay?token=' + app.globalData.token, //仅为示例，并非真实的接口地址
              data: {
                access_token: 'token',
                payid: _that.data.payId,
                paytype: _that.data.payType,
                payname: _that.data.payName,
                openid: re.data.openid
              },
              header: {
                'content-type': 'application/json'
              },
              method: 'POST',
              // dataType: 'json',
              success: function (res) {
                console.log(res)
                // var data = res.data.substring(res.data.indexOf("{"),res.data.indexOf("}")+1)
                // data = JSON.parse(data)
                var data = JSON.parse(res.data.data)
                var orderNumber = res.data.ordernumber
                wx.requestPayment({
                  'timeStamp': data.timeStamp,
                  'nonceStr': data.nonceStr,
                  'package': data.package,
                  'signType': 'MD5',
                  'paySign': data.paySign,
                  'success': function (res) {
                    wx.request({
                      url: 'https://apis.ziyawang.com/wechat/webhooks/member', //仅为示例，并非真实的接口地址
                      data: {
                        'ordernumber': orderNumber,
                        'payid': _that.data.payId,
                        'package': data.package
                      },
                      header: {
                        'content-type': 'application/json'
                      },
                      success: function (res) {
                        wx.showToast({
                          title: '支付成功'
                        })
                      }
                    })
                  }
                });
              }
            })
          }
        })
      }
    })

  },
})
