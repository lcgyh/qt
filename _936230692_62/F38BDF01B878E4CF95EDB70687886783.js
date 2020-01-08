Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.behavior = void 0;

var t = Behavior({
    created: function() {
        var t = this;
        if (this.$options) {
            var e = {}, a = this.setData, i = this.$options().computed, o = Object.keys(i);
            Object.defineProperty(this, "setData", {
                writable: !0
            }), this.setData = function(s, r) {
                var c;
                s && a.call(t, s, r), a.call(t, (c = {}, o.forEach(function(a) {
                    var o = i[a].call(t);
                    e[a] !== o && (e[a] = c[a] = o);
                }), c));
            };
        }
    },
    attached: function() {
        this.setData();
    }
});

exports.behavior = t;