var e = require("../../../B20FF1E6B878E4CFD46999E127296783.js"), o = require("../../../AD0111C0B878E4CFCB6779C705596783.js"), r = require("../../../18B8A9E0B878E4CF7EDEC1E7E0186783.js");

Page({
    data: {
        bgIndex: 0,
        list: [],
        memberCurrentLevel: 0,
        sliderWidth: 0
    },
    onLoad: function(e) {
        (0, r.$Loading)(), this.getInfo();
    },
    bgChange: function(e) {
        var o = e.detail;
        this.setData({
            bgIndex: o.current
        });
    },
    getInfo: function() {
        var o = this;
        (0, e.getMemberInfo)(function(e) {
            var t = e.data, n = e.fileDomain, a = 0;
            t.levelInfo.forEach(function(e) {
                switch (e.memberLevel === t.memberCurrentLevel && (a = 4 === e.memberLevel ? e.memberLevelInfo.userGrowthValue / 4e4 * 100 : e.memberLevelInfo.userGrowthValue / e.memberLevelInfo.growthUpgrade * 100), 
                e.memberLevel) {
                  case 1:
                    e.levelName = "小Q兔", e.fontColor = "#03C3B2";
                    break;

                  case 2:
                    e.levelName = "银冠兔", e.fontColor = "#9FA6B9";
                    break;

                  case 3:
                    e.levelName = "金冠兔", e.fontColor = "#CAA15E";
                    break;

                  case 4:
                    e.levelName = "钻石兔", e.fontColor = "#7C6FAF";
                }
                e.levelCoupon && e.levelCoupon.rightsList.forEach(function(o) {
                    e.memberLevel === t.memberCurrentLevel ? o.whetherReceive ? (o.receiveCouponText = "查看优惠券", 
                    o.goType = 1) : (o.receiveCouponText = "立即领取", o.goType = 2) : o.whetherReceive ? (o.receiveCouponText = "查看优惠券", 
                    o.goType = 1) : (o.receiveCouponText = "LV".concat(e.memberLevel, "等级券"), o.goType = 3);
                }), e.freeExpress && e.freeExpress.backPicUrl && e.freeExpress.backPicUrl.indexOf("http") < 0 && (e.freeExpress.backPicUrl = n + e.freeExpress.backPicUrl), 
                e.birthdayCoupon && e.birthdayCoupon.backPicUrl && e.birthdayCoupon.backPicUrl.indexOf("http") < 0 && (e.birthdayCoupon.backPicUrl = n + e.birthdayCoupon.backPicUrl);
            }), o.setData({
                list: t.levelInfo,
                memberCurrentLevel: t.memberCurrentLevel,
                ruleUrl: t.levelRule,
                bgIndex: t.memberCurrentLevel - 1,
                index: t.memberCurrentLevel - 1,
                fileDomain: n
            }, function() {
                r.$Loading.hide(), setTimeout(function() {
                    o.setData({
                        sliderWidth: a
                    });
                }, 500);
            });
        }, function(e, o) {
            r.$Loading.hide(), (0, r.$Toast)({
                content: "小Q走丢了",
                duration: 1.5
            });
        });
    },
    goGrow: function() {
        wx.navigateTo({
            url: "/pages/pageMe/grow/grow"
        });
    },
    couponEvent: function(e) {
        var o = e.currentTarget.dataset, t = o.couponid, n = o.rightsid, a = o.gotype;
        1 == a ? wx.navigateTo({
            url: "/pages/pageMe/coupon/coupon"
        }) : 2 == a ? this.receiveCoupon(t, n) : 3 == a && (0, r.$Toast)({
            content: "非当前等级优惠券不可领取",
            duration: 2
        });
    },
    receiveCoupon: function(o, t) {
        var n = this, a = {
            couponId: o,
            rightsId: t
        };
        (0, r.$Loading)(), (0, e.receiveLevelCoupon)(a, function(e) {
            r.$Loading.hide(), (0, r.$Toast)({
                content: "领取成功",
                duration: 0
            }), setTimeout(function() {
                r.$Toast.hide(), n.getInfo();
            }, 1500);
        }, function(e, o) {
            r.$Loading.hide(), n.getInfo(), o.data.message ? (0, r.$Toast)({
                content: o.data.message,
                duration: 1.5
            }) : o.data.errorMessage ? (0, r.$Toast)({
                content: o.data.errorMessage,
                duration: 1.5
            }) : (0, r.$Toast)({
                content: "领取优惠券失败",
                duration: 1.5
            });
        });
    },
    goWeb: function(e) {
        var o = e.currentTarget.dataset, r = o.type, t = o.url, n = "";
        n = r ? "/pages/webView/webView?url=".concat(t, "#").concat(r) : "/pages/webView/webView?url=".concat(t), 
        wx.navigateTo({
            url: n
        });
    },
    onShareAppMessage: function(e) {
        return (0, o.activityShareMessage)();
    }
});