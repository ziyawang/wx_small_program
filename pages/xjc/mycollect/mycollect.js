var app = getApp()
Page({
    //基础数据
    data: {
        list: [],
        //显示加载中
        hidden: false,
        //请求的url
        url: 'https://apis.ziyawang.com/zll/app/collect/list',
        //第一次加载有加载动画，刷新页面没有数据加载动画
        startpage: 1,
        TypeID: null,
        ProArea: "",
        isRefresh: true,
        //用户的token
        token: null,
    },
    //自动加载
    onLoad: function () {
        console.log("加载数据")
        this.data.isRefresh = true;
        try {
            var token = wx.getStorageSync('token')
            if (token) {
                this.data.token = token
                this.loadData()
            }
        } catch (e) { }
    },
    //下拉刷新
    onPullDownRefresh: function () {
        console.log("下拉刷新")
        this.data.isRefresh = true;
        this.loadData()
    },
    //上拉加载
    onReachBottom: function () {
        this.data.isRefresh = false;
        console.log("上拉加载")
        this.loadData()
    },
    //加载数据
    loadData: function () {
        var that = this
        that.setData({
            hidden: false,
        });
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 6000
        })
        if (this.data.isRefresh) {
            that.data.startpage = 1
            that.data.list = []
        } else {
            this.data.startpage += 1
        }
        var datas = {
            startpage: that.data.startpage,
            access_token: "token",
            pagecount: "15",
            token: that.data.token,
        }
        wx.request({
            url: that.data.url,
            method: 'GET',
            data: datas,
            header: {
            },
            success: function (res) {
                wx.hideToast()
                wx.stopPullDownRefresh()
                var lists = res.data.data;
                that.data.list = that.data.list.concat(lists)
                that.setData({
                    list: that.data.list,
                    hidden: true,
                });
            },
        })
    },
    //分享
    onShareAppMessage: function () {
        return {
            title: '标题',
            desc: '描述',
            path: '/pages/FindInfo/FindInfo'
        }
    },

    bindTap: function (e) {
        var that = this
        switch (e.currentTarget.dataset.type) {
            case 1:
                wx.navigateTo({
                    url: "../../benben/details/details?id=" + e.currentTarget.dataset.id + "&type=1",
                })
                break
            case 2:
                break
            case 3:
                wx.navigateTo({
                    url: "../../benben/details/details?id=" + e.currentTarget.dataset.id + "&type=99",
                })
                break
            case 4:
                wx.navigateTo({
                    url: "../../shaxiangqun/DetailsFindService/DetailsFindService?id=" + e.currentTarget.dataset.id,
                })
                break
            default:
                break
        }
    },
})

