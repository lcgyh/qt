var e = require("../../../@babel/runtime/helpers/interopRequireDefault"), t = require("../../../AD0111C0B878E4CFCB6779C705596783.js"), a = e(require("../../../481D43C1B878E4CF2E7B2BC653496783.js")), i = require("../../../B20FF1E6B878E4CFD46999E127296783.js"), n = require("../../../utils/loading.js"), r = getApp();

Page({
    data: {
        lists: [],
        array: [ "小王子", "小公主" ],
        currentIndex: 0,
        isShow: !0
    },
    onShow: function(e) {
        var t = r.globalData.isIphoneX;
        this.setData({
            isIphoneX: t
        }), this.getDataList();
    },
    getDataList: function() {
        var e = this;
        (0, n.$Loading)();
        var t = this.options.index || 0, r = !0;
        (0, i.getPersonInfo)(function(i) {
            n.$Loading.hide();
            var s = i.data, o = i.fileDomain, u = s.babyMsgVo;
            u.map(function(e, t) {
                return e.birthday ? e.birthday = a.default.formatTime(e.birthday) : e.birthday = "", 
                e.sex || (e.sex = ""), e.name || (e.name = ""), e;
            }), u.length >= 5 && (r = !1), e.setData({
                lists: u,
                fileDomain: o,
                currentIndex: t,
                isShow: r
            });
        });
    },
    editBabyInfo: function(e) {
        var t = e.currentTarget.dataset.info, a = {
            babyNum: this.data.lists.length,
            desc: t,
            fileDomain: this.data.fileDomain
        }, i = "/pages/pageMe/babyInfoEdit/babyInfoEdit";
        t && (i = "".concat(i, "?babyInfo=").concat(JSON.stringify(a))), wx.navigateTo({
            url: i
        });
    },
    onShareAppMessage: function(e) {
        return (0, t.activityShareMessage)();
    }
});