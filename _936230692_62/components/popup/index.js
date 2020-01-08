var e = require("../../BAA9D332B878E4CFDCCFBB35F9386783.js"), t = require("../../7DDC68C3B878E4CF1BBA00C42AC86783.js");

(0, e.VantComponent)({
    mixins: [ (0, t.transition)(!1) ],
    props: {
        transition: String,
        customStyle: String,
        overlayStyle: String,
        zIndex: {
            type: Number,
            value: 100
        },
        overlay: {
            type: Boolean,
            value: !0
        },
        closeOnClickOverlay: {
            type: Boolean,
            value: !0
        },
        position: {
            type: String,
            value: "center"
        }
    },
    methods: {
        onClickOverlay: function() {
            this.$emit("click-overlay"), this.data.closeOnClickOverlay && this.$emit("close");
        }
    }
});