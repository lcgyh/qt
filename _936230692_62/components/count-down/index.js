Component({
    properties: {
        target: Number,
        showDay: Boolean,
        callback: String,
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
            var t = this.data, a = t.format.length;
            if (t.showDay || t.resultFormat.push(""), a >= 3) {
                for (var o = 0; o < a && !(t.resultFormat.length >= 4); o++) t.format[o] && t.resultFormat.push(t.format[o].toString());
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
            var t = this.data, a = Math.ceil((t.target - new Date().getTime()) / 1e3), o = "", e = "00:00:00", n = "00", c = t.resultFormat;
            if (a > 0) {
                n = this.formatNum(parseInt(a / 86400));
                var r = a % 86400, s = this.formatNum(parseInt(r / 3600));
                r %= 3600;
                var i = this.formatNum(parseInt(r / 60)), m = this.formatNum(r % 60);
                e = t.changeFormat ? "".concat(s).concat(c[1]).concat(i).concat(c[2]).concat(m).concat(c[3]) : "00" == s && "00" != i ? "".concat(i, ":").concat(m) : "00" == i ? "".concat(m) : "".concat(s, ":").concat(i, ":").concat(m), 
                t.clearTimer || this.init.call(this);
            } else this.endfn();
            o = t.showDay ? t.changeFormat ? "".concat(n).concat(c[0], " ").concat(e) : "".concat(n, "d ").concat(e) : e, 
            this.setData({
                time: o
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