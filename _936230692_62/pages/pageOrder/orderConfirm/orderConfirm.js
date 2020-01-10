var e = require("../../../@babel/runtime/helpers/interopRequireDefault"), t = e(require("../../../481D43C1B878E4CF2E7B2BC653496783.js")), a = require("../../../C712B902B878E4CFA174D10544396783.js"), r = e(require("../../../2B492AF4B878E4CF4D2F42F3B1E86783.js")), o = require("../../../utils/loading.js"), s = require("../../../AD0111C0B878E4CFCB6779C705596783.js"), n = getApp();

Page({
    data: {
        type: "",
        receiveAddressInfo: {},
        goodsInfo: [],
        totalPrice: 0,
        lastPrice: 0,
        coupon: "",
        fileDomain: "",
        hasUsed: !0,
        showMask: !1,
        send_active: -1,
        needText: "",
        idCard: "",
        showDelivers: !1,
        showClearGift: !1,
        showFreeExpress: !1,
        clearGift: [],
        saveClearGiftList: [],
        useFree: 0,
        icon: {
            check: "/images/checkbox_fill.png",
            uncheck: "/images/checkbox.png"
        }
    },
    onLoad: function(e) {
        var t = this, a = n.globalData.isIphoneX;
        if (0 == e.type) {
            var r = e.pdSpuId, o = e.pdSkuId, s = e.qty;
            this.setData({
                pdSpuInfo: {
                    pdSpuId: r,
                    pdSkuId: o,
                    qty: s
                },
                isIphoneX: a,
                sourceType: e.type
            }, function() {
                t.createOrder();
            });
        } else 1 == e.type && wx.getStorage({
            key: "productListDTO",
            success: function(r) {
                if ("getStorage:ok" === r.errMsg) {
                    var o = r.data, s = JSON.parse(o);
                    t.setData({
                        cartSpuInfo: {
                            productListDTO: s.productListDTO,
                            type: s.type
                        },
                        sourceType: e.type,
                        isIphoneX: a
                    }, function() {
                        t.createOrder(), wx.removeStorageSync("productListDTO");
                    });
                }
            }
        });
    },
    createOrder: function() {
        var e = this;
        (0, o.$Loading)();
        var r = this.data, s = r.pdSpuInfo, n = r.cartSpuInfo, i = r.sourceType, c = r.send_active, d = {};
        d = 0 == i ? {
            sourceType: i,
            pdSpuInfo: s
        } : {
            sourceType: i,
            cartSpuInfo: n
        }, (0, a.readyPay)(d, function(a) {
            var r = e, s = a.data, n = s.packageList, i = s.giftList, d = "暂无可用";
            "E_200" != s.orderCode ? (s.couponCount > 0 && (d = "有".concat(s.couponCount, "张可用"), 
            r.setData({
                hasUsed: !1
            })), c = 2 == s.assignType ? 0 : 1, n.forEach(function(e) {
                e.pdSpuList.forEach(function(e) {
                    e.showPrice = e.showPrice ? t.default.formatPrice(e.showPrice) : 0;
                });
            }), s.expressFee = t.default.formatPrice(s.expressFee), s.expressFee = t.default.formatPrice(s.expressFee), 
            s.amountSum = t.default.formatPrice(s.amountSum), s.activityAmount = t.default.formatPrice(s.activityAmount), 
            r.setData({
                send_active: c,
                cardInfoNeedPic: s.cardInfoNeedPic,
                assignType: s.assignType,
                idCard: s.idCardNum,
                lastGoodsInfo: s.dataList,
                goodsInfo: n,
                giftList: i,
                receiveAddressInfo: s.receiveAddressVo,
                allInfo: s,
                fileDomain: a.fileDomain,
                coupon: d,
                cardInfo: s.cardInfo,
                showMask: !0
            }, function() {
                o.$Loading.hide(), wx.stopPullDownRefresh(), r.computeLastPrice(1);
            })) : wx.showToast({
                title: "下单失败！"
            });
        }, function(e, t) {
            if (o.$Loading.hide(), "E_300" == e || "E_501" == e || 500 == e || 502 == e) {
                var a = "";
                wx.setStorageSync("cartFresh", 1), a = t.data.message ? t.data.message : t.data.errMsg ? t.data.errMsg : t.data.errorMsg ? t.data.errorMsg : "小Q走丢了", 
                (0, o.$Toast)({
                    content: a,
                    duration: 0
                }), setTimeout(function() {
                    o.$Toast.hide(), wx.navigateBack({
                        delta: 1
                    });
                }, 1500);
            }
        });
    },
    chooseUse: function(e) {
        var t = this, a = e.currentTarget.dataset.use;
        this.setData({
            useFree: a,
            showFreeExpress: !1
        }, function() {
            t.computeLastPrice();
        });
    },
    removeGift: function() {
        var e = this, t = this.data.saveClearGiftList;
        this.setData({
            clearGift: t,
            showClearGift: !1
        }, function() {
            e.createOrder();
        });
    },
    onShow: function() {
        var e = this, t = wx.getStorageSync("couponInfo"), a = wx.getStorageSync("addressInfo"), r = wx.getStorageSync("cardInfo");
        if (t) {
            var o = JSON.parse(t);
            this.setData({
                haveChooseCoupon: !0,
                couponInfo: o
            }, function() {
                e.computeLastPrice(), wx.removeStorageSync("couponInfo");
            });
        }
        if (a) {
            var s = JSON.parse(a);
            this.setData({
                receiveAddressInfo: s,
                useFree: 0
            }, function() {
                e.computeLastPrice(), wx.removeStorageSync("addressInfo");
            });
        }
        if (r) {
            var n = JSON.parse(r);
            this.setData({
                cardInfo: n
            }, function() {
                wx.removeStorageSync("cardInfo");
            });
        }
    },
    showFreeExpress: function() {
        var e = this.data.send_price;
        -1 != e && 0 != e && this.setData({
            showFreeExpress: !this.data.showFreeExpress
        });
    },
    goBack: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    showDelivers: function() {
        this.setData({
            showDelivers: !this.data.showDelivers
        });
    },
    goAgreement: function() {
        var e = this.data.allInfo.userAgreementUrl;
        wx.navigateTo({
            url: "/pages/webView/webView?url=".concat(e)
        });
    },
    goRealName: function() {
        var e = this.data, t = e.cardInfo, a = e.cardInfoNeedPic, r = e.fileDomain;
        if (t) {
            var o = JSON.stringify(t);
            wx.setStorage({
                key: "buyerInfo",
                data: o,
                success: function(e) {
                    if ("setStorage:ok" === e.errMsg) {
                        var t = a ? 1 : 0;
                        wx.navigateTo({
                            url: "/pages/pageOrder/realName/realName?type=1&needPic=".concat(t, "&fileDomain=").concat(r)
                        });
                    }
                }
            });
        } else {
            var s = a ? 1 : 0;
            wx.navigateTo({
                url: "/pages/pageOrder/realName/realName?needPic=".concat(s, "&fileDomain=").concat(r)
            });
        }
    },
    onPullDownRefresh: function() {
        this.createOrder();
    },
    sendChange: function(e) {
        var t = this, a = e.detail.title, r = -1;
        "门店自提" == a ? r = 0 : "快递邮寄" == a ? r = 1 : "即时配送" == a && (r = 2), this.setData({
            send_active: r
        }, function() {
            t.computeLastPrice();
        });
    },
    clickDisabled: function(e) {
        var t = e.detail.title;
        "门店自提" == t ? (0, o.$Toast)({
            content: "门店存在部分商品缺货，无法选择门店自提",
            duration: 1.5
        }) : "即时配送" == t && (0, o.$Toast)({
            content: "门店存在部分商品缺货，无法提供即时配送服务",
            duration: 1.5
        });
    },
    chooseAddress: function(e) {
        var t = this.data.send_active, a = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/pageOrder/chooseAddress/chooseAddress?send_type=".concat(t, "&receiveId=").concat(a)
        });
    },
    computeLastPrice: function(e) {
        var a = this.data, o = a.couponInfo, s = a.allInfo, n = a.send_active, i = a.receiveAddressInfo, c = a.useFree, d = s.provinceInFreeAmount, u = s.provinceOutFreeAmount, f = s.provinceInExpressAmount, l = s.provinceOutExpressAmount, p = s.deliveryFee, g = s.totalMoney, h = s.totalMoney, m = s.isBrand, v = 0, w = 0, y = 0, S = "";
        if (o && (v = t.default.formatPrice(o.price), h = r.default.sub(g, v), this.setData({
            coupon: "-￥".concat(v),
            hasUsed: !0
        })), !i) return g = t.default.formatPrice(g), h = t.default.formatPrice(h), w = t.default.formatPrice(w), 
        void this.setData({
            totalPrice: g,
            send_price: w,
            lastPrice: h
        });
        var I = i.areaType;
        0 == s.assignType ? (h = h, w = 0) : 0 == n ? (h = h, w = 0) : 1 == n ? 1 == m ? (h = h, 
        w = 0) : 1 == I ? g >= d ? (h = h, w = 0) : (h = r.default.add(h, f), w = f, y = r.default.sub(d, g), 
        S = "还差".concat(y, "元免邮费")) : 2 == I ? g >= u ? (h = h, w = 0) : (h = r.default.add(h, l), 
        w = l, y = r.default.sub(u, g), S = "还差".concat(y, "元免邮费")) : 3 == I && (w = -1) : 2 == n && (g >= d ? (h = h, 
        w = 0) : (h = r.default.add(h, p), w = p, y = r.default.sub(d, g), S = "还差".concat(y, "元免邮费"))), 
        1 == c && (h = r.default.sub(h, w)), g = t.default.formatPrice(g), h = t.default.formatPrice(h), 
        w = t.default.formatPrice(w), this.setData({
            totalPrice: g,
            needText: S,
            send_price: w,
            lastPrice: h,
            useFree: c
        });
    },
    chooseCoupon: function() {
        var e = this.data.allInfo, t = e.couponCount, a = e.pdSpuGiftList;
        if (t <= 0) return !1;
        var r = JSON.stringify(a);
        wx.setStorage({
            key: "chooseCouponSpuList",
            data: r,
            success: function(e) {
                "setStorage:ok" === e.errMsg && wx.navigateTo({
                    url: "/pages/pageOrder/chooseCoupon/chooseCoupon"
                });
            }
        });
    },
    showClearGift: function() {
        this.setData({
            showClearGift: !this.data.showClearGift
        });
    },
    createOrderAjax: function() {
        var e = this, r = this, s = this.data, n = s.clearGift, i = s.lastPrice, c = s.sourceType, d = s.lastGoodsInfo, u = s.couponInfo, f = s.cardInfoNeedPic, l = s.receiveAddressInfo, p = s.cardInfo, g = s.send_active, h = s.assignType, m = s.idCard, v = s.fileDomain, w = s.useFree, y = s.allInfo;
        if (!y.usersVo.mobile) return (0, o.$Toast)({
            content: "您未绑定手机号，无法下单",
            duration: 2
        }), !1;
        var S = -1, I = 0;
        if (0 == g) S = 1, I = -1; else if (1 == g) {
            if (!l) return (0, o.$Toast)({
                content: "请填写收货地址",
                duration: 2
            }), !1;
            if (0 == h) {
                if (!p) return f ? wx.showModal({
                    content: "此订单为保税仓商品，且包含海外直邮商品，为保证清关顺利，需要您填写身份证信息并上传身份证照片。",
                    confirmColor: "#464646",
                    confirmText: "去填写",
                    cancelText: "取消",
                    cancelColor: "#969696",
                    success: function(e) {
                        if (e.confirm) {
                            var t = f ? 1 : 0;
                            wx.navigateTo({
                                url: "/pages/pageOrder/realName/realName?needPic=".concat(t, "&fileDomain=").concat(v)
                            });
                        }
                    }
                }) : wx.showModal({
                    content: "此订单为保税仓商品，因清关需要，请填写身份证信息",
                    confirmColor: "#464646",
                    confirmText: "去填写",
                    cancelText: "取消",
                    cancelColor: "#969696",
                    success: function(e) {
                        if (e.confirm) {
                            var t = f ? 1 : 0;
                            wx.navigateTo({
                                url: "/pages/pageOrder/realName/realName?needPic=".concat(t, "&fileDomain=").concat(v)
                            });
                        }
                    }
                }), !1;
                if (f && (!p.facePicUrl || !p.backPicUrl)) return wx.showModal({
                    content: "此订单中存在海外直邮商品，为保证清关顺利，需要您上传身份证照片",
                    confirmText: "去上传",
                    cancelText: "取消",
                    confirmColor: "#464646",
                    cancelColor: "#969696",
                    success: function(e) {
                        if (e.confirm) {
                            var t = JSON.stringify(p);
                            wx.setStorage({
                                key: "buyerInfo",
                                data: t,
                                success: function(e) {
                                    if ("setStorage:ok" === e.errMsg) {
                                        var t = f ? 1 : 0;
                                        wx.navigateTo({
                                            url: "/pages/pageOrder/realName/realName?type=1&needPic=".concat(t, "&fileDomain=").concat(v)
                                        });
                                    }
                                }
                            });
                        }
                    }
                }), !1;
            }
            S = 3, I = l.receiveId;
        } else if (2 == g) {
            if (!l) return (0, o.$Toast)({
                content: "请填写收货地址",
                duration: 2
            }), !1;
            if (1 == l.distanceOver) return (0, o.$Toast)({
                content: "您选择的收货地址超出配送范围",
                duration: 2
            }), !1;
            S = 2, I = l.receiveId;
        }
        (0, o.$Loading)();
        var x = {
            pdSpuInfoList: [],
            deliveryType: S,
            deliveryAddrId: I,
            formIdList: "",
            idCardNum: m || "",
            assignType: h,
            identityId: p ? p.identityId : "",
            confirmId: p ? p.confirmId : "",
            source: 0 == c ? 2 : 1,
            type: 3,
            willClearGiftList: n.length > 0 ? n : null,
            totalAmount: i,
            couponInfo: {
                couponId: null,
                couponMoney: null
            },
            equityId: 1 == w ? y.freeExpressCardInfo.equityId : null,
            memberLevel: y.memberLevel
        };
        0 == c ? x.pdSpuInfoList.push({
            pdSpuId: d[0].pdSpuId,
            qty: d[0].qty,
            pdSkuId: d[0].pdSkuId ? d[0].pdSkuId : -1,
            price: d[0].price,
            showPrice: d[0].showPrice
        }) : 1 == c && d.forEach(function(e) {
            x.pdSpuInfoList.push({
                pdSpuId: e.pdSpuId,
                qty: e.qty,
                pdSkuId: e.pdSkuId ? e.pdSkuId : -1,
                price: e.price,
                cartId: e.cartId,
                showPrice: e.showPrice
            });
        }), u && (x.couponInfo.couponId = u.couponId, x.couponInfo.couponMoney = u.couponMoney), 
        (0, a.createOrder)(x, function(a) {
            if ("E_100" == a.data.orderCode || "E_200" == a.data.orderCode || "E_500" == a.data.orderCode) return o.$Loading.hide(), 
            wx.showModal({
                title: "提交失败",
                content: a.data.orderMessage ? a.data.orderMessage : "系统错误",
                confirmText: "回购物袋",
                confirmColor: "#464646",
                cancelText: "回首页",
                cancelColor: "#969696",
                success: function(e) {
                    e.confirm ? wx.setStorage({
                        key: "cartFresh",
                        data: 1,
                        success: function(e) {
                            "setStorage:ok" === e.errMsg && wx.switchTab({
                                url: "/pages/cart/cart"
                            });
                        }
                    }) : wx.setStorage({
                        key: "homeFresh",
                        data: "0",
                        success: function(e) {
                            "setStorage:ok" === e.errMsg && wx.switchTab({
                                url: "/pages/home/home"
                            });
                        }
                    });
                }
            }), !1;
            if ("E_300" == a.data.orderCode) {
                o.$Loading.hide();
                var s = a.data.packageList;
                return g = 2 == a.data.assignType ? 0 : 1, s.forEach(function(e) {
                    e.pdSpuList.forEach(function(e) {
                        e.showPrice = e.showPrice ? t.default.formatPrice(e.showPrice) : 0;
                    });
                }), void r.setData({
                    send_active: g,
                    assignType: a.data.assignType,
                    goodsInfo: s
                }, function() {
                    (0, o.$Toast)({
                        content: "此订单中的商品发生变化，将为你拆成两个包裹邮寄，请重新确认订单",
                        duration: 2
                    });
                });
            }
            if ("E_400" != a.data.orderCode) {
                if ("E_600" == a.data.orderCode) return o.$Loading.hide(), (0, o.$Toast)({
                    content: a.data.orderMessage ? a.data.orderMessage : "当前订单有变动，请重新确认订单",
                    duration: 1500
                }), void r.createOrder();
                wx.setStorageSync("cartFresh", 1), wx.login({
                    success: function(e) {
                        "login:ok" === e.errMsg && r.payOrderAjax(a.data.orderId, a.data.virtualNo, e.code);
                    }
                });
            } else {
                o.$Loading.hide();
                var n = a.data.willClearGiftList;
                e.setData({
                    saveClearGiftList: n,
                    showClearGift: !0
                });
            }
        }, function(e, t) {
            o.$Loading.hide(), console.log(t);
            var a = t.data;
            a.errorCode && a.errorMessage ? wx.showModal({
                title: "提交失败",
                content: a.errorMessage ? a.errorMessage : "下单失败",
                confirmText: "回购物袋",
                confirmColor: "#464646",
                cancelText: "回首页",
                cancelColor: "#969696",
                success: function(e) {
                    e.confirm ? wx.setStorage({
                        key: "cartFresh",
                        data: 1,
                        success: function(e) {
                            "setStorage:ok" === e.errMsg && wx.switchTab({
                                url: "/pages/cart/cart"
                            });
                        }
                    }) : wx.setStorage({
                        key: "homeFresh",
                        data: 1,
                        success: function(e) {
                            "setStorage:ok" === e.errMsg && wx.switchTab({
                                url: "/pages/home/home"
                            });
                        }
                    });
                }
            }) : 1002 == e ? (0, o.$Toast)({
                content: a.data.orderMessage,
                duration: 2
            }) : wx.showModal({
                title: "提交失败",
                content: "系统错误",
                confirmText: "回购物袋",
                confirmColor: "#464646",
                cancelText: "回首页",
                cancelColor: "#969696",
                success: function(e) {
                    e.confirm ? wx.setStorage({
                        key: "cartFresh",
                        data: 1,
                        success: function(e) {
                            "setStorage:ok" === e.errMsg && wx.switchTab({
                                url: "/pages/cart/cart"
                            });
                        }
                    }) : wx.setStorage({
                        key: "homeFresh",
                        data: 1,
                        success: function(e) {
                            "setStorage:ok" === e.errMsg && wx.switchTab({
                                url: "/pages/home/home"
                            });
                        }
                    });
                }
            });
        });
    },
    payOrderAjax: function(e, t, r) {
        var s = this, n = {
            orderId: e,
            virtualNo: t,
            code: r
        };
        (0, a.payOrder)(n, function(a) {
            o.$Loading.hide(), wx.requestPayment({
                timeStamp: a.data.timeStamp,
                nonceStr: a.data.nonceStr,
                package: a.data.package,
                signType: a.data.signType,
                paySign: a.data.paySign,
                success: function(a) {
                    "requestPayment:ok" == a.errMsg ? (s.checkOrderStatus(e, t), console.log("用户支付成功！")) : "requestPayment:fail cancel" == a.errMsg && console.log("用户取消支付！");
                },
                fail: function(e) {
                    wx.redirectTo({
                        url: "/pages/pageOrder/orderList/orderList?index=1"
                    });
                }
            });
        }, function(e, t) {
            o.$Loading.hide(), wx.redirectTo({
                url: "/pages/pageOrder/orderList/orderList?index=1"
            });
        });
    },
    checkOrderStatus: function(e, t) {
        (0, o.$Loading)();
        var r = {
            orderId: e,
            returnPayType: "51",
            virtualNo: t || "-1"
        };
        (0, a.getOrderPayStatus)(r, function(e) {
            wx.redirectTo({
                url: "/pages/pageOrder/orderList/orderList?index=2"
            });
        });
    },
    onShareAppMessage: function(e) {
        return (0, s.activityShareMessage)();
    }
});