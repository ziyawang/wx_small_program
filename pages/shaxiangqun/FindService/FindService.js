var app = getApp()
Page({
  data: {
    array: ['不限', '收购资产包', '投融资服务', '法律服务', '收购固产', '委外催收'],
    index: 0,
    arrayPart: ['全国', '北京', '上海', '广东', '江苏', '浙江', '河南', '河北', '辽宁', '四川', '湖北', '湖南', '福建', '安徽', '陕西', '天津', '江西', '重庆', '吉林', '云南', '山西', '新疆', '贵州', '甘肃', '海南', '宁夏', '青海', '西藏', '黑龙江', '内蒙古', '山东', '广西'],
    indexPart: 0,
    arrayType: ['不限', '会员'],
    indexType: 0,
    list: [],
    startpage: 1,
    ServiceType: "",
    ServiceArea: "",
    ServiceLevel: "",
    isloading: true,//为true时刷新，false加载
    url: 'https://apis.ziyawang.com/zll/service/list',
  },
  //初始
  onLoad: function () {
    this.data.isloading = true
    this.reqData();//首屏执行获取数据
  },
  //下拉刷新
  onPullDownRefresh: function () {
    this.data.isloading = true
    var marginTop = 0
    this.reqData()
  },
  //上拉加载
  onReachBottom: function () {
    this.data.isloading = false
    this.reqData()
  },
  // 加载数据
  reqData: function () {
    var _this = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 5000
    });
    if (_this.data.isloading) {
      _this.data.startpage = 1;
      _this.data.list = [];
    } else {
      _this.data.startpage += 1;
    }
    var datas = {
      startpage: _this.data.startpage,
      access_token: "token",
      token: app.globalData.token ,
      pagecount: 7,
      ServiceType: _this.data.ServiceType,
      ServiceArea: _this.data.ServiceArea,
      ServiceLevel: _this.data.ServiceLevel
    }
    wx.request({
      url: _this.data.url, //仅为示例，并非真实的接口地址
      data: datas,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideToast()
        var lists = res.data.data;
        _this.data.list = _this.data.list.concat(lists)
        wx.hideToast()
        for (var i = 0; i < _this.data.list.length; i++) {
          _this.data.list[i]['showRightPic'] = []
          var rightArr = _this.data.list[i].showrightios
          for (var j = 0; j < rightArr.length; j++) {
            _this.data.list[i]['showRightPic'].push("../../../image/right_" + rightArr[j] + ".png");
          }
        }
        _this.setData({
          list: _this.data.list,
        })
      },
      complete: function () {
        wx.stopPullDownRefresh()
      }
    })
  },
  //分享
  onShareAppMessage: function () {
    return {
      title: '标题',
      desc: '描述',
      path: '/pages/benben/FindInfo/FindInfo'
    }
  },
  //信息类型的选择
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    var that = this
    that.data.isRefresh = true;
    that.data.startpage = 1
    that.data.list = []
    switch (e.detail.value) {
      case "0":
        that.data.ServiceType = ""
        break
      case "1":
        that.data.ServiceType = "01"
        break
      case "2":
        that.data.ServiceType = "06"
        break
      case "3":
        that.data.ServiceType = "03"
        break
      case "4":
        that.data.ServiceType = "12"
        break
      case "5":
        that.data.ServiceType = "02"
        break
      default:
        that.data.ServiceType = ""
        break
    }
    console.log(that.data.ServiceType)
    this.reqData()
  },
  //信息地区的选择
  bindPartPickerChange: function (e) {
    console.log('信息地区携带值为', this.data.arrayPart[e.detail.value])
    this.setData({
      indexPart: e.detail.value
    })
    var that = this
    that.data.isRefresh = true;
    that.data.startpage = 1
    that.data.list = []
    if (e.detail.value == 0) {
      that.data.ServiceArea = ""
    } else {
      that.data.ServiceArea = that.data.arrayPart[e.detail.value]
    }
    console.log(that.data.ServiceArea)
    that.reqData()

  },
  //信息标签的选择
  bindTypePickerChange: function (e) {
    console.log('信息标签携带值为', e.detail.value)
    var that = this
    this.setData({
      indexType: e.detail.value
    })
    console.log(that.data.arrayType[that.data.indexType])
    that.data.startpage = 1
    that.data.list = []
    switch (e.detail.value) {
      case "0":
        that.data.ServiceLevel = ""
        break
      case "1":
        that.data.ServiceLevel = "1"
        break
      default:
        that.data.ServiceLevel = ""
        break
    }
    that.reqData()
  }

})