Component({
    properties: {
        target: Number,
        nowTime: Number,
        showDay: Boolean,
        callback: String,
        theme: String,
        color: String,
        format: Array,
        clearTimer: Boolean
    },
    externalClasses: [ "countdown-class" ],
    data: {
        time: "",
        resultFormat: [],
        changeFormat: !1
    },
    ready: function() {
        this.getFormat();
    },
    methods: {
        getFormat: function() {
            var t = this.data, e = t.format.length;
            if (t.showDay || t.resultFormat.push(""), e >= 3) {
                for (var a = 0; a < e && !(t.resultFormat.length >= 4); a++) t.format[a] && t.resultFormat.push(t.format[a].toString());
                t.resultFormat.length >= 4 && (t.changeFormat = !0);
            }
            this.getLastTime();
        },
        init: function() {
            var t = this;
            setTimeout(function() {
                t.getLastTime.call(t);
            }, 1e3);
        },
        getLastTime: function() {
            var t = this.data, e = Math.ceil((t.target - new Date().getTime()) / 1e3), a = "00", r = "00", n = "00", o = "00";
            if (e > 0) {
                var i = e % 86400, s = (a = parseInt(e / 86400)) > 0 ? 24 * a : 0;
                r = this.formatNum(parseInt(i / 3600 + s)), i %= 3600, n = this.formatNum(parseInt(i / 60)), 
                o = this.formatNum(i % 60), t.clearTimer || this.init.call(this);
            } else this.endfn();
            this.setData({
                day: a,
                hour: r,
                minute: n,
                second: o
            });
        },
        formatNum: function(t) {
            return t > 9 ? t : "0".concat(t);
        },
        endfn: function() {
            this.triggerEvent("callback", {});
        }
    }
});