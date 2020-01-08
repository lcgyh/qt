var t = require("../../BAA9D332B878E4CFDCCFBB35F9386783.js"), e = require("../../DCA74616B878E4CFBAC12E11B5586783.js");

(0, t.VantComponent)({
    classes: [ "active-class" ],
    props: {
        valueKey: String,
        className: String,
        itemHeight: Number,
        visibleItemCount: Number,
        initialOptions: {
            type: Array,
            value: []
        },
        defaultIndex: {
            type: Number,
            value: 0
        }
    },
    data: {
        startY: 0,
        offset: 0,
        duration: 0,
        startOffset: 0,
        options: [],
        currentIndex: 0
    },
    created: function() {
        var t = this, e = this.data, n = e.defaultIndex, i = e.initialOptions;
        this.setData({
            currentIndex: n,
            options: i
        }, function() {
            t.setIndex(n);
        });
    },
    watch: {
        defaultIndex: function(t) {
            this.setIndex(t);
        }
    },
    methods: {
        getCount: function() {
            return this.data.options.length;
        },
        onTouchStart: function(t) {
            this.setData({
                startY: t.touches[0].clientY,
                startOffset: this.data.offset,
                duration: 0
            });
        },
        onTouchMove: function(t) {
            var n = this.data, i = t.touches[0].clientY - n.startY;
            this.setData({
                offset: (0, e.range)(n.startOffset + i, -this.getCount() * n.itemHeight, n.itemHeight)
            });
        },
        onTouchEnd: function() {
            var t = this.data;
            if (t.offset !== t.startOffset) {
                this.setData({
                    duration: 200
                });
                var n = (0, e.range)(Math.round(-t.offset / t.itemHeight), 0, this.getCount() - 1);
                this.setIndex(n, !0);
            }
        },
        onClickItem: function(t) {
            var e = t.currentTarget.dataset.index;
            this.setIndex(e, !0);
        },
        adjustIndex: function(t) {
            for (var n = this.data, i = this.getCount(), s = t = (0, e.range)(t, 0, i); s < i; s++) if (!this.isDisabled(n.options[s])) return s;
            for (var a = t - 1; a >= 0; a--) if (!this.isDisabled(n.options[a])) return a;
        },
        isDisabled: function(t) {
            return (0, e.isObj)(t) && t.disabled;
        },
        getOptionText: function(t) {
            var n = this.data;
            return (0, e.isObj)(t) && n.valueKey in t ? t[n.valueKey] : t;
        },
        setIndex: function(t, e) {
            var n = this, i = this.data, s = -(t = this.adjustIndex(t) || 0) * i.itemHeight;
            return t !== i.currentIndex ? this.setData({
                offset: s,
                currentIndex: t
            }, function() {
                e && n.$emit("change", t);
            }) : this.setData({
                offset: s
            });
        },
        setValue: function(t) {
            for (var e = this.data.options, n = 0; n < e.length; n++) if (this.getOptionText(e[n]) === t) return this.setIndex(n);
            return Promise.resolve();
        },
        getValue: function() {
            var t = this.data;
            return t.options[t.currentIndex];
        }
    }
});