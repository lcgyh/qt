var e = require("../../../B20FF1E6B878E4CFD46999E127296783.js"), o = require("../../../481D43C1B878E4CF2E7B2BC653496783.js"), t = require("../../../18B8A9E0B878E4CF7EDEC1E7E0186783.js"), n = require("../../../AD0111C0B878E4CFCB6779C705596783.js"), a = getApp();

Page({
    data: {
        shopInfo: {},
        showMask: !1
    },
    onLoad: function(e) {
        this.getShopInfo();
    },
    getShopInfo: function(o) {
        var n = this;
        (0, t.$Loading)(), wx.getLocation({
            altitude: !0,
            complete: function(o) {
                var a = "", i = "";
                "getLocation:ok" === o.errMsg && (a = o.latitude, i = o.longitude);
                var s = {
                    lat: a,
                    lng: i
                };
                (0, e.getShopDetail)(s, function(e) {
                    if (!e.data) return t.$Loading.hide(), void (0, t.$Toast)({
                        content: "获取数据为空",
                        duration: 1
                    });
                    var o = e.data, a = o.shopDistance ? o.shopDistance : -1;
                    a = a < 0 ? "未知" : a.toFixed(2) + "km", o.shopDistance = a, n.setData({
                        shopInfo: o,
                        showMask: !0
                    }, function() {
                        t.$Loading.hide();
                    });
                }, function() {
                    t.$Loading.hide(), (0, t.$Toast)({
                        content: "小Q走丢了",
                        duration: 1
                    });
                });
            }
        });
    },
    connect: function() {
        var e = this.data.shopInfo.telephone;
        a.globalData.system.indexOf("Android") > -1 ? wx.showModal({
            title: "提示",
            content: e,
            confirmColor: "#464646",
            cancelColor: "#969696",
            success: function(o) {
                o.confirm && wx.makePhoneCall({
                    phoneNumber: e
                });
            }
        }) : wx.makePhoneCall({
            phoneNumber: e
        });
    },
    goShopAddress: function() {
        var e = this.data.shopInfo, t = (0, o.bd09Togcj02)(e.lng, e.lat);
        wx.openLocation({
            latitude: t[1],
            longitude: t[0],
            name: e.name,
            address: e.address,
            scale: 28
        });
    },
    onShareAppMessage: function(e) {
        return (0, n.activityShareMessage)();
    }
});