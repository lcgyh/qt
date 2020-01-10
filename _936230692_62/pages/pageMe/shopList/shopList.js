var t = require("../../../B20FF1E6B878E4CFD46999E127296783.js"), e = require("../../../18B8A9E0B878E4CF7EDEC1E7E0186783.js"), a = require("../../../AD0111C0B878E4CFCB6779C705596783.js"), s = getApp();

Page({
    data: {
        storeList: [],
        showTips: !1,
        showMask: !1,
        searchValue: ""
    },
    onLoad: function(t) {
        console.log(t), (0, e.$Loading)();
        var a = this;
        this.setData({
            statusBarHeight: s.globalData.statusBarHeight,
            windowWidth: s.globalData.windowWidth,
            isIphoneX: s.globalData.isIphoneX,
            from: t.from ? t.from : ""
        }), wx.getLocation({
            altitude: !0,
            complete: function(t) {
                var e = "", s = "";
                "getLocation:ok" === t.errMsg && (e = t.latitude, s = t.longitude), a.getStoreDetail(e, s);
            }
        });
    },
    goBack: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    getStoreDetail: function(a, s) {
        var o = this, i = [];
        (0, t.getStore)({
            lat: a,
            lng: s
        }, function(t) {
            console.log(t), t.data.length > 0 && t.data.forEach(function(t) {
                t.shopDistance = t.shopDistance.toFixed(2), i.push(t), t.address || console.log(t);
            }), o.setData({
                showMask: !0,
                storeList: i,
                saveList: i
            }, function() {
                e.$Loading.hide();
            });
        });
    },
    searchinput: function(t) {
        var e = t.detail, a = this.data.saveList, s = e.value.trim(), o = [];
        "" == s || null == s ? o = a : a.forEach(function(t) {
            t ? (t.name.indexOf(s) > -1 || t.address.indexOf(s) > -1) && o.push(t) : t.name.indexOf(s) > -1 && o.push(t);
        }), this.setData({
            storeList: o,
            searchValue: e.value
        });
    },
    onShareAppMessage: function(t) {
        return (0, a.activityShareMessage)();
    },
    chooseStore: function(a) {
        var s = a.currentTarget.dataset.spshopid, o = a.currentTarget.dataset.name, i = this;
        wx.showModal({
            content: "您正在更换服务门店为".concat(o, "，您的购物车库存将会被刷新，是否确认更换？"),
            confirmColor: "#464646",
            cancelColor: "#969696",
            success: function(a) {
                a.confirm && ((0, e.$Loading)(), (0, t.pickStore)({
                    spShopId: s
                }, function(t) {
                    i.setspShopId(s);
                }, function(t, a) {
                    e.$Loading.hide(), "E_300" == t && (0, e.$Toast)({
                        content: a.data.message,
                        duration: 1,
                        mask: !1
                    });
                }));
            }
        });
    },
    setspShopId: function(t) {
        wx.setStorageSync("spShopId", t), wx.setStorageSync("homeFresh", 1), wx.setStorageSync("cartFresh", 1), 
        this.sameJump();
    },
    showTips: function() {
        this.setData({
            showTips: !this.data.showTips
        });
    },
    sameJump: function() {
        var t = this.data.from;
        "shopDetail" === t || "home" === t ? wx.switchTab({
            url: "/pages/home/home"
        }) : "bannerInfo" === t ? wx.setStorage({
            key: "infoFresh",
            data: "1",
            success: function(t) {
                wx.navigateBack({
                    delta: 1
                });
            }
        }) : "activityList" === t && wx.setStorage({
            key: "activityFresh",
            data: "1",
            success: function(t) {
                wx.navigateBack({
                    delta: 1
                });
            }
        });
    }
});