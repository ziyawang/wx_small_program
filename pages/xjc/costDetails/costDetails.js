Page({
  data: {
    Type: null,
    Money: null,
    created_at: null,
    Operates: null,
    OrderNumber: null
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    console.log(options)
    this.setData({
      Type: options.Type,
      Money: options.Money,
      created_at: options.created_at,
      Operates: options.Operates,
      OrderNumber: options.OrderNumber
    })
  },
})