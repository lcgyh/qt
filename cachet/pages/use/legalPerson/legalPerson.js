// pages/use/legalPerson/legalPerson.js
import {
  _globle
} from '../../../utils/globle.js'
import lwx from '../../../utils/lwx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    index: 0,
    inputShowed: true,
    inputVal: "",
    cellArray: [{
      name: '王妃撒的谎',
      department: '技术部'
    }, {
      name: '王妃',
      department: '技术部'
    }, {
      name: '王妃',
      department: '技术部'
    },]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      search: this.search.bind(this)
    })
  },
  search: function (value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(resolve)
      }, 200)
    })
  },
  selectResult: function (e) {
    console.log('select result', e.detail)
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  deletePerson: function (e) {
    console.log(e)
    var that = this;
    wx.showModal({
      title: '提示',
      content: '删除后此人将不能进行设备安装，是否确定删除',
      confirmText: "是",
      success: res => {
        if (res.confirm) {
          console.log('删除了1')
          that.data.cellArray.splice(0, 1);
          that.setData({
            cellArray: that.data.cellArray
          })
        } else {
          console.log('取消了')
        }
      }
    })
  },
  checkDetail: function (e) {
    wx.navigateTo({
      url: '../legalPersonDetail/legalPersonDetail',
    })
  },
  add: function (e) {
    wx.navigateTo({
      url: '../addLegalPerson/addLegalPerson',
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