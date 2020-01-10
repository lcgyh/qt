var e = require("../../../@babel/runtime/helpers/interopRequireDefault"), t = require("../../../C4DDA123B878E4CFA2BBC924B8096783.js"), o = require("../../../utils/loading.js"), i = e(require("../../../481D43C1B878E4CF2E7B2BC653496783.js")), a = require("../../../AD0111C0B878E4CFCB6779C705596783.js");

Page({
    data: {
        showMask: !1,
        couponList: []
    },
    onLoad: function(e) {
        var t = this;
        wx.getStorage({
            key: "chooseCouponSpuList",
            success: function(e) {
                if ("getStorage:ok" === e.errMsg) {
                    var o = JSON.parse(e.data);
                    t.setData({
                        spuList: o
                    }, function() {
                        t.getCoupon(), wx.removeStorageSync("chooseCouponSpuList");
                    });
                }
            }
        });
    },
    getCoupon: function() {
        (0, o.$Loading)();
        var e = this, i = this.data.spuList;
        (0, t.getCouponsByData)({
            spuList: i
        }, function(t) {
            var i = e.setList(t.data.couponList);
            e.setData({
                couponList: i,
                showMask: !0
            }, function() {
                o.$Loading.hide();
            });
        });
    },
    setList: function(e) {
        return e.length > 0 && e.forEach(function(e) {
            e.couponStartValidity = i.default.formatNewTime(e.couponStartValidity), e.couponEndValidity = i.default.formatNewTime(e.couponEndValidity);
        }), e;
    },
    useCoupon: function(e) {
        var t = e.currentTarget.dataset.item, o = {
            couponId: t.couponUserId,
            couponMoney: t.couponMoney,
            price: t.price
        }, i = JSON.stringify(o);
        wx.setStorage({
            key: "couponInfo",
            data: i,
            success: function(e) {
                "setStorage:ok" === e.errMsg && wx.navigateBack({
                    delta: 1
                });
            }
        });
    },
    onShareAppMessage: function(e) {
        return (0, a.activityShareMessage)();
    }
});