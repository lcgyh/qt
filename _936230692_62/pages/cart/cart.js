var t = require("../../481D43C1B878E4CF2E7B2BC653496783.js"), o = require("../../75C41DA1B878E4CF13A275A6DCF86783.js"), a = require("../../utils/loading.js"), n = require("../../AD0111C0B878E4CFCB6779C705596783.js"), r = getApp();

Page({
    data: {
        scrollTop: 0,
        refresh: 0,
        showMask: !1,
        showLogin: !1,
        cartList: [],
        showGift: !1
    },
    onLoad: function() {
        var t = this, o = wx.getStorageSync("cartFresh"), a = wx.getStorageSync("token");
        this.setData({
            windowHeight: r.globalData.windowHeight
        }, function() {
            a ? 0 == o && t.getCartList() : t.setData({
                showMask: !1,
                showLogin: !0
            });
        });
    },
    onShow: function() {
        var t = wx.getStorageSync("cartFresh");
        wx.getStorageSync("token") ? 1 == t && (this.setData({
            showLogin: !1
        }), this.getCartList(), wx.setStorageSync("cartFresh", 0)) : this.setData({
            showMask: !1,
            showLogin: !0
        });
    },
    onPageScroll: function(t) {
        this.setData({
            scrollTop: t.scrollTop
        });
    },
    getCartList: function(n, r) {
        (0, a.$Loading)();
        var e = this;
        "selectall" == n || wx.pageScrollTo({
            scrollTop: 0,
            duration: 0
        }), (0, o.getCart)(function(o) {
            var i = o.data;
            i.forEach(function(o) {
                0 != n && 1 != n && 3 != n || o.type !== n || (o.editStatus = !0), o.checkArray = [], 
                o.goodArray = [];
                var a = 0, r = 0;
                o.promotion.forEach(function(n) {
                    a += n.promotionAmount, r += n.promotionDiscountAmount, o.promotionDiscountAmount = (0, 
                    t.formatPrice)(r), o.promotionAmount = (0, t.formatPrice)(a), n.shoppingCartVos.forEach(function(a) {
                        o.goodArray.push(a), a.showPrice = (0, t.formatPrice)(a.showPrice), a.hiddenPrice = a.hiddenPrice ? (0, 
                        t.formatPrice)(a.hiddenPrice) : null, 1 === a.checkStatus && o.checkArray.push(a);
                    });
                }), o.goodArray.length === o.checkArray.length ? o.checkStatus = 1 : o.checkStatus = 0;
            }), wx.removeStorageSync("reBuyData"), 0 != n && 1 != n && 3 != n || (0, a.$Toast)({
                content: "删除成功",
                type: "success",
                duration: 1
            }), e.setData({
                cartList: i,
                fileDomain: o.fileDomain,
                showMask: !0
            }, function() {
                wx.stopPullDownRefresh(), a.$Loading.hide(), 0 == n || 1 == n || 3 == n ? setTimeout(function() {
                    e.refreshCart(r);
                }, 300) : "selectall" == n || setTimeout(function() {
                    e.refreshCart();
                }, 300);
            });
        }, function(t, o) {
            wx.stopPullDownRefresh(), a.$Loading.hide(), (0, a.$Toast)({
                content: "小Q走丢了",
                duration: 1,
                mask: !1
            });
        });
    },
    goActivity: function(t) {
        var o = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/pageHome/activityList/activityList?p=".concat(o, "&f=cart")
        });
    },
    selectAll: function(t) {
        var n = this, r = t.currentTarget.dataset.type, e = t.currentTarget.dataset.check, i = {
            type: r,
            checkStatus: -1
        };
        i.checkStatus = 1 == e ? 0 : 1, (0, a.$Loading)(), (0, o.cartCheckAllGood)(i, function(t) {
            n.getCartList("selectall");
        }, function() {
            a.$Loading.hide(), (0, a.$Toast)({
                content: "请求失败",
                duration: 1,
                mask: !1
            });
        });
    },
    showGift: function(t) {
        var o = this, a = t.currentTarget.dataset.type, n = t.currentTarget.dataset.id, r = this.data.cartList, e = [];
        r.forEach(function(t) {
            t.type == a && t.promotion.forEach(function(t) {
                t.promotionId == n && (e = t.giftLevels);
            });
        }), this.setData({
            showGiftList: e
        }, function() {
            o.setData({
                showGift: !0
            });
        });
    },
    hideGift: function() {
        this.setData({
            showGift: !1
        });
    },
    handleAnimalChange: function(t) {
        var n = this, r = t.currentTarget.dataset.cartinfoid, e = t.currentTarget.dataset.promotionid, i = t.currentTarget.dataset.type, c = t.currentTarget.dataset.check, s = this.data.cartList, u = {
            type: i,
            cartInfoId: r,
            checkStatus: -1,
            promotionId: e
        };
        u.checkStatus = 1 == c ? 0 : 1, (0, a.$Loading)(), (0, o.cartCheckGood)(u, function(t) {
            a.$Loading.hide();
            var o = t.data;
            s.forEach(function(t) {
                t.type === i && t.promotion.forEach(function(t) {
                    t.promotionId === e && (t.promotionAmount = o.promotionAmount, t.promotionDiscountAmount = o.promotionDiscountAmount, 
                    t.shoppingCartVos.forEach(function(t) {
                        t.cartInfoId === r && (t.checkStatus = u.checkStatus);
                    }));
                });
            }), n.checkOrUncheck(s);
        }, function() {
            a.$Loading.hide(), (0, a.$Toast)({
                content: "请求失败",
                duration: 1,
                mask: !1
            });
        });
    },
    checkOrUncheck: function(o) {
        o.forEach(function(o) {
            o.goodArray = [], o.checkArray = [];
            var a = 0, n = 0;
            o.promotion.forEach(function(r) {
                a += r.promotionAmount, n += r.promotionDiscountAmount, o.promotionDiscountAmount = (0, 
                t.formatPrice)(n), o.promotionAmount = (0, t.formatPrice)(a), r.shoppingCartVos.forEach(function(t) {
                    o.goodArray.push(t), 1 === t.checkStatus && o.checkArray.push(t);
                });
            }), o.goodArray.length === o.checkArray.length ? o.checkStatus = 1 : o.checkStatus = 0;
        }), console.log(o), this.setData({
            cartList: o
        });
    },
    handleChange: function(t) {
        var n = this;
        (0, a.$Loading)();
        var r = this.data.cartList, e = t.detail.value, i = t.currentTarget.dataset.promotionid, c = t.currentTarget.dataset.type, s = t.currentTarget.dataset.itit, u = {
            cartInfoId: s.cartInfoId,
            pdSpuId: s.pdSpuId,
            pdSkuId: s.pdSkuId,
            qty: e,
            promotionId: i,
            type: c
        };
        (0, o.cartChangeQty)(u, function(t) {
            var o = t.data;
            a.$Loading.hide(), r.forEach(function(t) {
                t.type === c && t.promotion.forEach(function(t) {
                    i === t.promotionId && (t.promotionAmount = o.promotionAmount, t.promotionDiscountAmount = o.promotionDiscountAmount, 
                    t.shoppingCartVos.forEach(function(t) {
                        t.cartInfoId === s.cartInfoId && (t.qty = o.contentQty, t.qtyTotal = o.qtyTotal, 
                        t.qtyStore = o.qtyStore, t.giftList = o.giftList ? o.giftList : [], t.promotionRemainQty = o.promotionRemainQty);
                    }));
                });
            }), n.checkOrUncheck(r);
        }, function(t, o) {
            a.$Loading.hide(), (0, a.$Toast)({
                content: "请求失败",
                duration: 1,
                mask: !1
            });
        });
    },
    goDetail: function(t) {
        var o = t.currentTarget.dataset.pdspuid;
        this.data.editStatus || wx.navigateTo({
            url: "/pages/pageHome/goodsDetail/goodsDetail?pdSpuId=" + o
        });
    },
    edit: function(t) {
        var o = t.currentTarget.dataset.type, a = this.data.cartList;
        a.forEach(function(t) {
            t.type == o && (t.editStatus = !0);
        }), this.setData({
            cartList: a
        });
    },
    editCompele: function(t) {
        var o = t.currentTarget.dataset.type, a = this.data.cartList;
        a.forEach(function(t) {
            t.type == o && (t.editStatus = !1);
        }), this.setData({
            cartList: a
        });
    },
    refreshCart: function(t) {
        var o = Math.random().toFixed(5);
        console.log(t), this.setData({
            refresh: o
        }, function() {
            t && setTimeout(function() {
                wx.pageScrollTo({
                    scrollTop: t,
                    duration: 0
                });
            }, 100);
        });
    },
    deleteGoods: function(t) {
        var n = this;
        wx.showModal({
            content: "确认删除这个商品吗？",
            confirmText: "删除",
            confirmColor: "#464646",
            cancelColor: "#969696",
            success: function(r) {
                if (r.confirm) {
                    (0, a.$Loading)();
                    var e = t.currentTarget.dataset, i = e.cartid, c = e.type, s = e.promotionid, u = n.data.scrollTop;
                    wx.pageScrollTo({
                        scrollTop: 0,
                        duration: 0
                    });
                    var d = {
                        cartId: i,
                        type: c,
                        promotionId: s
                    };
                    (0, o.deleteCart)(d, function(t) {
                        n.getCartList(c, u);
                    }, function() {
                        a.$Loading.hide(), (0, a.$Toast)({
                            content: "删除失败",
                            duration: 1,
                            mask: !1
                        });
                    });
                }
            }
        });
    },
    clearInvalid: function() {
        var t = this;
        wx.showModal({
            content: "确认清空失效商品吗？",
            confirmText: "清空",
            confirmColor: "#464646",
            cancelText: "我再想想",
            cancelColor: "#9B9B9B",
            success: function(n) {
                if (n.confirm) {
                    (0, a.$Loading)(), wx.pageScrollTo({
                        scrollTop: 0,
                        duration: 0
                    });
                    var r = t.data, e = r.cartList, i = r.scrollTop;
                    (0, o.clearInvalid)(function(o) {
                        a.$Loading.hide(), e.forEach(function(t) {
                            3 === t.type && (t.promotion = []);
                        }), t.setData({
                            cartList: e
                        }, function() {
                            t.refreshCart(i);
                        });
                    }, function() {
                        a.$Loading.hide(), (0, a.$Toast)({
                            content: "清空失败",
                            duration: 1,
                            mask: !1
                        });
                    });
                }
            }
        });
    },
    createOrder: function(t) {
        var o = t.currentTarget.dataset, n = o.editstatus, r = o.type;
        if (!(o.promotionamount <= 0)) if (n) (0, a.$Toast)({
            content: "请完成编辑后再结算！",
            duration: 1,
            mask: !1
        }); else {
            var e = this.data.cartList, i = [], c = [];
            e.forEach(function(t) {
                t.type === r && (i = t.checkArray);
            }), i.forEach(function(t) {
                var o = {
                    cartId: t.cartInfoId,
                    pdSpuId: t.pdSpuId,
                    pdSkuId: t.pdSkuId ? t.pdSkuId : -1,
                    qty: t.qty > t.qtyTotal ? t.qtyTotal : t.qty,
                    name: t.name,
                    displayName: t.displayName ? t.displayName : ""
                };
                c.push(o);
            });
            var s = {
                productListDTO: c,
                type: r
            }, u = JSON.stringify(s);
            wx.setStorage({
                key: "productListDTO",
                data: u,
                success: function(t) {
                    "setStorage:ok" === t.errMsg && wx.navigateTo({
                        url: "/pages/pageOrder/orderConfirm/orderConfirm?&type=1"
                    });
                }
            });
        }
    },
    onPullDownRefresh: function() {
        this.getCartList();
    },
    onShareAppMessage: function(t) {
        return (0, n.activityShareMessage)();
    }
});