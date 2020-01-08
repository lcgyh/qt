var e = require("../../../@babel/runtime/helpers/interopRequireDefault"), t = e(require("../../../@babel/runtime/helpers/toConsumableArray")), r = e(require("../../../@babel/runtime/helpers/defineProperty")), i = require("../../../B20FF1E6B878E4CFD46999E127296783.js"), a = e(require("../../../481D43C1B878E4CF2E7B2BC653496783.js")), n = require("../../../AD0111C0B878E4CFCB6779C705596783.js"), o = require("../../../18B8A9E0B878E4CF7EDEC1E7E0186783.js");

function s(e, t) {
    var r = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var i = Object.getOwnPropertySymbols(e);
        t && (i = i.filter(function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), r.push.apply(r, i);
    }
    return r;
}

var u = getApp();

Page({
    data: {
        fileList: [],
        imgNumList: [],
        max: 200,
        currentWordNumber: 0
    },
    onLoad: function() {
        var e = u.globalData.isIphoneX;
        this.setData({
            isIphoneX: e
        });
    },
    setFontLen: function(e) {
        var t = e.detail.cursor;
        this.setData({
            currentWordNumber: t
        });
    },
    deleteFile: function(e) {
        var t = e.currentTarget.id, r = this.data.fileList;
        r.splice(t, 1), this.setData({
            fileList: r
        });
    },
    formSubmit: function(e) {
        var t = e.detail.value, a = this.data.fileList;
        if ("" == t.opinionDescribe && a <= 0) (0, o.$Toast)({
            content: "请输入文字或上传图片",
            duration: 1.5,
            mask: !1
        }); else {
            (0, o.$Loading)();
            var n = function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var i = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? s(i, !0).forEach(function(t) {
                        (0, r.default)(e, t, i[t]);
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : s(i).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t));
                    });
                }
                return e;
            }({}, t, {}, {
                imgList: a
            });
            (0, i.putOpinions)(n, function(e) {
                "200" == e.code && (o.$Loading.hide(), (0, o.$Toast)({
                    content: "反馈提交成功",
                    mask: !1,
                    duration: 0
                }), setTimeout(function() {
                    o.$Toast.hide(), wx.switchTab({
                        url: "/pages/me/me"
                    });
                }, 1500));
            }, function(e, t) {
                o.$Loading.hide(), (0, o.$Toast)({
                    content: "小Q走丢了",
                    mask: !1,
                    duration: 1
                });
            });
        }
    },
    uploadFile: function(e) {
        var r = this;
        a.default.upLoadFileRequest(function(e) {
            var i = [].concat((0, t.default)(r.data.fileList), (0, t.default)(e.data.url));
            r.setData({
                fileDomain: e.fileDomain,
                fileList: i
            });
        }, 5);
    },
    onShareAppMessage: function(e) {
        return (0, n.activityShareMessage)();
    }
});