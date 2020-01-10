var a = require("../../../C712B902B878E4CFA174D10544396783.js"), e = require("../../../utils/loading.js"), t = require("../../../AD0111C0B878E4CFCB6779C705596783.js"), o = require("../../../481D43C1B878E4CF2E7B2BC653496783.js"), n = getApp();

Page({
    data: {
        name: "",
        idcard: "",
        onImg: "",
        offImg: "",
        onPrograss: 0,
        offPrograss: 0,
        fileDomain: ""
    },
    onLoad: function(a) {
        var e = this;
        a.type && wx.getStorage({
            key: "buyerInfo",
            success: function(a) {
                if ("getStorage:ok" === a.errMsg) {
                    var t = JSON.parse(a.data);
                    console.log(t), e.setData({
                        name: t.name,
                        idcard: t.cardNo,
                        onImg: t.facePicUrl ? t.facePicUrl : "",
                        offImg: t.backPicUrl ? t.backPicUrl : ""
                    }, function() {
                        wx.removeStorageSync("buyerInfo");
                    });
                }
            }
        });
        var t = n.globalData.isIphoneX;
        this.setData({
            isIphoneX: t,
            needPic: a.needPic,
            fileDomain: a.fileDomain
        });
    },
    uploadUserImg: function(a) {
        var e = this, t = a.currentTarget.dataset.type;
        wx.chooseImage({
            count: 1,
            sizeType: [ "compressed" ],
            success: function(a) {
                if ("chooseImage:ok" === a.errMsg) {
                    var o = a.tempFilePaths[0];
                    e.setData({
                        prograss: 0
                    }, function() {
                        e.uploadImgAjax(o, t);
                    });
                }
            }
        });
    },
    uploadImgAjax: function(a, t) {
        var n = this;
        wx.uploadFile({
            url: (0, o.getServerUrl)("/upload/image"),
            filePath: a,
            name: "file",
            header: {
                "Content-Type": "multipart/form-data",
                accessToken: wx.getStorageSync("token")
            },
            formData: {
                user: "test"
            },
            success: function(a) {
                var e = JSON.parse(a.data).data.url[0];
                "on" == t ? n.setData({
                    onImg: e
                }) : n.setData({
                    offImg: e
                });
            },
            fail: function(a) {
                (0, e.$Toast)({
                    content: "小Q走丢了",
                    duration: 1.5,
                    mask: !1
                });
            }
        }).onProgressUpdate(function(a) {
            console.log(a.progress), "on" == t ? n.setData({
                onPrograss: a.progress
            }) : n.setData({
                offPrograss: a.progress
            });
        });
    },
    nameinput: function(a) {
        var e = a.detail;
        this.setData({
            name: e.value
        });
    },
    idcardinput: function(a) {
        var e = a.detail;
        this.setData({
            idcard: e.value
        });
    },
    saveRealName: function() {
        var t = this.data, o = t.name, n = t.idcard, r = t.onImg, s = t.offImg, i = t.needPic, c = {
            name: o,
            cardNo: n,
            facePicUrl: r,
            backPicUrl: s
        };
        return o ? n ? 1 != i || r && s ? ((0, e.$Loading)(), void (0, a.putRealName)(c, function(a) {
            e.$Loading.hide(), (0, e.$Toast)({
                content: "认证成功！",
                duration: 0,
                mask: !1
            }), setTimeout(function() {
                e.$Toast.hide();
                var t = JSON.stringify(a.data);
                wx.setStorage({
                    key: "cardInfo",
                    data: t,
                    success: function(a) {
                        "setStorage:ok" === a.errMsg && wx.navigateBack({
                            delta: 1
                        });
                    }
                });
            }, 1500);
        }, function(a, t) {
            e.$Loading.hide(), "E_500" == a ? (0, e.$Toast)({
                content: t.data.message,
                duration: 1.5,
                mask: !1
            }) : (0, e.$Toast)({
                content: "小Q走丢了",
                duration: 1.5,
                mask: !1
            });
        })) : (0, e.$Toast)({
            content: "订单中存在海外直邮商品，为保证清关顺利，需要您上传身份证照片",
            duration: 1.5,
            mask: !1
        }) : (0, e.$Toast)({
            content: "请填写真实的身份证号",
            duration: 1.5,
            mask: !1
        }) : (0, e.$Toast)({
            content: "请填写付款银行卡对应的真实姓名",
            duration: 1.5,
            mask: !1
        });
    },
    onShareAppMessage: function() {
        return (0, t.activityShareMessage)();
    }
});