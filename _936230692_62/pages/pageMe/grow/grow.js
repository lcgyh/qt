var e = require("../../../B20FF1E6B878E4CFD46999E127296783.js"), t = require("../../../utils/loading.js");

Page({
    data: {
        showMask: !1,
        showPop: !1,
        windowHeight: 100,
        sliderWidth: 0,
        memberLevel: 0,
        shoppingTask: [],
        activeTask: [],
        completeInfoTask: [],
        taskInfo: {}
    },
    onLoad: function() {
        (0, t.$Loading)(), this.getContent(), this.setData({
            windowHeight: wx.getSystemInfoSync().windowHeight
        });
    },
    showPop: function(e) {
        var t = this, o = e.currentTarget.dataset.item;
        this.setData({
            taskInfo: o
        }, function() {
            t.setData({
                showPop: !0
            });
        });
    },
    hidePop: function() {
        this.setData({
            showPop: !1
        });
    },
    getContent: function() {
        var o = this;
        (0, e.getGrow)(function(e) {
            var a = e.data, n = e.fileDomain, i = a.memberLevelInfo, s = a.shoppingTask, r = a.activeTask, g = a.completeInfoTask, c = "", u = 0;
            switch (i.memberLevel) {
              case 1:
                c = "小Q兔";
                break;

              case 2:
                c = "银冠兔";
                break;

              case 3:
                c = "金冠兔";
                break;

              case 4:
                c = "钻石兔";
            }
            u = 4 === i.memberLevel ? i.userGrowthValue / 4e4 * 100 : i.userGrowthValue / i.growthUpgrade * 100, 
            o.setData({
                fileDomain: n,
                memberLevelInfo: i,
                levelName: c,
                shoppingTask: s,
                activeTask: r,
                completeInfoTask: g,
                showMask: !0
            }, function() {
                t.$Loading.hide(), setTimeout(function() {
                    o.setData({
                        sliderWidth: u
                    });
                }, 500);
            });
        }, function() {
            t.$Loading.hide(), (0, t.$Toast)({
                content: "数据获取失败",
                duration: 1.5
            });
        });
    },
    goExplain: function() {
        var e = this.data.memberLevelInfo.growthTaskExplainUrl;
        wx.navigateTo({
            url: "/pages/webView/webView?url=".concat(e)
        });
    },
    goDetail: function() {
        wx.navigateTo({
            url: "/pages/pageMe/growDetail/growDetail"
        });
    },
    goEvent: function(o) {
        var a = this, n = o.currentTarget.dataset, i = n.linktype, s = n.linkinfo;
        n.can || (console.log(i), console.log(s), 1 == i ? ((0, t.$Toast)({
            content: "即将跳转到首页...",
            duration: 0
        }), setTimeout(function() {
            t.$Toast.hide(), wx.switchTab({
                url: "/pages/home/home"
            });
        }, 1e3)) : 2 == i ? ((0, t.$Toast)({
            content: "即将跳转到商品分类页...",
            duration: 0
        }), setTimeout(function() {
            t.$Toast.hide(), wx.navigateTo({
                url: "/pages/pageHome/goodsList/goodsList?showPageType=4&pdCategoryId=".concat(s)
            });
        }, 1e3)) : 5 == i ? wx.navigateTo({
            url: "/pages/pageMe/meDetail/meDetail"
        }) : 6 == i && (0, e.signInEveryday)(function(e) {
            (0, t.$Toast)({
                content: "签到成功+5成长值",
                duration: 1.5
            }), a.getContent();
        }, function(e, o) {
            (0, t.$Toast)({
                content: "签到失败",
                duration: 1.5
            });
        }));
    },
    onPullDownRefresh: function() {
        this.getContent();
    },
    onShareAppMessage: function(t) {
        var o = this;
        if ("button" === t.from) {
            var a = t.target.dataset, n = a.type, i = a.taskid, s = a.can;
            3 != n || s || (0, e.getGrowValueByShare)({
                taskId: i
            }, function() {
                o.getContent();
            });
        }
        var r = wx.getStorageSync("spShopId"), g = wx.getStorageSync("userId");
        return {
            title: "亲爱的，找小众轻奢母婴好物，就上Qtools",
            path: "/pages/home/home?spShopId=".concat(r, "&oldUserId=").concat(g),
            imageUrl: "/images/logo_share.png"
        };
    }
});