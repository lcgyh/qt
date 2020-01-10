var t = require("../../../C712B902B878E4CFA174D10544396783.js"), o = require("../../../utils/loading.js"), e = require("../../../AD0111C0B878E4CFCB6779C705596783.js");

Page({
    data: {
        goodsList: [],
        shopInfo: {},
        fileDomain: "",
        orderId: 0
    },
    onLoad: function(t) {
        var o = this;
        wx.getStorage({
            key: "commentShopInfo",
            success: function(e) {
                "getStorage:ok" === e.errMsg && wx.getStorage({
                    key: "commentGoodsList",
                    success: function(a) {
                        if ("getStorage:ok" === a.errMsg) {
                            var n = a.data, s = e.data, r = t.fileDomain, i = 0;
                            s = JSON.parse(s), n = JSON.parse(n), s.starRank = 5, s.comment = "", s.len = 0, 
                            n.forEach(function(t) {
                                t.starRank = 5, t.comment = "", t.len = 0, i = t.orderId;
                            }), o.setData({
                                goodsList: n,
                                shopInfo: s,
                                fileDomain: r,
                                orderId: i
                            }, function() {
                                wx.removeStorageSync("commentShopInfo"), wx.removeStorageSync("commentGoodsList");
                            });
                        }
                    }
                });
            }
        });
    },
    onChange: function(t) {
        var o = this.data.goodsList, e = t.currentTarget.dataset.index, a = t.detail.index;
        o[e].starRank = a, this.setData({
            goodsList: o
        });
    },
    getValue: function(t) {
        var o = this.data.goodsList, e = t.currentTarget.dataset.index, a = t.detail.cursor, n = t.detail.value;
        o[e].len = a, o[e].comment = n, this.setData({
            goodsList: o
        });
    },
    shopChange: function(t) {
        var o = t.detail.index, e = this.data.shopInfo;
        e.starRank = o, this.setData({
            shopInfo: e
        });
    },
    getStoreValue: function(t) {
        var o = this.data.shopInfo, e = t.detail.cursor, a = t.detail.value;
        o.comment = a, o.len = e, this.setData({
            shopInfo: o
        });
    },
    putInfo: function() {
        var e = this.data.goodsList, a = this.data.shopInfo, n = this.data.orderId, s = [], r = {};
        if (e.forEach(function(t) {
            0 != t.starRank ? (console.log(t.comment), s.push({
                pdSpuId: t.pdSpuId,
                starRank: t.starRank,
                comment: t.comment,
                pdSkuId: t.pdSkuId ? t.pdSkuId : "-1"
            })) : (0, o.$Toast)({
                content: "请给商品打个星吧",
                mask: !1,
                duration: 1
            });
        }), 0 != a.starRank) {
            r.spShopId = a.spShopId, r.starRank = a.starRank, r.comment = a.comment;
            var i = {
                spuCommentses: s,
                orderId: n,
                shopComments: r
            };
            (0, o.$Loading)(), (0, t.orderComment)(i, function(t) {
                o.$Loading.hide(), (0, o.$Toast)({
                    content: "评价成功",
                    duration: 0,
                    mask: !1
                }), setTimeout(function() {
                    o.$Toast.hide(), wx.navigateBack({
                        delta: 1
                    });
                }, 1500);
            }, function(t, e) {
                o.$Loading.hide(), (0, o.$Toast)({
                    content: "小Q走丢了",
                    mask: !1,
                    duration: 1
                });
            });
        } else (0, o.$Toast)({
            content: "请给门店打个星吧",
            duration: 1,
            mask: !1
        });
    },
    onShareAppMessage: function(t) {
        return (0, e.activityShareMessage)();
    }
});