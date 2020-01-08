var t = {
    add: function(t, e) {
        t = t.toString(), e = e.toString();
        var r = t.split("."), n = e.split("."), i = 2 == r.length ? r[1] : "", u = 2 == n.length ? n[1] : "", o = Math.max(i.length, u.length), l = Math.pow(10, o), p = Number(((t * l + e * l) / l).toFixed(o)), a = arguments[2];
        return "number" == typeof a ? Number(p.toFixed(a)) : p;
    },
    sub: function(t, e) {
        return this.add(t, -Number(e), arguments[2]);
    },
    mul: function(t, e) {
        var r, n, i = t.toString(), u = e.toString(), o = arguments[2];
        return r = (i.split(".")[1] ? i.split(".")[1].length : 0) + (u.split(".")[1] ? u.split(".")[1].length : 0), 
        n = Number(i.replace(".", "")) * Number(u.replace(".", "")) / Math.pow(10, r), "number" != typeof o ? Number(n) : Number(n.toFixed(parseInt(o)));
    },
    div: function(t, e) {
        var r, n, i = t.toString(), u = e.toString(), o = arguments[2];
        return r = (u.split(".")[1] ? u.split(".")[1].length : 0) - (i.split(".")[1] ? i.split(".")[1].length : 0), 
        n = Number(i.replace(".", "")) / Number(u.replace(".", "")) * Math.pow(10, r), "number" != typeof o ? Number(n) : Number(n.toFixed(parseInt(o)));
    },
    round: function(t) {
        var e = parseFloat(t).toFixed(3);
        return e.substring(0, e.toString().length - 1);
    }
};

module.exports = t;