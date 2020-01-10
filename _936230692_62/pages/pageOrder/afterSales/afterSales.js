var e = require("../../../@babel/runtime/helpers/interopRequireDefault"), t = e(require("../../../@babel/runtime/helpers/toConsumableArray")), a = e(require("../../../481D43C1B878E4CF2E7B2BC653496783.js")), i = e(require("../../../2B492AF4B878E4CF4D2F42F3B1E86783.js")), r = require("../../../utils/loading.js"), n = require("../../../C712B902B878E4CFA174D10544396783.js"), s = require("../../../AD0111C0B878E4CFCB6779C705596783.js"), o = getApp();

Page({
    data: {
        fileDomain: "",
        recevieStatus: "",
        recevieStatusTxt: "",
        refundReason: "",
        reasonDetail: "",
        statusList: [ "已收到货", "未收到货", "我已拒签" ],
        reasonList: [ "商品质量问题", "商品错发", "商品漏发", "商品破损", "商品与页面不符", "保质期过短" ],
        showStatus: !1,
        showReason: !1,
        refundNumber: 1,
        refundMoney: 0,
        reasonDetailLength: 0,
        fileList: [],
        formIdList: []
    },
    onLoad: function(e) {
        var t = this, a = e.fileDomain, r = o.globalData.isIphoneX;
        wx.getStorage({
            key: "lastItem",
            success: function(e) {
                if ("getStorage:ok" === e.errMsg) {
                    var n = JSON.parse(e.data), s = i.default.round(i.default.mul(1, n.payPriceStr));
                    n.lastPay = i.default.round(n.payPriceStr), n.mainPicUrl = a + n.mainPicUrl + "?x-oss-process=image/resize,m_lfit,w_600,h_0/quality,q_100", 
                    t.setData({
                        goodItem: n,
                        isIphoneX: r,
                        refundMoney: s,
                        fileDomain: a
                    });
                }
            }
        });
    },
    uploadFile: function() {
        var e = this;
        a.default.upLoadFileRequest(function(a) {
            var i = [].concat((0, t.default)(e.data.fileList), (0, t.default)(a.data.url));
            e.setData({
                fileList: i
            });
        }, 5);
    },
    deleteFile: function(e) {
        var t = e.currentTarget.id, a = this.data.fileList;
        a.splice(t, 1), this.setData({
            fileList: a
        });
    },
    handleChange: function(e) {
        var t = e.detail, a = this.data.goodItem, r = 0;
        r = t.value == a.remainQty ? i.default.round(a.remainReturnAmount) : i.default.round(i.default.mul(t.value, a.payPriceStr)), 
        this.setData({
            refundNumber: t.value,
            refundMoney: r
        });
    },
    showStatus: function() {
        var e = this, t = this.data.statusList;
        wx.showActionSheet({
            itemList: t,
            success: function(a) {
                if ("showActionSheet:ok" === a.errMsg) {
                    var i = a.tapIndex;
                    e.setData({
                        recevieStatus: i + 1,
                        recevieStatusTxt: t[i]
                    });
                }
            }
        });
    },
    showReason: function() {
        var e = this, t = this.data.reasonList;
        wx.showActionSheet({
            itemList: t,
            success: function(a) {
                if ("showActionSheet:ok" === a.errMsg) {
                    var i = a.tapIndex;
                    e.setData({
                        refundReason: t[i]
                    });
                }
            }
        });
    },
    textareaInput: function(e) {
        var t = e.detail;
        this.setData({
            reasonDetailLength: t.cursor,
            reasonDetail: t.value
        });
    },
    returnForm: function(e) {
        var t = e.currentTarget.dataset.clicktype, a = this.data.formIdList;
        a.push(e.detail.formId), this.setData({
            formIdList: a
        }), 0 == t && this.applyReturn();
    },
    applyReturn: function() {
        var e = this.data, t = e.recevieStatus, a = e.refundReason, i = e.refundNumber, s = e.reasonDetail, o = e.goodItem, u = e.refundMoney, d = e.fileList, l = e.fileDomain, c = e.formIdList;
        if ("" != t && null != t) if ("" != a && null != a) {
            (0, r.$Loading)(), d.forEach(function(e) {
                e = l + e;
            });
            var f = c.join(","), h = {
                orderId: o.orderId,
                orderDetailId: o.orderDetailId,
                signStatus: t,
                expectAmount: u,
                returnDescription: s,
                returnReason: a,
                pics: d,
                currentQty: i,
                formIdList: f
            };
            (0, n.afterSaleApply)(h, function(e) {
                r.$Loading.hide(), e.data && ((0, r.$Toast)({
                    content: "申请售后成功",
                    duration: 0,
                    mask: !1
                }), setTimeout(function() {
                    r.$Toast.hide(), wx.redirectTo({
                        url: "/pages/pageOrder/returnDetail/returnDetail?orderReturnId=".concat(e.data)
                    });
                }, 2e3));
            }, function(e, t) {
                r.$Loading.hide(), 500 == e || 502 == e ? (0, r.$Toast)({
                    content: "小Q走丢了",
                    duration: 2,
                    mask: !1
                }) : (0, r.$Toast)({
                    content: "申请售后失败，请稍后再试",
                    duration: 2,
                    mask: !1
                });
            });
        } else (0, r.$Toast)({
            content: "请选择退款原因",
            duration: 2,
            mask: !1
        }); else (0, r.$Toast)({
            content: "请选择签收状态",
            duration: 2,
            mask: !1
        });
    },
    onShareAppMessage: function(e) {
        return (0, s.activityShareMessage)();
    }
});