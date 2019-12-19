// pages/use/privilegePersonDetail/privilegePersonDetail.js
import lwx from '../../../utils/lwx.js'
import {
  _globle
} from '../../../utils/globle.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    privilegedPeopleId: null,
    privilegedPeople: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const type = options.type
    if (options.privilegedPeopleId) {
      this.getPeopleInfo(options.privilegedPeopleId)
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

  },
  //特权人员查询
  getPeopleInfo: function (id) {
    const _this = this
    lwx.request({
      url: 'privilegedpeople.find',
      data: {
        privilegedPeopleId: id
      }
    }).then(res => {
      const resData = res.data || {}
      if (resData.code == '0') {
        _this.setData({
          privilegedPeopleId: id,
          privilegedPeople: resData.privilegedPeople || {}
        })
      } else {

      }
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: '加载数据失败',
        mask: true,
        icon: 'none'
      })
    })
  },


  //删除特权人
  deletePerson: function (e) {
    console.log(e)
    var that = this;
    wx.showModal({
      title: '删除后此人不能在使用特权进行用章',
      content: '确定删除？',
      confirmText: "是",
      success: res => {
        if (res.confirm) {
          that.deletePeople()
        } else {
          console.log('取消了')
        }
      }
    })
  },
  deletePeople: function () {
    const _this = this
    const privilegedPeopleId = _this.data.privilegedPeopleId
    lwx.request({
      url: 'installpeople.delete',
      data: {
        privilegedPeopleId: privilegedPeopleId
      }
    }).then(res => {
      const resData = res.data || {}
      if (resData.code == '0') {
        wx.showToast({
          title: '删除成功',
          mask: true,
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: resData.code,
          mask: true,
          icon: 'none'
        })
      }
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: '加载数据失败',
        mask: true,
        icon: 'none'
      })
    })
  },




  //解冻
  lockPerson: function (e) {
    console.log(e)
    const that = this;
    const status = e.currentTarget.dataset.status
    const text = status == 'FREEZE' ? '冻结' : '解冻'

    wx.showModal({
      title: '',
      content: `确定${text}`,
      confirmText: "是",
      success: res => {
        if (res.confirm) {
          if (status == 'FREEZE') {
            that.lockPersonUpdate('UNFREEZE')
          } else {
            that.lockPersonUpdate('FREEZE')
          }
        } else {
          console.log('取消了')
        }
      }
    })
  },

  lockPersonUpdate: function (privilegedStatus) {
    const _this = this
    const privilegedPeopleId = _this.data.privilegedPeopleId
    lwx.request({
      url: 'privilegedpeople.status.update',
      data: {
        privilegedPeopleId: privilegedPeopleId,
        privilegedStatus: privilegedStatus
      }
    }).then(res => {
      const resData = res.data || {}
      if (resData.code == '0') {
        wx.showToast({
          title: '操作成功',
          mask: true,
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: resData.code,
          mask: true,
          icon: 'none'
        })
      }
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: '加载数据失败',
        mask: true,
        icon: 'none'
      })
    })
  },

})