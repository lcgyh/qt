var e = require("../../../@babel/runtime/helpers/interopRequireDefault"), t = require("../../../3AB1A716B878E4CF5CD7CF11DFE86783.js"), a = e(require("../../../481D43C1B878E4CF2E7B2BC653496783.js")), i = require("../../../AD0111C0B878E4CFCB6779C705596783.js"), r = require("../../../18B8A9E0B878E4CF7EDEC1E7E0186783.js"), o = getApp();

Page({
    data: {
        showMask: !1,
        type: null,
        receive: null,
        product: null
    },
    onLoad: function(e) {
        var t = this, a = e.type, i = e.presentId;
        this.setData({
            type: a,
            presentId: i,
            statusBarHeight: o.globalData.statusBarHeight,
            windowWidth: o.globalData.windowWidth
        }, function() {
            t.getExchangeDetail();
        });
    },
    goBack: function() {
        wx.getStorageSync("backHome") ? (wx.switchTab({
            url: "/pages/home/home"
        }), wx.removeStorageSync("backHome")) : wx.navigateBack({
            delta: 1
        });
    },
    getExchangeDetail: function() {
        var e = this;
        (0, r.$Loading)();
        var i = this.data, o = {
            presentType: i.type,
            presentId: i.presentId
        };
        (0, t.checkExchangeDetail)(o, function(t) {
            var i = t.data.address, o = t.data.coupon, n = t.data.product;
            n && (n.createTime = a.default.formatAllTime(n.createTime)), o && (o.createTime = a.default.formatAllTime(o.createTime), 
            o.couponValidDate = a.default.formatAllTime(o.couponValidDate)), e.setData({
                receive: i,
                coupon: o,
                product: n,
                fileDomain: t.fileDomain,
                showMask: !0
            }, function() {
                r.$Loading.hide();
            });
        });
    },
    goHome: function() {
        wx.switchTab({
            url: "/pages/home/home"
        });
    },
    onShareAppMessage: function(e) {
        return (0, i.activityShareMessage)();
    }
});