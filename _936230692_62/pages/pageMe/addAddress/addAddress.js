var e = require("../../../B20FF1E6B878E4CFD46999E127296783.js"), t = require("../../../18B8A9E0B878E4CF7EDEC1E7E0186783.js"), i = require("../../../AD0111C0B878E4CFCB6779C705596783.js"), a = getApp();

Page({
    data: {
        type: -1,
        id: "",
        receiveName: "",
        receiveMobile: "",
        region: "",
        complementAddress: "",
        recProvince: "",
        recCity: "",
        recDistrict: "",
        len: 0,
        detailLen: 0,
        defaultFlg: -1,
        areaList: {},
        showComplementAddressTxt: !1
    },
    onLoad: function(e) {
        var t = a.globalData.isIphoneX;
        this.setData({
            isIphoneX: t
        });
        var i = wx.getStorageSync("info");
        if (i) {
            wx.setNavigationBarTitle({
                title: "修改收货地址"
            });
            var s = JSON.parse(i);
            this.setData({
                type: 1,
                id: s.receiveId,
                receiveName: s.receiveName,
                len: s.receiveName.length,
                detailLen: s.complementAddress.length,
                receiveMobile: s.receiveMobile,
                recProvince: s.recProvince,
                recCity: s.recCity,
                defaultFlg: s.defaultFlg,
                recDistrict: s.recDistrict,
                complementAddress: s.complementAddress,
                region: s.recProvince + " " + s.recCity + " " + s.recDistrict
            }, function() {
                wx.removeStorageSync("info");
            });
        } else this.setData({
            type: 0
        }), wx.setNavigationBarTitle({
            title: "新增收货地址"
        });
        this.getCity();
    },
    getCity: function() {
        var t = this, i = this, s = a.globalData.windowCityDic;
        "{}" === JSON.stringify(s) ? (0, e.getCityDic)(function(e) {
            var s = {
                province_list: {},
                city_list: {},
                county_list: {}
            };
            e.data.forEach(function(e) {
                s.province_list[e.value] = e.label, e.children.forEach(function(e) {
                    s.city_list[e.value] = e.label, e.children.forEach(function(e) {
                        s.county_list[e.value] = e.label;
                    });
                });
            }), a.globalData.windowCityDic = s, t.setData({
                areaList: s
            }, function() {
                i.resetArea(s);
            });
        }) : this.setData({
            areaList: s
        }, function() {
            i.resetArea(s);
        });
    },
    resetArea: function(e) {
        var t = "", i = this.data.recDistrict;
        if (i) {
            for (var a in e.county_list) i === e.county_list[a] && (t = a);
            console.log(t), this.setData({
                resetValue: t
            });
        }
    },
    chooseLive: function() {
        this.setData({
            showComplementAddressTxt: !0,
            showChoose: !0
        });
    },
    chooseClose: function() {
        this.setData({
            showComplementAddressTxt: !1,
            showChoose: !1
        });
    },
    chooseSure: function(e) {
        var t = e.detail.values;
        this.setData({
            region: t[0].name + " " + t[1].name + " " + t[2].name,
            recProvince: t[0].name,
            recCity: t[1].name,
            recDistrict: t[2].name,
            showChoose: !1,
            showComplementAddressTxt: !1
        });
    },
    bindinput: function(e) {
        var t = e.detail;
        this.setData({
            receiveName: t.value,
            len: t.value.length
        });
    },
    mobileinput: function(e) {
        var t = e.detail;
        this.setData({
            receiveMobile: t.value
        });
    },
    detailinput: function(e) {
        var t = e.detail;
        this.setData({
            detailLen: t.value.length,
            complementAddress: t.value
        });
    },
    formSubmit: function() {
        var i = this.data, a = i.type, s = i.id, n = i.defaultFlg, r = i.receiveName, o = i.receiveMobile, c = i.region, l = i.complementAddress, d = i.recProvince, u = i.recCity, v = i.recDistrict, m = i.detailLen;
        if (r) if (o && /^[1][0-9][0-9]{9}$/.test(o)) if (c) if (l) if (m < 5) (0, t.$Toast)({
            content: "详细地址最少填写5个字，请重新填写",
            duration: 1.5,
            mask: !1
        }); else if (m > 80) (0, t.$Toast)({
            content: "详细地址最多可输入80个字",
            duration: 1.5,
            mask: !1
        }); else {
            (0, t.$Loading)();
            var h = {
                receiveName: r,
                receiveMobile: o,
                recProvince: d,
                recCity: u,
                recDistrict: v,
                complementAddress: l
            };
            0 == a ? (0, e.addReceiveAddress)(h, function(e) {
                t.$Loading.hide(), (0, t.$Toast)({
                    content: "保存成功！",
                    duration: 0,
                    mask: !1
                }), setTimeout(function() {
                    t.$Toast.hide(), wx.setStorage({
                        key: "refresh",
                        data: 1,
                        success: function(e) {
                            "setStorage:ok" === e.errMsg && wx.navigateBack({
                                delta: 1
                            });
                        }
                    });
                }, 1500);
            }) : 1 == a && (h.receiveId = s, h.defaultFlg = n, (0, e.editReceiveAddress)(h, function(e) {
                t.$Loading.hide(), (0, t.$Toast)({
                    content: "修改成功！",
                    duration: 0,
                    mask: !1
                }), setTimeout(function() {
                    t.$Toast.hide(), wx.setStorage({
                        key: "refresh",
                        data: 1,
                        success: function(e) {
                            "setStorage:ok" === e.errMsg && wx.navigateBack({
                                delta: 1
                            });
                        }
                    });
                }, 1500);
            }));
        } else (0, t.$Toast)({
            content: "请输入详细地址",
            duration: 1.5,
            mask: !1
        }); else (0, t.$Toast)({
            content: "请选择地区",
            duration: 1.5,
            mask: !1
        }); else (0, t.$Toast)({
            content: "请输入正确的手机号",
            duration: 1.5,
            mask: !1
        }); else (0, t.$Toast)({
            content: "请输入收件人姓名",
            duration: 1.5,
            mask: !1
        });
    },
    onShareAppMessage: function(e) {
        return (0, i.activityShareMessage)();
    }
});