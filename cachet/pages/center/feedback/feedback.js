// pages/center/feedback/feedback.js
import lwx from '../../../utils/lwx.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    feebackText: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  //意见反馈提交
  feedbackSubmit: function () {
    const _this = this
    // console.log(_this.data.feebackText)
    // // var data = {
    // //   partyId: 'false'
    // // };
    const data = {
      verifyResult: _this.data.feebackText
    }
    lwx.request({
      url: "app.feedback.save",
      data: data,
    }).then(res => {
      wx.hideLoading()
      if (res.data.code == '0') {
        wx.showModal({
          title: '提示',
          content: '操作成功',
          confirmText: "好",
          showCancel: false,
          success: res => {
            wx.switchTab({
              url: '/pages/homePage/homePage/homePage'
            })
          }
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
  },
  textareaChange: function (e) {
    const _this = this
    const feebackText = e.detail.value
    _this.setData({
      feebackText: feebackText
    })
  }
})