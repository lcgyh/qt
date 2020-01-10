var e = require("../../../B20FF1E6B878E4CFD46999E127296783.js"), t = require("../../../utils/loading.js"), s = require("../../../AD0111C0B878E4CFCB6779C705596783.js"), a = getApp();

Page({
    data: {
        addressList: [],
        send_type: "",
        receiveId: "",
        showMask: !1
    },
    onLoad: function(e) {
        var t = this, s = a.globalData.isIphoneX;
        this.setData({
            send_type: e.send_type,
            receiveId: e.receiveId,
            isIphoneX: s
        }, function() {
            t.getAddressList();
        });
    },
    pickAddress: function(e) {
        var t = e.currentTarget.dataset.index, s = this.data.addressList, a = e.currentTarget.dataset.distanceover, d = this.data.send_type;
        if (1 != a || 2 != d) {
            var r = JSON.stringify(s[t]);
            wx.setStorage({
                key: "addressInfo",
                data: r,
                success: function(e) {
                    "setStorage:ok" === e.errMsg && wx.navigateBack({
                        delta: 1
                    });
                }
            });
        }
    },
    goAddAddress: function() {
        wx.navigateTo({
            url: "/pages/pageMe/addAddress/addAddress"
        });
    },
    onShow: function() {
        1 == wx.getStorageSync("refresh") && (this.getAddressList(), wx.removeStorageSync("refresh"));
    },
    getAddressList: function() {
        var s = this;
        (0, t.$Loading)();
        var a = this.data.send_type;
        (0, e.getReceiveAddress)(function(e) {
            var d = [];
            if (1 == a) e.data.forEach(function(e) {
                0 == e.defaultFlg && (e.myDefault = !0);
            }), d = e.data; else if (2 == a) {
                var r = [], i = [];
                e.data.forEach(function(e) {
                    0 == e.distanceOver ? (0 == e.defaultFlg && (e.myDefault = !0), r.push(e)) : 1 == e.distanceOver && (0 == e.defaultFlg && (e.showGrid = !0), 
                    i.push(e));
                }), i.length > 0 && (i[0].noTitle = "即时配送仅支持5km内订单，以下地址超出配送范围"), d = [].concat(r, i);
            }
            s.setData({
                showMask: !0,
                addressList: d
            }, function() {
                t.$Loading.hide();
            });
        });
    },
    edit: function(e) {
        var t = e.currentTarget.dataset.index, s = this.data.addressList, a = JSON.stringify(s[t]);
        wx.setStorage({
            key: "info",
            data: a,
            success: function(e) {
                "setStorage:ok" === e.errMsg && wx.navigateTo({
                    url: "/pages/pageMe/addAddress/addAddress"
                });
            }
        });
    },
    onShareAppMessage: function(e) {
        return (0, s.activityShareMessage)();
    }
});