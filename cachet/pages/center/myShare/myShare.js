// pages/center/myShare/myShare.js
import lwx from '../../../utils/lwx.js'
import { _globle } from '../../../utils/globle.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    invitationCode:null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  copyTBL: function (e) {
    var self = this;
    wx.setClipboardData({
      data: self.data.invitationCode,
      success: function (res) {
        wx.showToast({
          title: '复制成功可以粘贴发送给他人',
          mask: true,
          icon: 'none'
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getInvitationCode()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //获取邀请码
  getInvitationCode: function () {
    const _this =this
    lwx.request({
      url: "invitation.info",
      data: {},
    }).then(res => {
      wx.hideLoading()
      if (res.data.code == '0') {
        const invitations = res.data.invitations
        const invitationCode = invitations.invitationCode
        this.setData({
          invitationCode: invitationCode
        })
      } else {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 2000
        })
        return;
      }
    }).catch(err => {
      wx.showToast({
        title: err,
        icon: 'none',
        duration: 2000
      })
      wx.hideLoading()
      return;
    })
  }
})