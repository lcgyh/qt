var e = require("../../../167BC423B878E4CF701DAC2479196783.js"), o = require("../../../utils/loading.js"), t = require("../../../AD0111C0B878E4CFCB6779C705596783.js");

Page({
    data: {
        list: [],
        fileDomain: "",
        showMask: !1,
        page: 1,
        pageSize: 20,
        pageNum: 1
    },
    onLoad: function(e) {
        this.getThemeList();
    },
    getThemeList: function() {
        (0, o.$Loading)();
        var t = this;
        (0, e.themeList)(function(e) {
            o.$Loading.hide(), t.setData({
                list: e.data,
                fileDomain: e.fileDomain,
                showMask: !0
            });
        }, function(e, n) {
            o.$Loading.hide(), 500 == e ? n.data.errorCode && n.data.errorMsg ? wx.showModal({
                title: n.data.errorMsg,
                content: "是否重新请求数据？",
                confirmColor: "#464646",
                cancelColor: "#969696",
                success: function(e) {
                    e.confirm && t.getThemeList();
                }
            }) : wx.showModal({
                content: "查询不到您选的门店，请重新选择门店",
                confirmColor: "#464646",
                cancelColor: "#969696",
                confirmText: "去选择",
                showCancel: !1,
                success: function(e) {
                    e.confirm && wx.clearStorage({
                        success: function() {
                            wx.redirectTo({
                                url: "/pages/pageMe/shopList/shopList?from=home"
                            });
                        }
                    });
                }
            }) : wx.showModal({
                title: "请求数据出错",
                content: "是否重新请求数据？",
                confirmColor: "#464646",
                cancelColor: "#969696",
                success: function(e) {
                    e.confirm && t.getThemeList();
                }
            });
        });
    },
    goEvent: function(e) {
        var o = e.currentTarget.dataset.pagecode;
        wx.navigateTo({
            url: "/pages/pageHome/bannerInfo/bannerInfo?pageCode=".concat(o)
        });
    },
    onShareAppMessage: function(e) {
        return (0, t.activityShareMessage)();
    }
});