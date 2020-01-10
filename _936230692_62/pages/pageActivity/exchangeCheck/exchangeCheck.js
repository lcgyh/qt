var e = require("../../../B20FF1E6B878E4CFD46999E127296783.js"), o = require("../../../3AB1A716B878E4CF5CD7CF11DFE86783.js"), t = require("../../../AD0111C0B878E4CFCB6779C705596783.js"), a = require("../../../utils/loading.js");

Page({
    data: {
        showMask: !1,
        send_active: 1,
        receiveAddressInfo: null,
        formIdList: [],
        showSuccess: !1
    },
    onLoad: function(e) {
        var o = this;
        wx.getStorage({
            key: "exchangeRealGoodsInfo",
            success: function(t) {
                if ("getStorage:ok" === t.errMsg) {
                    var a = JSON.parse(t.data);
                    console.log(a), o.setData({
                        item: a,
                        fileDomain: e.fileDomain
                    }, function() {
                        o.getReceiveAddress(), wx.removeStorageSync("exchangeRealGoodsInfo");
                    });
                }
            }
        });
    },
    chooseAddress: function(e) {
        var o = this.data.send_active, t = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/pageOrder/chooseAddress/chooseAddress?send_type=".concat(o, "&receiveId=").concat(t)
        });
    },
    onShow: function() {
        var e = wx.getStorageSync("addressInfo");
        if (e) {
            var o = JSON.parse(e);
            this.setData({
                receiveAddressInfo: o
            }, function() {
                wx.removeStorageSync("addressInfo");
            });
        }
    },
    goHome: function() {
        wx.switchTab({
            url: "/pages/home/home"
        });
    },
    getReceiveAddress: function() {
        var o = this;
        (0, a.$Loading)();
        var t = this.data.receiveAddressInfo;
        (0, e.getReceiveAddress)(function(e) {
            e.data.length > 0 && e.data.forEach(function(e) {
                0 == e.defaultFlg && (t = e);
            }), o.setData({
                receiveAddressInfo: t,
                showMask: !0
            }, function() {
                a.$Loading.hide();
            });
        });
    },
    createOrder: function(e) {
        console.log(e);
        var t = this, n = e.currentTarget.dataset.clicktype, s = this.data.formIdList;
        if (s.push(e.detail.formId), this.setData({
            formIdList: s
        }), 0 == n) {
            var i = this.data, c = i.item, r = i.receiveAddressInfo;
            if (!r) return void (0, a.$Toast)({
                content: "请选择地址",
                duration: 2,
                mask: !1
            });
            (0, a.$Loading)();
            var d = this.data.formIdList.join(","), f = {
                pdSpuActiveId: c.pdSpuActiveId,
                valueQty: c.valueQty,
                receiveId: r.receiveId,
                formIdList: d
            };
            (0, o.exchangeGiftGoods)(f, function(e) {
                a.$Loading.hide(), 1 == e.data.givePdCode ? t.setData({
                    showSuccess: !0
                }) : 2 == e.data.givePdCode ? wx.showModal({
                    content: "徽章不足哦，换个奖品兑换吧",
                    confirmColor: "#464646",
                    cancelColor: "#969696",
                    confirmText: "去看看",
                    showCancel: !1,
                    complete: function() {
                        wx.navigateBack({
                            delta: 1
                        });
                    }
                }) : 3 == e.data.givePdCode ? wx.showModal({
                    content: "哎呀，下手慢了，奖品已兑完，换个奖品兑换吧",
                    confirmColor: "#464646",
                    cancelColor: "#969696",
                    confirmText: "去看看",
                    showCancel: !1,
                    complete: function() {
                        wx.navigateBack({
                            delta: 1
                        });
                    }
                }) : 4 == e.data.givePdCode && wx.showModal({
                    content: "您已兑换过这个奖品哦，换个奖品兑换吧",
                    confirmColor: "#464646",
                    cancelColor: "#969696",
                    confirmText: "去看看",
                    showCancel: !1,
                    complete: function() {
                        wx.navigateBack({
                            delta: 1
                        });
                    }
                });
            }, function(e, o) {
                a.$Loading.hide(), wx.showModal({
                    content: "提交失败",
                    confirmColor: "#464646",
                    cancelColor: "#969696",
                    confirmText: "确定",
                    showCancel: !1,
                    complete: function() {
                        wx.navigateBack({
                            delta: 1
                        });
                    }
                });
            });
        }
    },
    showSuccess: function() {
        this.setData({
            showSuccess: !1
        }, function() {
            wx.navigateBack({
                delta: 1
            });
        });
    },
    onShareAppMessage: function(e) {
        return (0, t.activityShareMessage)();
    }
});