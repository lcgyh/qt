var a = require("../../../C4DDA123B878E4CFA2BBC924B8096783.js"), e = require("../../../AD0111C0B878E4CFCB6779C705596783.js"), t = require("../../../utils/loading.js");

Page({
    data: {
        brandList: [],
        saveBrandList: [],
        isfocus: !1,
        showMask: !1,
        fileDomain: "",
        searchValue: "",
        sortListType: 1,
        pageSize: 999999,
        page: 1
    },
    onLoad: function() {
        this.getBrand();
    },
    getBrand: function() {
        var e = this;
        (0, t.$Loading)();
        var s = {
            page: 1,
            pageSize: 999999,
            sort: this.data.sortListType
        };
        (0, a.getBrandList)(s, function(a) {
            var s = a.data.list, r = a.fileDomain;
            s.forEach(function(a) {
                a.url = r + a.url;
            }), e.setData({
                brandList: s,
                saveBrandList: s,
                showMask: !0
            }, function() {
                t.$Loading.hide();
            });
        });
    },
    sortList: function(a) {
        var e = this, t = a.currentTarget.dataset.type;
        this.setData({
            sortListType: t
        }, function() {
            e.getBrand();
        });
    },
    searchinput: function(a) {
        var e = a.detail, t = this.data.saveBrandList, s = [], r = e.value.trim();
        r ? t.forEach(function(a) {
            a.name.indexOf(r) > -1 && s.push(a);
        }) : s = t, this.setData({
            brandList: s,
            searchValue: e.value
        });
    },
    clear: function() {
        var a = this.data.saveBrandList;
        this.setData({
            searchValue: "",
            brandList: a
        });
    },
    goBrandDetail: function(a) {
        var e = a.currentTarget.dataset.pdbrandid, t = a.currentTarget.dataset.pagecode, s = a.currentTarget.dataset.name;
        t ? wx.navigateTo({
            url: "/pages/pageHome/bannerInfo/bannerInfo?bannerId=".concat(e, "&pageCode=").concat(t, "&isBrand=1")
        }) : wx.setStorage({
            key: "goGoodsListName",
            data: s,
            success: function(a) {
                "setStorage:ok" === a.errMsg && wx.navigateTo({
                    url: "/pages/pageHome/goodsList/goodsList?showPageType=2&pdBrandId=".concat(e)
                });
            }
        });
    },
    onShareAppMessage: function(a) {
        return (0, e.activityShareMessage)();
    }
});