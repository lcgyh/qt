var e = require("../../../@babel/runtime/helpers/interopRequireDefault"), t = e(require("../../../@babel/runtime/helpers/toConsumableArray")), a = require("../../../C4DDA123B878E4CFA2BBC924B8096783.js"), i = e(require("../../../481D43C1B878E4CF2E7B2BC653496783.js")), o = require("../../../utils/loading.js"), s = require("../../../B20FF1E6B878E4CFD46999E127296783.js"), n = getApp();

Page({
    data: {
        list: [],
        fileDomain: "",
        titleName: "",
        showMask: !1,
        page: 1,
        pageSize: 20,
        pageNum: 1,
        brandList: []
    },
    onLoad: function(e) {
        var t = this, a = wx.getStorageSync("spShopId"), o = n.globalData.statusBarHeight, r = n.globalData.windowWidth;
        if (this.setData({
            statusBarHeight: o,
            windowWidth: r,
            currentPage: getCurrentPages().length
        }), e.scene) {
            var h = decodeURIComponent(e.scene), c = i.default.getParam(h, "spShopId"), d = i.default.getParam(h, "pageCode");
            this.setData({
                pageCode: d
            }), a ? this.getList() : c ? (0, s.pickStore)({
                spShopId: c
            }, function(e) {
                wx.setStorageSync("spShopId", c), t.getList();
            }) : wx.navigateTo({
                url: "/pages/pageMe/shopList/shopList?from=bannerInfo"
            });
        } else if (e.spShopId && e.pageCode) {
            var u = e.spShopId;
            this.setData({
                pageCode: e.pageCode
            }), a ? this.getList() : u && (0, s.pickStore)({
                spShopId: u
            }, function(e) {
                wx.setStorageSync("spShopId", u), t.getList();
            });
        } else this.setData({
            pageCode: e.pageCode
        }), a ? t.getList() : wx.navigateTo({
            url: "/pages/pageMe/shopList/shopList?from=bannerInfo"
        });
    },
    onShow: function() {
        wx.getStorageSync("infoFresh") && (wx.removeStorageSync("infoFresh"), this.getList());
    },
    goBack: function() {
        1 === this.data.currentPage ? wx.switchTab({
            url: "/pages/home/home"
        }) : wx.navigateBack({
            delta: 1
        });
    },
    getList: function() {
        var e = this, s = this.data, n = s.pageCode, r = s.page, h = s.pageSize, c = s.list, d = s.configShare, u = s.titleName, g = {
            pageCode: n,
            page: r,
            pageSize: h
        };
        (0, o.$Loading)(), (0, a.getBannerInfo)(g, function(a) {
            var s = a.data;
            s ? ((c = [].concat((0, t.default)(c), (0, t.default)(s.pdBannerConfig))).forEach(function(e) {
                e.pdSpu && (e.pdSpu.showPrice = i.default.formatPrice(e.pdSpu.showPrice), e.pdSpu.hiddenPrice = i.default.formatPrice(e.pdSpu.hiddenPrice)), 
                e.rowPdSpu && (e.rowPdSpu.showPrice = i.default.formatPrice(e.rowPdSpu.showPrice), 
                e.rowPdSpu.hiddenPrice = i.default.formatPrice(e.rowPdSpu.hiddenPrice));
            }), 1 === r && (d = s.configShare, u = s.pageName)) : c = [], e.setData({
                fileDomain: a.fileDomain,
                list: c,
                shareInfo: d,
                titleName: u,
                pageNum: s.pageNum,
                page: r + 1,
                showMask: !0
            }, function() {
                o.$Loading.hide();
            });
        }, function() {
            o.$Loading.hide(), (0, o.$Toast)({
                content: "小Q走丢了",
                duration: 1,
                mask: !1
            });
        });
    },
    onReachBottom: function(e) {
        var t = this.data;
        t.page > t.pageNum || this.getList();
    },
    godetail: function(e) {
        var t = e.currentTarget.dataset.pdspuid;
        t && wx.navigateTo({
            url: "/pages/pageHome/goodsDetail/goodsDetail?pdSpuId=" + t
        });
    },
    drawSharePic: function() {
        var e = this;
        this.setData({
            showShare: !1
        }), this.data.drawFinish ? this.finishDraw() : wx.getSetting({
            success: function(t) {
                var a = t.authSetting["scope.writePhotosAlbum"];
                void 0 === a ? wx.authorize({
                    scope: "scope.writePhotosAlbum",
                    success: function(t) {
                        e.shareDetail();
                    }
                }) : 0 == a ? wx.showModal({
                    title: "提示",
                    content: "若您需要使用分享图片功能，则需要您打开分享到相册的权限",
                    confirmColor: "#464646",
                    cancelColor: "#969696",
                    success: function(e) {
                        e.confirm && wx.openSetting();
                    }
                }) : 1 == a && e.shareDetail();
            }
        });
    },
    shareDetail: function() {
        var e = this;
        (0, o.$Loading)();
        var t = this.data, a = t.shareInfo, i = t.fileDomain, s = i + a.shareBackUrl, n = i + a.shareApplteUrl;
        wx.getImageInfo({
            src: n,
            success: function(t) {
                if ("unkown" == t.type || "unknown" == t.type) return o.$Loading.hide(), void (0, 
                o.$Toast)({
                    content: "获取小程序码失败，请稍后再试",
                    duration: 1.5,
                    mask: !1
                });
                wx.getImageInfo({
                    src: s,
                    success: function(a) {
                        if ("unkown" == a.type || "unknown" == a.type) return o.$Loading.hide(), void (0, 
                        o.$Toast)({
                            content: "生成分享图失败，请稍后再试",
                            duration: 1.5,
                            mask: !1
                        });
                        e.sharePicCallback(a.path, t.path, a.width, a.height);
                    },
                    fail: function(e) {
                        o.$Loading.hide(), (0, o.$Toast)({
                            content: "生成分享图失败，请稍后再试",
                            duration: 1.5,
                            mask: !1
                        });
                    }
                });
            },
            fail: function(e) {
                o.$Loading.hide(), (0, o.$Toast)({
                    content: "获取小程序码失败，请稍后再试",
                    duration: 1.5,
                    mask: !1
                });
            }
        });
    },
    sharePicCallback: function(e, t, a, i) {
        var o = this, s = wx.createCanvasContext("shareCanvas"), n = i / (a / 420);
        console.log(n), s.setFillStyle("#fff"), s.fillRect(0, 0, 420, 2e3), s.drawImage(e, 0, 0, 420, n), 
        s.drawImage(t, 160, n - 135, 100, 100), s.draw(), o.setData({
            drawFinish: !0,
            priceHeight: n
        }, function() {
            o.finishDraw();
        });
    },
    finishDraw: function() {
        var e = this, t = this.data, a = t.drawFinish, i = t.priceHeight;
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
                success: function(t) {
                    e.setData({
                        shareImage: t.tempFilePath,
                        showShareImg: !0
                    }), wx.saveImageToPhotosAlbum({
                        filePath: t.tempFilePath,
                        success: function(e) {
                            "saveImageToPhotosAlbum:ok" === e.errMsg && (0, o.$Toast)({
                                content: "图片保存成功",
                                duration: 2,
                                mask: !1
                            });
                        },
                        fail: function() {
                            (0, o.$Toast)({
                                content: "图片保存失败",
                                duration: 1,
                                mask: !1
                            });
                        }
                    }), o.$Loading.hide();
                },
                fail: function(e) {
                    o.$Loading.hide(), (0, o.$Toast)({
                        content: "图片生成失败",
                        duration: 1,
                        mask: !1
                    });
                }
            });
        }, 300);
    },
    roundRect: function(e, t, a, i, o, s) {
        e.save(), i < 2 * s && (s = i / 2), o < 2 * s && (s = o / 2), e.beginPath(), e.setStrokeStyle("#E4E4E4"), 
        e.setLineWidth(1), e.moveTo(t + s, a), e.arcTo(t + i, a, t + i, a + o, s), e.arcTo(t + i, a + o, t, a + o, s), 
        e.arcTo(t, a + o, t, a, s), e.arcTo(t, a, t + i, a, s), e.stroke(), e.closePath();
    },
    drawText: function(e, t, a, i, o, s, n) {
        if (t.length > 1) {
            var r = t.split(""), h = "", c = [];
            e.setFontSize(a), e.setFillStyle(i);
            for (var d = 0; d < r.length; d++) e.measureText(h).width < o ? h += r[d] : (d--, 
            c.push(h), h = "");
            if (c.push(h), c.length > 2) {
                var u = c.slice(0, 2), g = u[1], p = "", l = [];
                for (d = 0; d < g.length && e.measureText(p).width < o - 30; d++) p += g[d];
                l.push(p);
                var f = l[0] + "...";
                u.splice(1, 1, f), c = u;
            }
            for (var m = 0; m < c.length; m++) e.fillText(c[m], s, n + 24 * m, o);
        } else {
            c = [];
            e.setFontSize(a), e.setFillStyle(i), e.fillText(t, s, n, o);
        }
        return c.length;
    },
    showDetailShare: function(e) {
        this.setData({
            showShare: !this.data.showShare
        });
    },
    onShareAppMessage: function(e) {
        "button" === e.from && this.setData({
            showShare: !1
        });
        var t = this.data, a = t.pageCode, i = t.shareInfo, o = t.fileDomain, s = wx.getStorageSync("spShopId");
        return {
            title: i.shareTitle,
            path: "/pages/pageHome/bannerInfo/bannerInfo?pageCode=".concat(a, "&spShopId=").concat(s),
            imageUrl: o + i.shareImageUrl
        };
    }
});