function e(e) {
    var o = getCurrentPages(), n = o[o.length - 1].selectComponent(e);
    return n || (console.error("无法找到对应的组件，请按文档说明使用组件"), null);
}

function o(o) {
    var n = o.selector;
    e(void 0 === n ? "#toast" : n).handleShow(o);
}

function n(o) {
    e("#data-loading").showLoading(o);
}

o.hide = function() {
    e(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "#toast").handleHide();
}, n.hide = function() {
    e("#data-loading").hideLoading();
}, module.exports = {
    $Toast: o,
    $Message: function(o) {
        var n = o.selector;
        e(void 0 === n ? "#message" : n).handleShow(o);
    },
    $Loading: n
};