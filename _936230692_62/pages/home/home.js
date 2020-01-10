var e = require("../../@babel/runtime/helpers/interopRequireDefault"), o = require("../../C4DDA123B878E4CFA2BBC924B8096783.js"), t = e(require("../../481D43C1B878E4CF2E7B2BC653496783.js")), a = require("../../AD0111C0B878E4CFCB6779C705596783.js"), n = require("../../167BC423B878E4CF701DAC2479196783.js"), i = require("../../B20FF1E6B878E4CFD46999E127296783.js"), r = getApp();
const app = getApp()
const WXAPI = require('../../services/index.js')

const { $Toast,
  $Toast_hide,
  $Message,
  $Loading,
  $Loading_hide } = require('../../utils/loading.js')


Page({
  data: {
    currentIndex: 0,
    active: 0,
    fileDomain: "",
    showMask: !1,
    tab: [],
    tabList: [],
    showCoupon: !1,
    couponList: [],
    popList: []
  },
  onLoad: function (e) {
    // const _this = this



    var o = this;
    if ((0, $Loading)(), e.oldUserId && wx.setStorageSync("oldUserId", e.oldUserId ? e.oldUserId : ""),
      e.scene) {
      var a = decodeURIComponent(e.scene), n = a.split("_");
      if (console.log(a), n.length > 1) $Loading_hide(), wx.showModal({
        title: "接受邀请失败",
        content: "该小程序码已废弃，让闺蜜重新邀请吧！",
        confirmColor: "#464646",
        confirmText: "继续访问",
        cancelColor: "#969696",
        cancelText: "重新邀请",
        success: function (e) {
          e.confirm ? ((0, $Loading)(), o.inType("none")) : e.cancel && (0, $Toast)({
            content: "让闺蜜重新获取分享图片，再用微信扫码即可接受邀请。",
            duration: 2.5,
            mask: !1
          });
        }
      }); else {
        var i = t.default.getParam(a, "spShopId"), r = t.default.getParam(a, "source"), c = t.default.getParam(a, "oldUserId");
        wx.setStorageSync("source", r || ""), wx.setStorageSync("oldUserId", c || ""), this.inType("share", i);
      }
    } else e.spShopId ? this.inType("share", e.spShopId) : this.inType("none");
  },


  inType: function (e, o) {
    const _this = this
    const token = wx.getStorageSync("token")
    const homeFresh = wx.getStorageSync("homeFresh")
    const spShopId = wx.getStorageSync("spShopId")
    if (e == 'share' && token && !homeFresh) {
      this.getPop()
    } else if (o) {
      //执行i.pickStore 参数spShopId
      const data = { spShopId: o }
      WXAPI(data, function (res) {
        wx.setStorageSync("spShopId", o)
        _this.getPop();
        $Loading_hide()
      }, function (res) {
        $Loading_hide()
      })
    } else {
      wx.navigateTo({
        url: "/pages/pageMe/shopList/shopList?from=home"
      })
    }

    // var t = this, a = wx.getStorageSync("token"), n = wx.getStorageSync("homeFresh"), s = wx.getStorageSync("spShopId");

    // "share" === e ? token ? 0 == homeFresh && this.getPop() : o ? (0, i.pickStore)({
    //   spShopId: o
    // }, function (e) {
    //   wx.setStorageSync("spShopId", o), _this.getPop();
    //   }) : spShopId ? 0 == homeFresh && this.getPop() : wx.navigateTo({
    //   url: "/pages/pageMe/shopList/shopList?from=home"
    //   }) : spShopId ? 0 == homeFresh && this.getPop() : wx.navigateTo({
    //   url: "/pages/pageMe/shopList/shopList?from=home"
    // });
  },


  onShow: function () {
    this.checkUpdateStatus(), this.checkVersion(), 1 == wx.getStorageSync("homeFresh") && ((0,
      $Loading)(), this.getPop());
  },
  goActivity: function (e) {
    var o = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/pageHome/activityList/activityList?p=".concat(o, "&f=goodDetail")
    });
  },
  goInvite: function () {
    wx.getStorageSync("userMobile") ? wx.navigateTo({
      url: "/pages/pageActivity/inviteUser/inviteUser"
    }) : wx.navigateTo({
      url: "/pages/login/login"
    });
  },
  getPop: function () {
    var e = this;
    "1" === r.globalData.homePopList[0] ? (0, n.getHomePop)(function (o) {
      var t = o.data, a = [];
      if (t.length > 0) {
        if (31 === (a = t.sort(function (e, o) {
          return e.sort > o.sort ? 1 : -1;
        }))[0].popupType) return wx.showModal({
          title: "门店暂停服务",
          content: "".concat(a[0].popupInfo, "已经暂停服务，请重新选择服务门店为您服务"),
          confirmColor: "#464646",
          confirmText: "去选择",
          showCancel: !1,
          complete: function () {
            wx.redirectTo({
              url: "/pages/pageMe/shopList/shopList?from=home"
            });
          }
        }), a.splice(index, 1), r.globalData.homePopList = a, void e.setData({
          popList: a
        });
        a.forEach(function (e, o) {
          0 === o && (31 === e.popupType ? a.splice(o, 1) : e.showHomePop = !0);
        });
      }
      e.getHomeContent(), r.globalData.homePopList = a, setTimeout(function () {
        e.setData({
          popList: a
        });
      }, 2e3);
    }, e.sameErrorCallback) : this.getHomeContent();
  },
  popEvent: function (e) {
    if (32 == e.currentTarget.dataset.type) {
      if (!wx.getStorageSync("token")) return void wx.navigateTo({
        url: "/pages/login/login"
      });
      wx.navigateTo({
        url: "/pages/pageMe/memberCenter/memberCenter"
      }), this.showHomePop();
    }
  },
  showHomePop: function () {
    var e = r.globalData.homePopList;
    e.forEach(function (o, t) {
      0 === t && e.splice(t, 1);
    }), e.length > 0 && e.forEach(function (e, o) {
      0 === o && (e.showHomePop = !0);
    }), r.globalData.homePopList = e, this.setData({
      popList: e
    });
  },
  sameErrorCallback: function (e, o) {
    var t = this;
    $Loading_hide(), wx.stopPullDownRefresh(), 500 == e ? o.data.errorCode && o.data.errorMsg ? wx.showModal({
      title: o.data.errorMsg,
      content: "是否重新请求数据？",
      confirmColor: "#464646",
      cancelColor: "#969696",
      success: function (e) {
        e.confirm && t.getPop();
      }
    }) : o.data.message ? wx.showModal({
      content: o.data.message,
      confirmColor: "#464646",
      cancelColor: "#969696",
      confirmText: "是否重新请求数据?",
      success: function (e) {
        e.confirm && t.getPop();
      }
    }) : wx.showModal({
      title: "数据请求错误",
      content: "是否重新请求数据？",
      confirmColor: "#464646",
      cancelColor: "#969696",
      success: function (e) {
        e.confirm && t.getPop();
      }
    }) : wx.showModal({
      title: "数据请求错误",
      content: "是否重新请求数据？",
      confirmColor: "#464646",
      cancelColor: "#969696",
      success: function (e) {
        e.confirm && t.getPop();
      }
    });
  },
  getHomeContent: function () {
    var e = this;
    (0, n.homeContent)(function (o) {
      wx.stopPullDownRefresh();
      var t = o.data, a = t.loginDate;
      if (wx.removeStorageSync("bundleSuccess"), wx.setStorageSync("homeFresh", 0), 0 == a.shopStatus) return !1;
      t.productDisplay.moduleContent = e.formatList(t.productDisplay.moduleContent), t.multilineProduct.moduleContent = e.formatList(t.multilineProduct.moduleContent),
        e.setData({
          fileDomain: o.fileDomain,
          allInfo: t,
          tab: t.flowProduct,
          refreshTime: a.refreshTime,
          showMask: !0
        }, function () {
          console.log('tab', t.flowProduct)
          $Loading_hide(), wx.stopPullDownRefresh(), t.flowProduct.length > 0 && e.getHomeGoods(0);
        });
    }, e.sameErrorCallback);
  },
  getHomeGoods: function (e) {
    var o = this, t = this.data, a = t.tab, i = t.tabList, r = a[e].pdFlowTabId;
    (0, n.homeGoods)(r, function (t) {
      var a = t.data;
      console.log('tabList', i)
      a = o.formatList(a), i[e] = a, o.setData({
        tabList: i
      }, function () {
        $Loading_hide(), wx.stopPullDownRefresh();
      });
    }, function () {
      $Loading_hide(), wx.stopPullDownRefresh(), (0, $Toast)({
        content: "小Q走丢了",
        duration: 1.5
      });
    });
  },
  tabChange: function (e) {
    var o = e.detail.index, t = this.data, a = t.tab, n = t.tabList[o];
    a.length <= 0 || n && n.length > 0 || ((0, $Loading)(), this.getHomeGoods(o));
  },
  checkVersion: function () {
    var e = this, o = this.data.refreshTime, t = wx.getStorageSync("homeFresh");
    o && 0 == t && (0, n.homeVersion)({
      refreshTime: o
    }, function (o) {
      1 == o.data && e.getPop();
    });
  },
  swiperChange: function (e) {
    var o = e.detail;
    this.setData({
      currentIndex: o.current
    });
  },
  goEvent: function (e) {
    var o = e.currentTarget.dataset.linktype, t = e.currentTarget.dataset.linkinfo;
    if (1 == o) wx.navigateTo({
      url: "/pages/pageHome/bannerInfo/bannerInfo?pageCode=".concat(t)
    }); else if (2 == o) wx.navigateTo({
      url: "/pages/webView/webView?url=" + t
    }); else if (3 == o) wx.navigateTo({
      url: "/pages/pageHome/goodsDetail/goodsDetail?pdSpuId=" + t
    }); else if (4 == o) wx.setStorage({
      key: "goGoodsListName",
      data: "上新尖货",
      success: function (e) {
        "setStorage:ok" === e.errMsg && wx.navigateTo({
          url: "/pages/pageHome/goodsList/goodsList?showPageType=1&type=1"
        });
      }
    }); else if (5 == o) wx.setStorage({
      key: "goGoodsListName",
      data: "热卖爆款",
      success: function (e) {
        "setStorage:ok" === e.errMsg && wx.navigateTo({
          url: "/pages/pageHome/goodsList/goodsList?showPageType=1&type=2"
        });
      }
    }); else if (6 == o) wx.setStorage({
      key: "goGoodsListName",
      data: "跨境优选",
      success: function (e) {
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
    }); else if (11 == o) this.goInvite(); else if (12 == o) {
      if (!wx.getStorageSync("userMobile")) return void wx.navigateTo({
        url: "/pages/login/login"
      });
      wx.navigateTo({
        url: "/pages/pageMe/memberCenter/memberCenter"
      });
    }
  },
  goGoodDetail: function (e) {
    var o = e.currentTarget.dataset.pdspuid;
    wx.navigateTo({
      url: "/pages/pageHome/goodsDetail/goodsDetail?pdSpuId=".concat(o)
    });
  },
  showCoupon: function () {
    this.setData({
      showCoupon: !this.data.showCoupon
    });
  },
  formatList: function (e) {
    var o = e;
    return o && o.length > 0 ? (o.forEach(function (e) {
      e.showPrice = t.default.formatPrice(e.showPrice), e.hiddenPrice = e.hiddenPrice ? t.default.formatPrice(e.hiddenPrice) : null;
    }), o) : [];
  },
  getNewUserCoupon: function () {
    var e = this;
    wx.getStorageSync("userMobile") ? ((0, $Loading)(), (0, n.newUserCoupon)(function (o) {
      $Loading_hide();
      var a = o.data.list, n = e.data.allInfo;
      a.forEach(function (e) {
        e.couponStartValidity = t.default.formatTime(e.couponStartValidity), e.couponEndValidity = t.default.formatTime(e.couponEndValidity);
      }), n.coupon.isDisplay = 0, e.setData({
        couponList: a,
        allInfo: n
      }, function () {
        e.showCoupon();
      });
    }, function (e, o) {
      $Loading_hide(), 500 == e || "E_500" == e ? o.data.message ? wx.showModal({
        content: o.data.message,
        confirmColor: "#464646",
        cancelColor: "#969696",
        confirmText: "确定",
        showCancel: !1
      }) : o.errorCode && o.errorMsg ? wx.showModal({
        content: o.data.message,
        confirmColor: "#464646",
        cancelColor: "#969696",
        confirmText: "确定",
        showCancel: !1
      }) : (0, $Toast)({
        content: "小Q走丢了",
        duration: 1
      }) : (0, $Toast)({
        content: "小Q走丢了",
        duration: 1
      });
    })) : wx.navigateTo({
      url: "/pages/login/login"
    });
  },
  checkUpdateStatus: function () {
    var e = wx.getUpdateManager();
    e.onCheckForUpdate(function (o) {
      console.log("是否有新版本-------------" + o.hasUpdate), o.hasUpdate && (e.onUpdateReady(function () {
        wx.showModal({
          title: "更新提示",
          content: "新版本已经准备好啦",
          confirmColor: "#464646",
          cancelColor: "#969696",
          showCancel: !1,
          success: function (o) {
            o.confirm && e.applyUpdate();
          }
        });
      }), e.onUpdateFailed(function () {
        wx.showModal({
          title: "已经有新版本了哟~",
          content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~",
          confirmColor: "#464646",
          cancelColor: "#969696",
          showCancel: !1
        });
      }));
    });
  },
  scan: function () {
    wx.scanCode({
      scanType: ["barCode"],
      success: function (e) {
        if ("scanCode:ok" === e.errMsg) if (console.log(e), e.result) {
          var t = {
            barcode: e.result
          };
          (0, $Loading)(), (0, o.getGoodsDetailBySearch)(t, function (o) {
            $Loading_hide();
            var t = o.data.total, a = o.data.list;
            if (t > 0) {
              var n = a[0].pdSpuId;
              wx.navigateTo({
                url: "/pages/pageHome/goodsDetail/goodsDetail?pdSpuId=" + n
              });
            } else (0, $Toast)({
              content: "未找到".concat(e.result, "商品"),
              duration: 1.5
            });
          });
        } else (0, $Toast)({
          content: "请扫描商品条形码",
          duration: 1.5
        });
      }
    });
  },
  goSearch: function () {
    wx.setStorage({
      key: "goGoodsListName",
      data: "搜索",
      success: function (e) {
        "setStorage:ok" === e.errMsg && wx.navigateTo({
          url: "/pages/pageHome/goodsList/goodsList?showPageType=3"
        });
      }
    });
  },
  goThemeList: function () {
    wx.navigateTo({
      url: "/pages/pageHome/themeList/themeList"
    });
  },
  onShareAppMessage: function (e) {
    return (0, a.activityShareMessage)();
  },
  onPullDownRefresh: function () {
    this.getPop();
  }
});