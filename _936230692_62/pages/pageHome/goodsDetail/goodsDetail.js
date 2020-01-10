var t = require("../../../@babel/runtime/helpers/interopRequireDefault"), e = t(require("../../../@babel/runtime/helpers/toConsumableArray")), i = t(require("../../../C4DDA123B878E4CFA2BBC924B8096783.js")), a = require("../../../75C41DA1B878E4CF13A275A6DCF86783.js"), o = t(require("../../../481D43C1B878E4CF2E7B2BC653496783.js")), r = t(require("../../../2B492AF4B878E4CF4D2F42F3B1E86783.js")), n = require("../../../utils/loading.js"), s = require("../../../B20FF1E6B878E4CFD46999E127296783.js"), c = getApp();

Page({
    data: {
        barcode: null,
        pdSpuId: 0,
        current: 0,
        showShare: !1,
        showBuy: !1,
        commit: {},
        commentList: [],
        page: 1,
        pageNum: 1,
        pageSize: 20,
        goodsInfo: {},
        fileDomain: "",
        buyoradd: 0,
        level: 0,
        shareImage: "",
        showMask: !1,
        tabTop: 0,
        setTitleToFixed: !1,
        scrollTop: 0,
        priceType: 0,
        beforePrice: 0,
        afterPrice: 0,
        price: "",
        lastPriceType: 0,
        lastPrice: 0,
        lastBeforePrice: 0,
        lastAfterPrice: 0,
        lastPic: "",
        goodsNumber: 1,
        stock: 1,
        showShareImg: !1,
        isShowSlogin: !1,
        showMember: !1,
        showPreviewImg: !1,
        popCurrent: 0,
        content_active: 0,
        loginTypeTimes: 0,
        typeList: [],
        activeIdList: [],
        myIndex: -1,
        deleteScroll: !1,
        showDeliveryExplain: !1,
        drawFinish: !1,
        customer_info_str: "",
        note_info_str: "",
        timeFormat: [ "天", "时", "分", "秒" ],
        clearTimer: !1,
        previewImgList: [],
        promotionList: []
    },
    onLoad: function(t) {
        var e = this, i = wx.getStorageSync("userName"), a = wx.getStorageSync("userPic"), r = c.globalData.isIphoneX, n = c.globalData.windowWidth, s = t.pdSpuId ? t.pdSpuId : "", d = t.spShopId ? t.spShopId : "", l = wx.getStorageSync("spShopId"), u = c.globalData.statusBarHeight;
        if (this.setData({
            statusBarHeight: u,
            windowWidth: n,
            pdSpuId: s,
            userName: i,
            userPic: a,
            isIphoneX: r,
            currentPage: getCurrentPages().length
        }), t.scene) {
            var h = decodeURIComponent(t.scene), f = o.default.getParam(h, "pdSpuId"), p = o.default.getParam(h, "spShopId");
            return console.log(h), void this.setData({
                pdSpuId: f
            }, function() {
                e.checkIn(l, p);
            });
        }
        this.checkIn(l, d);
    },
    onShow: function() {},
    checkIn: function(t, e) {
        var i = this;
        t ? this.getGoodsInfo() : e && (0, s.pickStore)({
            spShopId: e
        }, function(t) {
            wx.setStorageSync("spShopId", e), i.getGoodsInfo();
        });
    },
    contentChange: function(t) {
        this.setData({
            content_active: t.detail.index
        });
    },
    goBack: function() {
        1 === this.data.currentPage ? wx.switchTab({
            url: "/pages/home/home"
        }) : wx.navigateBack({
            delta: 1
        });
    },
    bindcontact: function(t) {
        var e = this.data, i = e.goodsInfo, a = e.fileDomain;
        UdeskSdk.trace("product", {
            name: i.name,
            url: i.udeskShareUrl,
            imgUrl: a + i.mainPicUrl,
            params: [ {
                text: "￥" + i.toCPrice,
                color: "#00C4B3",
                fold: !1,
                break: !1,
                size: 14
            } ]
        });
    },
    previewImg: function(t) {
        var e = this, i = this.data, a = i.current, o = i.goodsInfo, r = i.fileDomain, n = [];
        if (o.pic < 1) return !1;
        1 === o.pic.length ? n.push(r + o.pic[0]) : n = o.pic, this.setData({
            popCurrent: a,
            previewImgList: n
        }, function() {
            setTimeout(function() {
                e.setData({
                    showPreviewImg: !0
                });
            }, 150);
        });
    },
    popSwiperChange: function(t) {
        this.setData({
            popCurrent: t.detail.current
        });
    },
    getGoodsInfo: function() {
        var t = this, e = this, a = this.data.pdSpuId;
        (0, n.$Loading)(), i.default.getGoodsDetailBySearch({
            pdSpuId: a
        }, function(i) {
            var a = i.data;
            a.discountPriceStr = a.discountPriceStr ? o.default.formatPrice(a.discountPriceStr) : null, 
            a.activeStartTime = a.activeStartTime ? o.default.formatChineseTime(a.activeStartTime) : null, 
            a.activeEndTime = a.activeEndTime ? o.default.formatChineseTime(a.activeEndTime) : null, 
            e.getGoodsComment(), a.iconList.length > 0 && e.getPromotion(), e.setData({
                goodsInfo: a,
                titleName: a.name,
                fileDomain: i.fileDomain,
                showMask: !0
            }, function() {
                t.formatDetail(a.sku);
            });
        }, function(t) {
            n.$Loading.hide(), (0, n.$Toast)({
                content: "请求数据失败",
                duration: 0
            }), setTimeout(function() {
                n.$Toast.hide(), wx.navigateBack({
                    delta: 1
                });
            }, 2e3);
        });
    },
    getPromotion: function() {
        var t = this, e = this.data.pdSpuId;
        i.default.getPromotionList(e, function(e) {
            var i = e.data;
            t.setData({
                promotionList: i
            });
        });
    },
    goActivity: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/pageHome/activityList/activityList?p=".concat(e, "&f=goodDetail")
        });
    },
    onPullDownRefresh: function() {
        this.getGoodsInfo();
    },
    goHome: function() {
        wx.switchTab({
            url: "/pages/home/home"
        });
    },
    getGoodsComment: function() {
        if (this.data.isShowSlogin) return !1;
        var t = this, a = this.data.page, o = this.data.pageNum, n = this.data.pageSize, s = this.data.pdSpuId, c = this.data.commentList;
        if (a > o) return this.setData({
            isShowSlogin: !0
        }), !1;
        i.default.getGoodsComment({
            pdSpuId: s,
            page: a,
            pageSize: n
        }, function(i) {
            if (i.data) {
                var o = r.default.div(i.data.score, 5);
                i.data.percent = r.default.mul(o, 100), i.data.list.forEach(function(t) {
                    t.nickname = t.nickname.slice(0, 1) + "*****";
                }), c = 1 == a ? i.data.list : [].concat((0, e.default)(c), (0, e.default)(i.data.list)), 
                t.setData({
                    commit: i.data,
                    commentList: c,
                    page: a + 1,
                    pageNum: i.data.pageNum
                });
            }
        });
    },
    onReachBottom: function(t) {
        var e = this.data.commit;
        1 == this.data.content_active && "{}" != JSON.stringify(e) && e.list && this.getGoodsComment();
    },
    onPageScroll: function() {
        var t = this.data.statusBarHeight + 38, e = this;
        wx.createSelectorQuery().select(".tab-wrap").boundingClientRect(function(i) {
            i && (i.top <= t ? e.setData({
                setTitleToFixed: !0
            }) : e.setData({
                setTitleToFixed: !1
            }));
        }).exec();
    },
    getIndex: function(t, e) {
        for (var i = 0; i < e.length && t != e[i].title; i++) ;
        return i < e.length ? i : -1;
    },
    isValueExist: function(t, e) {
        for (var i = 0; i < e.length && e[i].name != t; i++) ;
        return i < e.length;
    },
    setChoose: function(t) {
        var e = this, i = this.data.goodsInfo, a = i.sku, o = [];
        a.forEach(function(e) {
            e.qtyLeft > 0 && (o.push(e), e.valList.forEach(function(e) {
                t.forEach(function(t) {
                    t.values.forEach(function(t) {
                        t.valId == e.pdTypeValId && (t.disabled = !1);
                    });
                });
            }));
        }), this.setData({
            typeList: t
        }, function() {
            1 === t.length && i.qtyLeft > 0 ? e.chooseType({
                type: 0,
                pdTypeValId: o[0].pdType1ValId
            }) : 2 === t.length && 1 == o.length && i.qtyLeft > 0 && e.chooseLastType(o[0].pdType1ValId);
        });
    },
    chooseLastType: function(t) {
        var e = this.data.goodsInfo.sku, i = [];
        e.forEach(function(e) {
            e.pdType1ValId == t && e.qtyLeft > 0 && i.push({
                val1: e.pdType1ValId,
                val2: e.pdType2ValId
            });
        }), this.chooseType({
            type: 0,
            pdTypeValId: i[0].val1
        }), this.chooseType({
            type: 1,
            pdTypeValId: i[0].val2
        });
    },
    formatDetail: function(t) {
        var e = this, i = this.data, a = i.level, r = i.fileDomain, s = i.goodsInfo, c = -1, d = !1, l = 0, u = 0, h = 0, f = 0;
        if (t.length <= 0) {
            var p = 0 != s.warehouseId || 1 == s.brandDirectMail ? s.toCPrice : s.goldCardPrice, m = 0 != s.warehouseId || 1 == s.brandDirectMail ? s.toCPrice : s.silverCardPrice, g = s.toCPrice, P = s.discountPrice, v = 0 == s.warehouseId && 1 != s.brandDirectMail;
            1 == a || 2 == a ? (l = 1 == a ? P ? Math.min(p, g, P) : Math.min(p, g) : P ? Math.min(m, g, P) : Math.min(m, g)) < g ? (c = 2, 
            u = g, h = l, d = v) : l == g && (c = 1, f = o.default.formatPrice(g)) : (l = P ? Math.min(g, P) : g) < g ? (c = 2, 
            u = g, h = l) : l == g && (c = 1, f = o.default.formatPrice(g)), this.setData({
                lastIcon: s.iconList,
                stock: s.qtyLeft
            });
        } else if (1 == t.length) {
            var w = t[0], I = w.toCPrice, T = 0 != s.warehouseId || 1 == s.brandDirectMail ? w.toCPrice : w.goldCardPrice, y = 0 != s.warehouseId || 1 == s.brandDirectMail ? w.toCPrice : w.silverCardPrice, S = w.discountPrice, C = 0 == s.warehouseId && 1 != s.brandDirectMail;
            1 == a || 2 == a ? (l = 1 == a ? S ? Math.min(T, I, S) : Math.min(T, I) : S ? Math.min(y, I, S) : Math.min(y, I)) < I ? (c = 2, 
            u = I, h = l, d = C) : l == I && (c = 1, f = o.default.formatPrice(I)) : (l = S ? Math.min(I, S) : I) < I ? (c = 2, 
            u = I, h = l) : l == I && (c = 1, f = o.default.formatPrice(I));
        } else if (t.length > 1) {
            var D = 0 == s.warehouseId && 1 != s.brandDirectMail;
            if (1 == a || 2 == a) {
                t.forEach(function(t) {
                    t.goldCardPrice = 0 != s.warehouseId || 1 == s.brandDirectMail ? t.toCPrice : t.goldCardPrice, 
                    t.silverCardPrice = 0 != s.warehouseId || 1 == s.brandDirectMail ? t.toCPrice : t.silverCardPrice, 
                    t.minShowPrice = 1 == a ? t.discountPrice ? Math.min(t.goldCardPrice, t.toCPrice, t.discountPrice) : Math.min(t.goldCardPrice, t.toCPrice) : t.discountPrice ? Math.min(t.silverCardPrice, t.toCPrice, t.discountPrice) : Math.min(t.silverCardPrice, t.toCPrice);
                });
                for (var b = t[0].toCPrice, x = t[0].toCPrice, L = t[0].minShowPrice, k = t[0].minShowPrice, M = 0; M < t.length - 1; M++) b = b < t[M + 1].toCPrice ? t[M + 1].toCPrice : b, 
                x = x > t[M + 1].toCPrice ? t[M + 1].toCPrice : x, L = L < t[M + 1].minShowPrice ? t[M + 1].minShowPrice : L, 
                k = k > t[M + 1].minShowPrice ? t[M + 1].minShowPrice : k;
                if (l = k, b == x && L == k && (x == k ? (c = 1, f = o.default.formatPrice(x)) : x > k && (c = 2, 
                u = x, h = k, d = D)), b == x && L > k) x > k && (c = 1, f = o.default.formatPrice(k) + " - " + o.default.formatPrice(L), 
                d = D); else if (b > x && L == k) x > k && (c = 2, u = b, h = k, d = D); else if (b > x && L > k) for (var E = 0; E < t.length - 1; E++) {
                    if (t[E].minShowPrice != t[E].toCPrice) {
                        c = 1, f = o.default.formatPrice(k) + " - " + o.default.formatPrice(L), d = D;
                        break;
                    }
                    c = 1, f = o.default.formatPrice(x) + " - " + o.default.formatPrice(b);
                }
            } else {
                t.forEach(function(t) {
                    t.minShowPrice = t.discountPrice ? Math.min(t.toCPrice, t.discountPrice) : t.toCPrice;
                });
                for (var F = t[0].toCPrice, V = t[0].toCPrice, q = t[0].minShowPrice, $ = t[0].minShowPrice, B = 0; B < t.length - 1; B++) F = F < t[B + 1].toCPrice ? t[B + 1].toCPrice : F, 
                V = V > t[B + 1].toCPrice ? t[B + 1].toCPrice : V, q = q < t[B + 1].minShowPrice ? t[B + 1].minShowPrice : q, 
                $ = $ > t[B + 1].minShowPrice ? t[B + 1].minShowPrice : $;
                if (l = $, F == V && q == $) V == $ ? (c = 1, f = o.default.formatPrice(V)) : V > $ && (c = 2, 
                u = V, h = $); else if (F == V && q > $) V > $ && (c = 1, f = o.default.formatPrice($) + " - " + o.default.formatPrice(q)); else if (F > V && q == $) V >= $ && (c = 2, 
                u = F, h = $); else if (F > V && q > $) for (var N = 0; N < t.length - 1; N++) {
                    if (t[N].minShowPrice != t[N].toCPrice) {
                        c = 1, f = o.default.formatPrice($) + " - " + o.default.formatPrice(q);
                        break;
                    }
                    c = 1, f = o.default.formatPrice(V) + " - " + o.default.formatPrice(F);
                }
            }
        }
        this.setData({
            remind: s.spuRemind ? s.spuRemind : "",
            minShowPrice: o.default.formatPrice(l),
            lastPriceType: c,
            lastBeforePrice: o.default.formatPrice(u),
            lastAfterPrice: o.default.formatPrice(h),
            lastPrice: f,
            lastPic: r + s.mainPicUrl + "?x-oss-process=image/resize,m_lfit,w_600,h_0/quality,q_100",
            price: f,
            beforePrice: o.default.formatPrice(u),
            afterPrice: o.default.formatPrice(h),
            priceType: c,
            showMember: d
        }, function() {
            n.$Loading.hide(), wx.stopPullDownRefresh(), s.qtyLeft > 0 && e.resetSku(t);
        });
    },
    resetSku: function(t) {
        var e = this, i = [];
        t.length > 0 && (t.forEach(function(t) {
            t.valList = [], t.pdType1 && (t.pdType1Val.title = t.pdType1.name, t.valList.push(t.pdType1Val)), 
            t.pdType2 && (t.pdType2Val.title = t.pdType2.name, t.valList.push(t.pdType2Val));
        }), t.forEach(function(t) {
            t.valList.forEach(function(t) {
                var a = e.getIndex(t.title, i);
                a >= 0 ? e.isValueExist(t.name, i[a].values) || i[a].values.push({
                    name: t.name,
                    disabled: !0,
                    active: -1,
                    valId: t.pdTypeValId
                }) : i.push({
                    title: t.title,
                    values: [ {
                        name: t.name,
                        disabled: !0,
                        active: -1,
                        valId: t.pdTypeValId
                    } ]
                });
            });
        }), this.setChoose(i));
    },
    chooseType: function(t) {
        var e = -1, i = -1, a = -1, o = !1;
        0 == t.type ? (e = t.pdTypeValId, i = 0, a = -1, o = !1) : 1 == t.type ? (e = t.pdTypeValId, 
        i = 1, a = -1, o = !1) : (e = t.currentTarget.dataset.pdtypevalid, i = t.currentTarget.dataset.index, 
        a = t.currentTarget.dataset.active, o = t.currentTarget.dataset.disabled);
        var r = this.data, n = r.activeIdList, s = r.typeList;
        if (1 != o) if (a == e) {
            var c = n.indexOf(e);
            c > -1 && (n[c] = -1), s[i].values.forEach(function(t) {
                t.active = -1;
            }), this.setAbled(i, n, e);
        } else 0 == n.length && 1 == i ? n = [ -1, e ] : n[i] = e, s[i].values.forEach(function(t) {
            t.active = e;
        }), this.setDisabled(i, n);
    },
    setAbled: function(t, e, i) {
        var a = this, o = this.data, r = o.goodsInfo, n = o.typeList, s = r.sku;
        2 == n.length && (0 == t ? s.forEach(function(t) {
            n[1].values.forEach(function(e) {
                t.qtyLeft > 0 && t.pdType2ValId == e.valId && (e.disabled = !1);
            });
        }) : 1 == t && s.forEach(function(t) {
            n[0].values.forEach(function(e) {
                t.qtyLeft > 0 && t.pdType1ValId == e.valId && (e.disabled = !1);
            });
        })), this.setData({
            typeList: n,
            activeIdList: e
        }, function() {
            a.afterChoose();
        });
    },
    setDisabled: function(t, e) {
        var i = this, a = this.data, o = a.goodsInfo, r = a.typeList, n = o.sku;
        2 == r.length && (0 == t ? n.forEach(function(t) {
            r[1].values.forEach(function(i) {
                t.pdType1ValId == e[0] && t.pdType2ValId == i.valId && (t.qtyLeft > 0 ? i.disabled = !1 : i.disabled = !0);
            });
        }) : 1 == t && n.forEach(function(t) {
            r[0].values.forEach(function(i) {
                t.pdType2ValId == e[1] && t.pdType1ValId == i.valId && (t.qtyLeft > 0 ? i.disabled = !1 : i.disabled = !0);
            });
        })), this.setData({
            typeList: r,
            activeIdList: e
        }, function() {
            i.afterChoose();
        });
    },
    afterChoose: function(t) {
        var e = this.data, i = e.activeIdList, a = e.typeList, r = e.remind, n = e.lastPic, s = e.lastPriceType, c = e.lastIcon, d = e.lastPrice, l = e.lastBeforePrice, u = e.lastAfterPrice, h = e.stock, f = e.goodsInfo, p = e.fileDomain, m = e.level, g = f.sku, P = a.length, v = "?x-oss-process=image/resize,m_lfit,w_600,h_0/quality,q_100";
        1 == P ? g.forEach(function(t) {
            t.pdType1ValId == i[0] && t.qtyLeft > 0 && (t.goldCardPrice = 0 != f.warehouseId || 1 == f.brandDirectMail ? t.toCPrice : t.goldCardPrice, 
            t.silverCardPrice = 0 != f.warehouseId || 1 == f.brandDirectMail ? t.toCPrice : t.silverCardPrice, 
            t.minShowPrice = 1 == m ? t.discountPrice ? Math.min(t.goldCardPrice, t.toCPrice, t.discountPrice) : Math.min(t.goldCardPrice, t.toCPrice) : 2 == m ? t.discountPrice ? Math.min(t.silverCardPrice, t.toCPrice, t.discountPrice) : Math.min(t.silverCardPrice, t.toCPrice) : t.discountPrice ? Math.min(t.toCPrice, t.discountPrice) : t.toCPrice, 
            t.minShowPrice == t.toCPrice ? (s = 1, d = t.toCPrice) : t.minShowPrice < t.toCPrice && (s = 2, 
            l = t.toCPrice, u = t.minShowPrice), r = t.skuRemind ? t.skuRemind : "", h = t.qtyLeft, 
            c = t.iconList, n = "" == t.picUrl ? p + f.mainPicUrl + v : p + t.picUrl + v);
        }) : P > 1 && g.forEach(function(t) {
            t.pdType1ValId == i[0] && t.pdType2ValId == i[1] && t.qtyLeft > 0 && (t.goldCardPrice = 0 != f.warehouseId || 1 == f.brandDirectMail ? t.toCPrice : t.goldCardPrice, 
            t.silverCardPrice = 0 != f.warehouseId || 1 == f.brandDirectMail ? t.toCPrice : t.silverCardPrice, 
            t.minShowPrice = 1 == m ? t.discountPrice ? Math.min(t.goldCardPrice, t.toCPrice, t.discountPrice) : Math.min(t.goldCardPrice, t.toCPrice) : 2 == m ? t.discountPrice ? Math.min(t.silverCardPrice, t.toCPrice, t.discountPrice) : Math.min(t.silverCardPrice, t.toCPrice) : t.discountPrice ? Math.min(t.toCPrice, t.discountPrice) : t.toCPrice, 
            t.minShowPrice == t.toCPrice ? (s = 1, d = t.toCPrice) : t.minShowPrice < t.toCPrice && (s = 2, 
            l = t.toCPrice, u = t.minShowPrice), r = t.skuRemind ? t.skuRemind : "", h = t.qtyLeft, 
            c = t.iconList, n = "" == t.picUrl ? p + f.mainPicUrl + v : p + t.picUrl + v);
        }), this.setData({
            stock: h,
            lastIcon: c,
            lastPriceType: s,
            remind: r,
            lastBeforePrice: o.default.formatPrice(l),
            lastAfterPrice: o.default.formatPrice(u),
            lastPrice: o.default.formatPrice(d),
            lastPic: n
        });
    },
    onShareAppMessage: function(t) {
        "button" === t.from && this.setData({
            showShare: !1
        });
        var e = wx.getStorageSync("spShopId"), i = this.data.pdSpuId, a = "pdSpuId=".concat(i, "&spShopId=").concat(e);
        return {
            title: this.data.goodsInfo.cname,
            path: "pages/pageHome/goodsDetail/goodsDetail?" + a,
            imageUrl: this.data.fileDomain + this.data.goodsInfo.mainPicUrl,
            success: function(t) {
                (0, n.$Toast)({
                    content: "分享成功",
                    duration: 1
                });
            }
        };
    },
    slideChange: function(t) {
        this.setData({
            current: t.detail.current
        });
    },
    collect: function() {
        var t = this;
        if (wx.getStorageSync("token")) {
            var e = this.data.goodsInfo, a = e.pdSpuId;
            0 === e.favoritesFlg ? i.default.collect({
                pdSpuId: a
            }, function(i) {
                e.favoritesFlg = 1, t.setData({
                    goodsInfo: e
                }), (0, n.$Toast)({
                    content: "收藏成功",
                    duration: 1
                });
            }) : 1 === e.favoritesFlg && i.default.uncollect(a, function(i) {
                e.favoritesFlg = 0, t.setData({
                    goodsInfo: e
                }), (0, n.$Toast)({
                    content: "取消收藏",
                    duration: 1
                });
            });
        } else wx.navigateTo({
            url: "/pages/login/login"
        });
    },
    hidePreviewImg: function() {
        var t = this, e = this.data.current;
        this.setData({
            showPreviewImg: !1
        }), setTimeout(function() {
            t.setData({
                current: e
            });
        }, 300);
    },
    previewImgEvent: function(t) {
        var e = this, i = t.currentTarget.dataset.imgurl, a = [];
        a.push(i), this.setData({
            previewImgList: a
        }, function() {
            setTimeout(function() {
                e.setData({
                    showPreviewImg: !0
                });
            }, 100);
        });
    },
    showDetailShare: function(t) {
        this.setData({
            showShare: !this.data.showShare
        });
    },
    showActivity: function() {
        this.setData({
            showActivity: !this.data.showActivity
        });
    },
    showDeliveryExplain: function() {
        this.setData({
            showDeliveryExplain: !this.data.showDeliveryExplain
        });
    },
    showBondNotice: function() {
        this.setData({
            showBondNotice: !this.data.showBondNotice
        });
    },
    showProductNotice: function() {
        this.setData({
            showProductNotice: !this.data.showProductNotice
        });
    },
    showBondProductNotice: function() {
        this.setData({
            showBondProductNotice: !this.data.showBondProductNotice
        });
    },
    buyClose: function(t) {
        var e = this.data.lastScrollTop;
        this.setData({
            showBuy: !1,
            deleteScroll: !1
        }, function() {
            wx.pageScrollTo({
                scrollTop: e,
                duration: 0
            });
        });
    },
    handleChange: function(t) {
        var e = t.detail;
        this.setData({
            goodsNumber: e.value
        });
    },
    goCart: function(t) {
        wx.navigateTo({
            url: "/pages/pageCart/cartList/cart"
        });
    },
    add_buy: function(t) {
        this.setData({
            lastScrollTop: this.data.scrollTop,
            buyoradd: t.currentTarget.dataset.type,
            deleteScroll: !0,
            showBuy: !0
        });
    },
    buy_add: function(t) {
        if (wx.getStorageSync("token")) {
            var e = this, i = this.data, o = i.activeIdList, r = i.typeList, s = i.goodsInfo, c = i.goodsNumber, d = i.buyoradd, l = s.sku, u = r.length, h = s.pdSpuId, f = c, p = -1;
            if (0 == u) ; else if (1 == u) {
                if (-1 == o[0] || o.length <= 0) return (0, n.$Toast)({
                    content: "请选择商品规格",
                    duration: 1
                });
                l.forEach(function(t) {
                    t.pdType1ValId == o[0] && (p = t.pdSkuId, t.pdType1Val.name);
                });
            } else if (2 == u) {
                if (o.length < 2 || -1 == o[0] || -1 == o[1]) return (0, n.$Toast)({
                    content: "请选择商品规格",
                    duration: 1
                });
                l.forEach(function(t) {
                    t.pdType1ValId == o[0] && t.pdType2ValId == o[1] && (p = t.pdSkuId, t.pdType1Val.name + "/" + t.pdType2Val.name);
                });
            }
            if (1 == d) {
                (0, n.$Loading)();
                var m = {
                    pdSpuId: h,
                    pdSkuId: p,
                    qty: f
                };
                (0, a.addToCart)(m, function(t) {
                    e.buyClose(), n.$Loading.hide(), wx.setStorageSync("cartFresh", 1), (0, n.$Toast)({
                        content: "加入购物袋成功",
                        duration: 1
                    });
                }, function(t, e) {
                    n.$Loading.hide(), "E_501" == t ? (0, n.$Toast)({
                        content: e.data.message,
                        duration: 1
                    }) : (0, n.$Toast)({
                        content: "小Q走丢了",
                        duration: 1
                    });
                });
            } else 2 == d && wx.navigateTo({
                url: "/pages/pageOrder/orderConfirm/orderConfirm?pdSpuId=".concat(h, "&pdSkuId=").concat(p, "&qty=").concat(f, "&type=0"),
                success: function() {
                    e.buyClose();
                }
            });
        } else wx.navigateTo({
            url: "/pages/login/login"
        });
    },
    hideShareImg: function() {
        this.setData({
            showShareImg: !1
        });
    },
    drawSharePic: function() {
        var t = this;
        this.setData({
            showShare: !1
        }), this.data.drawFinish ? this.finishDraw() : wx.getSetting({
            success: function(e) {
                var i = e.authSetting["scope.writePhotosAlbum"];
                void 0 === i ? wx.authorize({
                    scope: "scope.writePhotosAlbum",
                    success: function(e) {
                        t.shareDetail();
                    }
                }) : !1 === i ? wx.showModal({
                    title: "提示",
                    content: "若您需要使用分享图片功能，则需要您打开分享到相册的权限",
                    confirmColor: "#464646",
                    cancelColor: "#969696",
                    success: function(t) {
                        t.confirm && wx.openSetting();
                    }
                }) : !0 === i && t.shareDetail();
            }
        });
    },
    shareDetail: function() {
        var t = this;
        (0, n.$Loading)();
        var e = this.data, i = e.goodsInfo, a = e.fileDomain, o = a + i.mainPicUrl + "?x-oss-process=image/resize,m_lfit,w_600,h_0/quality,q_100", r = a + i.appletCodePath;
        wx.getImageInfo({
            src: r,
            success: function(e) {
                if ("unkown" == e.type || "unknown" == e.type) return n.$Loading.hide(), void (0, 
                n.$Toast)({
                    content: "获取小程序码失败，请稍后再试",
                    duration: 1.5
                });
                wx.getImageInfo({
                    src: o,
                    success: function(i) {
                        if ("unkown" == i.type || "unknown" == i.type) return n.$Loading.hide(), void (0, 
                        n.$Toast)({
                            content: "生成分享图失败，请稍后再试",
                            duration: 1.5
                        });
                        t.sharePicCallback(i.path, e.path, 300);
                    },
                    fail: function() {
                        n.$Loading.hide(), (0, n.$Toast)({
                            content: "生成分享图失败，请稍后再试",
                            duration: 1.5
                        });
                    }
                });
            },
            fail: function() {
                n.$Loading.hide(), (0, n.$Toast)({
                    content: "获取小程序码失败，请稍后再试",
                    duration: 1.5
                });
            }
        });
    },
    sharePicCallback: function(t, e) {
        var i = this, a = this.data, n = a.goodsInfo, s = a.typeList, c = a.price, d = a.priceType, l = a.afterPrice, u = (a.beforePrice, 
        s.length), h = n.cname, f = n.iconList, p = f.length > 0 ? f[0].iconName : "", m = "";
        if (u < 1) m = ""; else if (1 == u) {
            m = s[0].values.length + "种" + s[0].title + "选择";
        } else if (2 == u) {
            var g = s[0].values.length, P = s[1].values.length, v = s[0].title, w = s[1].title;
            m = r.default.mul(g, P) + "种" + v + "、" + w + "选择";
        }
        var I = 0, T = wx.createCanvasContext("shareCanvas"), y = T.createLinearGradient(0, 0, 420, 764);
        y.addColorStop(0, "#2dd6b1"), y.addColorStop(1, "#1fc3b3"), T.setFillStyle(y), T.fillRect(0, 0, 420, 764), 
        i.roundRect(T, 20, 100, 380, 634, 10, "#FFFFFF"), T.drawImage("/images/qtoolsLogo.png", 150, 32, 120, 48), 
        T.drawImage(t, 32, 112, 356, 356), i.drawText(T, "￥", 10, "#00C4B3", 12, 32, 500);
        var S = T.measureText("￥").width;
        if (T.setFontSize(32), 1 == d ? (I = T.measureText(c).width, i.drawText(T, c, 32, "#00C4B3", I, S + 1 + 32, 500)) : 2 == d && (I = T.measureText(l).width, 
        i.drawText(T, l, 32, "#00C4B3", I, S + 1 + 32, 500)), p) {
            T.setFontSize(12);
            var C = T.measureText(p).width, D = I + 32 + S + 10;
            i.roundRect(T, D, 478, C + 8, 20, 2, "#FFEFED"), i.drawText(T, p, 12, "#FF7357", C, D + 4, 492);
        }
        var b;
        b = i.drawText(T, h, 16, "#464646", 356, 32, 530) > 1 ? 580 : 554, i.drawText(T, m, 12, "#464646", 356, 32, b), 
        T.drawImage(e, 150, 584, 120, 120), T.setFontSize(12);
        var x = T.measureText("长按识别查看").width;
        i.drawText(T, "长按识别查看", 12, "#7D7D7D", 420, (420 - x) / 2, 722);
        var L = o.default.getNowTime(), k = "价格具有时效性  |  ".concat(L, "生成"), M = T.measureText(k).width;
        i.drawText(T, k, 12, "#ccf3f0", 420, (420 - M) / 2, 754), T.draw(), i.setData({
            drawFinish: !0,
            priceHeight: 764
        }, function() {
            i.finishDraw();
        });
    },
    finishDraw: function() {
        var t = this, e = this.data, i = e.drawFinish, a = e.priceHeight;
        console.log(a), i && setTimeout(function() {
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 420,
                height: a,
                destWidth: 1260,
                destHeight: 3 * a,
                quality: 1,
                fileType: "jpg",
                canvasId: "shareCanvas",
                success: function(e) {
                    t.setData({
                        shareImage: e.tempFilePath,
                        showShareImg: !0
                    }), wx.saveImageToPhotosAlbum({
                        filePath: e.tempFilePath,
                        success: function(t) {
                            "saveImageToPhotosAlbum:ok" === t.errMsg && (0, n.$Toast)({
                                content: "图片保存成功",
                                duration: 2
                            });
                        },
                        fail: function() {
                            (0, n.$Toast)({
                                content: "图片保存失败",
                                duration: 1
                            });
                        }
                    }), n.$Loading.hide();
                },
                fail: function(t) {
                    n.$Loading.hide(), (0, n.$Toast)({
                        content: "图片生成失败",
                        duration: 1
                    });
                }
            });
        }, 300);
    },
    drawText: function(t, e, i, a, o, r, n) {
        if (e.length > 1) {
            var s = e.split(""), c = "", d = [];
            t.setFontSize(i), t.setFillStyle(a);
            for (var l = 0; l < s.length; l++) t.measureText(c).width < o ? c += s[l] : (l--, 
            d.push(c), c = "");
            if (d.push(c), d.length > 2) {
                var u = d.slice(0, 2), h = u[1], f = "", p = [];
                for (l = 0; l < h.length && t.measureText(f).width < o - 30; l++) f += h[l];
                p.push(f);
                var m = p[0] + "...";
                u.splice(1, 1, m), d = u;
            }
            for (var g = 0; g < d.length; g++) t.fillText(d[g], r, n + 22 * g, o);
        } else {
            d = [];
            t.setFontSize(i), t.setFillStyle(a), t.fillText(e, r, n, o);
        }
        return d.length;
    },
    roundRect: function(t, e, i, a, o, r, n) {
        t.save(), a < 2 * r && (r = a / 2), o < 2 * r && (r = o / 2), t.beginPath(), t.setStrokeStyle(n), 
        t.setLineWidth(1), t.moveTo(e + r, i), t.arcTo(e + a, i, e + a, i + o, r), t.arcTo(e + a, i + o, e, i + o, r), 
        t.arcTo(e, i + o, e, i, r), t.arcTo(e, i, e + a, i, r), t.stroke(), t.closePath(), 
        t.setFillStyle(n), t.fill();
    }
});