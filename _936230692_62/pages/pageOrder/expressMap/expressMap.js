var e = require("../../../C712B902B878E4CFA174D10544396783.js"), t = require("../../../18B8A9E0B878E4CF7EDEC1E7E0186783.js"), a = require("../../../481D43C1B878E4CF2E7B2BC653496783.js"), i = require("../../../AD0111C0B878E4CFCB6779C705596783.js"), r = getApp();

Page({
    data: {
        lat: 0,
        lng: 0,
        latitude: 0,
        longitude: 0,
        markers: [],
        showMask: !1,
        stateText: "",
        orderMark: "",
        name: "",
        mobile: "",
        url: ""
    },
    onLoad: function(e) {
        var t = this;
        this.setData({
            receiveLat: e.receiveLat,
            receiveLng: e.receiveLng,
            shopLat: e.shopLat,
            shopLng: e.shopLng,
            orderId: e.orderId
        }, function() {
            t.getManPosition();
        });
    },
    getManPosition: function() {
        var i = this;
        (0, t.$Loading)();
        var r = this.data, o = r.orderId, n = r.receiveLat, s = r.receiveLng, d = r.shopLat, c = r.shopLng;
        (0, e.getExpressManPositon)(o, function(e) {
            if (e.data.sfLatestPositionRes) {
                var r = e.data.sfLatestPositionRes, o = e.data.orderStatus, h = null == e.data.orderMark ? "" : e.data.orderMark, u = (0, 
                a.bd09Togcj02)(r.rider_lng, r.rider_lat), l = (0, a.bd09Togcj02)(s, n), g = (0, 
                a.bd09Togcj02)(c, d), p = "", m = [], L = {
                    id: 1,
                    iconPath: "/images/sender.png",
                    width: 40,
                    height: 40,
                    title: r.rider_name,
                    latitude: u[1],
                    longitude: u[0]
                }, f = {
                    id: 2,
                    iconPath: "/images/user_get.png",
                    width: 40,
                    height: 40,
                    title: "收货地址",
                    latitude: l[1],
                    longitude: l[0]
                }, k = {
                    id: 3,
                    iconPath: "/images/user_send.png",
                    width: 40,
                    height: 40,
                    title: "门店地址",
                    latitude: g[1],
                    longitude: g[0]
                };
                switch (m.push(L), m.push(f), m.push(k), o) {
                  case 90:
                    p = "门店召唤骑士";
                    break;

                  case 91:
                    p = "骑士接单";
                    break;

                  case 92:
                    p = "骑士到店";
                    break;

                  case 93:
                    p = "骑士配送中";
                    break;

                  case 94:
                    p = "订单已完成";
                }
                i.setData({
                    noPostion: 0,
                    markers: m,
                    latitude: r.rider_lat,
                    longitude: r.rider_lng,
                    name: r.rider_name,
                    mobile: r.rider_phone,
                    stateText: p,
                    orderMark: h,
                    showMask: !0
                }, function() {
                    t.$Loading.hide();
                });
            } else i.setData({
                noPostion: 1,
                showMask: !0
            }, function() {
                t.$Loading.hide();
            });
        });
    },
    refreshMap: function() {
        this.getManPosition();
    },
    contact: function(e) {
        var t = e.currentTarget.dataset.mobile;
        r.globalData.system.indexOf("Android") > -1 ? wx.showModal({
            title: "提示",
            content: t,
            confirmColor: "#464646",
            cancelColor: "#969696",
            success: function(e) {
                e.confirm && wx.makePhoneCall({
                    phoneNumber: t
                });
            }
        }) : wx.makePhoneCall({
            phoneNumber: t
        });
    },
    onShareAppMessage: function(e) {
        return (0, i.activityShareMessage)();
    }
});