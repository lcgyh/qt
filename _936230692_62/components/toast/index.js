var e = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../../@babel/runtime/helpers/defineProperty"));

function t(e, t) {
    var r = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        t && (n = n.filter(function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), r.push.apply(r, n);
    }
    return r;
}

function r(r) {
    for (var n = 1; n < arguments.length; n++) {
        var i = null != arguments[n] ? arguments[n] : {};
        n % 2 ? t(i, !0).forEach(function(t) {
            (0, e.default)(r, t, i[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(i)) : t(i).forEach(function(e) {
            Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(i, e));
        });
    }
    return r;
}

var n = {
    visible: !1,
    content: "",
    icon: "",
    image: "",
    duration: 2,
    mask: !0,
    type: "default"
}, i = null;

Component({
    externalClasses: [ "i-class" ],
    data: r({}, n),
    methods: {
        handleShow: function(e) {
            var t = this, n = e.type, o = void 0 === n ? "default" : n, a = e.duration, u = void 0 === a ? 2 : a;
            this.setData(r({}, e, {
                type: o,
                duration: u,
                visible: !0
            }));
            var s = 1e3 * this.data.duration;
            i && clearTimeout(i), 0 !== s && (i = setTimeout(function() {
                t.handleHide(), i = null;
            }, s));
        },
        handleHide: function() {
            this.setData(r({}, n));
        }
    }
});