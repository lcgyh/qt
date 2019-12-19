// pages/use/inspectDetail/inspectDetail.js
import {
  _globle
} from '../../../utils/globle.js'
import lwx from '../../../utils/lwx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    devicesActId: '',
    detail: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      devicesActId: options.devicesActId
    })
    this.loadInfo();
  },
  loadInfo: function() {
    var that = this;
    lwx.request({
      url: "devices.act.info",
      data: {
        devicesActId: that.data.devicesActId
      },
    }).then(res => {
      if (res.data.code == '0') {
        that.setData({
          detail: res.data.devicesAct
        })
      } else {
        console.log('333333');
      }
    }).catch(err => {
      console.log('err' + err);
    })
  },
  //审核通过
  pass: function() {
    var that = this;
    lwx.request({
      url: "devices.act.censor.update",
      data: {
        devicesActId: that.data.devicesActId
      },
    }).then(res => {
      if (res.data.code == '0') {
        wx.showToast({
          title: '审核成功',
          icon: 'none',
        })
        setTimeout(function () {
        wx.navigateBack({
          delta: 1,
        })
        }, 1000)
      } else {
        console.log('333333');
      }
    }).catch(err => {
      console.log('err' + err);
    })
  },
  zoomPic: function(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.pic, // 当前显示图片的http链接
      urls: this.data.detail.applyInfo // 需要预览的图片http链接列表
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