var e = require("../../../@babel/runtime/helpers/interopRequireDefault")(require("../../../481D43C1B878E4CF2E7B2BC653496783.js")), o = require("../../../3AB1A716B878E4CF5CD7CF11DFE86783.js"), t = require("../../../18B8A9E0B878E4CF7EDEC1E7E0186783.js"), a = require("../../../AD0111C0B878E4CFCB6779C705596783.js");

Page({
    data: {
        signNumber: 0,
        realGoodsList: [],
        realCouponList: [],
        showSuccess: !1,
        showMask: !1,
        showPreviewImg: !1,
        previewImgUrl: null
    },
    onLoad: function(e) {},
    showPreviewImg: function(e) {
        if (1 == e.currentTarget.dataset.type) {
            var o = e.currentTarget.dataset.imgurl;
            this.setData({
                previewImgUrl: o + "?x-oss-process=image/resize,m_lfit,w_600,h_0/quality,q_100",
                showPreviewImg: !0
            });
        }
    },
    hidePreviewImg: function() {
        this.setData({
            showPreviewImg: !1
        });
    },
    onShow: function() {
        (0, t.$Loading)(), this.exchangeGiftList();
    },
    exchangeGiftList: function() {
        var a = this;
        (0, o.getExchangeList)(function(o) {
            var n = o.data.productList;
            n.forEach(function(o) {
                o.price = e.default.formatPrice(o.price);
            }), a.setData({
                fileDomain: o.fileDomain,
                exchangeList: n,
                signNumber: o.data.user,
                showMask: !0
            }, function() {
                t.$Loading.hide(), wx.stopPullDownRefresh();
            });
        });
    },
    exchangeEvent: function(e) {
        var o = e.currentTarget.dataset.presentstatus;
        if (0 != o && 3 != o) {
            var t = e.currentTarget.dataset.index, a = this.data.exchangeList, n = a[t].type;
            1 == o ? this.goExchangeDetail(a[t]) : 2 == o && (1 == n ? this.exchangeGoods(a[t]) : 2 == n && this.exchangeCoupon(a[t]));
        }
    },
    exchangeCoupon: function(e) {
        var a = this;
        wx.showModal({
            title: "兑换确认",
            content: "您确定要使用".concat(e.valueQty, "Q兔徽章兑换‘").concat(e.name, "’优惠券吗？"),
            confirmColor: "#464646",
            confirmText: "确定",
            cancelText: "我再看看",
            cancelColor: "#969696",
            success: function(n) {
                if (n.confirm) {
                    (0, t.$Loading)();
                    var i = {
                        couponId: e.couponId,
                        couponCode: e.couponCode,
                        valueQty: e.valueQty
                    };
                    (0, o.exchangeGiftCoupon)(i, function(o) {
                        t.$Loading.hide(), a.exchangeGiftList(), 1 == o.data.giveCouponCode ? a.setData({
                            couponSuccessName: e.name,
                            showSuccess: !0
                        }) : 2 == o.data.giveCouponCode ? wx.showModal({
                            content: "徽章不足哦，换个奖品兑换吧",
                            confirmColor: "#464646",
                            cancelColor: "#969696",
                            confirmText: "确定",
                            showCancel: !1
                        }) : 3 == o.data.giveCouponCode ? wx.showModal({
                            content: "哎呀，下手慢了，奖品已兑完，换个奖品兑换吧",
                            confirmColor: "#464646",
                            cancelColor: "#969696",
                            confirmText: "确定",
                            showCancel: !1
                        }) : 4 == o.data.giveCouponCode && wx.showModal({
                            content: "您已兑换过这个奖品哦，换个奖品兑换吧",
                            confirmColor: "#464646",
                            cancelColor: "#969696",
                            confirmText: "确定",
                            showCancel: !1
                        });
                    });
                }
            }
        });
    },
    exchangeGoods: function(e) {
        var o = JSON.stringify(e), t = this.data.fileDomain;
        wx.setStorage({
            key: "exchangeRealGoodsInfo",
            data: o,
            success: function(e) {
                "setStorage:ok" === e.errMsg && wx.navigateTo({
                    url: "/pages/pageActivity/exchangeCheck/exchangeCheck?fileDomain=" + t
                });
            }
        });
    },
    goExchangeDetail: function(e) {
        var o = e.type, t = 1 == o ? e.pdSpuActiveId : e.couponId;
        wx.navigateTo({
            url: "/pages/pageActivity/exchangeDetail/exchangeDetail?type=".concat(o, "&presentId=").concat(t)
        });
    },
    showSuccess: function() {
        this.setData({
            showSuccess: !this.data.showSuccess
        });
    },
    goHome: function() {
        wx.switchTab({
            url: "/pages/home/home"
        });
    },
    onPullDownRefresh: function() {
        (0, t.$Loading)(), this.exchangeGiftList();
    },
    onShareAppMessage: function() {
        return (0, a.activityShareMessage)();
    }
});