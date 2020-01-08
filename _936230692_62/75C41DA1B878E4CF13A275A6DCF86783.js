var e = require("@babel/runtime/helpers/interopRequireDefault.js")(require("481D43C1B878E4CF2E7B2BC653496783.js")), t = {
    getCart: function(t, r) {
        e.default.request({
            url: e.default.getServerUrl("/shoppingCart/myCart/new"),
            success: t,
            fail: r
        });
    },
    cartCheckGood: function(t, r, a) {
        e.default.request({
            url: e.default.getServerUrl("/shoppingCart/checked"),
            method: "POST",
            data: t,
            success: r,
            fail: a
        });
    },
    cartCheckAllGood: function(t, r, a) {
        e.default.request({
            url: e.default.getServerUrl("/shoppingCart/promotion/selectAll"),
            data: t,
            success: r,
            fail: a
        });
    },
    cartChangeQty: function(t, r, a) {
        e.default.request({
            url: e.default.getServerUrl("/shoppingCart/changeQty"),
            method: "POST",
            data: t,
            success: r,
            fail: a
        });
    },
    addToCart: function(t, r, a) {
        e.default.request({
            url: e.default.getServerUrl("/shoppingCart/promotion/add"),
            method: "POST",
            data: t,
            success: r,
            fail: a
        });
    },
    deleteCart: function(t, r, a) {
        e.default.request({
            url: e.default.getServerUrl("/shoppingCart/promotion/delete"),
            data: t,
            success: r,
            fail: a
        });
    },
    clearInvalid: function(t, r) {
        e.default.request({
            url: e.default.getServerUrl("/shoppingCart/empty/invalidPd"),
            success: t,
            fail: r
        });
    },
    activityArea: function(t, r, a) {
        e.default.request({
            url: e.default.getServerUrl("/promotion/activityAreaSku/".concat(t)),
            success: r,
            fail: a
        });
    },
    getActivityItem: function(t, r, a) {
        e.default.request({
            url: e.default.getServerUrl("/promotion/activityAreaItem"),
            data: t,
            success: r,
            fail: a
        });
    }
};

module.exports = t;