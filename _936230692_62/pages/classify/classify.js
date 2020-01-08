var e = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../../@babel/runtime/helpers/toConsumableArray")), a = require("../../C4DDA123B878E4CFA2BBC924B8096783.js"), t = require("../../481D43C1B878E4CF2E7B2BC653496783.js"), i = require("../../AD0111C0B878E4CFCB6779C705596783.js"), s = require("../../18B8A9E0B878E4CF7EDEC1E7E0186783.js");

Page({
    data: {
        showMask: !1,
        goodsList: [],
        classifyList: [],
        fileDomain: "",
        classify_active: 0,
        page: 1,
        pageNum: 0,
        pageSize: 20,
        isShowSlogin: !1,
        pdCategoryId: "-1"
    },
    onLoad: function() {
        this.getClassifyData();
    },
    getClassifyData: function() {
        var e = this;
        (0, s.$Loading)(), (0, a.getClassify)("1", function(a) {
            var t = a.data, i = -1, s = "", o = e.data.pdCategoryId;
            t.categorySortList.forEach(function(e, a) {
                e.categoryId == o && (i = a, s = e.categoryName);
            }), e.setData({
                classifyList: t.categorySortList,
                pdCategoryId: o,
                active_name: s,
                classify_active: i
            }), e.getClassifyList("0", []);
        }, function(e, a) {
            s.$Loading.hide(), (0, s.$Toast)({
                content: "小Q走丢了",
                duration: 1.5
            });
        });
    },
    tabChange: function(e) {
        var a = this, t = e.detail.index, i = this.data.classifyList, s = i[t].categoryId, o = i[t].categoryName, n = [];
        this.setData({
            pdCategoryId: s,
            active_name: o,
            page: 1
        }, function() {
            a.getClassifyList("1", n);
        });
    },
    getClassifyList: function(i, o) {
        var n = this;
        (0, s.$Loading)();
        var r = this.data, g = r.page, c = r.pageSize, l = r.pdCategoryId, d = r.active_name, u = {
            pdCategoryId: l,
            page: g,
            pageSize: c
        };
        (0, a.getClassifyGoods)(u, function(a) {
            1 == i && wx.pageScrollTo({
                scrollTop: 0,
                duration: 0
            });
            var r = a.data, g = a.fileDomain, c = !1, l = [];
            r.prePage >= r.pageNum && (c = !0), r.list.length > 0 && (l = [].concat((0, e.default)(o), (0, 
            e.default)(r.list))).forEach(function(e) {
                e.showPrice = (0, t.formatPrice)(e.showPrice), e.hiddenPrice = e.hiddenPrice ? (0, 
                t.formatPrice)(e.hiddenPrice) : null;
            }), wx.setNavigationBarTitle({
                title: d
            }), n.setData({
                goodsList: l,
                fileDomain: g,
                pageNum: r.pageNum,
                page: r.prePage + 1,
                isShowSlogin: c,
                showMask: !0
            }, function() {
                wx.stopPullDownRefresh(), s.$Loading.hide();
            });
        }, function(e) {
            wx.stopPullDownRefresh(), s.$Loading.hide(), wx.showToast({
                title: "加载失败",
                duration: 2e3
            });
        });
    },
    onPullDownRefresh: function() {
        var e = this;
        this.setData({
            page: 1
        }, function() {
            e.getClassifyData();
        });
    },
    onReachBottom: function(e) {
        var a = this.data, t = a.page, i = a.pageNum, s = a.goodsList;
        t > i || this.getClassifyList("0", s);
    },
    onShareAppMessage: function(e) {
        return (0, i.activityShareMessage)();
    }
});