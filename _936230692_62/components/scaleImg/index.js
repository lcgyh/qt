Component({
    properties: {
        imgUrl: String,
        windowWidth: Number
    },
    data: {
        touch: {
            baseHeight: null,
            scaleValue: 1,
            scaleNumer: 0,
            lastTapDiffTime: 0,
            clickNum: 0
        }
    },
    methods: {
        doubleClick: function(t) {
            var a = this, i = t.timeStamp;
            i - this.data.lastTapDiffTime < 300 ? this.setData({
                clickNum: 1
            }, function() {
                setTimeout(function() {
                    a.clickCalculation(t);
                }, 300);
            }) : this.setData({
                lastTapDiffTime: i
            });
        },
        clickCalculation: function() {
            0 !== this.data.clickNum && (this.data.scaleValue > 1 ? this.setData({
                scaleValue: 1,
                lastTapDiffTime: 0,
                clickNum: 0
            }) : this.setData({
                scaleValue: 2,
                lastTapDiffTime: 0,
                clickNum: 0
            }));
        },
        load: function(t) {
            var a = t.currentTarget.dataset.width / t.detail.width * t.detail.height;
            this.setData({
                baseHeight: a
            });
        }
    }
});