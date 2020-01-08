var t = require("../../../@babel/runtime/helpers/interopRequireDefault"), e = require("../../../3AB1A716B878E4CF5CD7CF11DFE86783.js"), a = require("../../../18B8A9E0B878E4CF7EDEC1E7E0186783.js"), s = require("../../../B20FF1E6B878E4CFD46999E127296783.js"), i = t(require("../../../481D43C1B878E4CF2E7B2BC653496783.js")), o = getApp();

Page({
    data: {
        userType: 0,
        list: [],
        showHeight: 430,
        isOpen: !1,
        signNumber: 0,
        shareImgFinish: !1,
        faceToFaceFinish: !1,
        showMask: !1,
        wxCode: null
    },
    onLoad: function(t) {
        this.setData({
            statusBarHeight: o.globalData.statusBarHeight,
            windowWidth: o.globalData.windowWidth,
            currentPage: getCurrentPages().length
        });
        var e = this.options.oldUserId, a = this.options.spShopId;
        if (e && a) this.setData({
            spShopId: a,
            oldUserId: e
        }); else if (t.scene) {
            var s = decodeURIComponent(t.scene), n = i.default.getParam(s, "spShopId"), h = i.default.getParam(s, "oldUserId");
            this.setData({
                spShopId: n,
                oldUserId: h
            });
        }
    },
    onShow: function() {
        var t = this;
        setTimeout(function() {
            t.checkStatus();
        }, 300);
    },
    checkStatus: function() {
        var t = this, e = this.data.oldUserId, a = this.data.spShopId;
        if (e && a) {
            this.setData({
                from: "share",
                title: "拼人气，好礼0元领"
            });
            var i = wx.getStorageSync("spShopId"), o = wx.getStorageSync("token"), n = wx.getStorageSync("userMobile"), h = wx.getStorageSync("bundleSuccess");
            wx.setStorageSync("oldUserId", e), o ? 1 == h ? n && this.setData({
                userType: 5
            }) : n && this.setData({
                userType: 1
            }) : i ? t.setData({
                userType: 2
            }) : (0, s.pickStore)({
                spShopId: a
            }, function(e) {
                wx.setStorageSync("spShopId", a), t.setData({
                    userType: 2
                });
            }), wx.stopPullDownRefresh();
        } else this.setData({
            title: "拼人气，好礼0元领"
        }), this.getInvitedUserInfo();
    },
    goLogin: function() {
        wx.navigateTo({
            url: "/pages/login/login"
        });
    },
    showRule: function() {
        this.setData({
            showRule: !this.data.showRule
        });
    },
    goBack: function() {
        1 === this.data.currentPage ? wx.switchTab({
            url: "/pages/home/home"
        }) : wx.navigateBack({
            delta: 1
        });
    },
    goHome: function() {
        wx.switchTab({
            url: "/pages/home/home"
        });
    },
    getInvitedUserInfo: function() {
        (0, a.$Loading)();
        var t = this;
        (0, e.getInvitedUser)(function(e) {
            var s = e.data, i = s.userList, o = s.totalBadges, n = s.appletCodePath, h = e.fileDomain;
            t.setData({
                list: i,
                signNumber: o,
                qrCodePath: h + n,
                showMask: !0
            }, function() {
                a.$Loading.hide(), wx.stopPullDownRefresh();
            });
        }, function() {
            a.$Loading.hide();
        });
    },
    goExchange: function() {
        wx.navigateTo({
            url: "/pages/pageActivity/exchange/exchange"
        });
    },
    openList: function() {
        this.data.isOpen ? this.setData({
            showHeight: 430,
            isOpen: !1
        }) : this.setData({
            showHeight: 99999999999999,
            isOpen: !0
        });
    },
    shareImg: function() {
        var t = this;
        if (this.data.shareImgFinish) {
            var e = this.data.shareImage;
            this.savaImgToPhone(e);
        } else {
            this.data.wxCode ? this.shareImgDraw() : this.setData({
                canvasType: 1
            }, function() {
                t.imgAuthorize();
            });
        }
    },
    facetoface: function() {
        var t = this;
        this.data.faceToFaceFinish || (this.data.wxCode ? this.faceToFaceDraw() : this.setData({
            canvasType: 2
        }, function() {
            t.imgAuthorize();
        }));
    },
    imgAuthorize: function() {
        var t = this;
        wx.getSetting({
            success: function(e) {
                var a = e.authSetting["scope.writePhotosAlbum"];
                void 0 === a ? wx.authorize({
                    scope: "scope.writePhotosAlbum",
                    success: function(e) {
                        t.getWxCode();
                    }
                }) : 0 == a ? wx.showModal({
                    title: "提示",
                    content: "若您需要使用分享图片功能，则需要您打开分享到相册的权限",
                    confirmColor: "#464646",
                    cancelColor: "#969696",
                    success: function(t) {
                        t.confirm && wx.openSetting();
                    }
                }) : 1 == a && t.getWxCode();
            }
        });
    },
    getWxCode: function() {
        var t = this;
        (0, a.$Loading)({
            mask: !0
        });
        var e = this, s = this.data.qrCodePath;
        wx.getImageInfo({
            src: s,
            success: function(s) {
                if ("unkown" == s.type || "unknown" == s.type) return a.$Loading.hide(), void (0, 
                a.$Toast)({
                    content: "获取小程序码失败，请稍后再试",
                    duration: 1.5,
                    mask: !1
                });
                e.setData({
                    wxCode: s.path
                }, function() {
                    t.shareImgDraw();
                });
            },
            fail: function() {
                a.$Loading.hide(), (0, a.$Toast)({
                    content: "获取小程序码失败，请稍后再试",
                    duration: 1.5,
                    mask: !1
                });
            }
        });
    },
    shareImgDraw: function() {
        (0, a.$Loading)();
        var t = this.data.wxCode, e = this, s = wx.createCanvasContext("shareImgCanvas");
        s.setFillStyle("#fffbe6"), s.fillRect(0, 0, 750, 2e3), s.drawImage("/images/activity/activity_share.jpg", 0, 0, 750, 1334), 
        s.drawImage(t, 275, 1035, 200, 200), s.drawImage("/images/activity/foot_logo.png", 275, 1250, 200, 51), 
        s.draw(), setTimeout(function() {
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 750,
                height: 1384,
                destWidth: 1500,
                destHeight: 2768,
                quality: 1,
                fileType: "png",
                canvasId: "shareImgCanvas",
                success: function(t) {
                    e.setData({
                        shareImage: t.tempFilePath,
                        shareImgFinish: !0
                    }), e.savaImgToPhone(t.tempFilePath), a.$Loading.hide();
                },
                fail: function(t) {
                    a.$Loading.hide(), (0, a.$Toast)({
                        content: "图片生成失败",
                        duration: 1,
                        mask: !1
                    });
                }
            });
        }, 500);
    },
    savaImgToPhone: function(t) {
        wx.saveImageToPhotosAlbum({
            filePath: t,
            success: function(t) {
                "saveImageToPhotosAlbum:ok" === t.errMsg && (0, a.$Toast)({
                    content: "图片保存成功",
                    duration: 2,
                    mask: !1
                });
            },
            fail: function() {
                (0, a.$Toast)({
                    content: "图片保存失败",
                    duration: 1,
                    mask: !1
                });
            }
        });
    },
    onPullDownRefresh: function() {
        this.checkStatus();
    },
    onShareAppMessage: function(t) {
        wx.getStorageSync("userMobile");
        var e = wx.getStorageSync("spShopId"), a = wx.getStorageSync("userId"), s = [ "邀请你一起逛明星妈妈也在用的Qtools！", "亲爱的，找小众轻奢母婴好物，就上Qtools", "推荐！他们家的母婴选品颜值超高，件件是网红潮流款" ];
        return {
            title: s[Math.floor(Math.random() * s.length)],
            path: "/pages/pageActivity/inviteUser/inviteUser?spShopId=".concat(e, "&oldUserId=").concat(a),
            imageUrl: "/images/activity/share.png"
        };
    }
});