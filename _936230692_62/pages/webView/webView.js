var a = require("../../AD0111C0B878E4CFCB6779C705596783.js");

Page({
    data: {
        url: ""
    },
    onLoad: function(a) {
        var e = a.url;
        this.setData({
            url: e
        });
    },
    onShareAppMessage: function(e) {
        return (0, a.activityShareMessage)();
    }
});