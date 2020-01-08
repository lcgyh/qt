var e = require("../../B20FF1E6B878E4CFD46999E127296783.js"), o = require("../../18B8A9E0B878E4CF7EDEC1E7E0186783.js"), t = require("../../AD0111C0B878E4CFCB6779C705596783.js"), a = getApp();

Page({
    data: {
        showMask: !1,
        memberControl: 0,
        userInfo: "",
        messageIcon: {
            yes: "/images/me/message_fill.png",
            no: "/images/me/message.png"
        },
        userPic: "",
        mobile: "",
        showShare: !1,
        showShareImg: !1,
        customer_info_str: "",
        customer_info: {
            cellphones: [ [ "", wx.getStorageSync("userMobile") ] ]
        },
        scrollTop: 0,
        showMeTips: !1
    },
    onLoad: function() {
        (0, o.$Loading)();
        var e = a.globalData.version, t = a.globalData.statusBarHeight, s = a.globalData.windowWidth, i = a.globalData.system;
        this.setData({
            statusBarHeight: t,
            windowWidth: s,
            system: i,
            version: e
        });
    },
    onShow: function() {
        "string" == typeof this.data.customer_info_str && this.setData({
            customer_info_str: JSON.stringify(this.data.customer_info)
        }), this.getAccountInfo();
    },
    onPageScroll: function(e) {
        this.setData({
            scrollTop: e.scrollTop
        });
    },
    showShare: function() {
        this.setData({
            showShare: !this.data.showShare
        });
    },
    getAccountInfo: function() {
        var t = this;
        (0, e.getPersonDetail)(function(e) {
            var a = e.data, s = e.fileDomain, i = a.userInfo, n = a.orderInfo, r = a.activityModule, g = a.shopName, c = a.memberControl, l = "", u = "";
            if (i) {
                var w = i.level;
                switch (i.pic && (u = i.pic.indexOf("http") > -1 ? i.pic : s + i.pic), w) {
                  case 1:
                    l = "小Q兔";
                    break;

                  case 2:
                    l = "银冠兔";
                    break;

                  case 3:
                    l = "金冠兔";
                    break;

                  case 4:
                    l = "钻石兔";
                    break;

                  default:
                    l = "小Q兔";
                }
                wx.setStorageSync("userName", i.name), wx.setStorageSync("userPic", u);
            }
            1 == c && ("0" != wx.getStorageSync("showMeTips") && t.setData({
                showMeTips: !0
            }, function() {
                wx.setStorageSync("showMeTips", "0");
            }));
            t.setData({
                userInfo: i,
                orderInfo: n,
                activityModule: r,
                userPic: u,
                shopName: g,
                levelName: l,
                memberControl: c,
                fileDomain: s,
                showMask: !0
            }, function() {
                wx.stopPullDownRefresh(), o.$Loading.hide();
            });
        }, function(e, t) {
            wx.stopPullDownRefresh(), o.$Loading.hide(), (0, o.$Toast)({
                content: "小Q走丢了",
                duration: 1,
                mask: !1
            });
        });
    },
    hideMeTips: function() {
        this.setData({
            showMeTips: !1
        });
    },
    goWeb: function() {
        if (wx.getStorageSync("token")) {
            var e = this.data.userInfo.privilegelinkInfo;
            wx.navigateTo({
                url: "/pages/webView/webView?url=".concat(e, "#free")
            });
        } else wx.navigateTo({
            url: "/pages/login/login"
        });
    },
    goActivity: function() {
        var e = this.data.activityModule, o = e.linkType, t = e.linkInfo;
        if (1 == o) wx.navigateTo({
            url: "/pages/pageHome/bannerInfo/bannerInfo?pageCode=".concat(t)
        }); else if (2 == o) wx.navigateTo({
            url: "/pages/webView/webView?url=" + t
        }); else if (3 == o) wx.navigateTo({
            url: "/pages/pageHome/goodsDetail/goodsDetail?pdSpuId=" + t
        }); else if (4 == o) wx.setStorage({
            key: "goGoodsListName",
            data: "上新尖货",
            success: function(e) {
                "setStorage:ok" === e.errMsg && wx.navigateTo({
                    url: "/pages/pageHome/goodsList/goodsList?showPageType=1&type=1"
                });
            }
        }); else if (5 == o) wx.setStorage({
            key: "goGoodsListName",
            data: "热卖爆款",
            success: function(e) {
                "setStorage:ok" === e.errMsg && wx.navigateTo({
                    url: "/pages/pageHome/goodsList/goodsList?showPageType=1&type=2"
                });
            }
        }); else if (6 == o) wx.setStorage({
            key: "goGoodsListName",
            data: "跨境优选",
            success: function(e) {
                "setStorage:ok" === e.errMsg && wx.navigateTo({
                    url: "/pages/pageHome/goodsList/goodsList?showPageType=1&type=3"
                });
            }
        }); else if (7 == o) wx.navigateTo({
            url: "/pages/pageHome/brand/brand"
        }); else if (8 == o) wx.navigateTo({
            url: "/pages/pageHome/goodsList/goodsList?showPageType=4&pdCategoryId=".concat(t)
        }); else if (9 == o) wx.navigateTo({
            url: "/pages/pageHome/goodsList/goodsList?showPageType=4&pdCategoryId=-1"
        }); else if (10 == o) wx.navigateTo({
            url: "/pages/pageHome/activityList/activityList?p=".concat(t, "&f=home")
        }); else if (11 == o) this.goInvite(); else if (51 == o) {
            if (!wx.getStorageSync("token")) return void wx.navigateTo({
                url: "/pages/login/login"
            });
            this.setData({
                showShare: !0
            });
        }
    },
    goInvite: function() {
        wx.getStorageSync("token") ? wx.getStorageSync("userMobile") ? wx.navigateTo({
            url: "/pages/pageActivity/inviteUser/inviteUser"
        }) : this.setData({
            showTie: !0
        }) : wx.navigateTo({
            url: "/pages/login/login"
        });
    },
    logout: function() {
        (0, o.$Loading)();
        var t = this;
        (0, e.logout)(function(e) {
            o.$Loading.hide(), (0, o.$Toast)({
                content: "退出成功",
                duration: 2,
                mask: !1
            }), wx.removeStorageSync("token"), wx.removeStorageSync("mobile"), wx.removeStorageSync("userId"), 
            wx.removeStorageSync("userName"), wx.removeStorageSync("userPic"), wx.removeStorageSync("userMobile"), 
            wx.setStorageSync("homeFresh", 1), wx.setStorageSync("cartFresh", 1), t.getAccountInfo();
        });
    },
    goShop: function() {
        wx.navigateTo({
            url: "/pages/pageMe/shopDetail/shopDetail"
        });
    },
    goJump: function(e) {
        var o = e.currentTarget.dataset.url;
        wx.getStorageSync("token") ? wx.navigateTo({
            url: o
        }) : wx.navigateTo({
            url: "/pages/login/login"
        });
    },
    callPhone: function(o) {
        var t = o.currentTarget.dataset.phone, a = this.data.system;
        (0, e.customService)(function(e) {
            0 == e.data.status ? a.indexOf("Android") > -1 || a.indexOf("android") > -1 ? wx.showModal({
                title: "提示",
                content: t,
                confirmColor: "#464646",
                cancelColor: "#969696",
                success: function(e) {
                    e.confirm && wx.makePhoneCall({
                        phoneNumber: t
                    });
                }
            }) : wx.makePhoneCall({
                phoneNumber: t
            }) : wx.showModal({
                title: "亲，客服已经下班了哦",
                content: "客服工作时间：工作日09:00-18:00",
                confirmColor: "#464646",
                cancelColor: "#969696",
                confirmText: "知道了",
                showCancel: !1
            });
        });
    },
    onPullDownRefresh: function() {
        this.getAccountInfo();
    },
    onShareAppMessage: function(e) {
        return "button" === e.from && this.setData({
            showShare: !1
        }), (0, t.activityShareMessage)();
    }
});