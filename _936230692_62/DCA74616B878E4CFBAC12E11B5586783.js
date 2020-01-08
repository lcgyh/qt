var e = require("@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.isObj = function(e) {
    var r = (0, t.default)(e);
    return null !== e && ("object" === r || "function" === r);
}, exports.isDef = function(e) {
    return null != e;
}, exports.isNumber = function(e) {
    return /^\d+$/.test(e);
}, exports.nextTick = function(e) {
    setTimeout(function() {
        e();
    }, 1e3 / 30);
}, exports.range = function(e, t, r) {
    return Math.min(Math.max(e, t), r);
};

var t = e(require("@babel/runtime/helpers/typeof.js"));