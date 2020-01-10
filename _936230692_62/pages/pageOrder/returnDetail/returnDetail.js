var t = require("../../../@babel/runtime/helpers/interopRequireDefault"), e = t(require("../../../C712B902B878E4CFA174D10544396783.js")), a = t(require("../../../481D43C1B878E4CF2E7B2BC653496783.js")), r = require("../../../utils/loading.js"), n = require("../../../AD0111C0B878E4CFCB6779C705596783.js"), o = getApp();

Page({
    data: {
        orderReturnId: 0,
        orderInfo: {},
        fileDomain: "",
        leftText: "",
        rightText: "",
        statusOne: !1,
        statusTwo: !1,
        leftEvent: "",
        rightEvent: "",
        showMask: !1,
        statusBox: !1
    },
    onLoad: function(t) {
        this.setData({
            statusBarHeight: o.globalData.statusBarHeight,
            windowWidth: o.globalData.windowWidth,
            orderReturnId: t.orderReturnId,
            share: t.share ? t.share : ""
        });
    },
    onShow: function() {
        wx.getStorageSync("token") ? (this.setData({
            showLogin: !1
        }), this.getReturnDetail()) : this.setData({
            showLogin: !0
        });
    },
    getReturnDetail: function() {
        var t = this;
        (0, r.$Loading)();
        var a = this.data.orderReturnId;
        e.default.getRefundDetail(a, function(e) {
            t.checkStatus(e.data.returnStatus, e.data, e.fileDomain);
        }, function(t, e) {
            r.$Loading.hide(), 500 == t || 502 == t ? ((0, r.$Toast)({
                content: "小Q走丢了",
                duration: 0
            }), setTimeout(function() {
                r.$Toast.hide(), wx.navigateBack({
                    delta: 1
                });
            }, 1e3)) : ((0, r.$Toast)({
                content: e.data.errorMsg,
                duration: 0
            }), setTimeout(function() {
                r.$Toast.hide(), wx.navigateBack({
                    delta: 1
                });
            }, 1e3));
        });
    },
    checkStatus: function(t, e, n) {
        var o = !0, i = !1, s = !1;
        e.orderType;
        switch (t) {
          case 10:
            i = !0;
            break;

          case 20:
            i = !0, s = !0;
            break;

          case 30:
          case 40:
          case 50:
          case 60:
          case 70:
            o = !1;
        }
        e.orderReturnDetails.forEach(function(t) {
            t.price = a.default.formatPrice(t.price);
        }), e.createTime = a.default.formatAllTime(e.createTime), e.expectAmount = a.default.formatPrice(e.expectAmount), 
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: "#DD8282",
            animation: {
                duration: 0,
                timingFunc: "linear"
            }
        }), this.setData({
            statusBox: o,
            statusOne: i,
            statusTwo: s,
            orderInfo: e,
            fileDomain: n,
            showMask: !0
        }, function() {
            r.$Loading.hide(), wx.stopPullDownRefresh();
        });
    },
    returnCancel: function(t) {
        var a = this;
        wx.showModal({
            title: "提示",
            content: "撤销申请后，退款将关闭，是否撤销退款申请？",
            confirmText: "撤销",
            confirmColor: "#464646",
            cancelText: "不撤销",
            cancelColor: "#969696",
            success: function(n) {
                if (n.confirm) {
                    var o = t.currentTarget.dataset.orderreturnid;
                    (0, r.$Loading)(), e.default.refundCancel(o, function(t) {
                        if (r.$Loading.hide(), 500 == t.errorCode) return (0, r.$Toast)({
                            content: t.errorMessage,
                            duration: 2
                        }), !1;
                        (0, r.$Toast)({
                            content: "撤销申请成功",
                            duration: 0
                        }), setTimeout(function() {
                            r.$Toast.hide(), a.getReturnDetail();
                        }, 1500);
                    }, function(t, e) {
                        r.$Loading.hide(), 500 == t || 502 == t ? (0, r.$Toast)({
                            content: "小Q走丢了",
                            duration: 2
                        }) : (0, r.$Toast)({
                            content: "撤销申请失败",
                            duration: 2
                        });
                    });
                }
            }
        });
    },
    writeExpress: function(t) {
        var e = t.currentTarget.dataset.orderreturnid;
        wx.navigateTo({
            url: "/pages/pageOrder/refundExpress/refundExpress?orderReturnId=" + e
        });
    },
    onShareAppMessage: function(t) {
        return (0, n.activityShareMessage)();
    }
});