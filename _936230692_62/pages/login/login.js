var e = require("../../utils/loading.js"), t = require("../../B20FF1E6B878E4CFD46999E127296783.js"), a = require("../../3AB1A716B878E4CF5CD7CF11DFE86783.js"), o = require("../../AD0111C0B878E4CFCB6779C705596783.js"), n = getApp();

Page({
    data: {
        code: "",
        encryptedData: "",
        iv: "",
        showTie: !1,
        showPhoneLogin: !1,
        from: ""
    },
    onLoad: function(e) {
        var t = getCurrentPages(), a = t.length;
        console.log(t[a - 2].options);
        var o = this;
        this.setData({
            statusBarHeight: n.globalData.statusBarHeight,
            windowWidth: n.globalData.windowWidth
        }), e.from && this.setData({
            from: e.from
        }), wx.removeStorageSync("token"), wx.login({
            success: function(e) {
                "login:ok" === e.errMsg && o.setData({
                    statusBarHeight: n.globalData.statusBarHeight,
                    windowWidth: n.globalData.windowWidth,
                    code: e.code
                });
            }
        });
    },
    getPhoneNumber: function(e) {
        if ("getPhoneNumber:ok" === e.detail.errMsg) {
            var t = e.detail.encryptedData, a = e.detail.iv, o = {
                code: this.data.code,
                encryptedData: t,
                iv: a
            };
            this.wxLogin(o);
        }
    },
    wxLogin: function(o) {
        var n = this;
        (0, e.$Loading)(), (0, t.login)(o, function(t) {
            var o = t.data;
            wx.setStorageSync("userName", o.name), wx.setStorageSync("userPic", o.pic), wx.setStorageSync("userMobile", o.mobile), 
            wx.setStorageSync("userId", o.userId), wx.setStorageSync("token", o.accessToken), 
            wx.setStorageSync("spShopId", o.appletShopId ? o.appletShopId : ""), wx.setStorageSync("homeFresh", 1), 
            wx.setStorageSync("cartFresh", 1);
            var n = wx.getStorageSync("oldUserId");
            if (o.newUser && n && n != o.userId) {
                var s = {
                    oldUserId: n,
                    newUserId: o.userId
                };
                (0, a.inviteUser)(s, function(t) {
                    e.$Loading.hide(), wx.removeStorageSync("oldUserId"), 1 == t.data.bundleCode ? (wx.setStorageSync("bundleSuccess", "1"), 
                    wx.navigateBack({
                        delta: 1
                    })) : wx.navigateBack({
                        delta: 1
                    });
                }, function(t, a) {
                    e.$Loading.hide(), (0, e.$Toast)({
                        content: "接受邀请失败",
                        duration: 1
                    });
                });
            } else e.$Loading.hide(), wx.navigateBack({
                delta: 1
            });
        }, function(t, a) {
            e.$Loading.hide(), wx.login({
                success: function(e) {
                    "login:ok" === e.errMsg && n.setData({
                        code: e.code
                    });
                }
            }), 500 == t ? a.errorMessage ? (0, e.$Toast)({
                content: a.errorMessage,
                duration: 1
            }) : a.data.message ? (0, e.$Toast)({
                content: a.data.message,
                duration: 1
            }) : (0, e.$Toast)({
                content: "小Q走丢了",
                duration: 1
            }) : "E_200" == t || "E_500" == t || "999" == t ? (0, e.$Toast)({
                content: a.data.message,
                duration: 1
            }) : (0, e.$Toast)({
                content: "小Q走丢了",
                duration: 1
            });
        });
    },
    goBack: function() {
        "lostTime" === this.data.from ? (wx.setStorageSync("homeFresh", 1), wx.removeStorage({
            key: "token",
            success: function(e) {
                wx.navigateBack({
                    delta: 1
                });
            }
        })) : wx.navigateBack({
            delta: 1
        });
    },
    showPhoneLogin: function() {
        wx.navigateTo({
            url: "/pages/phoneLogin/phoneLogin"
        });
    },
    onShareAppMessage: function(e) {
        return (0, o.activityShareMessage)();
    }
});