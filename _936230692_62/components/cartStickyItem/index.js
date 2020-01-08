Component({
    externalClasses: [ "i-class" ],
    options: {
        multipleSlots: !0
    },
    relations: {
        "../cartSticky/index": {
            type: "parent"
        }
    },
    properties: {
        noTitle: {
            type: Boolean,
            value: !1
        },
        windowHeight: {
            type: Number,
            value: 1
        }
    },
    data: {
        top: 0,
        footTop: 0,
        isFixed: !1,
        index: -1,
        showHeadFoot: !1,
        isFootFixed: !1
    },
    methods: {
        updateScrollTopChange: function(t) {
            var e = this.data, o = e.top, i = e.footTop, a = e.windowHeight;
            this.setData({
                isFixed: t > o && t < i - 45,
                isFootFixed: t < i - a + 45,
                showHeadFoot: t >= i - 45 || t <= o - a + 100
            });
        },
        updateDataChange: function(t) {
            var e = this, o = wx.createSelectorQuery().in(this), i = this.data.windowHeight;
            o.select(".i-sticky-item").boundingClientRect(function(o) {
                o && e.setData({
                    top: o.top,
                    index: t
                });
            }).exec(), o.select(".i-sticky-item-footer").boundingClientRect(function(t) {
                t && e.setData({
                    isFootFixed: t.top > i,
                    footTop: t.top
                });
            }).exec();
        },
        cartFresh: function(t) {
            var e = this;
            this.setData({
                top: 0,
                footTop: 0,
                isFixed: !1,
                showHeadFoot: !1,
                isFootFixed: !1
            }, function() {
                e.updateDataChange(t);
            });
        }
    }
});