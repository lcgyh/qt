var e = require("@babel/runtime/helpers/interopRequireDefault.js")(require("481D43C1B878E4CF2E7B2BC653496783.js")), r = {
    readyPay: function(r, t, u) {
        e.default.request({
            url: e.default.getServerUrl("/orders/promotion/readyPay"),
            method: "POST",
            data: r,
            success: t,
            fail: u
        });
    },
    getOrder: function(r, t, u) {
        e.default.request({
            url: e.default.getServerUrl("/orders/search"),
            data: r,
            success: t,
            fail: u
        });
    },
    getAfterSale: function(r, t, u) {
        e.default.request({
            url: e.default.getServerUrl("/return"),
            data: r,
            success: t,
            fail: u
        });
    },
    orderDetail: function(r, t, u) {
        e.default.request({
            url: e.default.getServerUrl("/orders/search/".concat(r.orderId, "?virtualOrderNo=").concat(r.virtualNo)),
            success: t,
            fail: u
        });
    },
    orderComment: function(r, t, u) {
        e.default.request({
            url: e.default.getServerUrl("/orders"),
            data: r,
            method: "PUT",
            success: t,
            fail: u
        });
    },
    orderReminder: function(r, t, u) {
        e.default.request({
            url: e.default.getServerUrl("/orders/" + r + "/doReminder"),
            success: t,
            fail: u
        });
    },
    deleteOrder: function(r, t, u) {
        e.default.request({
            url: e.default.getServerUrl("/orders/" + r),
            method: "DELETE",
            success: t,
            fail: u
        });
    },
    cancelOrder: function(r, t, u) {
        e.default.request({
            url: e.default.getServerUrl("/orders/beforePay?virtualOrderNo=" + r),
            method: "DELETE",
            success: t,
            fail: u
        });
    },
    createOrder: function(r, t, u) {
        e.default.request({
            url: e.default.getServerUrl("/orders/promotion/createOrder"),
            data: r,
            method: "POST",
            success: t,
            fail: u
        });
    },
    payOrder: function(r, t, u) {
        e.default.request({
            url: e.default.getServerUrl("/orders/appletPay"),
            data: r,
            method: "POST",
            success: t,
            fail: u
        });
    },
    rebuy: function(r, t, u) {
        e.default.request({
            url: e.default.getServerUrl("/orders/repurchase/" + r),
            method: "POST",
            success: t,
            fail: u
        });
    },
    getOrderPayStatus: function(r, t, u) {
        e.default.request({
            url: e.default.getServerUrl("/orders/payStatus"),
            data: r,
            success: t,
            fail: u
        });
    },
    getExpressListByorderId: function(r, t, u) {
        e.default.request({
            url: e.default.getServerUrl("/orders/express/".concat(r, "/new")),
            success: t,
            fail: u
        });
    },
    getExpressManPositon: function(r, t, u) {
        e.default.request({
            url: e.default.getServerUrl("/orders/querylocation/" + r),
            success: t,
            fail: u
        });
    },
    getRefundReason: function(r, t) {
        e.default.request({
            url: e.default.getServerUrl("/return/getReason"),
            success: r,
            fail: t
        });
    },
    afterSaleApply: function(r, t, u) {
        e.default.request({
            url: e.default.getServerUrl("/return"),
            method: "POST",
            data: r,
            success: t,
            fail: u
        });
    },
    refundApply: function(r, t, u) {
        e.default.request({
            url: e.default.getServerUrl("/return/applicationRefund"),
            method: "POST",
            data: r,
            success: t,
            fail: u
        });
    },
    getRefundDetail: function(r, t, u) {
        e.default.request({
            url: e.default.getServerUrl("/return/detail/".concat(r)),
            success: t,
            fail: u
        });
    },
    refundCancel: function(r, t, u) {
        e.default.request({
            url: e.default.getServerUrl("/return/" + r),
            method: "DELETE",
            success: t,
            fail: u
        });
    },
    refundExpress: function(r, t, u) {
        e.default.request({
            url: e.default.getServerUrl("/return/auditpass"),
            method: "POST",
            data: r,
            success: t,
            fail: u
        });
    },
    putRealName: function(r, t, u) {
        e.default.request({
            url: e.default.getServerUrl("/uploadIdentityCard"),
            data: r,
            method: "PUT",
            success: t,
            fail: u
        });
    }
};

module.exports = r;