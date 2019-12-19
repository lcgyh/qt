// import LPage from '../../../utils/lpage.js'
import lwx from '../../../utils/lwx.js'
import {
  _globle
} from '../../../utils/globle.js'
Page({
  _pageNo: 1,
  _pageSize: 10,
  data: {
    nomore: false,
    devicesList: [],
    sealId: ''
  },
  onLoad: function(options) {

  },
  onShow: function() {
    var that = this;
    that._pageNo = 1
    that.loadData()
  },
  loadData: function() {
    var that = this;
    var devicesList = that.data.devicesList;
    lwx.request({
      url: "seal.search",
    }).then(res => {
      console.log(res)
      if (res.data.code == '0') {
        devicesList = res.data.seals;
        that.getStatus(devicesList);
      } else {
        wx.showToast({
          title: res.data.message,
        })
      }
    }).catch(err => {
      console.log('err' + err);
    })
  },
  getStatus: function(array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].sealStatus == 'ENABLE') {
        array[i].status = '正常'
      } else if (array[i].sealStatus == 'DISABLE') {
        array[i].status = '禁用'
      } else if (array[i].sealStatus == 'DESERTED') {
        array[i].status = '失效'
      } else if (array[i].sealStatus == 'LOCK') {
        array[i].status = '锁定'
      }
    }
    this.setData({
      devicesList: array
    })
  },
  onReachBottom: function() {
    if (!this.data.nomore) {
      this.loadData()
    }
  },
  inputkey: function(e) {
    this._keyword = e.detail.value
  },
  search: function(e) {
    this._pageNo = 1
    this.data.devicesList = undefined
    this.loadData()
  },
  //印章详情
  sealDetail: function(e) {
    if (e.currentTarget.dataset.status == '失效') {
      wx.showToast({
        image: '',
        title: '印章已失效',
      })
    } else {
      wx.navigateTo({
        url: '../sealDetail/sealDetail?sealid=' + e.currentTarget.dataset.sealid,
      })
    }

  },
})