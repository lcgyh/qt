Component({
    properties: {
        show: Boolean,
        customStyle: String
    },
    data: {},
    methods: {
        goLogin: function() {
            wx.navigateTo({
                url: "/pages/login/login"
            });
        }
    }
});