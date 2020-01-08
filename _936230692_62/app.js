App({
    onLaunch: function() {
        var o = this;
        wx.getSystemInfo({
            success: function(t) {
                if ("getSystemInfo:ok" === t.errMsg) {
                    console.log(t);
                    var i = t.model, e = 0;
                    (i.indexOf("iPhone X") > -1 || i.indexOf("iPhone 11") > -1) && (e = 1), o.globalData.system = t.system, 
                    o.globalData.statusBarHeight = t.statusBarHeight, o.globalData.isIphoneX = e, o.globalData.windowWidth = t.windowWidth, 
                    o.globalData.windowHeight = t.windowHeight;
                }
            }
        });
    },
    onShow: function(o) {
        console.log(o);
    },
    onPageNotFound: function(o) {
        wx.switchTab({
            url: "/pages/home/home"
        });
    },
    globalData: {
        version: "2.0.0",
        isIphoneX: 0,
        windowWidth: 0,
        windowHeight: 0,
        statusBarHeight: 0,
        system: "",
        windowCityDic: {},
        homePopList: [ "1" ]
    }
});