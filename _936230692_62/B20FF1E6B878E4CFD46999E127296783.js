var e = require("@babel/runtime/helpers/interopRequireDefault.js")(require("481D43C1B878E4CF2E7B2BC653496783.js")), t = {
    getPhoneCode: function(t, r, u) {
        e.default.request({
            url: e.default.getServerUrl("/appLogin/".concat(t)),
            success: r,
            fail: u
        });
    },
    login: function(t, r, u) {
        e.default.request({
            url: e.default.getServerUrl("/appLogin/appletAuthorizeLogin"),
            method: "POST",
            data: t,
            success: r,
            fail: u
        });
    },
    logout: function(t, r) {
        e.default.request({
            url: e.default.getServerUrl("/appLogin"),
            method: "DELETE",
            success: t,
            fail: r
        });
    },
    getPersonInfo: function(t, r) {
        e.default.request({
            url: e.default.getServerUrl("/personalMsg/detail"),
            success: t,
            fail: r
        });
    },
    getPersonDetail: function(t, r) {
        e.default.request({
            url: e.default.getServerUrl("/personalMsg/info"),
            success: t,
            fail: r
        });
    },
    changePhone: function(t, r, u) {
        e.default.request({
            url: e.default.getServerUrl("/personalMsg"),
            method: "POST",
            data: t,
            success: r,
            fail: u
        });
    },
    changePersonInfo: function(t, r, u) {
        e.default.request({
            url: e.default.getServerUrl("/personalMsg"),
            method: "PUT",
            data: t,
            success: r,
            fail: u
        });
    },
    getCityDic: function(t, r) {
        e.default.request({
            url: e.default.getServerUrl("/app/initArea"),
            success: t,
            fail: r
        });
    },
    getCoupons: function(t, r) {
        e.default.request({
            url: e.default.getServerUrl("/couponUser/user/coupons"),
            success: t,
            fail: r
        });
    },
    getCouponsDetail: function(t, r, u) {
        e.default.request({
            url: e.default.getServerUrl("/couponUser/user/coupon/detail/" + t),
            method: "GET",
            success: r,
            fail: u
        });
    },
    changeBabyInfo: function(t, r, u) {
        e.default.request({
            url: e.default.getServerUrl("/babys"),
            data: t,
            method: "PUT",
            success: r,
            fail: u
        });
    },
    deleteBabyInfo: function(t, r, u) {
        e.default.request({
            url: e.default.getServerUrl("/babys/" + t),
            method: "DELETE",
            success: r,
            fail: u
        });
    },
    saveBabyInfo: function(t, r, u) {
        e.default.request({
            url: e.default.getServerUrl("/babys"),
            data: t,
            method: "PUT",
            success: r,
            fail: u
        });
    },
    putOpinions: function(t, r, u) {
        e.default.request({
            url: e.default.getServerUrl("/opinions"),
            data: t,
            method: "POST",
            success: r,
            fail: u
        });
    },
    bindPhone: function(t, r, u) {
        e.default.request({
            url: e.default.getServerUrl("/appLogin"),
            data: t,
            method: "POST",
            success: r,
            fail: u
        });
    },
    uploadImg: function(t, r, u) {
        var s = wx.getStorageSync("token");
        wx.uploadFile({
            url: e.default.getServerUrl("/upload/image"),
            filePath: t,
            name: "file",
            header: {
                "Content-Type": "multipart/form-data",
                accessToken: s
            },
            formData: {},
            success: r,
            fail: u
        });
    },
    customService: function(t, r) {
        e.default.request({
            url: e.default.getServerUrl("/customService"),
            method: "GET",
            success: t,
            fail: r
        });
    },
    getMemberInfo: function(t, r) {
        e.default.request({
            url: e.default.getServerUrl("/member/center"),
            success: t,
            fail: r
        });
    },
    receiveLevelCoupon: function(t, r, u) {
        e.default.request({
            url: e.default.getServerUrl("/member/level/coupon"),
            data: t,
            success: r,
            fail: u
        });
    },
    getGrow: function(t, r) {
        e.default.request({
            url: e.default.getServerUrl("/member/myGrowth/value"),
            success: t,
            fail: r
        });
    },
    getGrowDetail: function(t, r, u) {
        e.default.request({
            url: e.default.getServerUrl("/member/growth/detail"),
            data: t,
            success: r,
            fail: u
        });
    },
    signInEveryday: function(t, r) {
        e.default.request({
            url: e.default.getServerUrl("/member/signIn"),
            success: t,
            fail: r
        });
    },
    getGrowValueByShare: function(t, r, u) {
        e.default.request({
            url: e.default.getServerUrl("/member/growthTask/share"),
            data: t,
            success: r,
            fail: u
        });
    },
    getStore: function(t, r, u) {
        e.default.request({
            url: e.default.getServerUrl("/shops"),
            data: t,
            success: r,
            fail: u
        });
    },
    pickStore: function(t, r, u) {
        e.default.request({
            url: e.default.getServerUrl("/shops"),
            method: "POST",
            data: t,
            success: r,
            fail: u
        });
    },
    getShopDetail: function(t, r, u) {
        e.default.request({
            url: e.default.getServerUrl("/shops/getShopDetail"),
            data: t,
            success: r,
            fail: u
        });
    },
    getReceiveAddress: function(t, r) {
        e.default.request({
            url: e.default.getServerUrl("/userReceiveAddress/getReceiveAddress"),
            success: t,
            fail: r
        });
    },
    addReceiveAddress: function(t, r, u) {
        e.default.request({
            url: e.default.getServerUrl("/userReceiveAddress"),
            method: "POST",
            data: t,
            success: r,
            fail: u
        });
    },
    editReceiveAddress: function(t, r, u) {
        e.default.request({
            url: e.default.getServerUrl("/userReceiveAddress"),
            method: "PUT",
            data: t,
            success: r,
            fail: u
        });
    },
    deleteReceiveAddress: function(t, r, u) {
        e.default.request({
            url: e.default.getServerUrl("/userReceiveAddress?receiveId=" + t),
            method: "DELETE",
            success: r,
            fail: u
        });
    },
    setDefaultAddress: function(t, r, u) {
        e.default.request({
            url: e.default.getServerUrl("/userReceiveAddress/setDefaultAddress"),
            method: "POST",
            data: t,
            success: r,
            fail: u
        });
    }
};

module.exports = t;