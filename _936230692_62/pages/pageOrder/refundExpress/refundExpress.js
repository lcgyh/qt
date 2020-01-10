var e = require("../../../utils/loading.js"), t = require("../../../C712B902B878E4CFA174D10544396783.js"), r = require("../../../AD0111C0B878E4CFCB6779C705596783.js");

Page({
    data: {
        orderReturnId: 0
    },
    onLoad: function(e) {
        this.setData({
            orderReturnId: e.orderReturnId
        });
    },
    formSubmit: function(r) {
        var n = r.detail, a = {
            orderReturnId: this.data.orderReturnId,
            expressCompanyStr: n.value.company,
            expressNo: n.value.expressNum
        };
        if ("" == a.expressCompanyStr || null == a.expressCompanyStr) return (0, e.$Toast)({
            content: "请填写快递公司",
            duration: 1.5,
            mask: !1
        }), !1;
        if ("" == a.expressNo || null == a.expressNo) return (0, e.$Toast)({
            content: "请填写快递单号",
            duration: 1.5,
            mask: !1
        }), !1;
        if (!/[0-9A-Za-z]{8,20}$/.test(a.expressNo)) return (0, e.$Toast)({
            content: "请填写正确的快递单号",
            duration: 1.5,
            mask: !1
        }), !1;
        (0, e.$Loading)(), (0, t.refundExpress)(a, function(t) {
            e.$Loading.hide(), (0, e.$Toast)({
                content: "填写快递单号成功",
                duration: 0,
                mask: !1
            }), setTimeout(function() {
                e.$Toast.hide(), wx.navigateBack({
                    delta: 1
                });
            }, 1500);
        }, function(t) {
            e.$Loading.hide(), 500 == t || 502 == t ? (0, e.$Toast)({
                content: "小Q走丢了",
                duration: 2,
                mask: !1
            }) : (0, e.$Toast)({
                content: "填写快递单号失败",
                duration: 2,
                mask: !1
            });
        });
    },
    onShareAppMessage: function(e) {
        return (0, r.activityShareMessage)();
    }
});