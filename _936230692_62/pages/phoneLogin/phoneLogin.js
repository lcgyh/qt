var e = require("../../utils/loading.js"), t = require("../../B20FF1E6B878E4CFD46999E127296783.js"), a = require("../../3AB1A716B878E4CF5CD7CF11DFE86783.js"), o = require("../../AD0111C0B878E4CFCB6779C705596783.js"), n = getApp();

Page({
    data: {
        mobile: "",
        identifyCode: "",
        status: 0,
        recode: !1,
        showCountDown: !1,
        getCodeText: "s后重新获取",
        targetTime: 0
    },
    onLoad: function(e) {
        this.setData({
            statusBarHeight: n.globalData.statusBarHeight,
            windowWidth: n.globalData.windowWidth
        });
    },
    mobileInput: function(e) {
        this.setData({
            mobile: e.detail.value
        });
    },
    codeInput: function(e) {
        this.setData({
            identifyCode: e.detail.value
        });
    },
    goNext: function() {
        var a = this, o = this.data.mobile;
        /^[1][0-9][0-9]{9}$/.test(o) ? ((0, e.$Loading)(), (0, t.getPhoneCode)(o, function(t) {
            e.$Loading.hide(), a.setData({
                recode: !1,
                showCountDown: !0,
                targetTime: new Date().getTime() + 59e3,
                getCodeText: "s后重新获取",
                clearTimer: !1,
                status: 1
            });
        }, function(t, a) {
            e.$Loading.hide(), (0, e.$Toast)({
                content: "小Q走丢了",
                duration: 1.5,
                mask: !1
            });
        })) : (0, e.$Toast)({
            content: "请输入正确的手机号",
            duration: 1.5,
            mask: !1
        });
    },
    finish: function() {
        var t = this, a = this.data, o = a.mobile, n = a.identifyCode;
        if (/^\d{4}$/.test(n)) {
            (0, e.$Loading)();
            var s = {
                userPhone: o,
                identifyCode: n,
                code: ""
            };
            wx.login({
                success: function(e) {
                    "login:ok" === e.errMsg && (s.code = e.code, wx.removeStorage({
                        key: "token",
                        success: function(e) {
                            t.wxLogin(s);
                        }
                    }));
                }
            });
        } else (0, e.$Toast)({
            content: "请输入正确的验证码",
            duration: 1.5,
            mask: !1
        });
    },
    wxLogin: function(o) {
        (0, t.bindPhone)(o, function(t) {
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
                    e.$Loading.hide(), 1 == t.data.bundleCode ? (wx.setStorageSync("bundleSuccess", "1"), 
                    wx.removeStorageSync("oldUserId"), wx.navigateBack({
                        delta: 2
                    })) : wx.navigateBack({
                        delta: 2
                    });
                });
            } else e.$Loading.hide(), wx.navigateBack({
                delta: 2
            });
        }, function(t, a) {
            e.$Loading.hide(), 500 == t ? a.data.errorMessage ? (0, e.$Toast)({
                content: a.data.errorMessage,
                duration: 1,
                mask: !1
            }) : a.data.message ? (0, e.$Toast)({
                content: a.data.message,
                duration: 1,
                mask: !1
            }) : (0, e.$Toast)({
                content: "小Q走丢了",
                duration: 1,
                mask: !1
            }) : "E_200" == t || "E_500" == t || "999" == t ? (0, e.$Toast)({
                content: a.data.message,
                duration: 1,
                mask: !1
            }) : (0, e.$Toast)({
                content: "小Q走丢了",
                duration: 1,
                mask: !1
            });
        });
    },
    countDownFinish: function() {
        this.setData({
            showCountDown: !1,
            targetTime: 0,
            clearTimer: !0,
            recode: !0,
            getCodeText: "重新获取"
        });
    },
    reCode: function() {
        this.data.recode && this.goNext();
    },
    goBack: function() {
        var e = this.data.status;
        0 === e ? wx.navigateBack({
            delta: 1
        }) : 1 === e && this.setData({
            status: 0
        });
    },
    onShareAppMessage: function() {
        return (0, o.activityShareMessage)();
    }
});