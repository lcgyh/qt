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
    var myDate = new Date();

    if (options.devicesId){
      this._devicesId = options.devicesId
    }

    if (options.isCheck){
      this._isCheck = options.isCheck
    }

    this.setData({
      startData: nowDay.formatDay(myDate)
    })
  },
  onShow: function(){
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
    
    lwx.request({
      url: '/use/acts',
      data: {
        pageNo: this._pageNo,
        pageSize: this._pageSize,
        applyType: 'USED_APPLY',
        [!this._devicesId || 'devicesId']: this._devicesId,
        [!this.data.startTime || 'startTime']: this.data.startTime,
        [!this.data.endTime || 'endTime']: this.data.endTime,
        [!this._isCheck || 'type']: this._isCheck ? 'all' : ''
      }
    }).then(res => {
      console.log(res)
      let acts = this._pageNo === 1 ? [] : [...this.data.acts]
      if (res.actList){
        res.actList.map(item => {
          acts.push({
            sealName: item.sealName,
            useTime: item.useTime,
            actId: item.actId,
            censorStatus: item.censorStatus,
            censorStatusName: item.censorStatusName
          })
        })
        this._pageNo++
      }
      this.setData({
        acts: acts,
        noMore: res.actList.length < this._pageSize
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
  },
  toDetail: function(e){
    console.log(e)
    let baseUrl = '../actdetail/actdetail?actId=' + e.currentTarget.dataset.actid
    if (this._devicesId){
      baseUrl = baseUrl + '&devicesId=' + this._devicesId
    }
    console.log(baseUrl)

    wx.navigateTo({
      url: baseUrl
    })
  }
})