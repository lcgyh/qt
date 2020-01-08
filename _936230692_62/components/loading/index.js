var e = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../../@babel/runtime/helpers/defineProperty"));

function t(e, t) {
    var r = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        t && (o = o.filter(function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), r.push.apply(r, o);
    }
    return r;
}

function r(r) {
    for (var o = 1; o < arguments.length; o++) {
        var n = null != arguments[o] ? arguments[o] : {};
        o % 2 ? t(n, !0).forEach(function(t) {
            (0, e.default)(r, t, n[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(n)) : t(n).forEach(function(e) {
            Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(n, e));
        });
    }
    return r;
}

var o = {
    showLoading: !1,
    stopLoading: !0,
    mask: !1
};

Component({
    data: r({}, o),
    methods: {
        showLoading: function(e) {
            e ? this.setData(r({}, e, {
                stopLoading: !1,
                showLoading: !0
            })) : this.setData({
                stopLoading: !1,
                showLoading: !0
            });
        },
        hideLoading: function() {
            this.setData(r({}, o));
        }
    }
});