import lwx from '../../../../utils/lwx.js'
import LPage from '../../../../utils/lpage.js'
import { _globle } from '../../../../utils/globle.js'
import { userLogin } from '../../../../utils/userUtil.js'
var nowDay = require("../../../../utils/util.js")
LPage({
  _pageNo: 1,
  _pageSize: 10,
  data: {
    bespeak_date: '开始时间',
    bespeak_date2: '结束时间',
    startData: '',
    manage_list: [],
    noMore: false
  },
  onLoad: function (options) {
    
    var myDate = new Date();
    this.setData({
      startData: nowDay.formatDay(myDate)
    })
    this.loadData();
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
  searchData:function(){

  },
  onReachBottom: function () {
    if (!this.data.noMore) {
      this.loadData()
    }
  },
  loadData: function () {
    let that = this
    lwx.request({
      url: '/apply/record',
      data: {
        client_id: _globle.clientId,
        pageNo: that._pageNo,
        pageSize: that._pageSize,
        [!that.data.startTime || 'startTime']: that.data.startTime,
        [!that.data.endTime || 'endTime']: that.data.endTime
      }
    }).then(res => {
      console.log(res)
      let manage_list = that._pageNo === 1 ? [] : [...that.data.manage_list];
      if (res.applys) {
        res.applys.map(item => {
          let statusName = '';
          switch (item.status) {
            case 'PENDING':
              statusName = '审核中';
              break;
            case 'PASSED':
              statusName = '通过审核';
              break;
            default:
              statusName = '拒绝'
          }
          manage_list.push({
            applyId: item.applyId,
            alias: item.alias,
            status: statusName,
            applyTime: item.applyTime,
            color: item.status === 'PENDING' || item.devicesStatus === 'PASSED' ? 'colorgreen' : 'colorred'
          })
        })
        that._pageNo++
      }
      that.setData({
        manage_list: manage_list,
        noMore: manage_list.length < that.data.manage_list.length + that._pageSize
      })
    }).catch(err => {
      wx.showToast({
        title: '加载数据失败'
      })
    })
  }
})