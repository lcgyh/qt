var e = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../../@babel/runtime/helpers/slicedToArray")), t = require("../../BAA9D332B878E4CFDCCFBB35F9386783.js"), i = require("../../B5ACACA2B878E4CFD3CAC4A5D2D86783.js");

(0, t.VantComponent)({
    classes: [ "active-class", "toolbar-class", "column-class" ],
    props: Object.assign(Object.assign({}, i.pickerProps), {
        value: String,
        areaList: {
            type: Object,
            value: {}
        },
        columnsNum: {
            type: null,
            value: 3
        }
    }),
    data: {
        columns: [ {
            values: []
        }, {
            values: []
        }, {
            values: []
        } ],
        displayColumns: [ {
            values: []
        }, {
            values: []
        }, {
            values: []
        } ]
    },
    watch: {
        value: function(e) {
            this.code = e, this.setValues();
        },
        areaList: "setValues",
        columnsNum: function(e) {
            this.setData({
                displayColumns: this.data.columns.slice(0, +e)
            });
        }
    },
    mounted: function() {
        var e = this;
        setTimeout(function() {
            e.setValues();
        }, 0);
    },
    methods: {
        getPicker: function() {
            return null == this.picker && (this.picker = this.selectComponent(".van-area__picker")), 
            this.picker;
        },
        onCancel: function(e) {
            this.emit("cancel", e.detail);
        },
        onConfirm: function(e) {
            this.emit("confirm", e.detail);
        },
        emit: function(e, t) {
            t.values = t.value, delete t.value, this.$emit(e, t);
        },
        onChange: function(e) {
            var t = this, i = e.detail, n = i.index, s = i.picker, c = i.value;
            this.code = c[n].code, this.setValues().then(function() {
                t.$emit("change", {
                    picker: s,
                    values: s.getValues(),
                    index: n
                });
            });
        },
        getConfig: function(e) {
            var t = this.data.areaList;
            return t && t["".concat(e, "_list")] || {};
        },
        getList: function(e, t) {
            var i = [];
            if ("province" !== e && !t) return i;
            var n = this.getConfig(e);
            return i = Object.keys(n).map(function(e) {
                return {
                    code: e,
                    name: n[e]
                };
            }), t && ("9" === t[0] && "city" === e && (t = "9"), i = i.filter(function(e) {
                return 0 === e.code.indexOf(t);
            })), i;
        },
        getIndex: function(e, t) {
            var i = "province" === e ? 2 : "city" === e ? 4 : 6, n = this.getList(e, t.slice(0, i - 2));
            "9" === t[0] && "province" === e && (i = 1), t = t.slice(0, i);
            for (var s = 0; s < n.length; s++) if (n[s].code.slice(0, i) === t) return s;
            return 0;
        },
        setValues: function() {
            var t = this, i = this.getConfig("county"), n = this.code || Object.keys(i)[0] || "", s = this.getList("province"), c = this.getList("city", n.slice(0, 2)), u = this.getPicker();
            if (u) {
                var r = [];
                if (r.push(u.setColumnValues(0, s, !1)), r.push(u.setColumnValues(1, c, !1)), c.length && "00" === n.slice(2, 4)) {
                    var a = (0, e.default)(c, 1);
                    n = a[0].code;
                }
                return r.push(u.setColumnValues(2, this.getList("county", n.slice(0, 4)), !1)), 
                Promise.all(r).catch(function() {}).then(function() {
                    return u.setIndexes([ t.getIndex("province", n), t.getIndex("city", n), t.getIndex("county", n) ]);
                }).catch(function() {});
            }
        },
        getValues: function() {
            var e = this.getPicker();
            return e ? e.getValues().filter(function(e) {
                return !!e;
            }) : [];
        },
        getDetail: function() {
            var e = this.getValues(), t = {
                code: "",
                country: "",
                province: "",
                city: "",
                county: ""
            };
            if (!e.length) return t;
            var i = e.map(function(e) {
                return e.name;
            });
            return t.code = e[e.length - 1].code, "9" === t.code[0] ? (t.country = i[1] || "", 
            t.province = i[2] || "") : (t.province = i[0] || "", t.city = i[1] || "", t.county = i[2] || ""), 
            t;
        },
        reset: function(e) {
            return this.code = e || "", this.setValues();
        }
    }
});