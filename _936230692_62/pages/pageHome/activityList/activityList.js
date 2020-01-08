var t = require("../../../@babel/runtime/helpers/interopRequireWildcard"), e = require("../../../@babel/runtime/helpers/interopRequireDefault")(require("../../../@babel/runtime/helpers/toConsumableArray")), a = require("../../../167BC423B878E4CF701DAC2479196783.js"), i = require("../../../75C41DA1B878E4CF13A275A6DCF86783.js"), o = t(require("../../../481D43C1B878E4CF2E7B2BC653496783.js")), n = require("../../../18B8A9E0B878E4CF7EDEC1E7E0186783.js"), s = require("../../../B20FF1E6B878E4CFD46999E127296783.js"), r = getApp();

Page({
    data: {
        page: 1,
        pageSize: 20,
        promotionId: -1,
        isShowSlogin: !1,
        classify_active: -1,
        fileDomain: "",
        goodsList: [],
        showShare: !1,
        skuGoodsList: []
    },
    onLoad: function(t) {
        var e = this, a = wx.getStorageSync("spShopId"), i = r.globalData.statusBarHeight, n = r.globalData.windowWidth;
        if (this.setData({
            statusBarHeight: i,
            windowWidth: n,
            currentPage: getCurrentPages().length
        }), t.scene) {
            var c = decodeURIComponent(t.scene), h = o.default.getParam(c, "s"), d = o.default.getParam(c, "p");
            console.log(c), this.setData({
                promotionId: d,
                from: "share"
            }), a ? this.getContent() : h && (0, s.pickStore)({
                spShopId: h
            }, function(t) {
                wx.setStorageSync("spShopId", h), e.getContent();
            });
        } else if (t.f && t.s && t.p) {
            var g = t.s, l = t.p;
            this.setData({
                promotionId: l,
                from: "share"
            }), a ? this.getContent() : g && (0, s.pickStore)({
                spShopId: g
            }, function(t) {
                wx.setStorageSync("spShopId", g), e.getContent();
            });
        } else this.setData({
            promotionId: t.p,
            from: t.f
        }), a ? e.getContent() : wx.navigateTo({
            url: "/pages/pageMe/shopList/shopList?from=activityList"
        });
    },
    onShow: function() {
        wx.getStorageSync("activityFresh") && (wx.removeStorageSync("activityFresh"), this.getList());
    },
    getContent: function() {
        var t = this, s = this;
        (0, n.$Loading)();
        var r = this.data, c = r.promotionId, h = r.page, d = r.pageSize, g = r.from;
        if ("goodDetail" === g || "home" === g || "share" === g) {
            var l = {
                promotionId: c,
                page: h,
                pageSize: d
            };
            (0, a.getActivityGoods)(l, function(a) {
                var i = a.data, r = a.fileDomain, c = !1, h = [], d = t.data, g = d.goodsList, l = d.pageSize, u = d.page, f = Math.ceil(i.total / l);
                i.prePage == f && (c = !0), i.list ? i.list.length > 0 && (h = [].concat((0, e.default)(g), (0, 
                e.default)(i.list))).forEach(function(t) {
                    t.showPrice = (0, o.formatPrice)(t.showPrice), t.hiddenPrice = t.hiddenPrice ? (0, 
                    o.formatPrice)(t.hiddenPrice) : null;
                }) : h = g, wx.setNavigationBarTitle({
                    title: i.activityAreaName
                }), s.setData({
                    goodsList: h,
                    fileDomain: r,
                    pageNum: f,
                    page: u + 1,
                    titleName: i.activityAreaName,
                    shareInfo: i.shareInfo,
                    isShowSlogin: c,
                    activityPic: i.activityPic,
                    showMask: !0
                }, function() {
                    n.$Loading.hide();
                });
            });
        } else "cart" === g && (0, i.activityArea)(c, function(e) {
            var a = e.data;
            wx.setNavigationBarTitle({
                title: a.activityAreaName
            }), s.setData({
                activityDiscountContent: a.activityDiscountContent,
                activityTime: a.activityTime,
                classifyList: a.activityItemCategorys,
                showMask: !0
            }, function() {
                t.getCategoryList(0);
            });
        }, function() {
            n.$Loading.hide();
        });
    },
    goBack: function() {
        1 === this.data.currentPage ? wx.switchTab({
            url: "/pages/home/home"
        }) : wx.navigateBack({
            delta: 1
        });
    },
    tabChange: function(t) {
        var e = this, a = 0;
        t && (a = t.detail.index), this.setData({
            page: 1,
            skuGoodsList: []
        }, function() {
            e.getCategoryList(a);
        });
    },
    getCategoryList: function(t, a) {
        var s = this, r = this;
        "addCart" === a || (0, n.$Loading)();
        var c = this.data, h = c.classifyList, d = c.promotionId, g = c.page, l = c.pageSize, u = {
            categoryId: h[t].categoryId,
            page: g,
            pageSize: l,
            promotionId: d
        };
        (0, i.getActivityItem)(u, function(i) {
            var c = i.data, h = i.fileDomain, d = !1, g = [], l = s.data, u = l.skuGoodsList, f = l.pageSize, p = l.page, m = Math.ceil(c.total / f);
            if (c.prePage === m && (d = !0), c.list) {
                if (c.list.length > 0) {
                    var v = u.length;
                    "addCart" === a && u.splice(v - f <= 0 ? 0 : v - f, v), (g = [].concat((0, e.default)(u), (0, 
                    e.default)(c.list))).forEach(function(t) {
                        t.price = (0, o.formatPrice)(t.price), t.hiddenPrice = t.hiddenPrice ? (0, o.formatPrice)(t.hiddenPrice) : null;
                    });
                }
            } else g = u;
            r.setData({
                skuGoodsList: g,
                fileDomain: h,
                classify_active: t,
                pageNum: m,
                lastPage: p,
                page: p + 1,
                isShowSlogin: d,
                showMask: !0
            }, function() {
                n.$Loading.hide();
            });
        });
    },
    godetail: function(t) {
        var e = t.currentTarget.dataset.pdspuid;
        wx.navigateTo({
            url: "/pages/pageHome/goodsDetail/goodsDetail?pdSpuId=" + e
        });
    },
    addCartByArea: function(t) {
        var e = this, a = this, o = t.currentTarget.dataset.item, s = this.data, r = s.classify_active, c = s.lastPage, h = {
            pdSpuId: o.pdSpuId,
            pdSkuId: o.pdSkuId,
            qty: 1
        };
        (0, n.$Loading)(), (0, i.addToCart)(h, function(t) {
            n.$Loading.hide(), wx.setStorageSync("cartFresh", 1), (0, n.$Toast)({
                content: "加入购物袋成功",
                duration: 1.5,
                mask: !1
            }), e.setData({
                page: c
            }, function() {
                a.getCategoryList(r, "addCart");
            });
        });
    },
    handleChange: function(t) {
        var e = this;
        (0, n.$Loading)();
        var a = this.data, o = a.promotionId, s = a.skuGoodsList, r = t.detail.value, c = t.currentTarget.dataset.item, h = {
            cartInfoId: c.cartInfoId,
            pdSpuId: c.pdSpuId,
            pdSkuId: c.pdSkuId,
            qty: r,
            promotionId: o,
            type: c.type
        };
        (0, i.cartChangeQty)(h, function(t) {
            var a = t.data;
            s.forEach(function(t) {
                t.cartInfoId === c.cartInfoId && (t.shoppingCartQty = a.contentQty, t.remainQty = a.qtyTotal);
            }), wx.setStorageSync("cartFresh", 1), e.setData({
                skuGoodsList: s
            }, function() {
                n.$Loading.hide();
            });
        }, function(t, e) {
            n.$Loading.hide(), (0, n.$Toast)({
                content: "请求失败",
                duration: 1,
                mask: !1
            });
        });
    },
    drawSharePic: function() {
        var t = this;
        this.setData({
            showShare: !1
        }), this.data.drawFinish ? this.finishDraw() : wx.getSetting({
            success: function(e) {
                var a = e.authSetting["scope.writePhotosAlbum"];
                void 0 === a ? wx.authorize({
                    scope: "scope.writePhotosAlbum",
                    success: function(e) {
                        t.shareDetail();
                    }
                }) : 0 == a ? wx.showModal({
                    title: "提示",
                    content: "若您需要使用分享图片功能，则需要您打开分享到相册的权限",
                    confirmColor: "#464646",
                    cancelColor: "#969696",
                    success: function(t) {
                        t.confirm && wx.openSetting();
                    }
                }) : 1 == a && t.shareDetail();
            }
        });
    },
    shareDetail: function() {
        var t = this;
        (0, n.$Loading)();
        var e = this.data, a = e.shareInfo, i = e.fileDomain, o = i + a.shareBackUrl, s = i + a.shareApplteUrl;
        wx.getImageInfo({
            src: s,
            success: function(e) {
                if ("unkown" == e.type || "unknown" == e.type) return n.$Loading.hide(), void (0, 
                n.$Toast)({
                    content: "获取小程序码失败，请稍后再试",
                    duration: 1.5,
                    mask: !1
                });
                wx.getImageInfo({
                    src: o,
                    success: function(a) {
                        if ("unkown" == a.type || "unknown" == a.type) return n.$Loading.hide(), void (0, 
                        n.$Toast)({
                            content: "生成分享图失败，请稍后再试",
                            duration: 1.5,
                            mask: !1
                        });
                        t.sharePicCallback(a.path, e.path, a.width, a.height);
                    },
                    fail: function(t) {
                        n.$Loading.hide(), (0, n.$Toast)({
                            content: "生成分享图失败，请稍后再试",
                            duration: 1.5,
                            mask: !1
                        });
                    }
                });
            },
            fail: function(t) {
                n.$Loading.hide(), (0, n.$Toast)({
                    content: "获取小程序码失败，请稍后再试",
                    duration: 1.5,
                    mask: !1
                });
            }
        });
    },
    sharePicCallback: function(t, e, a, i) {
        var o = this, n = wx.createCanvasContext("shareCanvas"), s = i / (a / 420);
        console.log(s), n.setFillStyle("#fff"), n.fillRect(0, 0, 420, 2e3), n.drawImage(t, 0, 0, 420, s), 
        n.drawImage(e, 160, s - 155, 100, 100), n.setFontSize(12);
        var r = n.measureText("长按识别立即查看").width, c = n.measureText("微信搜索Qtools+小程序").width;
        o.drawText(n, "长按识别立即查看", 12, "#9B9B9B", 420, (420 - r) / 2, s - 36), o.drawText(n, "微信搜索Qtools+小程序", 12, "#9B9B9B", 420, (420 - c) / 2, s - 20), 
        n.draw(), o.setData({
            drawFinish: !0,
            priceHeight: s
        }, function() {
            o.finishDraw();
        });
    },
    finishDraw: function() {
        var t = this, e = this.data, a = e.drawFinish, i = e.priceHeight;
        a && setTimeout(function() {
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 420,
                height: i,
                destWidth: 1260,
                destHeight: 3 * i,
                quality: 1,
                fileType: "jpg",
                canvasId: "shareCanvas",
                success: function(e) {
                    console.log(e), t.setData({
                        shareImage: e.tempFilePath,
                        showShareImg: !0
                    }), wx.saveImageToPhotosAlbum({
                        filePath: e.tempFilePath,
                        success: function(t) {
                            console.log(t), "saveImageToPhotosAlbum:ok" === t.errMsg && (0, n.$Toast)({
                                content: "图片保存成功",
                                duration: 2,
                                mask: !1
                            });
                        },
                        fail: function() {
                            (0, n.$Toast)({
                                content: "图片保存失败",
                                duration: 1,
                                mask: !1
                            });
                        }
                    }), n.$Loading.hide();
                },
                fail: function(t) {
                    console.log(t), n.$Loading.hide(), (0, n.$Toast)({
                        content: "图片生成失败",
                        duration: 1,
                        mask: !1
                    });
                }
            });
        }, 300);
    },
    roundRect: function(t, e, a, i, o, n) {
        t.save(), i < 2 * n && (n = i / 2), o < 2 * n && (n = o / 2), t.beginPath(), t.setStrokeStyle("#E4E4E4"), 
        t.setLineWidth(1), t.moveTo(e + n, a), t.arcTo(e + i, a, e + i, a + o, n), t.arcTo(e + i, a + o, e, a + o, n), 
        t.arcTo(e, a + o, e, a, n), t.arcTo(e, a, e + i, a, n), t.stroke(), t.closePath();
    },
    drawText: function(t, e, a, i, o, n, s) {
        if (e.length > 1) {
            var r = e.split(""), c = "", h = [];
            t.setFontSize(a), t.setFillStyle(i);
            for (var d = 0; d < r.length; d++) t.measureText(c).width < o ? c += r[d] : (d--, 
            h.push(c), c = "");
            if (h.push(c), h.length > 2) {
                var g = h.slice(0, 2), l = g[1], u = "", f = [];
                for (d = 0; d < l.length && t.measureText(u).width < o - 30; d++) u += l[d];
                f.push(u);
                var p = f[0] + "...";
                g.splice(1, 1, p), h = g;
            }
            for (var m = 0; m < h.length; m++) t.fillText(h[m], n, s + 24 * m, o);
        } else {
            h = [];
            t.setFontSize(a), t.setFillStyle(i), t.fillText(e, n, s, o);
        }
        return h.length;
    },
    showDetailShare: function(t) {
        this.setData({
            showShare: !this.data.showShare
        });
    },
    onPullDownRefresh: function() {
        var t = this, e = this.data;
        e.page >= e.pageNum || this.setData({
            page: 1
        }, function() {
            t.getContent();
        });
    },
    onReachBottom: function() {
        var t = this.data;
        t.page > t.pageNum || this.getContent();
    },
    onShareAppMessage: function(t) {
        "button" === t.from && this.setData({
            showShare: !1
        });
        var e = this.data, a = e.promotionId, i = e.shareInfo, o = e.fileDomain, n = wx.getStorageSync("spShopId");
        return {
            title: i.shareTitle,
            path: "/pages/pageHome/activityList/activityList?p=".concat(a, "&s=").concat(n, "&f=s"),
            imageUrl: o + i.shareImageUrl
        };
    }
});