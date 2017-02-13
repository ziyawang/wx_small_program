var app = getApp()
Page({
    //基础数据
    data: {
        list: [],
        //显示加载中
        hidden: false,
        myhidden: true,
        //请求的url
        url: 'https://apis.ziyawang.com/zll/mybill?token=',
        startpage: 1,
        TypeID: null,
        ProArea: "",
        isRefresh: true,
        //params_add01: null,
        //params_add02: null,
        //params_add03: null,
        //params_add04: null,
        //用户的token
        token: "1",
    },
    //自动加载
    onLoad: function () {
        console.log("加载数据")
        this.data.isRefresh = true;
        try {
            var token = wx.getStorageSync('token')
            if (token) {
                this.data.token = token
                this.data.url = this.data.url + token
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
            myhidden: true
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
        }
        wx.request({
            url: that.data.url,
            method: 'POST',
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
            complete: function () {
                that.setData({
                    myhidden: false,
                });
            }
        })
    },
    //分享
    onShareAppMessage: function () {
        return {
            title: '标题',
            desc: '描述',
            path: '/pages/FindInfo/FindInfo'
        }
    }
})

