// pages/homePage/homePage/homePage.js
//获取应用实例
import {
  _globle
} from '../../../utils/globle.js'
import lwx from '../../../utils/lwx.js'
import qrcode from '../../../utils/weapp.qrcode.min.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowH: '',
    windowW: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getUserInfo();
  },
  getUserInfo: function() {
    lwx.request({
      url: "user.info",
    }).then(res => {
      if (res.data.code == '0') {
        console.log(res)
        _globle.user = res.data.partys;
        _globle.user.isLogin = true;
      } else {
        console.log('333333');
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
    var that = this;
    that.getUserInfo();
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowH: res.windowHeight,
          windowW: res.windowWidth
        })
      },
    })
    that.creatEWM();
  },
  creatEWM: function() {
    // qrcode({
    //   width: this.data.windowW * 0.5,
    //   height: this.data.windowH * 0.5,
    //   canvasId: 'myQrcode',
    //   text: '这是个二维码'
    // })

    qrcode({
      width: 190,
      height: 190,
      canvasId: 'myQrcode',
      text: '你好啊',
      image: {
        dx: 70,
        dy: 70,
        dWidth: 70,
        dHeight: 70
      }
    })
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