var e = require("../../../@babel/runtime/helpers/interopRequireDefault"), t = e(require("../../../@babel/runtime/helpers/defineProperty")), a = require("../../../utils/loading.js"), n = require("../../../B20FF1E6B878E4CFD46999E127296783.js"), i = e(require("../../../481D43C1B878E4CF2E7B2BC653496783.js")), r = require("../../../AD0111C0B878E4CFCB6779C705596783.js");

function o(e, t) {
    var a = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        t && (n = n.filter(function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), a.push.apply(a, n);
    }
    return a;
}

var s = getApp();

Page({
    data: {
        currentWordNumber: 0,
        photo: "",
        array: [ "小王子", "小公主" ],
        isNs: 0,
        date: "",
        sexIndex: "",
        babyId: null,
        loading: !1,
        endTime: ""
    },
    onLoad: function(e) {
        var t = new Date(), a = new Date(), n = t.setYear(t.getFullYear() + 1), r = a.setYear(a.getFullYear() - 1), o = s.globalData.isIphoneX;
        this.setData({
            isIphoneX: o,
            startTime: "1900-01-01",
            endTime: i.default.formatTime(n),
            date: "".concat(i.default.formatYearTime(r), "-01-15"),
            dateStr: "".concat(i.default.formatYearTime(r), ".01.15")
        }), this.initPage();
    },
    initPage: function() {
        var e = this.options.babyInfo;
        e ? (wx.setNavigationBarTitle({
            title: "修改宝宝信息"
        }), e = JSON.parse(e), console.log(e), this.setData({
            name: e.desc.name,
            currentWordNumber: e.desc.name.length,
            photo: e.desc.pic,
            isNs: e.desc.type,
            date: i.default.formatTime(e.desc.birthday),
            dateStr: i.default.formatNewTime(e.desc.birthday),
            sexIndex: e.desc.sex,
            fileDomain: e.fileDomain,
            babyId: e.desc.babyId
        })) : wx.setNavigationBarTitle({
            title: "新增宝宝信息"
        });
    },
    uploadFile: function() {
        var e = this;
        i.default.upLoadFileRequest(function(t) {
            e.setData({
                photo: t.data.url[0],
                fileDomain: t.fileDomain
            });
        });
    },
    bindPickerChange: function(e) {
        this.setData({
            sexIndex: e.detail.value
        });
    },
    bindDateChange: function(e) {
        var t = e.detail, a = t.value.split("-").join(".");
        this.setData({
            date: t.value,
            dateStr: a
        });
    },
    setFontLen: function(e) {
        var t = e.detail.value, a = e.detail.value.length;
        this.setData({
            currentWordNumber: a,
            name: t
        });
    },
    formSubmit: function(e) {
        var n = this.data, i = n.name, r = n.date, s = n.sexIndex, u = n.isNs, d = n.photo, c = n.babyId, l = {
            type: u,
            pic: d,
            birthday: r,
            sex: s,
            name: i
        };
        return i ? s ? (c && (l = function(e) {
            for (var a = 1; a < arguments.length; a++) {
                var n = null != arguments[a] ? arguments[a] : {};
                a % 2 ? o(n, !0).forEach(function(a) {
                    (0, t.default)(e, a, n[a]);
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : o(n).forEach(function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                });
            }
            return e;
        }({}, l, {}, {
            babyId: c
        })), void this.saveBabyInfoEvent(l)) : (0, a.$Toast)({
            content: "请选择宝宝的性别",
            duration: 1.5,
            mask: !1
        }) : (0, a.$Toast)({
            content: "请输入宝宝的名字",
            duration: 1.5,
            mask: !1
        });
    },
    deleteBabyInfoEvent: function(e) {
        (0, n.deleteBabyInfo)(e, function(e) {
            (0, a.$Toast)({
                content: "删除成功",
                duration: 0,
                mask: !1
            }), wx.setStorageSync("meDetailFresh", 1), setTimeout(function() {
                a.$Toast.hide(), wx.navigateBack({
                    delta: 1
                });
            }, 1500);
        }, function(e, t) {
            a.$Loading.hide(), (0, a.$Toast)({
                content: "删除失败，请稍后再试",
                duration: 1.5,
                mask: !1
            });
        });
    },
    saveBabyInfoEvent: function(e) {
        (0, a.$Loading)(), (0, n.saveBabyInfo)(e, function(e) {
            a.$Loading.hide(), (0, a.$Toast)({
                content: "保存成功",
                duration: 0,
                mask: !1
            }), wx.setStorageSync("meDetailFresh", 1), setTimeout(function() {
                a.$Toast.hide(), wx.navigateBack({
                    delta: 1
                });
            }, 1500);
        }, function(e, t) {
            a.$Loading.hide(), (0, a.$Toast)({
                content: "保存失败，请稍后再试",
                duration: 1.5,
                mask: !1
            });
        });
    },
    onShareAppMessage: function(e) {
        return (0, r.activityShareMessage)();
    }
});