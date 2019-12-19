// pages/use/legalPersonDetail/legalPersonDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  deletePerson: function (e) {
    console.log(e)
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定删除？',
      confirmText: "是",
      success: res => {
        if (res.confirm) {
          console.log('删除了1')
          that.setData({
          })
        } else {
          console.log('取消了')
        }
      }
    })
  },

  lockPerson: function (e) {
    console.log(e)
    var that = this;
    wx.showModal({
      title: '冻结后该人员依旧存在于该列表，但是不能再进行法务审批',
      content: '确定冻结？',
      confirmText: "是",
      success: res => {
        if (res.confirm) {
          that.setData({
          })
        } else {
          console.log('取消了')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  }
})