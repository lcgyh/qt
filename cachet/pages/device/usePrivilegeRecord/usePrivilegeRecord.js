// pages/device/usePrivilegeRecord/usePrivilegeRecord.js
import {
  _globle
} from '../../../utils/globle.js'
import lwx from '../../../utils/lwx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ["常规申请", "时段申请", "重大事项审批", "法务审批", "法务审批", "重装"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadList();
  },
loadList:function(){
  lwx.request({
    url: "privileged.list",
    data:{
      partyId: _globle.user.partyId,
      companyId: _globle.user.companyId,
    }
  }).then(res => {
    if (res.data.code == '0') {
      console.log(res)
  
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