// pages/manage/manage.js
import { _globle } from '../../../utils/globle.js'
import { userLogin } from '../../../utils/userUtil.js'
import { getDevicesData } from './biz.js'
import LPage from '../../../utils/lpage.js'
import lwx from '../../../utils/lwx.js'
const app = getApp();
LPage({
  pageNo: 1,
  hasMore: true,
  data: {
    devicesList:[],
    nodata: false
  },
  onLoad: function (options) {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    })
    this.onlist();
  },
  onlist: function (){
    let that = this;
    lwx.request({
      url:'/devices/list',
      data: {
        client_id: _globle.clientId, 
        pageNo: that.pageNo
      }
    }).then(res => {
      let list = getDevicesData(res.datas)
      let devicesList = that.pageNo === 1 ? list : [...that.data.devicesList, ...list]
      that.hasMore = !(list.length < 10);
      that.pageNo++;
      that.setData({
        ...that.data,
        devicesList: devicesList,
        nodata: list.length < 10
      })
    }).catch(err => {
    throw err;
    })
  },
  onScrollLower:function(){
    if (this.hasMore){
      this.onlist()
    }
  }
})