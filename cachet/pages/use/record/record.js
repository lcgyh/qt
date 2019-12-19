import lwx from '../../../utils/lwx.js'
import LPage from '../../../utils/lpage.js'
var nowDay = require("../../../utils/util.js")

LPage({
  _pageNo: 1,
  _pageSize: 10,
  data: {
    bespeak_date: '开始时间',
    bespeak_date2: '结束时间',
    useInfos: [],
    noMore: false
  },
  onLoad: function (options) {

    if (options.devicesId){
      this._devicesId = options.devicesId
    }

    if (options.actId) {
      this._actId = options.actId
    }

    var myDate = new Date();
    this.setData({
      startData: nowDay.formatDay(myDate),
      [!this._devicesId || 'devicesId']: this._devicesId
    })
    this.loadData()
  },
  bindDateChange: function (e) {
    this.setData({
      startTime: e.detail.value
    })
  }, 
  bindDateChange2: function (e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  onReachBottom: function () {
    if(!this.data.noMore){
      this.loadData()
    }
  },
  loadData: function(){
    let that = this
    lwx.request({
      url: '/use/record',
      data: {
        pageNo: this._pageNo,
        pageSize: this._pageSize,
        [!this.data.startTime || 'startTime']: this.data.startTime,
        [!this.data.endTime || 'endTime']: this.data.endTime,
        [!this._devicesId || 'devicesId']: this._devicesId,
        [!this._actId || 'actId']: this._actId,
      }
    }).then(res => {
      console.log(res)
      let useInfos = this._pageNo === 1 ? [] : [...this.data.useInfos]
      if (res.useInfos){
        res.useInfos.map(item => {
          useInfos.push({
            sealName: item.sealName,
            partyName: item.partyName,
            useTime: item.useTime,
            useId: item.useId,
            censorStatus: item.censorStatus,
            censorStatusName: item.censorStatusName
          })
        })
        that._pageNo++
      }
      that.setData({
        useInfos: useInfos,
        noMore: useInfos.length < that.data.useInfos.length + that._pageSize
      })
    }).catch(err => {
      console.log(err)
      wx.showToast({
        title: '加载数据失败'
      })
    })
  },
  searchData: function(){
    this._pageNo = 1
    this.setData({
      noMore: false
    })
    this.loadData()
  }
})