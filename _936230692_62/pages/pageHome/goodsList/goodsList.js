var a = require("../../../@babel/runtime/helpers/interopRequireDefault")(require("../../../@babel/runtime/helpers/toConsumableArray")), e = require("../../../C4DDA123B878E4CFA2BBC924B8096783.js"), t = require("../../../481D43C1B878E4CF2E7B2BC653496783.js"), i = require("../../../AD0111C0B878E4CFCB6779C705596783.js"), s = require("../../../18B8A9E0B878E4CF7EDEC1E7E0186783.js");

Page({
    data: {
        type: "",
        showMask: !1,
        goodsList: [],
        classifyList: [],
        fileDomain: "",
        page: 1,
        pageNum: 0,
        pageSize: 20,
        showPageType: null,
        isShowSlogin: !1,
        isfocus: !0,
        searchValue: "",
        topPadding: 16
    },
    onLoad: function(a) {
        var e = this;
        1 == a.showPageType ? this.setData({
            showPageType: a.showPageType,
            type: a.type
        }, function() {
            e.getGoodsList();
        }) : 2 == a.showPageType ? this.setData({
            showPageType: a.showPageType,
            pdBrandId: a.pdBrandId
        }, function() {
            e.getGoodsList();
        }) : 3 == a.showPageType ? this.setData({
            showPageType: a.showPageType,
            topPadding: 70,
            showMask: !0
        }) : 4 == a.showPageType && this.setData({
            showPageType: a.showPageType,
            pdCategoryId: a.pdCategoryId,
            topPadding: 50
        }, function() {
            e.getGoodsList();
        });
    },
    searchinput: function(a) {
        var e = a.detail;
        this.setData({
            searchValue: e.value
        });
    },
    focus: function(a) {
        this.setData({
            isfocus: !0
        });
    },
    blur: function(a) {
        this.setData({
            isfocus: !1
        });
    },
    clear: function(a) {
        this.setData({
            searchValue: "",
            isfocus: !1
        });
    },
    confirm: function(a) {
        var e = this, t = this.data.searchValue;
        t && this.setData({
            name: t,
            page: 1,
            hasSearch: 0,
            goodsList: []
        }, function() {
            e.getGoodsList();
        });
    },
    onReady: function() {
        wx.getStorage({
            key: "goGoodsListName",
            success: function(a) {
                "getStorage:ok" === a.errMsg && (wx.setNavigationBarTitle({
                    title: a.data ? a.data : ""
                }), wx.removeStorageSync("goGoodsListName"));
            }
        });
    },
    godetail: function(a) {
        var e = a.currentTarget.dataset.pdspuid;
        wx.navigateTo({
            url: "/pages/pageHome/goodsDetail/goodsDetail?pdSpuId=" + e
        });
    },
    getGoodsList: function() {
        (0, s.$Loading)();
        var a = this.data, t = a.page, i = a.pageSize, o = a.showPageType;
        if (1 == o) {
            var n = {
                type: this.data.type,
                page: t,
                pageSize: i
            };
            (0, e.getClassifyGoods)(n, this.listCallback, function(a, e) {
                s.$Loading.hide(), (0, s.$Toast)({
                    content: "小Q走丢了",
                    duration: 1.5,
                    mask: !1
                });
            });
        } else if (2 == o) {
            var r = {
                pdBrandId: this.data.pdBrandId,
                page: t,
                pageSize: i
            };
            (0, e.getBrandGoodsList)(r, this.listCallback, function(a, e) {
                s.$Loading.hide(), (0, s.$Toast)({
                    content: "小Q走丢了",
                    duration: 1.5,
                    mask: !1
                });
            });
        } else if (3 == o) {
            var d = {
                keyWord: this.data.name,
                page: t,
                pageSize: i
            };
            (0, e.getGoodsBySearch)(d, this.listCallback, function(a, e) {
                s.$Loading.hide(), (0, s.$Toast)({
                    content: "小Q走丢了",
                    duration: 1.5,
                    mask: !1
                });
            });
        } else if (4 == o) {
            var g = this.data, c = g.page, h = g.pdCategoryId;
            c > 1 ? this.classifyChange(h) : this.getClassifyData();
        }
    },
    listCallback: function(e) {
        var i = e.data, o = e.fileDomain, n = !1, r = [], d = this.data, g = d.goodsList, c = d.pageSize, h = d.page, l = Math.ceil(i.total / c);
        i.prePage == l && (n = !0), i.list ? i.list.length > 0 && (r = [].concat((0, a.default)(g), (0, 
        a.default)(i.list))).forEach(function(a) {
            a.showPrice = (0, t.formatPrice)(a.showPrice), a.hiddenPrice = a.hiddenPrice ? (0, 
            t.formatPrice)(a.hiddenPrice) : null;
        }) : r = g, this.setData({
            goodsList: r,
            fileDomain: o,
            pageNum: l,
            page: h + 1,
            isShowSlogin: n,
            hasSearch: 1,
            showMask: !0
        }, function() {
            s.$Loading.hide();
        });
    },
    getClassifyData: function(a) {
        var t = this;
        (0, e.getClassify)("1", function(a) {
            var e = a.data, i = -1, s = "", o = t.data.pdCategoryId;
            e.categorySortList.forEach(function(a, e) {
                a.categoryId == o && (i = e, s = a.categoryName);
            }), wx.setNavigationBarTitle({
                title: s
            }), t.setData({
                classifyList: e.categorySortList,
                classify_active: i
            }), t.classifyChange(o);
        }, function() {
            console.log("错误");
        });
    },
    classifyChange: function(i) {
        var o = this;
        (0, s.$Loading)();
        var n, r, d, g = this.data, c = g.page, h = g.pageSize, l = g.goodsList, u = g.classifyList;
        if (i && i.detail) {
            var p = i.detail.index;
            l = [], c = 1, n = u[p].categoryId, r = u[p].categoryName, d = 1, wx.setNavigationBarTitle({
                title: r
            }), this.setData({
                classify_active: p,
                pdCategoryId: n
            });
        } else n = i, d = 0;
        var f = {
            pdCategoryId: n,
            page: c,
            pageSize: h
        };
        (0, e.getClassifyGoods)(f, function(e) {
            1 == d && wx.pageScrollTo({
                scrollTop: 0,
                duration: 0
            });
            var i = e.data, n = e.fileDomain, r = !1, g = [];
            i.prePage >= i.pageNum && (r = !0), i.list.length > 0 && (g = [].concat((0, a.default)(l), (0, 
            a.default)(i.list))).forEach(function(a) {
                a.showPrice = (0, t.formatPrice)(a.showPrice), a.hiddenPrice = a.hiddenPrice ? (0, 
                t.formatPrice)(a.hiddenPrice) : null;
            }), o.setData({
                goodsList: g,
                fileDomain: n,
                pageNum: i.pageNum,
                page: i.prePage + 1,
                isShowSlogin: r,
                showMask: !0
            }, function() {
                s.$Loading.hide();
            });
        }, function(a, e) {
            s.$Loading.hide(), (0, s.$Toast)({
                content: "小Q走丢了",
                duration: 1.5,
                mask: !1
            });
        });
    },
    onReachBottom: function(a) {
        var e = this.data;
        e.page > e.pageNum || this.getGoodsList();
    },
    onShareAppMessage: function(a) {
        return (0, i.activityShareMessage)();
    }
});