Component({
    properties: {
        list: {
            type: Array
        },
        fileDomain: {
            type: String
        },
        count: {
            type: [ String, Number ],
            value: 2
        },
        customStyle: {
            type: String
        }
    },
    externalClasses: [ "i-class" ],
    data: {},
    methods: {
        goGoodDetail: function(t) {
            var e = t.currentTarget.dataset.pdspuid;
            wx.navigateTo({
                url: "/pages/pageHome/goodsDetail/goodsDetail?pdSpuId=".concat(e)
            });
        }
    }
});