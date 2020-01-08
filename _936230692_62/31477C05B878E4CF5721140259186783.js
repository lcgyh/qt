var e = require("@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.classNames = function e() {
    var t = [];
    for (var l = 0; l < arguments.length; l++) {
        var s = arguments[l];
        if (s) {
            var i = (0, r.default)(s);
            if ("string" === i || "number" === i) t.push(s); else if (Array.isArray(s) && s.length) {
                var u = e.apply(null, s);
                u && t.push(u);
            } else if ("object" === i) for (var n in s) a.call(s, n) && s[n] && t.push(n);
        }
    }
    return t.join(" ");
};

var r = e(require("@babel/runtime/helpers/typeof.js")), a = {}.hasOwnProperty;