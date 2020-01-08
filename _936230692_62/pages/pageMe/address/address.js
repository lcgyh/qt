var e = require("../../../B20FF1E6B878E4CFD46999E127296783.js"), t = require("../../../AD0111C0B878E4CFCB6779C705596783.js"), s = require("../../../18B8A9E0B878E4CF7EDEC1E7E0186783.js"), a = getApp();

Page({
    data: {
        checked: 0,
        addressList: [],
        showMask: !1
    },
    onLoad: function(e) {
        var t = a.globalData.isIphoneX;
        this.setData({
            isIphoneX: t
        }), this.getReceiveAddress();
    },
    radioChange: function(t) {
        var a = this, i = t.currentTarget.dataset.id;
        (0, s.$Loading)(), (0, e.setDefaultAddress)({
            receiveId: i
        }, function(e) {
            a.getReceiveAddress();
        });
    },
    getReceiveAddress: function() {
        var t = this;
        (0, s.$Loading)(), (0, e.getReceiveAddress)(function(e) {
            t.setData({
                addressList: e.data,
                showMask: !0
            }, function() {
                s.$Loading.hide();
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
    delete: function(t) {
        var a = this;
        wx.showModal({
            title: "提示",
            content: "确认删除此收货地址么？",
            confirmColor: "#464646",
            cancelColor: "#969696",
            success: function(i) {
                if (i.confirm) {
                    (0, s.$Loading)();
                    var r = t.currentTarget.dataset.id;
                    (0, e.deleteReceiveAddress)(r, function(e) {
                        a.getReceiveAddress();
                    });
                }
            }
        });
    },
    onShow: function() {
        1 == wx.getStorageSync("refresh") && (this.getReceiveAddress(), wx.removeStorageSync("refresh"));
    },
    onShareAppMessage: function(e) {
        return (0, t.activityShareMessage)();
    }
});