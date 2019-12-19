// pages/use/addNewInstall/addNewInstall.js
import lwx from '../../../utils/lwx.js'
import {
  _globle
} from '../../../utils/globle.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    organization: '选择部门',
    index: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadData();
  },
  loadData: function() {
    var that = this;
    lwx.request({
      url: "organization.list",
    }).then(res => {
      console.log(res)
      if (res.data.code == '0') {
        that.setData({
          array: res.data.organizations
        })
      } else {
        console.log('错误');
      }
    }).catch(err => {
      console.log('err' + err);
    })
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      organization: e.detail.value,
      index: e.detail.value,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  // organization.list
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