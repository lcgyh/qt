var e = require("../../../B20FF1E6B878E4CFD46999E127296783.js"), t = require("../../../610D8731B878E4CF076BEF36CC696783.js"), o = require("../../../AD0111C0B878E4CFCB6779C705596783.js");

Page({
    data: {
        item: {},
        spuScope: "全部商品可用",
        couponRemark: []
    },
    onLoad: function(e) {
        var t = this, o = JSON.parse(e.item);
        this.setData({
            item: o
        }, function() {
            t.getDetail();
        });
    },
    getDetail: function() {
        var t = this, o = this.data.item;
        (0, e.getCouponsDetail)(o.couponDetailId, function(e) {
            var o = e.data, a = o.couponRemark ? o.couponRemark.split("\n") : [];
            t.setData({
                spuScope: o.spuScope,
                couponRemark: a,
                couponDetailCode: o.couponDetailCode ? o.couponDetailCode : ""
            }, function() {
                t.createCode(o.couponDetailCode);
            });
        });
    },
    createCode: function(e) {
        e && (0, t.barcode)("barcode", e, 640, 300);
    },
    onShareAppMessage: function() {
        return (0, o.activityShareMessage)();
    }
});