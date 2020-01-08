var e = require("../../../@babel/runtime/helpers/interopRequireDefault")(require("../../../481D43C1B878E4CF2E7B2BC653496783.js")), t = require("../../../B20FF1E6B878E4CFD46999E127296783.js"), o = require("../../../18B8A9E0B878E4CF7EDEC1E7E0186783.js"), s = require("../../../AD0111C0B878E4CFCB6779C705596783.js");

Page({
    data: {
        couponUnusedList: [],
        couponUserdList: [],
        couponExpiredList: [],
        showMask: !1
    },
    goHome: function() {
        wx.switchTab({
            url: "/pages/home/home"
        });
    },
    onLoad: function(e) {
        this.getCoupon();
    },
    getCoupon: function() {
        (0, o.$Loading)();
        var e = this;
        (0, t.getCoupons)(function(t) {
            var s = t.data, a = e.setList(s.couponUnusedList), i = e.setList(s.couponUserdList), n = e.setList(s.couponExpiredList);
            e.setData({
                couponUnusedList: a,
                couponUserdList: i,
                couponExpiredList: n,
                showMask: !0
            }, function() {
                o.$Loading.hide();
            });
        }, function(e, t) {
            o.$Loading.hide(), (0, o.$Toast)({
                content: "小Q走丢了",
                duration: 1.5,
                mask: !1
            });
        });
    },
    setList: function(t) {
        return t.length > 0 && t.forEach(function(t) {
            t.couponStartValidity = e.default.formatNewTime(t.couponStartValidity), t.couponEndValidity = e.default.formatNewTime(t.couponEndValidity);
        }), t;
    },
    goDetail: function(e) {
        var t = e.currentTarget.dataset.item, o = JSON.stringify(t);
        console.log(t), wx.navigateTo({
            url: "/pages/pageMe/couponDetail/couponDetail?item=" + o
        });
    },
    goUse: function(e) {
        var t = e.currentTarget.dataset.couponusescope;
        if (1 == t || 4 == t) wx.switchTab({
            url: "/pages/home/home"
        }); else if (2 == t) wx.setStorage({
            key: "goGoodsListName",
            data: "保税直邮",
            success: function(e) {
                "setStorage:ok" === e.errMsg && wx.navigateTo({
                    url: "/pages/pageHome/goodsList/goodsList?showPageType=1&type=3"
                });
            }
        }); else if (3 == t || 5 == t) {
            var o = e.currentTarget.dataset.brandid, s = e.currentTarget.dataset.brandname;
            wx.setStorage({
                key: "goGoodsListName",
                data: s,
                success: function(e) {
                    "setStorage:ok" === e.errMsg && wx.navigateTo({
                        url: "/pages/pageHome/goodsList/goodsList?showPageType=2&pdBrandId=".concat(o)
                    });
                }
            });
        }
    },
    onShareAppMessage: function(e) {
        return (0, s.activityShareMessage)();
    }
});