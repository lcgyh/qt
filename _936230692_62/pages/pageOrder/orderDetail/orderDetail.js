var e = require("../../../@babel/runtime/helpers/interopRequireDefault"), t = e(require("../../../C712B902B878E4CFA174D10544396783.js")), a = e(require("../../../481D43C1B878E4CF2E7B2BC653496783.js")), r = require("../../../18B8A9E0B878E4CF7EDEC1E7E0186783.js"), o = require("../../../AD0111C0B878E4CFCB6779C705596783.js"), n = getApp();

Page({
    data: {
        orderId: 0,
        orderInfo: {},
        fileDomain: "",
        leftText: "",
        rightText: "",
        statusOne: !1,
        statusTwo: !1,
        rebuy: !1,
        imgUrl: "",
        stateText: "",
        leftEvent: "",
        rightEvent: "",
        showMask: !1,
        backgroundColor: "#FFFFFF",
        send_price: 0,
        statusBox: !0,
        customer_info_str: "",
        note_info_str: ""
    },
    onLoad: function(e) {
        this.setData({
            orderId: e.orderId,
            virtualNo: e.virtualNo ? e.virtualNo : "-1"
        });
    },
    onShow: function() {
        var e = this;
        if (wx.getStorageSync("token")) {
            var t = wx.getStorageSync("userName"), a = wx.getStorageSync("userPic");
            this.setData({
                showLogin: !1,
                userName: t,
                userPic: a
            }), setTimeout(function() {
                e.getOrderDetail();
            }, 300);
        } else this.setData({
            showLogin: !0
        });
    },
    copyOrderNo: function() {
        var e = this.data.orderInfo.orderNo;
        wx.setClipboardData({
            data: e,
            success: function(e) {
                wx.hideToast({
                    success: function(e) {
                        (0, r.$Toast)({
                            content: "订单编号已复制",
                            duration: 2,
                            mask: !1
                        });
                    }
                });
            }
        });
    },
    getOrderDetail: function() {
        var e = this;
        (0, r.$Loading)();
        var o = this.data.orderId, n = this.data.virtualNo, i = {
            orderId: o,
            virtualNo: n || "-1"
        };
        t.default.orderDetail(i, function(t) {
            var r = t.data;
            if (2 == r.deliveryType) switch (r.orderStatus) {
              case 62:
                r.showMiniRider = !0, r.miniRiderText1 = "你的订单已由门店自行配送，", r.miniRiderText2 = "询问详情", 
                r.showMiniRiderButton = !1;
                break;

              case 90:
                r.showMiniRider = !0, r.miniRiderText = "骑手接单中", r.showMiniRiderButton = !1;
                break;

              case 91:
                r.showMiniRider = !0, r.miniRiderText = "骑手".concat(r.expressMan, "已接单"), r.showMiniRiderButton = !0;
                break;

              case 92:
                r.showMiniRider = !0, r.miniRiderText = "骑手".concat(r.expressMan, "已到店"), r.showMiniRiderButton = !0;
                break;

              case 93:
                r.showMiniRider = !0, r.miniRiderText = "骑手".concat(r.expressMan, "配送中"), r.showMiniRiderButton = !0;
                break;

              case 94:
                r.showMiniRider = !0, r.expressMan ? (r.miniRiderText = "骑手".concat(r.expressMan, "已送达"), 
                r.showMiniRiderButton = !0) : (r.miniRiderText = "订单已送达", r.showMiniRiderButton = !1);
                break;

              default:
                r.showMiniRider = !1;
            }
            r.productListVo.length > 0 && r.productListVo.forEach(function(e) {
                if (e.price = a.default.formatPrice(e.price), 0 == e.refundRadio) if (e.refundStatus) switch (e.refundStatus) {
                  case 10:
                  case 20:
                  case 50:
                  case 60:
                    e.refundText = "售后中", e.showAfterButton = !0, e.event = "goRetrunDetail";
                    break;

                  case 30:
                  case 40:
                    e.refundText = "退款关闭", e.showAfterButton = !0, e.event = "goRetrunDetail";
                    break;

                  case 70:
                    e.refundText = "退款完成", e.showAfterButton = !0, e.event = "goRetrunDetail";
                } else e.remainQty > 0 && (e.refundText = "申请售后", e.showAfterButton = !0, e.event = "goAfterSale");
            }), r.orderProductListVo && r.orderProductListVo.length > 0 && r.orderProductListVo.forEach(function(e) {
                e.productListVo.forEach(function(e) {
                    if (e.price = a.default.formatPrice(e.price), 0 == e.refundRadio) if (e.refundStatus) switch (e.refundStatus) {
                      case 10:
                      case 20:
                      case 50:
                      case 60:
                        e.refundText = "售后中", e.showAfterButton = !0, e.event = "goRetrunDetail";
                        break;

                      case 30:
                      case 40:
                        e.refundText = "退款关闭", e.showAfterButton = !0, e.event = "goRetrunDetail";
                        break;

                      case 70:
                        e.refundText = "退款完成", e.showAfterButton = !0, e.event = "goRetrunDetail";
                    } else e.remainQty > 0 && (e.refundText = "申请售后", e.showAfterButton = !0, e.event = "goAfterSale");
                });
            }), r.giftProductList && r.giftProductList.length > 0 && r.giftProductList.forEach(function(e) {
                if (0 == e.refundRadio) if (e.refundStatus) switch (e.refundStatus) {
                  case 10:
                  case 20:
                  case 50:
                  case 60:
                    e.refundText = "售后中", e.showAfterButton = !0, e.event = "goRetrunDetail";
                    break;

                  case 30:
                  case 40:
                    e.refundText = "退款关闭", e.showAfterButton = !0, e.event = "goRetrunDetail";
                    break;

                  case 70:
                    e.refundText = "退款完成", e.showAfterButton = !0, e.event = "goRetrunDetail";
                } else e.remainQty > 0 && (e.refundText = "申请售后", e.showAfterButton = !0, e.event = "goAfterSale");
            }), r.amount = a.default.formatPrice(r.amount), r.deductionAmount = a.default.formatPrice(r.deductionAmount), 
            r.payAmount = a.default.formatPrice(r.payAmount), r.standardExpressAmount = a.default.formatPrice(r.standardExpressAmount), 
            r.deliveryFee = a.default.formatPrice(r.deliveryFee), r.expressFee = a.default.formatPrice(r.expressFee), 
            r.promotionDeductAmount = a.default.formatPrice(r.promotionDeductAmount), e.checkStatus(r.orderStatus, r, t.fileDomain, r.orderType);
        }, function(e, t) {
            console.log(t), r.$Loading.hide(), 500 == e || 502 == e ? ((0, r.$Toast)({
                content: "小Q走丢了",
                duration: 0,
                mask: !1
            }), setTimeout(function() {
                r.$Toast.hide(), wx.navigateBack({
                    delta: 1
                });
            }, 1e3)) : ((0, r.$Toast)({
                content: t.data.errorMsg,
                duration: 0,
                mask: !1
            }), setTimeout(function() {
                r.$Toast.hide(), wx.navigateBack({
                    delta: 1
                });
            }, 1e3));
        });
    },
    checkStatus: function(e, t, o, n) {
        var i = "", s = "", d = !0, c = !1, u = !1, f = "", l = "", g = "";
        switch (e) {
          case 10:
            i = "不买了", f = "notBuy", s = "去支付", l = "goPay", c = !0, u = !0, g = "#DD8282";
            break;

          case 20:
          case 30:
            s = "重新购买", l = "reBuy", u = !0, g = "#9B9B9B";
            break;

          case 40:
            i = "不买了", f = "notBuy", s = "催单", l = "pushOrder", c = !0, u = !0, g = "#DDC682";
            break;

          case 41:
          case 45:
          case 46:
          case 65:
          case 66:
            t.refuseRefund || t.hiddenButton ? d = !1 : (s = "申请退款", l = "refundMoney", u = !0), 
            g = "#DDC682";
            break;

          case 50:
          case 55:
          case 60:
            s = "重新购买", l = "reBuy", u = !0, g = "#9B9B9B";
            break;

          case 61:
          case 62:
          case 63:
            d = !1, g = "#DDC682";
            break;

          case 64:
            s = "重新购买", l = "reBuy", u = !0, g = "#9B9B9B";
            break;

          case 67:
          case 68:
            d = !1, g = "#DDC682";
            break;

          case 70:
            s = "评价订单", l = "goComment", u = !0, g = "#6BD5A4";
            break;

          case 80:
            d = !1, g = "#6BD5A4";
            break;

          case 81:
          case 82:
            s = "重新购买", l = "reBuy", u = !0, g = "#9B9B9B";
            break;

          case 83:
            d = !1, g = "#DDC682";
            break;

          case 84:
            s = "重新购买", l = "reBuy", u = !0, g = "#9B9B9B";
            break;

          case 85:
          case 90:
          case 91:
          case 92:
          case 93:
            d = !1, g = "#DDC682";
            break;

          case 94:
            s = "评价订单", l = "goComment", u = !0, g = "#6BD5A4";
            break;

          case 100:
            d = !1, g = "#DDC682";
            break;

          case 101:
          case 102:
            s = "评价订单", l = "goComment", u = !0, g = "#6BD5A4";
        }
        t.createtime = a.default.formatAllTime(t.createtime), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: g,
            animation: {
                duration: 0,
                timingFunc: "linear"
            }
        }), this.setData({
            statusBox: d,
            leftText: i,
            leftEvent: f,
            rightText: s,
            rightEvent: l,
            statusOne: c,
            statusTwo: u,
            backgroundColor: g,
            send_price: 0,
            showMask: !0,
            orderInfo: t,
            fileDomain: o
        }, function() {
            r.$Loading.hide(), wx.stopPullDownRefresh();
        });
    },
    refundMoney: function(e) {
        var t = e.currentTarget.dataset.orderid, a = this.data.orderInfo.returnCloseExplain;
        a ? (0, r.$Toast)({
            content: a,
            duration: 1.5,
            mask: !1
        }) : wx.navigateTo({
            url: "/pages/pageOrder/refund/refund?orderId=" + t
        });
    },
    checkExpress: function(e) {
        var t = this.data.orderInfo.orderNo;
        wx.navigateTo({
            url: "/pages/pageOrder/checkExpress/checkExpress?orderNo=" + t
        });
    },
    godetail: function(e) {
        var t = e.currentTarget.dataset.pdspuid;
        wx.navigateTo({
            url: "/pages/pageHome/goodsDetail/goodsDetail?pdSpuId=" + t
        });
    },
    goAfterSale: function(e) {
        var t = e.currentTarget.dataset.item, a = this.data, o = a.fileDomain, n = a.orderInfo.returnCloseExplain, i = JSON.stringify(t);
        n ? (0, r.$Toast)({
            content: n,
            duration: 1.5,
            mask: !1
        }) : wx.setStorage({
            key: "lastItem",
            data: i,
            success: function(e) {
                "setStorage:ok" === e.errMsg && wx.navigateTo({
                    url: "/pages/pageOrder/afterSales/afterSales?fileDomain=" + o
                });
            }
        });
    },
    goRetrunDetail: function(e) {
        var t = e.currentTarget.dataset.orderreturnid;
        wx.navigateTo({
            url: "/pages/pageOrder/returnDetail/returnDetail?orderReturnId=" + t
        });
    },
    notBuy: function(e) {
        var a = this, o = e.currentTarget.dataset.orderid, n = this.data.orderInfo, i = n.virtualOrderNo, s = n.orderProductListVo;
        wx.showModal({
            title: "取消订单",
            content: "是否取消订单？",
            confirmColor: "#464646",
            cancelColor: "#969696",
            success: function(e) {
                e.confirm && ((0, r.$Loading)(), s ? s.length <= 0 ? t.default.deleteOrder(o, function(e) {
                    r.$Loading.hide(), "E_500" == e.data.errorcode ? "" == e.data.content ? a.getOrderDetail() : ((0, 
                    r.$Toast)({
                        content: e.data.content,
                        duration: 0,
                        mask: !1
                    }), setTimeout(function() {
                        r.$Toast.hide(), a.getOrderDetail();
                    }, 1500)) : a.getOrderDetail();
                }, function(e, t) {
                    r.$Loading.hide(), (0, r.$Toast)({
                        content: "小Q走丢了",
                        duration: 1,
                        mask: !1
                    });
                }) : t.default.cancelOrder(i, function(e) {
                    r.$Loading.hide(), "E_500" == e.data.errorcode ? "" == e.data.content ? a.getOrderDetail() : ((0, 
                    r.$Toast)({
                        content: e.data.content,
                        duration: 0,
                        mask: !1
                    }), setTimeout(function() {
                        r.$Toast.hide(), a.getOrderDetail();
                    }, 1500)) : a.getOrderDetail();
                }, function(e, t) {
                    r.$Loading.hide(), (0, r.$Toast)({
                        content: "小Q走丢了",
                        duration: 1,
                        mask: !1
                    });
                }) : t.default.deleteOrder(o, function(e) {
                    r.$Loading.hide(), "E_500" == e.data.errorcode ? "" == e.data.content ? a.getOrderDetail() : ((0, 
                    r.$Toast)({
                        content: e.data.content,
                        duration: 0,
                        mask: !1
                    }), setTimeout(function() {
                        r.$Toast.hide(), a.getOrderDetail();
                    }, 1500)) : a.getOrderDetail();
                }, function(e, t) {
                    r.$Loading.hide(), (0, r.$Toast)({
                        content: "小Q走丢了",
                        duration: 1,
                        mask: !1
                    });
                }));
            }
        });
    },
    goHome: function() {
        wx.switchTab({
            url: "/pages/home/home"
        });
    },
    reBuy: function(e) {
        var a = e.currentTarget.dataset.orderid;
        t.default.rebuy(a, function(e) {
            wx.setStorage({
                key: "cartFresh",
                data: 1,
                success: function(e) {
                    wx.switchTab({
                        url: "/pages/cart/cart"
                    });
                }
            });
        }, function() {
            (0, r.$Toast)({
                content: "小Q走丢了",
                duration: 2,
                mask: !1
            });
        });
    },
    checkPosition: function(e) {
        var t = this.data, a = t.orderId, r = t.orderInfo, o = r.receiveAddressVo.lat, n = r.receiveAddressVo.lng, i = r.shopVo.lat, s = r.shopVo.lng;
        wx.navigateTo({
            url: "/pages/pageOrder/expressMap/expressMap?receiveLat=".concat(o, "&receiveLng=").concat(n, "&shopLat=").concat(i, "&shopLng=").concat(s, "&orderId=").concat(a)
        });
    },
    goPay: function(e) {
        var t = this, a = this.data.orderInfo, o = a.orderId, n = a.virtualOrderNo;
        (0, r.$Loading)();
        var i = {
            code: "",
            orderId: o,
            virtualNo: n
        };
        wx.login({
            success: function(e) {
                i.code = e.code, t.payBack(i);
            }
        });
    },
    payBack: function(e) {
        var a = this;
        t.default.payOrder(e, function(e) {
            r.$Loading.hide(), wx.requestPayment({
                timeStamp: e.data.timeStamp,
                nonceStr: e.data.nonceStr,
                package: e.data.package,
                signType: e.data.signType,
                paySign: e.data.paySign,
                success: function(e) {
                    "requestPayment:ok" == e.errMsg ? a.checkOrderStatus(orderId, virtualOrderNo) : "requestPayment:fail cancel" == e.errMsg && console.log("用户取消支付！");
                },
                fail: function(e) {}
            });
        }, function(e, t) {
            if (r.$Loading.hide(), 500 == e) if (t.data.errorMsg.indexOf("E_600") > -1) {
                var a = t.data.errorMsg.length, o = t.data.errorMsg.slice(5, a);
                wx.showModal({
                    title: "提示",
                    content: o,
                    confirmColor: "#464646",
                    cancelColor: "#969696",
                    showCancel: !1
                });
            } else (0, r.$Toast)({
                content: "小Q走丢了",
                duration: 2,
                mask: !1
            }); else "E_500" == e && (0, r.$Toast)({
                content: t.data.message,
                duration: 2,
                mask: !1
            });
        });
    },
    checkOrderStatus: function(e, a) {
        var o = this;
        (0, r.$Loading)();
        var n = {
            orderId: e,
            returnPayType: "51",
            virtualNo: a
        };
        t.default.getOrderPayStatus(n, function(e) {
            -1 == a ? wx.navigateBack({
                delta: 1
            }) : o.getOrderDetail();
        });
    },
    contact: function(e) {
        var t = e.currentTarget.dataset.mobile;
        n.globalData.system.indexOf("Android") > -1 ? wx.showModal({
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
        });
    },
    goStore: function(e) {
        var t = e.currentTarget.dataset.lat, r = e.currentTarget.dataset.lng, o = e.currentTarget.dataset.address, n = e.currentTarget.dataset.name, i = a.default.bd09Togcj02(r, t);
        wx.openLocation({
            latitude: i[1],
            longitude: i[0],
            name: n,
            address: o,
            scale: 18
        });
    },
    goComment: function(e) {
        var t = this.data.orderInfo, a = this.data.fileDomain, r = t.productListVo, o = t.shopVo, n = JSON.stringify(o), i = JSON.stringify(r);
        wx.setStorage({
            key: "commentShopInfo",
            data: n,
            success: function(e) {
                "setStorage:ok" === e.errMsg && wx.setStorage({
                    key: "commentGoodsList",
                    data: i,
                    success: function(e) {
                        "setStorage:ok" === e.errMsg && wx.navigateTo({
                            url: "/pages/pageOrder/orderComment/orderComment?fileDomain=" + a
                        });
                    }
                });
            }
        });
    },
    pushOrder: function(e) {
        (0, r.$Loading)();
        var a = e.currentTarget.dataset.orderid;
        t.default.orderReminder(a, function(e) {
            r.$Loading.hide(), (0, r.$Toast)({
                content: e.data.content,
                duration: 1,
                mask: !1
            });
        }, function(e) {
            r.$Loading.hide(), console.log(e);
        });
    },
    onPullDownRefresh: function() {
        this.getOrderDetail();
    },
    onShareAppMessage: function(e) {
        return (0, o.activityShareMessage)();
    }
});