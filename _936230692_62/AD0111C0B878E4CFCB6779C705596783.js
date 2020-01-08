var e = {
    activityShareMessage: function() {
        var e = wx.getStorageSync("spShopId"), o = wx.getStorageSync("userId");
        return console.log(e), console.log(o), {
            title: "亲爱的，找小众轻奢母婴好物，就上Qtools",
            path: "/pages/home/home?spShopId=".concat(e, "&oldUserId=").concat(o),
            imageUrl: "/images/logo_share.png"
        };
    }
};

module.exports = e;