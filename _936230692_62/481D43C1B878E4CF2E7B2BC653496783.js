var e = require("18B8A9E0B878E4CF7EDEC1E7E0186783.js"), t = "";

t = "https://qtoolsapp.qtoolsbaby.cn";

var o = getApp(), n = {
    formatYearTime: function(e) {
        var t = new Date(e).getFullYear();
        return this.formatNumber(t);
    },
    formatTime: function(e) {
        var t = new Date(e), o = t.getFullYear(), n = t.getMonth() + 1, a = t.getDate();
        t.getHours(), t.getMinutes(), t.getSeconds();
        return [ o, n, a ].map(this.formatNumber).join("-");
    },
    formatNewTime: function(e) {
        var t = new Date(e), o = t.getFullYear(), n = t.getMonth() + 1, a = t.getDate();
        t.getHours(), t.getMinutes(), t.getSeconds();
        return [ o, n, a ].map(this.formatNumber).join(".");
    },
    formatAllTime: function(e) {
        var t = new Date(e), o = t.getFullYear(), n = t.getMonth() + 1, a = t.getDate(), r = t.getHours(), i = t.getMinutes(), s = t.getSeconds();
        return [ o, n, a ].map(this.formatNumber).join("-") + " " + [ r, i, s ].map(this.formatNumber).join(":");
    },
    formatExpressTime: function(e) {
        var t = new Date(e), o = t.getMonth() + 1, n = t.getDate(), a = t.getHours(), r = t.getMinutes();
        return [ o, n ].map(this.formatNumber).join("/") + "\n" + [ a, r ].map(this.formatNumber).join(":");
    },
    formatChineseTime: function(e) {
        var t = new Date(e), o = t.getMonth() + 1, n = t.getDate(), a = t.getHours(), r = t.getMinutes();
        return o + "月" + this.formatNumber(n) + "日" + this.formatNumber(a) + ":" + this.formatNumber(r);
    },
    getNowTime: function() {
        var e = new Date(), t = e.getFullYear(), o = e.getMonth() + 1, n = e.getDate(), a = e.getHours(), r = e.getMinutes(), i = e.getSeconds();
        return [ t, o, n ].map(this.formatNumber).join("-") + " " + [ a, r, i ].map(this.formatNumber).join(":");
    },
    formatNumber: function(e) {
        return (e = e.toString())[1] ? e : "0" + e;
    },
    formatPrice: function(e) {
        if (0 == e) return "0.00";
        if (null == e || "" == e) return e;
        var t = e.toString();
        if (t.indexOf(".") > 0) {
            var o = t.split(".")[1].length;
            1 == o ? t = t.split(".")[0] + "." + t.split(".")[1] + "0" : 2 == o ? t = t : o > 2 && (t = t.split(".")[0] + "." + t.split(".")[1].slice(0, 2));
        } else t += ".00";
        return t;
    },
    upLoadFileRequest: function(e, o) {
        wx.chooseImage({
            count: 1,
            success: function(n) {
                var a = n.tempFilePaths;
                wx.uploadFile({
                    url: "".concat(t, "/upload/image"),
                    filePath: a[0],
                    name: "file",
                    header: {
                        "Content-Type": "multipart/form-data",
                        accessToken: wx.getStorageSync("token")
                    },
                    formData: {
                        user: "test"
                    },
                    success: function(t) {
                        var o = t.data;
                        o = JSON.parse(o), "function" == typeof e && e(o);
                    },
                    fail: function(e) {
                        "function" == typeof o && o(e);
                    }
                });
            },
            fail: function(e) {
                "function" == typeof o && o(e);
            }
        });
    },
    request: function(n) {
        var a = this;
        console.log(n), wx.getNetworkType({
            success: function(r) {
                if ("getNetworkType:ok" === r.errMsg && "none" != r.networkType) {
                    var i = "", s = wx.getStorageSync("source"), u = wx.getStorageSync("spShopId"), c = o.globalData.version, f = t + "/app/initArea";
                    n.url !== f && (i = wx.getStorageSync("token")), wx.request({
                        url: n.url,
                        data: n.data || "",
                        header: {
                            "content-type": "application/json",
                            accessToken: i,
                            spshopid: u || "",
                            version: c,
                            source: s || "",
                            platform: "applet"
                        },
                        method: n.method || "GET",
                        dataType: n.dataType || "json",
                        success: function(t) {
                            console.log(t), 200 === t.statusCode ? 200 == t.data.code ? "function" == typeof n.success && n.success(t.data) : 401 == t.data.code ? (e.$Loading.hide(), 
                            (0, e.$Toast)({
                                content: "登录已过期，请重新登录",
                                duration: 0
                            }), setTimeout(function() {
                                e.$Toast.hide(), wx.navigateTo({
                                    url: "/pages/login/login?from=lostTime"
                                });
                            }, 1e3)) : t.data.code ? "function" == typeof n.fail && n.fail(t.data.code, t) : t.data.errorMessage ? wx.showModal({
                                title: "数据请求错误",
                                content: t.data.errorMessage,
                                confirmColor: "#464646",
                                cancelColor: "#969696",
                                success: function(e) {
                                    e.confirm && a.request(n);
                                }
                            }) : t.data.message ? wx.showModal({
                                title: "数据请求错误",
                                content: t.data.message,
                                confirmColor: "#464646",
                                cancelColor: "#969696",
                                success: function(e) {
                                    e.confirm && a.request(n);
                                }
                            }) : wx.showModal({
                                title: "数据请求错误",
                                content: "是否重新请求数据？",
                                confirmColor: "#464646",
                                cancelColor: "#969696",
                                success: function(e) {
                                    e.confirm && a.request(n);
                                }
                            }) : "function" == typeof n.fail && n.fail(t.statusCode, t);
                        },
                        fail: function(t) {
                            e.$Loading.hide(), wx.showModal({
                                title: "网络加载出错",
                                content: "是否重新加载数据？",
                                confirmColor: "#464646",
                                cancelColor: "#969696",
                                success: function(t) {
                                    t.confirm && ((0, e.$Loading)(), a.request(n));
                                }
                            });
                        }
                    });
                } else e.$Loading.hide(), wx.showModal({
                    title: "您的网络出现波动，请检查网络状况",
                    content: "是否重新加载数据？",
                    confirmColor: "#464646",
                    cancelColor: "#969696",
                    success: function(t) {
                        t.confirm && ((0, e.$Loading)(), a.request(n));
                    }
                });
            }
        });
    },
    getServerUrl: function(e) {
        return t + e;
    },
    bd09Togcj02: function(e, t) {
        var o = 52.35987755982988, n = e - .0065, a = t - .006, r = Math.sqrt(n * n + a * a) - 2e-5 * Math.sin(a * o), i = Math.atan2(a, n) - 3e-6 * Math.cos(n * o);
        return [ r * Math.cos(i), r * Math.sin(i) ];
    },
    uniqueArray: function(e, t) {
        for (var o = [ e[0] ], n = 1; n < e.length; n++) {
            for (var a = e[n], r = !1, i = 0; i < o.length; i++) if (a[t] == o[i][t]) {
                r = !0;
                break;
            }
            r || o.push(a);
        }
        return o;
    },
    getParam: function(e, t) {
        var o = new RegExp("(^|&)" + t + "=([^&]*)(&|$)"), n = e.match(o);
        return null != n ? unescape(n[2]) : null;
    }
};

module.exports = n;