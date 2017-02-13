var util = require('../../../utils/util/util.js');
var app = getApp()
Page({
  data: {
    date: "",
    describe: "",
    lists: "",
    Lists: "",
    areas: [
      { name: '全国', value: '全国' },
      { name: '北京', value: '北京' },
      { name: '上海', value: '上海' },
      { name: '广东', value: '广东' },
      { name: '江苏', value: '江苏' },
      { name: '浙江', value: '浙江' },
      { name: '河南', value: '河南' },
      { name: '河北', value: '河北' },
      { name: '辽宁', value: '辽宁' },
      { name: '四川', value: '四川' },
      { name: '湖北', value: '湖北' },
      { name: '湖南', value: '湖南' },
      { name: '福建', value: '福建' },
      { name: '安徽', value: '安徽' },
      { name: '陕西', value: '陕西' },
      { name: '天津', value: '天津' },
      { name: '江西', value: '江西' },
      { name: '重庆', value: '重庆' },
      { name: '吉林', value: '吉林' },
      { name: '云南', value: '云南' },
      { name: '山西', value: '山西' },
      { name: '新疆', value: '新疆' },
      { name: '贵州', value: '贵州' },
      { name: '甘肃', value: '甘肃' },
      { name: '海南', value: '海南' },
      { name: '宁夏', value: '宁夏' },
      { name: '青海', value: '青海' },
      { name: '西藏', value: '西藏' },
      { name: '黑龙江', value: '黑龙江' },
      { name: '内蒙古', value: '内蒙古' },
      { name: '山东', value: '山东' },
      { name: '广西', value: '广西' },
    ],
    items: [
      { name: '01', value: '收购资产包' },
      { name: '02', value: '委外催收' },
      { name: '03', value: '法律服务' },
      { name: '12', value: '收购固产' },
      { name: '06', value: '投融资服务' },
    ],
    provinceArray: [],
    cityArray: [],
    provinceIndex: 0,
    cityIndex: 0,
    checked: false,
    role: "",
    tempFilePaths: [],


  },
  ProID: '',
  CityID: '',
  cityArrayDemo: [],


  onLoad: function (options) {
    // Do some initialize when page load.
    var that = this;
    var provinceArrayDemo = []
    for (var i = 0; i < util.provinceArray.length; ++i) {
      var item = util.provinceArray[i]
      provinceArrayDemo.push(item.name)
    }
    var roles = wx.getStorageSync("role");
    var token = wx.getStorageSync("token");
    wx.request({
      url: 'https://apis.ziyawang.com/zll/auth/me?token=' + token,
      data: {
        access_token: 'token',
      },
      header: {
        'content-type': 'application/json'
      },
      method: "POST",
      success: function (res) {
        console.log(res.data);
        var Lists = res.data.service;
        that.setData({
          provinceArray: provinceArrayDemo,
          role: roles,
          lists: Lists,
          date:Lists.RegTime,
        })
      },
      fail: function (res) {
        console.log(res.data)
      }
    })

  },

  bindProvinceChange: function (e) {

    //先取省份里面的 ProID
    for (var i = 0; i < util.provinceArray.length; ++i) {
      var item = util.provinceArray[i]
      if (i == e.detail.value) {
        this.ProID = item.ProID
        break
      }
    }
    this.cityArrayDemo = []
    //将城市里面里面的 ProID 组合在一起
    for (var i = 0; i < util.cityArray.length; ++i) {
      var item = util.cityArray[i]
      if (item.ProID == this.ProID) {
        this.cityArrayDemo.push(item.name)
      }
    }
    this.setData({
      provinceIndex: e.detail.value,
      cityArray: this.cityArrayDemo,
    })
    // this.CityID = ''
  },
  bindCityChange: function (e) {
    //先取市里面的 ProID
    //  console.log(cityArray)

    for (var j = 0; j < util.cityArray.length; ++j) {
      var item = util.cityArray[j]
      if (item.name == this.cityArrayDemo[e.detail.value]) {
        this.CityID = item.CityID
        break
      }
    }
    //将城市里面里面的 ProID 组合在一起

    this.setData({
      cityIndex: e.detail.value,
      countyIndex: 0
    })
  },
  bindDateChange: function (e) {
    console.log(e);
    this.setData({
      date: e.detail.value
    })
  },
  bindTextAreaBlur: function (e) {
    console.log(e)
    // console.log(e.detail.value)
    this.setData({
      describe: e.detail.value
    })
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  checkboxChangeArea: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    var areas = e.detail.value;
    var res = areas.indexOf("全国");
    console.log(res);
    if (res >= 0) {
      this.setData({
        checked: false
      })
    }

  },
  formSubmit: function (e) {
    console.log(e.detail.value)
    var result = e.detail.value;
    result.ConfirmationP1 = wx.getStorageSync('tempFilePaths');
    var auth = true;
    for (var i in result) {
      var obj = result[i];
      if (obj == "") {
        wx.showModal({
          title: '提示',
          content: '请您将认证信息填写完整',
        })
        auth = false;
        return;
      }
    };
    if (!auth) {
      return;
    }
    var ConnectPerson = result.ConnectPerson;
    var ConnectPhone = result.ConnectPhone;
    var Founds = result.Founds;
    var RegTime = result.RegTime;
    var ServiceIntroduction = result.ServiceIntroduction;
    var ServiceName = result.ServiceName;
    var Size = result.Size;
    var serviceArea = result.ServiceArea;
    var province = result.province;
    var city = result.city;
    var serviceType = result.ServiceType;
    var ServiceLocation = province + "-" + city;
    var ServiceType = serviceType.join(",");
    var ServiceArea = serviceArea.join(" ");
    var token = wx.getStorageSync("token");
    var tempFilePaths = wx.getStorageSync('tempFilePaths');
    for (var I in tempFilePaths) {
      wx.uploadFile({
        url: "https://apis.ziyawang.com/zll/app/service/reconfirm?token=" + token,
        filePath: tempFilePaths[0],
        name: 'ConfirmationP1',
        formData: {
          access_token: 'token',
          ConnectPerson: ConnectPerson,
          ConnectPhone: ConnectPhone,
          Founds: Founds,
          RegTime: RegTime,
          ServiceIntroduction: ServiceIntroduction,
          ServiceName: ServiceName,
          Size: Size,
          ServiceType: ServiceType,
          ServiceLocation: ServiceLocation,
          ServiceArea: ServiceArea
        },
        success: function (res) {
          var data = res.data
          wx.setStorageSync('tempFilePaths', '');
          console.log(data);
          //do something
          wx.showToast({
            title: "服务方认证成功"
          })
          wx.switchTab({
            url: '../../xjc/user/user'
          })
        }
      })
    }
  },
  bindChooseImage: function () {
    var _that = this
    if (_that.data.tempFilePaths.length < 1) {
      wx.chooseImage({
        count: 1, // 最多可以选择的图片张数，默认9
        sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function (res) {
          // success
          var tempFilePaths = _that.data.tempFilePaths.concat(res.tempFilePaths)
          console.log(tempFilePaths)
          _that.setData({
            tempFilePaths: tempFilePaths
          })
          wx.setStorageSync('tempFilePaths', tempFilePaths);
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    }
  },
   deleteImg:function(){
    var _that=this;
   wx.setStorageSync('tempFilePaths', "");
      _that.setData({
            tempFilePaths: [],
          })
     }
})