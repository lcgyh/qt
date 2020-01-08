var e = require("../../../@babel/runtime/helpers/interopRequireWildcard"), t = require("../../../@babel/runtime/helpers/interopRequireDefault")(require("../../../@babel/runtime/helpers/toConsumableArray")), i = require("../../../C4DDA123B878E4CFA2BBC924B8096783.js"), s = require("../../../18B8A9E0B878E4CF7EDEC1E7E0186783.js"), a = e(require("../../../481D43C1B878E4CF2E7B2BC653496783.js")), n = require("../../../AD0111C0B878E4CFCB6779C705596783.js"), o = getApp();

Page({
    data: {
        totalList: [],
        lists: [],
        shortageLists: [],
        isShow: !1,
        selectedIds: [],
        loading: !0
    },
    onLoad: function(e) {
        var t = o.globalData.isIphoneX;
        this.setData({
            isIphoneX: t
        }), this.getList();
    },
    resetData: function() {
        this.setData({
            isShow: !1,
            selectedIds: []
        });
    },
    getList: function() {
        var e = this;
        (0, s.$Loading)(), this.setData({
            loading: !1
        }), (0, i.collectListApi)(function(t) {
            var i = t.code, a = t.data, n = t.fileDomain, o = [], r = [];
            (a = e.formatList(a)).map(function(e, t) {
                return 0 == e.qtyLeft ? r.push(e) : o.push(e), e;
            }), "200" == i && e.setData({
                loading: !0,
                totalList: a,
                lists: o,
                shortageLists: r,
                fileDomain: n
            }), s.$Loading.hide(), wx.stopPullDownRefresh();
        }, function(e) {});
    },
    formatList: function(e) {
        return e.map(function(e, t) {
            return e.showPrice = a.default.formatPrice(e.showPrice), e.hiddenPrice = e.hiddenPrice ? a.default.formatPrice(e.hiddenPrice) : null, 
            e;
        }), e;
    },
    onDelete: function() {
        var e = this, t = this.data.selectedIds;
        0 != t.length ? wx.showModal({
            title: "提示",
            content: "确认要删除选择的商品吗？",
            confirmColor: "#464646",
            cancelColor: "#969696",
            confirmText: "删除",
            success: function(a) {
                a.confirm && ((0, s.$Loading)(), (0, i.uncollectApi)({
                    favoriteIdList: t
                }, function(t) {
                    "200" == t.code && (e.getList(), e.resetData());
                }, function(e) {}));
            }
        }) : (0, s.$Toast)({
            content: "请选择需要删除的商品",
            type: "error"
        });
    },
    checkboxChange: function(e) {
        var i, s = this.data.selectedIds, a = e.detail.value, n = e.target.id;
        a.length > 0 ? s = [].concat((0, t.default)(s), (0, t.default)(a)) : (i = s.findIndex(function(e, t, i) {
            return e == n;
        }), s.splice(i, 1)), this.setData({
            selectedIds: s
        });
    },
    onEdit: function(e) {
        this.setData({
            isShow: !0
        });
    },
    onCancel: function(e) {
        this.setData({
            isShow: !1,
            selectedIds: []
        });
    },
    godetail: function(e) {
        var t = e.currentTarget.dataset.pdspuid;
        wx.navigateTo({
            url: "/pages/pageHome/goodsDetail/goodsDetail?pdSpuId=" + t
        });
    },
    onPullDownRefresh: function() {
        this.getList();
    },
    onShareAppMessage: function(e) {
        return (0, n.activityShareMessage)();
    }
});