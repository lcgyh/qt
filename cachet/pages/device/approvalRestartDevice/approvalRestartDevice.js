// approvalRestartDevice
import lwx from '../../../utils/lwx.js'
import {
  _globle
} from '../../../utils/globle.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    devicesId: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      devicesId: options.devicesId
    })
    this.loadData();
  },
  loadData: function() {
    var that = this;
    lwx.request({
      url: "devices.install.info",
      data: {
        devicesId: that.data.devicesId,
        partyId: _globle.user.partyId
      }
    }).then(res => {
      console.log(res)
      if (res.data.code == '0') {


      } else {
        console.log('错误');
      }
    }).catch(err => {
      console.log('err' + err);
    })
  },
  agree: function() {
    var that = this;
    lwx.request({
      url: "resetStatus.update",
      data: {
        installId: _globle.user.companyId,
        installStatus: 'PASSED ',
      }
    }).then(res => {
      console.log(res)
      if (res.data.code == '0') {


      } else {
        console.log('错误');
      }
    }).catch(err => {
      console.log('err' + err);
    })
  },

  // devices.install.info
  agree: function() {
    var that = this;
    lwx.request({
      url: "resetStatus.update",
      data: {
        installId: _globle.user.companyId,
        installStatus: 'PASSED ',
      }
    }).then(res => {
      console.log(res)
      if (res.data.code == '0') {


      } else {
        console.log('错误');
      }
    }).catch(err => {
      console.log('err' + err);
    })
  },

  refuse: function() {
    var that = this;
    lwx.request({
      url: "resetStatus.update",
      data: {
        installId: '',
        installStatus: 'REJECT',
      }
    }).then(res => {
      console.log(res)
      if (res.data.code == '0') {
        // that.setData({
        //   list: res.data.iVerifyAndInstalls
        // })
      } else {
        console.log('错误');
      }
    }).catch(err => {
      console.log('err' + err);
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})