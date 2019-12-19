// pages/use/legalPersonApproval/legalPersonApproval.js
import {
  _globle
} from '../../../utils/globle.js'
import lwx from '../../../utils/lwx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getList();
  },
  getList: function() {
    var that = this;
    lwx.request({
      url: "legal.search",
    }).then(res => {
      if (res.data.code == '0') {
        that.setData({
          array: res.data.legals
        })
      } else {
        console.log('333333');
      }
    }).catch(err => {
      console.log('err' + err);
    })
  },
  checkDetail: function(e) {
    wx.navigateTo({
      url: '../../device/atifyDeatil/atifyDeatil?applyId=' + e.currentTarget.dataset.applyid + '&applyVerifyId=' + e.currentTarget.dataset.applyverifyid + '&title=法务审批',
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