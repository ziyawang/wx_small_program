var app = getApp()
Page({
    //基础数据
    data: {
        array: ['不限', '资产包', '融资信息', '固定资产', '企业商账', '法拍资产', '个人债权', '处置公告'],
        index: 0,
        arrayPart: ['全国', '北京', '上海', '广东', '江苏', '浙江', '河南', '河北', '辽宁', '四川', '湖北', '湖南', '福建', '安徽', '陕西', '天津', '江西', '重庆', '吉林', '云南', '山西', '新疆', '贵州', '甘肃', '海南', '宁夏', '青海', '西藏', '黑龙江', '内蒙古', '山东', '广西'],
        indexPart: 0,
        arrayType: [
            ['抵押', '信用', '综合类', '其他', '银行', '非银行金融机构', '企业', '其他'],
            ['债权融资', '股权融资'],
            ['土地', '房产'],
            ['诉讼催收', '非诉讼催收'],
            ['土地', '房产', '汽车'],
            ['诉讼催收', '非诉讼催收'],
        ],
        indexType01: null,
        indexType02: null,
        list: [],
        //显示加载中
        hidden: false,
        myhidden: true,
        //请求的url
        url: 'https://apis.ziyawang.com/zll/project/list',
        //第一次加载有加载动画，刷新页面没有数据加载动画
        startpage: 1,
        TypeID: null,
        ProArea: "",
        isRefresh: true,
    },
    //自动加载
    onLoad: function () {
        //this.addFalseData()
        this.data.isRefresh = true;
        this.loadData()
    },
    //下拉刷新
    onPullDownRefresh: function () {
        this.data.isRefresh = true;
        this.loadData()
    },
    //上拉加载
    onReachBottom: function () {
        this.data.isRefresh = false;
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
            token: wx.getStorageSync('token'),
            TypeID: that.data.TypeID,
            ProArea: that.data.ProArea,
        }
        switch (that.data.indexType01) {
            case 0:
                switch (that.data.indexType02) {
                    case "0":
                    case "1":
                    case "2":
                    case "3":
                        datas.AssetType = that.data.arrayType[that.data.indexType01][that.data.indexType02]
                        break
                    case "4":
                    case "5":
                    case "6":
                    case "7":
                        datas.FromWhere = that.data.arrayType[that.data.indexType01][that.data.indexType02]
                        break
                    default:
                        break
                }
                break
            case 1:
                if (that.data.indexType02 == "0") {
                    datas.TypeID = "17"
                } else {
                    datas.TypeID = "6"
                }
                break
            case 2:
                if (that.data.indexType02 == "0") {
                    datas.TypeID = "16"
                } else {
                    datas.TypeID = "12"
                }
                break
            case 3:
                if (that.data.indexType02 == "0") {
                    datas.Law = "1"
                } else {
                    datas.UnLaw = "1"
                }
                break
            case 4:
                switch (that.data.indexType02) {
                    case "0":
                        datas.TypeID = "21"
                        break
                    case "1":
                        datas.TypeID = "20"
                        break
                    case "2":
                        datas.TypeID = "22"
                    default:
                        break
                }
                break
            case 5:
                if (that.data.indexType02 == "0") {
                    datas.Law = "1"
                } else {
                    datas.UnLaw = "1"
                }
                break
            default:
                break
        }
        wx.request({
            url: that.data.url,
            method: 'GET',
            data: datas,
            header: {
                'Accept': 'application/json'
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
            title: '资芽',
            desc: '全球不良资产超级综服平台',
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
        that.data.startpage = 1
        that.data.list = []
        switch (e.detail.value) {
            case "0":
                that.data.TypeID = null
                that.setData({
                    indexType01: null,
                    indexType02: null
                })
                break
            case "1":
                that.data.TypeID = "1"
                that.setData({
                    indexType01: 0,
                    indexType02: null
                })
                break
            case "2":
                that.data.TypeID = "rzxx"
                that.setData({
                    indexType01: 1,
                    indexType02: null
                })
                break
            case "3":
                that.data.TypeID = "gdzc"
                that.setData({
                    indexType01: 2,
                    indexType02: null
                })
                break
            case "4":
                that.data.TypeID = "18"
                that.setData({
                    indexType01: 3,
                    indexType02: null
                })
                break
            case "5":
                that.data.TypeID = "fpzc"
                that.setData({
                    indexType01: 4,
                    indexType02: null
                })
                break
            case "6":
                that.data.TypeID = "19"
                that.setData({
                    indexType01: 5,
                    indexType02: null
                })
                break
            case "7":
                that.data.TypeID = "czgg"
                that.setData({
                    indexType01: 6,
                    indexType02: null
                })
                break
            default:
                that.data.TypeID = null
                that.setData({
                    indexType01: null,
                    indexType02: null
                })
                break
        }
        console.log(that.data.TypeID)
        that.loadData()
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
            that.data.ProArea = ""
        } else {
            that.data.ProArea = that.data.arrayPart[e.detail.value]
        }
        console.log(that.data.ProArea)
        this.loadData()

    },
    //信息标签的选择
    bindTypePickerChange: function (e) {
        console.log('信息标签携带值为', e.detail.value)
        var that = this
        this.setData({
            indexType02: e.detail.value
        })
        console.log(that.data.arrayType[that.data.indexType01][that.data.indexType02])
        that.data.startpage = 1
        that.data.list = []
        this.loadData()
    },
    //点击事件的处理
    bindTap: function (e) {
        var that = this
        console.log(e.currentTarget.dataset.id)
        console.log(e.currentTarget.dataset.type)
        console.log(e.currentTarget.dataset.member)
        console.log(e.currentTarget.dataset.price)
        console.log(e.currentTarget.dataset.userid)
        console.log(e.currentTarget.dataset.payflag)
        console.log(e.currentTarget.dataset.index)
        //1、判断是否是登陆，还未登陆跳转到登陆页面，否则进行下一步步
        if (!wx.getStorageSync('isLogin')) {
            that.jumpLogin()
        } else {
            //2、判断信息的类型，是否是收费资源 ,或者是不是处置公告  ，不是直接进去详情页面，否则进行下一步
            if (e.currentTarget.dataset.member == '0' || e.currentTarget.dataset.type == '99') {
                that.jumpDetails(e.currentTarget.dataset.id, e.currentTarget.dataset.type)
            } else {
                //3、判断是不是此条信息类型的会员 ，是进入详情页面，否则下一步 
                if (that.isMember(e.currentTarget.dataset.type)) {
                    that.jumpDetails(e.currentTarget.dataset.id, e.currentTarget.dataset.type)
                } else {
                    //4、请求authme接口 ，拿到自己的余额、userid、role，
                    that.loadAuthMeData(e.currentTarget.dataset.userid, e.currentTarget.dataset.id, e.currentTarget.dataset.type, e.currentTarget.dataset.member, e.currentTarget.dataset.price, e.currentTarget.dataset.payflag, e.currentTarget.dataset.index)
                }
            }
        }

    },
    //添加假数据
    // addFalseData: function () {
    //     // wx.setStorageSync('isLogin', true)
    //     //wx.setStorageSync('right', "1,6,,12,16,17,18,19,20,21,22")
    //     //wx.clearStorageSync() 
    //     // wx.setStorageSync('token', "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NzkiLCJpc3MiOiJodHRwOlwvXC9hcGkueml5YXdhbmcuY29tXC92MVwvYXV0aFwvbG9naW4iLCJpYXQiOiIxNDgzOTMxNjM1IiwiZXhwIjoiMjExNDY1MTYzNSIsIm5iZiI6IjE0ODM5MzE2MzUiLCJqdGkiOiJhY2VkY2M5MGY1MzNiNDZiYzUzZTNjMmE3YzJlYmZlOSJ9.baeXtK11ZNf4tV2XW3LMniOBfJ0NQkLSOdNdQbPecQE")
    // },
    //跳转到登录页面
    jumpLogin: function () {
        wx.navigateTo({
            url: '../../xjc/login/login'
        })
    },
    //跳转到服务方认证页面
    jumpConfirm: function () {
        wx.navigateTo({
            url: '../../lds/confirm/confirm'
        })
    },
    //跳转到详情页面
    jumpDetails: function (param1, param2) {
        wx.navigateTo({
            url: "../details/details?id=" + param1 + "&type=" + param2
        })
    },
    //判断是不是会员
    isMember: function (typeId) {
        var right = wx.getStorageSync('right')
        var rightArr = new Array()
        rightArr = right.split(',')
        return rightArr.indexOf(typeId) > -1
    },
    //请求authme接口 ，拿到自己的余额、userid、role
    loadAuthMeData: function (userid, id, typeid, member, price, payFlag, index) {
        var that = this
        wx.request({
            url: 'https://apis.ziyawang.com/zll/auth/me' + '?token=' + wx.getStorageSync('token'),
            data: {
                access_token: "token",
            },
            method: 'POST',
            success: function (res) {
                //判断是否是自己发出的信息，是跳转到详情页面你，否则判断其他信息 
                if (res.data.user.userid == userid) {
                    that.jumpDetails(id, typeid)
                } else {
                    //5、判断role是否是1 ，不是提示先进行服务方认证，否进行下一步
                    if (res.data.role != '1') {
                        that.jumpConfirm()
                    } else {
                        //6、判断该条信息是否是收费信息、是进行购买此条信息，成功后跳转到详情页面,否，提示此条信息只有会员可以查看
                        if (member == 2) {
                            //7、是否购买过,
                            if (payFlag == '1') {
                                that.jumpDetails(id, typeid)
                            } else {
                                wx.showModal({
                                    title: '余额：' + res.data.user.Account + "芽币",
                                    content: '您需消耗' + price + "芽币，查看信息详情。",
                                    success: function (res) {
                                        if (res.confirm) {
                                            //去购买
                                            that.toBuy(id, typeid, index)
                                        }
                                    }
                                })
                            }
                        } else {
                            wx.showModal({
                                showCancel: false,
                                title: '温馨提示',
                                content: '本条VIP信息只针对会员免费开放，详情请咨询会员专线：010-56052557',
                            })
                        }
                    }
                }
            }
        })
    },
    //购买此条信息
    toBuy: function (id, typeid, index) {
        var that = this
        var ind = parseInt(index)
        wx.request({
            url: 'https://apis.ziyawang.com/zll/app/consume' + '?token=' + wx.getStorageSync('token'),
            data: {
                access_token: "token",
                ProjectID: id
            },
            method: 'POST',
            success: function (res) {
                console.log(res)
                switch (res.data.status_code) {
                    case "200":
                        that.data.list[ind].PayFlag = 1
                        that.setData({
                            list: that.data.list
                        })
                        wx.showToast({
                            title: "购买成功。"
                        })
                        that.jumpDetails(id, typeid)
                        break;
                    case "416":
                        wx.showToast({
                            title: "非收费信息"
                        })
                        break;
                    case "417":
                        wx.showToast({
                            title: "您已经支付过该条信息"
                        })
                        that.jumpDetails(id, typeid)
                        break;
                    case "418":
                        wx.showModal({
                            confirmText: '充值',
                            title: '温馨提示',
                            content: '余额不足，请充值',
                            success: function (res) {
                                if (res.confirm) {
                                    //去充值
                                    that.jumpRecharge()
                                }
                            }
                        })
                        break;
                    default:
                        break;
                }
            },
            fail: function (res) {
                wx.showToast({
                    title: "购买失败。"
                })
            }
        })
    },
    //跳转到充值页面
    jumpRecharge: function () {
        wx.navigateTo({
            url: '../../xuyingjun/recharge/recharge'
        })
    },
})

