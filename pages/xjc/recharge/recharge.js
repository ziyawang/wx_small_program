var app = getApp();
Page({
  data: {
    items: [
      {
        num: '1', value: '充值10芽币',
        give: 'give', value2: '（支付1元）'
      },
      {
        num: '2', value: '充值120芽币',
        give: 'give', value2: '（支付12元）',checked:true
      },
      {
        num: '3', value: '充值500芽币',
        give: 'give', value2: '（支付50元 赠送50芽币）'
      },
      {
        num: '4', value: '充值1080芽币',
        give: 'give', value2: '（支付108元 赠送150芽币）'
      },
      {
        num: '5', value: '充值2880芽币',
        give: 'give', value2: '（支付288元 赠送580芽币）'
      },
      {
        num: '6', value: '充值5880芽币',
        give: 'give', value2: '（支付588元 赠送1500芽币）'
      },
      {
        num: '7', value: '充值10980芽币',
        give: 'give', value2: '（支付1098元 赠送3300芽币）'
      },
      {
        num: '8', value: '充值19980芽币',
        give: 'give', value2: '（支付1998元 赠送7000芽币）'
      },
    ],
    rechargevalue: null,
    payId: '2',
    payType: 'yabi',

  },
  radioChange: function (e) {
    this.data.rechargevalue = e.detail.value
  },
  rechargeButtonClick: function () {
    var that = this
    switch (this.data.rechargevalue) {
      case '1':
        that.data.payId = '1';
        break;
      case '2':
        that.data.payId = '2';
        break;
      case '3':
        that.data.payId = '3';
        break;
      case '4':
        that.data.payId = '4';
        break;
      case '5':
        that.data.payId = '5';
        break;
      case '6':
        that.data.payId = '6';
        break;
      case '7':
        that.data.payId = '7';
        break;
      case '8':
        that.data.payId = '8';
        break;
      default:
        break;
    }
    wx.login({
      success: function (loginCode) {
        var appid = 'wx0c117367aa543268';
        var secret = '693499fa7a4266c57440bf76c896014d';
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&grant_type=authorization_code&js_code=' + loginCode.code,
          header: {
            'content-type': 'application/json'
          },
          success: function (re) {
            wx.request({
              url: app.globalData.apiprefix + '/wechat/pay?token=' + app.globalData.token,
              data: {
                access_token: 'token',
                payid: that.data.payId,
                paytype: that.data.payType,
                openid: re.data.openid
              },
              header: {
                'content-type': 'application/json'
              },
              method: 'POST',
              success: function (res) {
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
                      url: 'https://apis.ziyawang.com/wechat/webhooks/yabi', 
                      data: {
                        'ordernumber': orderNumber,
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
  viewTapAction: function (event) {
    console.log(event.target.id)
  },
})