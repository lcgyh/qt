var t = require("../../../@babel/runtime/helpers/interopRequireDefault"), e = t(require("../../../@babel/runtime/helpers/toConsumableArray")), a = t(require("../../../481D43C1B878E4CF2E7B2BC653496783.js")), r = require("../../../C712B902B878E4CFA174D10544396783.js"), o = require("../../../utils/loading.js"), s = require("../../../AD0111C0B878E4CFCB6779C705596783.js"), i = getApp();

Page({
    data: {
        tab: [ "全部", "待付款", "待发货", "待收货", "待评价" ],
        orderList: [],
        afterList: [],
        fileDomain: "",
        statusText: "",
        statusImg: "",
        showMask: !1,
        showLogin: !1,
        page: 1,
        pageSize: 20,
        pageNum: 0,
        active: 0,
        order_type: 1
    },
    onLoad: function(t) {
        var e = t.index;
        this.setData({
            active: e,
            windowWidth: i.globalData.windowWidth,
            statusBarHeight: i.globalData.statusBarHeight,
            order_type: -1 == e ? 1 : parseInt(e) + 1
        });
    },
    onShow: function() {
        var t = this;
        this.setData({
            page: 1
        }, function() {
            setTimeout(function() {
                t.getOrderList();
            }, 500);
        });
    },
    orderChange: function(t) {
        var e = this, a = t.detail;
        console.log(a);
        var r = a.index, o = r + 1;
        this.setData({
            page: 1,
            active: r,
            order_type: o
        }, function() {
            e.getOrderList();
        });
    },
    onPullDownRefresh: function() {
        var t = this;
        this.setData({
            page: 1
        }, function() {
            t.getOrderList();
        });
    },
    timeLinsterner: function(t) {
        var e = this.data.orderList, a = t.currentTarget.dataset.index, r = new Date().getTime(), o = e[a];
        o.date = r, o.clearTimer = !0, o.statusText = "已取消", o.showPay = !1, o.iconPath = "/images/order_cancel.png", 
        o.color = "#9B9B9B", this.setData({
            orderList: e
        });
    },
    getOrderList: function() {
        (0, o.$Loading)();
        var t = this.data, e = t.active, a = t.order_type, s = t.page, i = t.pageSize;
        if (-1 == e) {
            var n = {
                page: s,
                pageSize: i
            };
            (0, r.getAfterSale)(n, this.return_callback, function(t, e) {
                o.$Loading.hide(), (0, o.$Toast)({
                    content: "小Q走丢了",
                    duration: 2
                });
            });
        } else {
            var c = {
                page: s,
                pageSize: i,
                type: a
            };
            (0, r.getOrder)(c, this.same_callback, function(t, e) {
                o.$Loading.hide(), (0, o.$Toast)({
                    content: "小Q走丢了",
                    duration: 2
                });
            });
        }
    },
    return_callback: function(t) {
        var e = t.data.list;
        e ? this.resetReturnList(e, t) : this.setData({
            pageNum: t.data.pageNum,
            fileDomain: t.fileDomain,
            orderList: [],
            titleName: "退款/售后",
            showMask: !0
        }), o.$Loading.hide(), wx.stopPullDownRefresh();
    },
    resetReturnList: function(t, a) {
        var r = this.data, o = r.orderList, s = r.page;
        r.order_type;
        t.forEach(function(t) {
            switch (t.status) {
              case 10:
              case 20:
              case 50:
              case 60:
                t.iconPath = "/images/order_wait.png", t.statusText = "售后中", t.color = "#DDC682";
                break;

              case 30:
              case 40:
                t.statusText = "退款关闭", t.iconPath = "/images/order_cancel.png", t.color = "#9B9B9B";
                break;

              case 70:
                t.statusText = "退款完成", t.iconPath = "/images/order_success.png", t.color = "#6BD5A4";
            }
        }), o = 1 == s ? t : [].concat((0, e.default)(o), (0, e.default)(t)), this.setData({
            page: s + 1,
            pageNum: a.data.pageNum,
            fileDomain: a.fileDomain,
            orderList: o,
            titleName: "退款/售后",
            showMask: !0
        });
    },
    same_callback: function(t) {
        var e = t.data.list;
        e ? this.resetList(e, t) : this.setData({
            orderList: [],
            pageNum: t.data.pageNum,
            fileDomain: t.fileDomain,
            titleName: "订单",
            showMask: !0
        }), o.$Loading.hide(), wx.stopPullDownRefresh();
    },
    resetList: function(t, r) {
        var o = this.data, s = o.orderList, i = o.page;
        t.forEach(function(t) {
            if (t.payAmount = a.default.formatPrice(t.payAmount), t.clearTimer = !0, 10 == t.orderStatus) {
                t.iconPath = "/images/order_pay.png", t.color = "#DD8282", t.showPay = !0;
                var e = new Date().getTime();
                t.date = e, t.statusText = t.timeColock - e, t.timeColock > e ? (t.showPay = !0, 
                t.clearTimer = !1, t.statusText = t.timeColock) : (t.showPay = !1, t.clearTimer = !0, 
                t.statusText = "已超时");
            } else if (20 == t.orderStatus) t.statusText = "已取消", t.iconPath = "/images/order_cancel.png", 
            t.color = "#9B9B9B"; else if (30 == t.orderStatus) t.statusText = "已取消", t.iconPath = "/images/order_cancel.png", 
            t.color = "#9B9B9B"; else if (40 == t.orderStatus) t.statusText = "待接单", t.iconPath = "/images/order_wait.png", 
            t.color = "#DDC682"; else if (41 == t.orderStatus) t.statusText = "待报关", t.iconPath = "/images/order_wait.png", 
            t.color = "#DDC682"; else if (45 == t.orderStatus) {
                switch (t.orderType) {
                  case 1:
                    t.statusText = "待取货";
                    break;

                  case 2:
                    t.statusText = "待配送";
                    break;

                  case 3:
                    t.statusText = "待发货";
                    break;

                  case 4:
                  case 5:
                  case 6:
                    t.statusText = "出库中";
                }
                t.iconPath = "/images/order_wait.png", t.color = "#DDC682";
            } else 46 == t.orderStatus ? (t.statusText = "待取货", t.iconPath = "/images/order_wait.png", 
            t.color = "#DDC682") : 50 == t.orderStatus ? (t.statusText = "已取消", t.iconPath = "/images/order_cancel.png", 
            t.color = "#9B9B9B") : 55 == t.orderStatus ? (t.statusText = "门店未接单", t.iconPath = "/images/order_cancel.png", 
            t.color = "#9B9B9B") : 60 == t.orderStatus ? (t.statusText = "门店取消", t.iconPath = "/images/order_cancel.png", 
            t.color = "#9B9B9B") : 61 == t.orderStatus ? (t.statusText = "配送中", t.iconPath = "/images/order_wait.png", 
            t.color = "#DDC682") : 62 == t.orderStatus ? (t.statusText = "配送中", t.iconPath = "/images/order_wait.png", 
            t.color = "#DDC682") : 63 == t.orderStatus ? (t.statusText = "清关中", t.iconPath = "/images/order_wait.png", 
            t.color = "#DDC682") : 64 == t.orderStatus ? (t.statusText = "已取消", t.iconPath = "/images/order_cancel.png", 
            t.color = "#9B9B9B") : 65 == t.orderStatus ? (t.statusText = "出库中", t.iconPath = "/images/order_wait.png", 
            t.color = "#DDC682") : 66 == t.orderStatus ? (t.statusText = "出库中", t.iconPath = "/images/order_wait.png", 
            t.color = "#DDC682") : 67 == t.orderStatus ? (t.statusText = "运送中", t.iconPath = "/images/order_wait.png", 
            t.color = "#DDC682") : 68 == t.orderStatus ? (t.statusText = "运送中", t.iconPath = "/images/order_wait.png", 
            t.color = "#DDC682") : 70 == t.orderStatus ? (t.statusText = "已取货", t.iconPath = "/images/order_success.png", 
            t.color = "#6BD5A4") : 80 == t.orderStatus ? (t.statusText = "已完成", t.iconPath = "/images/order_success.png", 
            t.color = "#6BD5A4") : 81 == t.orderStatus ? (t.statusText = "已取消", t.iconPath = "/images/order_cancel.png", 
            t.color = "#9B9B9B") : 82 == t.orderStatus ? (t.statusText = "已取消", t.iconPath = "/images/order_cancel.png", 
            t.color = "#9B9B9B") : 83 == t.orderStatus ? (t.statusText = "退款中", t.iconPath = "/images/order_wait.png", 
            t.color = "#DDC682") : 84 == t.orderStatus ? (t.statusText = "已取消", t.iconPath = "/images/order_cancel.png", 
            t.color = "#9B9B9B") : 85 == t.orderStatus ? (t.statusText = "待取货", t.iconPath = "/images/order_wait.png", 
            t.color = "#DDC682") : 90 == t.orderStatus ? (t.statusText = "配送中", t.iconPath = "/images/order_wait.png", 
            t.color = "#DDC682") : 91 == t.orderStatus ? (t.statusText = "配送中", t.iconPath = "/images/order_wait.png", 
            t.color = "#DDC682") : 92 == t.orderStatus ? (t.statusText = "配送中", t.iconPath = "/images/order_wait.png", 
            t.color = "#DDC682") : 93 == t.orderStatus ? (t.statusText = "配送中", t.iconPath = "/images/order_wait.png", 
            t.color = "#DDC682") : 94 == t.orderStatus ? (t.statusText = "已送达", t.iconPath = "/images/order_success.png", 
            t.color = "#6BD5A4") : 100 == t.orderStatus ? (t.statusText = "运送中", t.iconPath = "/images/order_wait.png", 
            t.color = "#DDC682") : 101 == t.orderStatus ? (t.statusText = "已完成", t.iconPath = "/images/order_success.png", 
            t.color = "#6BD5A4") : 102 == t.orderStatus && (t.statusText = "已完成", t.iconPath = "/images/order_success.png", 
            t.color = "#6BD5A4");
        }), s = 1 == i ? t : [].concat((0, e.default)(s), (0, e.default)(t)), this.setData({
            page: i + 1,
            orderList: s,
            pageNum: r.data.pageNum,
            fileDomain: r.fileDomain,
            titleName: "订单",
            showMask: !0
        });
    },
    onReachBottom: function() {
        var t = this.data;
        if (t.page > t.pageNum) return !1;
        this.getOrderList();
    },
    goDetail: function(t) {
        var e = t.currentTarget.dataset.orderid, a = t.currentTarget.dataset.virtualno, r = a || "-1";
        wx.navigateTo({
            url: "/pages/pageOrder/orderDetail/orderDetail?orderId=".concat(e, "&virtualNo=").concat(r)
        });
    },
    goBack: function() {
        wx.switchTab({
            url: "/pages/me/me"
        });
    },
    goReturnDetail: function(t) {
        var e = t.currentTarget.dataset.orderreturnid;
        t.currentTarget.dataset.orderreturndetailid;
        wx.navigateTo({
            url: "/pages/pageOrder/returnDetail/returnDetail?orderReturnId=".concat(e)
        });
    },
    goPay: function(t) {
        var e = this, a = t.currentTarget.dataset.orderid, r = t.currentTarget.dataset.virtualno;
        (0, o.$Loading)();
        var s = {
            code: "",
            orderId: a,
            virtualNo: r || "-1"
        };
        wx.login({
            success: function(t) {
                s.code = t.code, e.payBack(s);
            }
        });
    },
    payBack: function(t) {
        var e = this;
        (0, r.payOrder)(t, function(t) {
            o.$Loading.hide(), wx.requestPayment({
                timeStamp: t.data.timeStamp,
                nonceStr: t.data.nonceStr,
                package: t.data.package,
                signType: t.data.signType,
                paySign: t.data.paySign,
                success: function(t) {
                    "requestPayment:ok" == t.errMsg ? e.checkOrderStatus(orderId, virtualNo) : "requestPayment:fail cancel" == t.errMsg && console.log("用户取消支付！");
                },
                fail: function(t) {}
            });
        }, function(t, e) {
            if (o.$Loading.hide(), 500 == t) if (e.data.errorMsg.indexOf("E_600") > -1) {
                var a = e.data.errorMsg.length, r = e.data.errorMsg.slice(5, a);
                wx.showModal({
                    title: "提示",
                    content: r,
                    confirmColor: "#464646",
                    cancelColor: "#969696",
                    showCancel: !1
                });
            } else (0, o.$Toast)({
                content: "小Q走丢了",
                duration: 2
            }); else "E_500" == t && (0, o.$Toast)({
                content: e.data.message,
                duration: 2
            });
        });
    },
    checkOrderStatus: function(t, e) {
        var a = this;
        (0, o.$Loading)();
        var s = {
            orderId: t,
            returnPayType: "51",
            virtualNo: e || "-1"
        };
        (0, r.getOrderPayStatus)(s, function(t) {
            a.setData({
                page: 1
            }, function() {
                a.getOrderList();
            });
        });
    },
    onShareAppMessage: function() {
        return (0, s.activityShareMessage)();
    }
});