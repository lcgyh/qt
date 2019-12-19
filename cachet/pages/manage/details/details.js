// pages/details/details.js
import { _globle } from '../../../utils/globle.js'
import { userLogin } from '../../../utils/userUtil.js'
import lwx from '../../../utils/lwx.js'
import LPage from '../../../utils/lpage.js'
const app = getApp();
LPage({
  data: {
    devicesInfo:[]
  },
  onLoad: function (options) {
    this._devicesId = options.devicesId;
    this.loadData();
  },
  loadData:function(options){
    let that =this;
    lwx.request({
      url: '/devices/detail',
      data: {
        client_id: _globle.clientId,
        devicesId: that._devicesId
      }
    }).then(res => {
      console.log(res)
      let devicesInfo = res.devicesInfo;

      that.setData({
        devicesInfo: devicesInfo,
        showOpenBtn: devicesInfo.status == 'INSTALLED' && devicesInfo.manager && devicesInfo.workflow,
        statusUrl: that.getStatusUrl(devicesInfo)
      })
    }).catch(err => {
      throw err;
    })
  },
  openDevices: function () {
    let that = this
    this.showMask('印章启用中')
    lwx.request({
      url: '/devices/open',
      data: {
        devicesId: that._devicesId
      }
    }).then(res => {
      console.log(res)
      wx.showToast({
        title: '启用印章成功'
      })
      that.hideMask()
      that.loadData()
    }).catch(err => {
      console.log(err)
      that.hideMask()
      wx.showToast({
        title: '启用印章失败'
      })
    })
  },
  getStatusUrl: function(devicesInfo){
    if (devicesInfo.status === 'WAIT_BIND'){
      return `../addcach/addcach?devicesId=${devicesInfo.devicesId}`
    } else if (devicesInfo.status === 'WAIT_INSTALL'){
      return `../install/install/install?devicesId=${devicesInfo.devicesId}&alias=${devicesInfo.alias}`
    } else if (devicesInfo.status === 'INSTALLED'){
      if (devicesInfo.waitTestTime > 0){
        return `../install/testuse/testuse?devicesId=${devicesInfo.devicesId}&alias=${devicesInfo.alias}`
      }else{
        return `../install/testapply/testapply?devicesId=${devicesInfo.devicesId}&alias=${devicesInfo.alias}`
      }
    }else{
      return null
    }
  },
  showMask: function (title) {
    this.setData({
      showMask: true
    })
    wx.hideLoading()
    wx.showLoading({
      title: title
    })
  },
  hideMask: function () {
    this.setData({
      showMask: false
    })
    wx.hideLoading()
  }
})