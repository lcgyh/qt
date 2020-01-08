Component({
    properties: {
        show: {
            type: Boolean,
            value: !1
        },
        hideImg: {
            type: Boolean,
            value: !0
        }
    },
    externalClasses: [ "i-class" ],
    data: {},
    methods: {
        drawSharePic: function() {
            this.triggerEvent("drawSharePic");
        },
        close: function() {
            this.triggerEvent("close");
        }
    }
});