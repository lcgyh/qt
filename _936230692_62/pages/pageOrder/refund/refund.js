var t = require("../../../C712B902B878E4CFA174D10544396783.js"), e = require("../../../18B8A9E0B878E4CF7EDEC1E7E0186783.js"), a = require("../../../AD0111C0B878E4CFCB6779C705596783.js"), n = getApp();

Page({
    data: {
        formIdList: [],
        reason: ""
    },
    onLoad: function(t) {
        var e = n.globalData.isIphoneX;
        this.setData({
            isIphoneX: e,
            orderId: t.orderId
        });
    },
    refund: function(t) {
        var e = t.currentTarget.dataset.clicktype, a = this.data.formIdList;
        a.push(t.detail.formId), this.setData({
            formIdList: a
        }), 0 == e && this.refundAjax();
    },
    refundAjax: function() {
        var a = this.data, n = {
            orderId: a.orderId,
            returnReason: a.reason,
            formIdList: a.formIdList.join(",")
        };
        if ("" == n.returnReason || null == n.returnReason) return (0, e.$Toast)({
            content: "请选择退款原因",
            duration: 1.5,
            mask: !1
        }), !1;
        (0, e.$Loading)(), (0, t.refundApply)(n, function(t) {
            e.$Loading.hide(), (0, e.$Toast)({
                content: "退款申请成功",
                duration: 0,
                mask: !1
            }), setTimeout(function() {
                e.$Toast.hide(), wx.navigateBack({
                    delta: 1
                });
            }, 1500);
        }, function(t, a) {
            e.$Loading.hide(), 500 == t || 502 == t ? (0, e.$Toast)({
                content: "小Q走丢了",
                duration: 2,
                mask: !1
            }) : (0, e.$Toast)({
                content: "申请退款失败，请稍后再试",
                duration: 2,
                mask: !1
            });
        });
    },
    radioChange: function(t) {
        var e = t.detail;
        this.setData({
            reason: e.value
        });
    },
    onShareAppMessage: function(t) {
        return (0, a.activityShareMessage)();
    }
});