Component({
    properties: {
        windowWidth: Number,
        statusBarHeight: Number,
        hideBack: Boolean,
        backHome: Boolean,
        customStyle: String,
        backgroundColor: String,
        color: String,
        navImg: String,
        title: String
    },
    methods: {
        goBack: function() {
            this.triggerEvent("goBack");
        },
        goHome: function() {
            this.triggerEvent("goHome");
        }
    }
});