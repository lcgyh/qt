var e = require("../../../@babel/runtime/helpers/interopRequireDefault"), t = require("../../../B20FF1E6B878E4CFD46999E127296783.js"), i = e(require("../../../481D43C1B878E4CF2E7B2BC653496783.js")), a = require("../../../AD0111C0B878E4CFCB6779C705596783.js"), n = require("../../../utils/loading.js"), o = getApp();

Page({
    data: {
        showMask: !1,
        avatar: "",
        birthday: null,
        cityShowVal: "",
        nickname: "",
        pic: "",
        recProvinceId: "",
        recCityId: "",
        recDistrictId: "",
        shopName: "",
        endTime: new Date(),
        mobile: null,
        cityCode: [],
        babyList: []
    },
    onLoad: function() {
        var e = this;
        (0, n.$Loading)();
        var t = o.globalData.isIphoneX, a = new Date(), r = new Date(), c = a.setYear(a.getFullYear() + 1), s = r.setYear(r.getFullYear() - 1);
        this.setData({
            isIphoneX: t,
            startTime: "1900-01-01",
            endTime: i.default.formatTime(c),
            birthday: "".concat(i.default.formatYearTime(s), "-01-15")
        }, function() {
            e.getCity();
        });
    },
    onShow: function() {
        1 == wx.getStorageSync("meDetailFresh") && ((0, n.$Loading)(), this.getAccountInfo(), 
        wx.removeStorageSync("meDetailFresh"));
    },
    goBabyInfo: function(e) {
        var t = e.currentTarget.dataset.index;
        if (t >= 0) {
            var i = {
                desc: this.data.babyList[t],
                fileDomain: this.data.fileDomain
            };
            console.log(i), wx.navigateTo({
                url: "/pages/pageMe/babyInfoEdit/babyInfoEdit?babyInfo=" + JSON.stringify(i)
            });
        } else wx.navigateTo({
            url: "/pages/pageMe/babyInfoEdit/babyInfoEdit"
        });
    },
    chooseLive: function() {
        this.setData({
            showChoose: !0
        });
    },
    chooseClose: function() {
        this.setData({
            showChoose: !1
        });
    },
    chooseSure: function(e) {
        var t = e.detail.values;
        this.setData({
            cityCode: [ t[0].code, t[1].code, t[2].code ],
            cityShowVal: t[0].name + " " + t[1].name + " " + t[2].name,
            showChoose: !1
        });
    },
    getCity: function() {
        var e = this, i = o.globalData.windowCityDic;
        "{}" === JSON.stringify(i) ? (0, t.getCityDic)(function(t) {
            var i = {
                province_list: {},
                city_list: {},
                county_list: {}
            };
            t.data.forEach(function(e) {
                i.province_list[e.value] = e.label, e.children.forEach(function(e) {
                    i.city_list[e.value] = e.label, e.children.forEach(function(e) {
                        i.county_list[e.value] = e.label;
                    });
                });
            }), o.globalData.windowCityDic = i, e.setData({
                areaList: i
            }, function() {
                e.getAccountInfo();
            });
        }, function() {
            n.$Loading.hide(), (0, n.$Toast)({
                content: "小Q走丢了",
                duration: 1.5,
                mask: !1
            });
        }) : this.setData({
            areaList: i
        }, function() {
            e.getAccountInfo();
        });
    },
    resetArea: function() {
        var e = "", t = this.data, i = t.areaList, a = t.recDistrict;
        if (a) {
            for (var n in i.county_list) a === i.county_list[n] && (e = n);
            this.setData({
                resetValue: e
            });
        }
    },
    getAccountInfo: function() {
        var e = this;
        (0, t.getPersonInfo)(function(t) {
            var a = t.data, o = t.fileDomain, r = "", c = a.birthday ? i.default.formatTime(a.birthday) : null, s = a.birthday ? i.default.formatNewTime(a.birthday) : null, d = a.spShopName ? a.spShopName : "", l = "", u = [];
            a.recProvinceId && a.recCityId && a.recDistrictId ? (u = [ a.recProvinceId, a.recCityId, a.recDistrictId ], 
            l = a.recProvinceName + " " + a.recCityName + " " + a.recDistrictName) : a.recProvinceId && a.recCityId ? (u = [ a.recProvinceId, a.recCityId ], 
            l = a.recProvinceName + " " + a.recCityName) : u = [], r = a.pic ? a.pic.indexOf("http") > -1 ? a.pic : o + a.pic : "/images/loading.png", 
            e.setData({
                nickname: a.weiXinName,
                avatar: r,
                mobile: a.mobile,
                babyList: a.babyMsgVo,
                birthday: c,
                birthdayStr: s,
                shopName: d,
                cityCode: u,
                cityShowVal: l,
                recDistrict: a.recDistrictName,
                fileDomain: o,
                showMask: !0
            }, function() {
                e.resetArea(), n.$Loading.hide();
            });
        }, function() {
            n.$Loading.hide(), (0, n.$Toast)({
                content: "获取个人数据失败",
                duration: 1.5
            });
        });
    },
    savePersonInfo: function() {
        (0, n.$Loading)();
        var e = this.data, i = e.avatar, a = e.birthday, o = e.nickname, r = e.cityCode, c = {
            pic: i,
            birthday: a,
            nickname: o,
            recProvinceId: r[0],
            recCityId: r[1],
            recDistrictId: r[2]
        };
        (0, t.changePersonInfo)(c, function(e) {
            n.$Loading.hide(), (0, n.$Toast)({
                content: "保存成功",
                duration: 0
            }), setTimeout(function() {
                n.$Toast.hide(), wx.navigateBack({
                    delta: 1
                });
            }, 1500);
        }, function(e) {});
    },
    bindDateChange: function(e) {
        var t = e.detail, i = t.value.split("-").join(".");
        this.setData({
            birthday: t.value,
            birthdayStr: i
        });
    },
    nameInput: function(e) {
        var t = e.detail;
        this.setData({
            nickname: t.value
        });
    },
    onChoose: function() {
        var e = this;
        (0, n.$Loading)(), i.default.upLoadFileRequest(function(t) {
            n.$Loading.hide(), e.setData({
                avatar: t.fileDomain + t.data.url[0]
            });
        }, function(e) {
            n.$Loading.hide(), console.log(e);
        });
    },
    onShareAppMessage: function(e) {
        return (0, a.activityShareMessage)();
    }
});