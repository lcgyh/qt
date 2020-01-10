var e = require("../../../@babel/runtime/helpers/interopRequireDefault"), a = e(require("../../../@babel/runtime/helpers/toConsumableArray")), t = e(require("../../../481D43C1B878E4CF2E7B2BC653496783.js")), i = require("../../../B20FF1E6B878E4CFD46999E127296783.js"), r = require("../../../AD0111C0B878E4CFCB6779C705596783.js"), u = require("../../../utils/loading.js");

Page({
    data: {
        list: [],
        pageNum: 1,
        pageSize: 10
    },
    onLoad: function(e) {
        this.getDetail();
    },
    getDetail: function() {
        (0, u.$Loading)();
        var e = this, r = this.data, n = r.pageNum, o = r.pageSize, s = r.list, l = {
            pageNum: n,
            pageSize: o
        };
        (0, i.getGrowDetail)(l, function(i) {
            console.log(i);
            var r = i.data, n = r.pageNum, o = r.pageInfo;
            o && (o.forEach(function(e) {
                e.detailList.forEach(function(e) {
                    e.createTime = t.default.formatAllTime(e.createTime);
                });
            }), s = [].concat((0, a.default)(s), (0, a.default)(o))), e.setData({
                list: s,
                pageNum: r.prePage + 1,
                page: n
            }, function() {
                u.$Loading.hide();
            });
        });
    },
    onReachBottom: function() {
        var e = this.data, a = e.page;
        e.pageNum > a || this.getDetail();
    },
    onShareAppMessage: function() {
        return (0, r.activityShareMessage)();
    }
});