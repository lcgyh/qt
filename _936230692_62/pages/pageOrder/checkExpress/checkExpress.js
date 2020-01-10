var e = require("../../../@babel/runtime/helpers/interopRequireDefault"), t = require("../../../C712B902B878E4CFA174D10544396783.js"), r = e(require("../../../481D43C1B878E4CF2E7B2BC653496783.js")), i = require("../../../utils/loading.js"), s = require("../../../AD0111C0B878E4CFCB6779C705596783.js");

Page({
    data: {
        active: 0,
        titleText: [ "包裹一", "包裹二", "包裹三", "包裹四", "包裹五", "包裹六", "包裹七", "包裹八", "包裹九", "包裹十", "包裹十一", "包裹十二", "包裹十三", "包裹十四", "包裹十五", "包裹十六" ],
        showMask: !1
    },
    onLoad: function(e) {
        var t = this;
        this.setData({
            orderNo: e.orderNo
        }, function() {
            t.getExpress();
        });
    },
    getExpress: function() {
        (0, i.$Loading)();
        var e = this, s = this.data.orderNo;
        (0, t.getExpressListByorderId)(s, function(t) {
            var s = t.data.list;
            s.forEach(function(e) {
                e.expressInfos.forEach(function(e, t) {
                    e.createTime = t > 0 ? r.default.formatExpressTime(e.createTime) : "";
                });
            }), e.setData({
                expressList: s,
                showMask: !0
            }, function() {
                i.$Loading.hide();
            });
        });
    },
    expressChange: function(e) {
        var t = e.detail;
        this.setData({
            active: t.index
        });
    },
    onShareAppMessage: function(e) {
        return (0, s.activityShareMessage)();
    }
});