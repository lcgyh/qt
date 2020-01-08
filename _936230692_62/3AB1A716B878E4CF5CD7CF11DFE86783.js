var e = require("@babel/runtime/helpers/interopRequireDefault.js")(require("481D43C1B878E4CF2E7B2BC653496783.js")), t = {
    inviteUser: function(t, u, a) {
        e.default.request({
            url: e.default.getServerUrl("/invitation/user/bundle"),
            method: "POST",
            data: t,
            success: u,
            fail: a
        });
    },
    getInvitedUser: function(t, u) {
        e.default.request({
            url: e.default.getServerUrl("/invitation/user/search"),
            success: t,
            fail: u
        });
    },
    getExchangeList: function(t, u) {
        e.default.request({
            url: e.default.getServerUrl("/invitation/exchange/search"),
            success: t,
            fail: u
        });
    },
    exchangeGiftGoods: function(t, u, a) {
        e.default.request({
            url: e.default.getServerUrl("/invitation/exchange/product/save"),
            method: "POST",
            data: t,
            success: u,
            fail: a
        });
    },
    exchangeGiftCoupon: function(t, u, a) {
        e.default.request({
            url: e.default.getServerUrl("/invitation/exchange/coupon/save"),
            method: "POST",
            data: t,
            success: u,
            fail: a
        });
    },
    checkExchangeDetail: function(t, u, a) {
        e.default.request({
            url: e.default.getServerUrl("/invitation/exchange/queryExchangeDetails"),
            data: t,
            success: u,
            fail: a
        });
    }
};

module.exports = t;