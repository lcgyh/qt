var e = require("25AF6351B878E4CF43C90B568E596783.js"), t = require("55853854B878E4CF33E35053EB796783.js");

function r(e) {
    return Math.round(wx.getSystemInfoSync().windowWidth * e / 750);
}

module.exports = {
    barcode: function(t, n, o, c) {
        e.code128(wx.createCanvasContext(t), n, r(o), r(c));
    },
    qrcode: function(e, n, o, c) {
        t.api.draw(n, {
            ctx: wx.createCanvasContext(e),
            width: r(o),
            height: r(c)
        });
    }
};