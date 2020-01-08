Component({
    externalClasses: [ "i-class" ],
    properties: {
        scrollTop: {
            type: Number,
            observer: function(t) {
                this._updateScrollTopChange();
            }
        },
        refresh: {
            type: Number,
            observer: function(t) {
                this._cartFresh();
            }
        },
        random: {
            type: Number
        }
    },
    relations: {
        "../cartStickyItem/index": {
            type: "child",
            linked: function() {
                this._updateDataChange();
            },
            linkChanged: function() {
                this._updateDataChange();
            },
            unlinked: function() {
                this._updateDataChange();
            }
        }
    },
    data: {
        timer: null,
        itemLength: 0
    },
    methods: {
        _updateScrollTopChange: function() {
            var t = this, e = this.getRelationNodes("../cartStickyItem/index");
            e.length > 0 && e.forEach(function(e) {
                e && e.updateScrollTopChange(t.data.scrollTop);
            });
        },
        _updateDataChange: function() {
            var t = this.getRelationNodes("../cartStickyItem/index");
            t.length > 0 && (this.data.timer && (clearTimeout(this.data.timer), this.setData({
                timer: null
            })), this.data.timer = setTimeout(function() {
                t.forEach(function(t, e) {
                    t && t.updateDataChange(e);
                });
            }, 0), this.setData({
                timer: this.data.timer
            }));
        },
        _cartFresh: function() {
            var t = this.getRelationNodes("../cartStickyItem/index");
            t.length > 0 && (this.data.timer && (clearTimeout(this.data.timer), this.setData({
                timer: null
            })), this.data.timer = setTimeout(function() {
                t.forEach(function(t, e) {
                    t && t.cartFresh(e);
                });
            }, 0), this.setData({
                timer: this.data.timer
            }));
        }
    }
});