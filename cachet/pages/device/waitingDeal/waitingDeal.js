// pages/device/waitingDeal/waitingDeal.js
import {
  _globle
} from '../../../utils/globle.js'
import lwx from '../../../utils/lwx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.loadData();
  },
  loadData: function() {
    var that = this;
    lwx.request({
      url: "apply.list",
    }).then(res => {
      console.log(res)
      if (res.data.code == '0') {
        that.setData({
          list: res.data.iVerifyAndInstalls
        })
      } else {
        console.log('错误');
      }
    }).catch(err => {
      console.log('err' + err);
    })
  },
  checkDetail: function(e) {
    var str;
    if (e.currentTarget.dataset.type == "TYPE_INSTALL") {
      // 重装
      str = '重装';
      wx.navigateTo({
        url: '../approvalRestartDevice/approvalRestartDevice?devicesId=' + e.currentTarget.dataset.devicesid + '&partyId=' + e.currentTarget.dataset.partyid,
      })
    } else {
      if (e.currentTarget.dataset.applystatus) {
        if (e.currentTarget.dataset.applystatus == "法务审批") {
          //法务审批
          str = '法务审批';
          wx.navigateTo({
            url: '../atifyDeatil/atifyDeatil?applyVerifyId=' + e.currentTarget.dataset.applyverifyid + '&applyId=' + e.currentTarget.dataset.applyid + '&title=法务审批',
          })
        } else {
          //重大事项审批
          str = '重大事项审批';
          wx.navigateTo({
            url: '../atifyDeatil/atifyDeatil?applyVerifyId=' + e.currentTarget.dataset.applyverifyid + '&applyId=' + e.currentTarget.dataset.applyid + '&title=重大事项审批',
          })
        }
      } else {
        if (e.currentTarget.dataset.applytype == "USED_APPLY") {
          //常规申请
          str = '常规申请';
          wx.navigateTo({
            url: '../atifyDeatil/atifyDeatil?applyVerifyId=' + e.currentTarget.dataset.applyverifyid + '&applyId=' + e.currentTarget.dataset.applyid + '&title=常规申请',
          })
        } else {
          //时段申请
          str = '时段申请';
          wx.navigateTo({
            url: '../atifyDeatil/atifyDeatil?applyVerifyId=' + e.currentTarget.dataset.applyverifyid + '&applyId=' + e.currentTarget.dataset.applyid + '&title=时段申请',
          })
        }
      }
    }
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
    this.loadData();

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