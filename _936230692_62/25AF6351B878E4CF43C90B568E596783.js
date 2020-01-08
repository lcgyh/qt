var t = 126, r = 103, i = 104, e = 105, s = 98, h = 101, n = 100, c = 106, a = {
    CHAR_TILDE: 102
}, u = {
    ANY: 1,
    AB: 2,
    A: 3,
    B: 4,
    C: 5
};

function f(t, r) {
    return void 0 === r ? t >= 32 ? t - 32 : t + 64 : parseInt(String.fromCharCode(t) + String.fromCharCode(r));
}

function o(t, r) {
    var i = l(t);
    return i == u.ANY || (i == u.AB || (i == u.A && r == u.A || i == u.B && r == u.B));
}

function l(t) {
    return t >= 48 && t <= 57 ? u.ANY : t >= 32 && t <= 95 ? u.AB : t < 32 ? u.A : u.B;
}

exports.code128 = function(g, A, B, v) {
    B = parseInt(B), v = parseInt(v);
    for (var w = function(d) {
        var p = {
            currcs: u.C
        }, g = function(t) {
            for (var r = [], i = 0; i < t.length; i++) r.push(t.charCodeAt(i));
            return r;
        }(d), A = g[0] == t ? 1 : 0, B = g.length > 0 ? l(g[A++]) : u.AB, v = g.length > 0 ? l(g[A++]) : u.AB;
        p.currcs = function(t, r) {
            var i = 0;
            return i += t == u.A ? 1 : 0, i += t == u.B ? -1 : 0, i += r == u.A ? 1 : 0, (i += r == u.B ? -1 : 0) > 0 ? u.A : u.B;
        }(B, v), p.currcs = function(r, i) {
            for (var e = 0; e < r.length; e++) {
                var s = r[e];
                if ((s < 48 || s > 57) && s != t) return i;
            }
            return u.C;
        }(g, p.currcs);
        var w = new Array();
        switch (p.currcs) {
          case u.A:
            w.push(r);
            break;

          case u.B:
            w.push(i);
            break;

          default:
            w.push(e);
        }
        for (var C = 0; C < g.length; C++) {
            var _ = g[C];
            _ in a && (w.push(a[_]), _ = g[++C]);
            var b = g.length > C + 1 ? g[C + 1] : -1;
            w = w.concat(z(_, b, p.currcs)), p.currcs == u.C && C++;
        }
        for (var R = w[0], y = 1; y < w.length; y++) R += y * w[y];
        return w.push(R % 103), w.push(c), w;
        function z(t, r, i) {
            var e = [], c = -1;
            if (o(t, i)) i == u.C && (-1 == r ? (c = n, i = u.B) : -1 == r || o(r, i) || (o(r, u.A) ? (c = h, 
            i = u.A) : (c = n, i = u.B))); else if (-1 == r || o(r, i)) c = s; else switch (i) {
              case u.A:
                c = n, i = u.B;
                break;

              case u.B:
                c = h, i = u.A;
            }
            return -1 != c ? (e.push(c), e.push(f(r))) : i == u.C ? e.push(f(t, r)) : e.push(f(t)), 
            p.currcs = i, e;
        }
    }(A), C = new d(g, B, v), _ = C.area.width / (11 * (w.length - 3) + 35), b = C.area.left, R = C.area.top, y = 0; y < w.length; y++) for (var z = w[y], x = 0; x < 8; x += 2) {
        var I = p[z][x] * _, k = v - R, q = p[z][x + 1] * _;
        I > 0 && C.fillFgRect(b, R, I, k), b += I + q;
    }
    g.draw();
};

var d = function(t, r, i) {
    this.width = r, this.height = i, this.quiet = Math.round(this.width / 40), this.border_size = 0, 
    this.padding_width = 0, this.area = {
        width: r - 2 * this.padding_width - 2 * this.quiet,
        height: i - 2 * this.border_size,
        top: this.border_size - 4,
        left: this.padding_width + this.quiet
    }, this.ctx = t, this.fg = "#000000", this.bg = "#ffffff", this.fillBgRect(0, 0, r, i), 
    this.fillBgRect(0, this.border_size, r, i - 2 * this.border_size);
};

d.prototype._fillRect = function(t, r, i, e, s) {
    this.ctx.setFillStyle(s), this.ctx.fillRect(t, r, i, e);
}, d.prototype.fillFgRect = function(t, r, i, e) {
    this._fillRect(t, r, i, e, this.fg);
}, d.prototype.fillBgRect = function(t, r, i, e) {
    this._fillRect(t, r, i, e, this.bg);
};

var p = [ [ 2, 1, 2, 2, 2, 2, 0, 0 ], [ 2, 2, 2, 1, 2, 2, 0, 0 ], [ 2, 2, 2, 2, 2, 1, 0, 0 ], [ 1, 2, 1, 2, 2, 3, 0, 0 ], [ 1, 2, 1, 3, 2, 2, 0, 0 ], [ 1, 3, 1, 2, 2, 2, 0, 0 ], [ 1, 2, 2, 2, 1, 3, 0, 0 ], [ 1, 2, 2, 3, 1, 2, 0, 0 ], [ 1, 3, 2, 2, 1, 2, 0, 0 ], [ 2, 2, 1, 2, 1, 3, 0, 0 ], [ 2, 2, 1, 3, 1, 2, 0, 0 ], [ 2, 3, 1, 2, 1, 2, 0, 0 ], [ 1, 1, 2, 2, 3, 2, 0, 0 ], [ 1, 2, 2, 1, 3, 2, 0, 0 ], [ 1, 2, 2, 2, 3, 1, 0, 0 ], [ 1, 1, 3, 2, 2, 2, 0, 0 ], [ 1, 2, 3, 1, 2, 2, 0, 0 ], [ 1, 2, 3, 2, 2, 1, 0, 0 ], [ 2, 2, 3, 2, 1, 1, 0, 0 ], [ 2, 2, 1, 1, 3, 2, 0, 0 ], [ 2, 2, 1, 2, 3, 1, 0, 0 ], [ 2, 1, 3, 2, 1, 2, 0, 0 ], [ 2, 2, 3, 1, 1, 2, 0, 0 ], [ 3, 1, 2, 1, 3, 1, 0, 0 ], [ 3, 1, 1, 2, 2, 2, 0, 0 ], [ 3, 2, 1, 1, 2, 2, 0, 0 ], [ 3, 2, 1, 2, 2, 1, 0, 0 ], [ 3, 1, 2, 2, 1, 2, 0, 0 ], [ 3, 2, 2, 1, 1, 2, 0, 0 ], [ 3, 2, 2, 2, 1, 1, 0, 0 ], [ 2, 1, 2, 1, 2, 3, 0, 0 ], [ 2, 1, 2, 3, 2, 1, 0, 0 ], [ 2, 3, 2, 1, 2, 1, 0, 0 ], [ 1, 1, 1, 3, 2, 3, 0, 0 ], [ 1, 3, 1, 1, 2, 3, 0, 0 ], [ 1, 3, 1, 3, 2, 1, 0, 0 ], [ 1, 1, 2, 3, 1, 3, 0, 0 ], [ 1, 3, 2, 1, 1, 3, 0, 0 ], [ 1, 3, 2, 3, 1, 1, 0, 0 ], [ 2, 1, 1, 3, 1, 3, 0, 0 ], [ 2, 3, 1, 1, 1, 3, 0, 0 ], [ 2, 3, 1, 3, 1, 1, 0, 0 ], [ 1, 1, 2, 1, 3, 3, 0, 0 ], [ 1, 1, 2, 3, 3, 1, 0, 0 ], [ 1, 3, 2, 1, 3, 1, 0, 0 ], [ 1, 1, 3, 1, 2, 3, 0, 0 ], [ 1, 1, 3, 3, 2, 1, 0, 0 ], [ 1, 3, 3, 1, 2, 1, 0, 0 ], [ 3, 1, 3, 1, 2, 1, 0, 0 ], [ 2, 1, 1, 3, 3, 1, 0, 0 ], [ 2, 3, 1, 1, 3, 1, 0, 0 ], [ 2, 1, 3, 1, 1, 3, 0, 0 ], [ 2, 1, 3, 3, 1, 1, 0, 0 ], [ 2, 1, 3, 1, 3, 1, 0, 0 ], [ 3, 1, 1, 1, 2, 3, 0, 0 ], [ 3, 1, 1, 3, 2, 1, 0, 0 ], [ 3, 3, 1, 1, 2, 1, 0, 0 ], [ 3, 1, 2, 1, 1, 3, 0, 0 ], [ 3, 1, 2, 3, 1, 1, 0, 0 ], [ 3, 3, 2, 1, 1, 1, 0, 0 ], [ 3, 1, 4, 1, 1, 1, 0, 0 ], [ 2, 2, 1, 4, 1, 1, 0, 0 ], [ 4, 3, 1, 1, 1, 1, 0, 0 ], [ 1, 1, 1, 2, 2, 4, 0, 0 ], [ 1, 1, 1, 4, 2, 2, 0, 0 ], [ 1, 2, 1, 1, 2, 4, 0, 0 ], [ 1, 2, 1, 4, 2, 1, 0, 0 ], [ 1, 4, 1, 1, 2, 2, 0, 0 ], [ 1, 4, 1, 2, 2, 1, 0, 0 ], [ 1, 1, 2, 2, 1, 4, 0, 0 ], [ 1, 1, 2, 4, 1, 2, 0, 0 ], [ 1, 2, 2, 1, 1, 4, 0, 0 ], [ 1, 2, 2, 4, 1, 1, 0, 0 ], [ 1, 4, 2, 1, 1, 2, 0, 0 ], [ 1, 4, 2, 2, 1, 1, 0, 0 ], [ 2, 4, 1, 2, 1, 1, 0, 0 ], [ 2, 2, 1, 1, 1, 4, 0, 0 ], [ 4, 1, 3, 1, 1, 1, 0, 0 ], [ 2, 4, 1, 1, 1, 2, 0, 0 ], [ 1, 3, 4, 1, 1, 1, 0, 0 ], [ 1, 1, 1, 2, 4, 2, 0, 0 ], [ 1, 2, 1, 1, 4, 2, 0, 0 ], [ 1, 2, 1, 2, 4, 1, 0, 0 ], [ 1, 1, 4, 2, 1, 2, 0, 0 ], [ 1, 2, 4, 1, 1, 2, 0, 0 ], [ 1, 2, 4, 2, 1, 1, 0, 0 ], [ 4, 1, 1, 2, 1, 2, 0, 0 ], [ 4, 2, 1, 1, 1, 2, 0, 0 ], [ 4, 2, 1, 2, 1, 1, 0, 0 ], [ 2, 1, 2, 1, 4, 1, 0, 0 ], [ 2, 1, 4, 1, 2, 1, 0, 0 ], [ 4, 1, 2, 1, 2, 1, 0, 0 ], [ 1, 1, 1, 1, 4, 3, 0, 0 ], [ 1, 1, 1, 3, 4, 1, 0, 0 ], [ 1, 3, 1, 1, 4, 1, 0, 0 ], [ 1, 1, 4, 1, 1, 3, 0, 0 ], [ 1, 1, 4, 3, 1, 1, 0, 0 ], [ 4, 1, 1, 1, 1, 3, 0, 0 ], [ 4, 1, 1, 3, 1, 1, 0, 0 ], [ 1, 1, 3, 1, 4, 1, 0, 0 ], [ 1, 1, 4, 1, 3, 1, 0, 0 ], [ 3, 1, 1, 1, 4, 1, 0, 0 ], [ 4, 1, 1, 1, 3, 1, 0, 0 ], [ 2, 1, 1, 4, 1, 2, 0, 0 ], [ 2, 1, 1, 2, 1, 4, 0, 0 ], [ 2, 1, 1, 2, 3, 2, 0, 0 ], [ 2, 3, 3, 1, 1, 1, 2, 0 ] ];