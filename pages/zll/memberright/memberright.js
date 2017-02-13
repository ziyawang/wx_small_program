// pages/memberright/index.js
Page({
  data: {
    payList: null,
    payName: null
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    switch (options.memberName) {
      case "资产包":
        var payList = [['月度会员', 6498], ['年度会员', 70000]]
        this.setData({
          payList: payList,
          payName: "资产包"
        })
        break;
      case "企业商账":
        var payList = [['季度会员', 1498], ['年度会员', 4998]]
        this.setData({
          payList: payList,
          payName: "企业商账"
        })
        break;
      case "固定资产":
        var payList = [['月度会员', 6498], ['年度会员', 70000]]
        this.setData({
          payList: payList,
          payName: "固定资产"
        })
        break;
      case "融资信息":
        var payList = [['季度会员', 998], ['年度会员', 2998]]
        this.setData({
          payList: payList,
          payName: "融资信息"
        })
        break;
      case "个人债权":
        var payList = [['季度会员', 998], ['年度会员', 2998]]
        this.setData({
          payList: payList,
          payName: "个人债权"
        })
        break;
    }
  },
})