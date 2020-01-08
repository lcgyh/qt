Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.observeProps = function(e) {
    if (!e) return;
    Object.keys(e).forEach(function(t) {
        var r = e[t];
        null !== r && "type" in r || (r = {
            type: r
        });
        var s = r, o = s.observer;
        r.observer = function() {
            o && ("string" == typeof o && (o = this[o]), o.apply(this, arguments)), this.setData();
        }, e[t] = r;
    });
};