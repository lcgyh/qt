(0, require("../../99AA9374B878E4CFFFCCFB73DB486783.js").create)({
    props: {
        show: Boolean,
        mask: Boolean,
        customStyle: String,
        zIndex: {
            type: Number,
            value: 9
        }
    },
    methods: {
        onClick: function() {
            this.$emit("click");
        }
    }
});