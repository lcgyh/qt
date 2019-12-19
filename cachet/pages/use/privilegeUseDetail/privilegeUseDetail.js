// pages/use/privilegeUseDetail/privilegeUseDetail.js
import {
  _globle
} from '../../../utils/globle.js'
import lwx from '../../../utils/lwx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {
      name: '柳依依',
      sealName: '财务章',
      type: "时段申请",
      number: "5",
      starTime: "2019-12-12 12:20",
      overTime: "2019-12-14 13:20",
      applyReason: "办公",
      applyInfo: ["../../../images/add_photo.jpg",]
    },
    items: [{
      name: '内部使用',
      value: 'inside'
    },
    {
      name: '外带使用',
      value: 'outside'
    },
    ],
    useType: '',
    outSideAddress: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //
  onUpload: function (e) {
    let that = this;
    if (e.currentTarget.dataset.index === 0) {
      lwx.chooseImage({
        count: 1,
        sourceType: ['album', 'camera']
      }).then(res => {
        if (!res.tempFilePaths[0]) {
          throw new Error('未选择图片')
        }
        wx.showLoading({
          title: '图片上传...',
          mask: true
        })
        return lwx.uploadFile({
          url: 'app/upload',
          imgFile: res.tempFilePaths[0],
        })
      }).then(res => {
        wx.hideLoading()
        that.data.detail.applyInfo.push(res);;
        that.setData({
          detail: that.data.detail
        })
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
      })
    } else {
      wx.previewImage({
        current: e.currentTarget.dataset.pic, // 当前显示图片的http链接
        urls: that.data.detail.applyInfo // 需要预览的图片http链接列表
      })
    }
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