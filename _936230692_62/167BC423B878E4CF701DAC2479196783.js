var e = require("@babel/runtime/helpers/interopRequireDefault.js")(require("481D43C1B878E4CF2E7B2BC653496783.js")), t = {
    homeContent: function(t, u) {
        e.default.request({
            url: e.default.getServerUrl("/homePage/content"),
            success: t,
            fail: u
        });
    },
    homeGoods: function(t, u, r) {
        e.default.request({
            url: e.default.getServerUrl("/homePage/pdFlowSpu/".concat(t)),
            success: u,
            fail: r
        });
    },
    newUserCoupon: function(t, u) {
        e.default.request({
            url: e.default.getServerUrl("/couponUser/activity/coupons"),
            success: t,
            fail: u
        });
    },
    themeList: function(t, u) {
        e.default.request({
            url: e.default.getServerUrl("/themeActivity/online"),
            success: t,
            fail: u
        });
    },
    homeVersion: function(t, u, r) {
        e.default.request({
            url: e.default.getServerUrl("/homePage/versionCheck"),
            data: t,
            success: u,
            fail: r
        });
    },
    getActivityGoods: function(t, u, r) {
        e.default.request({
            url: e.default.getServerUrl("/promotion/activityAreaSpu"),
            data: t,
            success: u,
            fail: r
        });
    },
    getHomePop: function(t, u) {
        e.default.request({
            url: e.default.getServerUrl("/popup"),
            success: t,
            fail: u
        });
    }
};

module.exports = t;