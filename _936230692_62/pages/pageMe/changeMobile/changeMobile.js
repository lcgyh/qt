var e = require("../../../utils/loading.js"), t = require("../../../B20FF1E6B878E4CFD46999E127296783.js"), i = require("../../../AD0111C0B878E4CFCB6779C705596783.js");

Page({
    data: {
        mobile: "",
        identifyCode: "",
        targetTime: 0,
        isSend: !0,
        clearTimer: !0,
        showCountDown: !1,
        getCodeTxt: "获取验证码"
    },
    onLoad: function(e) {},
    mobileInput: function(e) {
        var t = e.detail.value.replace(/[^0-9]/gi, ""), i = t.split(""), n = i.length;
        n >= 4 && i.splice(3, 0, " "), n >= 8 && i.splice(8, 0, " "), t = i.join(""), this.setData({
            mobile: t
        });
    },
    codeInput: function(e) {
        var t = e.detail.value;
        this.setData({
            identifyCode: t
        });
    },
    validatePhone: function(e) {
        return !!/^[1][0-9][0-9]{9}$/.test(e);
    },
    validateCode: function(t) {
        return !!/^\d{4}$/.test(t) || ((0, e.$Toast)({
            content: "请输入正确的验证码",
            duration: 1.5,
            mask: !1
        }), !1);
    },
    getCode: function() {
        var i = this, n = this.data, a = n.mobile, o = n.isSend, s = a.replace(/[^0-9]/gi, ""), d = this.validatePhone(s);
        o && (d ? (this.setData({
            isSend: !1
        }), (0, e.$Loading)(), (0, t.getPhoneCode)(s, function(t) {
            e.$Loading.hide(), i.setData({
                showCountDown: !0,
                targetTime: new Date().getTime() + 59e3,
                getCodeTxt: "s后重新获取",
                clearTimer: !1
            });
        }, function(t, i) {
            e.$Loading.hide(), (0, e.$Toast)({
                content: "获取验证码失败，请稍后再试",
                duration: 1.5,
                mask: !1
            });
        })) : (0, e.$Toast)({
            content: "请输入正确的手机号",
            duration: 1.5,
            mask: !1
        }));
    },
    countFinish: function() {
        this.setData({
            showCountDown: !1,
            targetTime: 0,
            getCodeTxt: "重新获取",
            isSend: !0,
            clearTimer: !0
        });
    },
    save: function() {
        var i = this.data, n = i.mobile, a = i.identifyCode, o = n.replace(/[^0-9]/gi, ""), s = this.validatePhone(o), d = this.validateCode(a);
        if (s) if (d) {
            var r = {
                newMoble: o,
                identifyCode: a
            };
            (0, e.$Loading)(), (0, t.changePhone)(r, function(t) {
                e.$Loading.hide(), wx.setStorageSync("homeFresh", 1), wx.setStorageSync("meDetailFresh", 1), 
                wx.setStorageSync("userMobile", o), (0, e.$Toast)({
                    content: "手机号更改成功",
                    duration: 0,
                    mask: !1
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 1500);
            }, function(t, i) {
                e.$Loading.hide(), "E_500" == t || "E_200" == t || "999" == t ? (0, e.$Toast)({
                    content: i.data.message,
                    duration: 1,
                    mask: !1
                }) : (0, e.$Toast)({
                    content: "小Q走丢了",
                    duration: 1,
                    mask: !1
                });
            }), console.log(r);
        } else (0, e.$Toast)({
            content: "请输入正确的验证码",
            duration: 1.5,
            mask: !1
        }); else (0, e.$Toast)({
            content: "请输入正确的手机号",
            duration: 1.5,
            mask: !1
        });
    },
    onShareAppMessage: function() {
        return (0, i.activityShareMessage)();
    }
});