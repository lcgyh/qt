var e = require("@babel/runtime/helpers/interopRequireDefault.js")(require("481D43C1B878E4CF2E7B2BC653496783.js")), t = {
    getBannerInfo: function(t, r, a) {
        e.default.request({
            url: e.default.getServerUrl("/pageConfig/content"),
            data: t,
            success: r,
            fail: a
        });
    },
    getClassify: function(t, r, a) {
        e.default.request({
            url: e.default.getServerUrl("/pdCategory/getCategoryInfo/" + t),
            success: r,
            fail: a
        });
    },
    getClassifyGoods: function(t, r, a) {
        e.default.request({
            url: e.default.getServerUrl("/pdCategory/search"),
            data: t,
            success: r,
            fail: a
        });
    },
    getGoodsDetailBySearch: function(t, r, a) {
        e.default.request({
            url: e.default.getServerUrl("/products/search"),
            data: t,
            success: r,
            fail: a
        });
    },
    getPromotionList: function(t, r, a) {
        e.default.request({
            url: e.default.getServerUrl("/promotion/byItem/".concat(t)),
            data: t,
            success: r,
            fail: a
        });
    },
    getGoodsBySearch: function(t, r, a) {
        e.default.request({
            url: e.default.getServerUrl("/products/searchByPage"),
            data: t,
            success: r,
            fail: a
        });
    },
    getGoodsComment: function(t, r, a) {
        e.default.request({
            url: e.default.getServerUrl("/pdEvaluate/search"),
            data: t,
            success: r,
            fail: a
        });
    },
    getCouponsByData: function(t, r, a) {
        e.default.request({
            url: e.default.getServerUrl("/couponUser/settlement/coupons"),
            data: t,
            method: "POST",
            success: r,
            fail: a
        });
    },
    collectListApi: function(t, r) {
        e.default.request({
            url: e.default.getServerUrl("/favorites/search"),
            success: t,
            fail: r
        });
    },
    collect: function(t, r, a) {
        e.default.request({
            url: e.default.getServerUrl("/favorites"),
            method: "PUT",
            data: t,
            success: r,
            fail: a
        });
    },
    uncollect: function(t, r, a) {
        e.default.request({
            url: e.default.getServerUrl("/favorites/" + t),
            method: "DELETE",
            success: r,
            fail: a
        });
    },
    uncollectApi: function(t, r, a) {
        e.default.request({
            url: e.default.getServerUrl("/favorites"),
            data: t,
            method: "DELETE",
            success: r,
            fail: a
        });
    },
    getBrandList: function(t, r, a) {
        e.default.request({
            url: e.default.getServerUrl("/brandHall/search"),
            data: t,
            success: r,
            fail: a
        });
    },
    getBrandGoodsList: function(t, r, a) {
        e.default.request({
            url: e.default.getServerUrl("/brandHall/searchProductsByBrand"),
            data: t,
            success: r,
            fail: a
        });
    },
    getSearchHistory: function(t, r) {
        e.default.request({
            url: e.default.getServerUrl("/search/history"),
            success: t,
            fail: r
        });
    },
    getotherBrandGoods: function(t, r, a) {
        e.default.request({
            url: e.default.getServerUrl("/brandHall/moreProduct"),
            data: t,
            success: r,
            fail: a
        });
    }
};

module.exports = t;