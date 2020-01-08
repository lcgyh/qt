Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.observe = function(o, t) {
    var s = o.watch, i = o.computed;
    if (s) {
        var p = t.properties || {};
        Object.keys(s).forEach(function(e) {
            if (e in p) {
                var r = p[e];
                null !== r && "type" in r || (r = {
                    type: r
                }), r.observer = s[e], p[e] = r;
            }
        }), t.properties = p;
    }
    i && (t.behaviors.push(e.behavior), t.methods = t.methods || {}, t.methods.$options = function() {
        return o;
    }, t.properties && (0, r.observeProps)(t.properties));
};

var e = require("F38BDF01B878E4CF95EDB70687886783.js"), r = require("B24A8AA0B878E4CFD42CE2A7DB986783.js");