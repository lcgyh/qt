// pages/device/atifyDeatil/atifyDeatil.js
import lwx from '../../../utils/lwx.js'
import {
  _globle
} from '../../../utils/globle.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    processData: [{
        name: '李大国',
        start: '#fff',
        end: '#EFF3F6',
        icon: 'red'
      },
      {
        name: '已接单',
        start: '#EFF3F6',
        end: '#EFF3F6',
        icon: '#eff3f6'
      },
      {
        name: '开始维哈',
        start: '#EFF3F6',
        end: '#EFF3F6',
        icon: '#eff3f6'
      },
      {
        name: '维修结束',
        start: '#EFF3F6',
        end: '#EFF3F6',
        icon: '#eff3f6'
      },
      {
        name: '已确认',
        start: '#EFF3F6',
        end: '#EFF3F6',
        icon: '#eff3f6'
      }, {
        name: '已确认',
        start: '#EFF3F6',
        end: 'red',
        icon: '#eff3f6'
      }
    ],
    hiddenModal: true,
    textvalue: '',
    applyid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var that = this;
    var title = options.title;
    if (title == '待批准') {
      wx.setNavigationBarTitle({
        title: options.title,
        applyid: options.applyId,
        applyVerifyId: options.applyVerifyId
      })
    } else if (title == '常规申请') {
      wx.setNavigationBarTitle({
        title: title,
        applyid: options.applyId,
        applyVerifyId: options.applyVerifyId
      })
      that.loadData(options.applyId, options.applyVerifyId);
    }
  },
  loadData: function(applyId, applyVerifyId) {
    var that = this;
    lwx.request({
      url: "verify.info",
      data: {
        applyId: applyId,
        applyVerifyId: applyVerifyId,
      }
    }).then(res => {
      console.log(res)
      if (res.data.code == '0') {
        that.setData({
          detail: res.data.iapply,
        })
        that.reloadApplyPeson(res.data.iworkflow.settings);
      } else {
        console.log('错误');
      }
    }).catch(err => {
      console.log('err' + err);
    })
  },
  // processData: [{
  //   name: '李大国',
  //   start: '#fff',
  //   end: '#EFF3F6',
  //   icon: 'red'
  // }],
  reloadApplyPeson: function(res) {
    console.log('res' + res)
    var processData = [];
    for (var i = 0; i < res.length; i++) {
      if (res[i].verifyStatus) {
        res[i].person.start = '#fff';
        res[i].person.end = '#EFF3F6';
        res[i].person.icon = 'red';
      } else {
        res[i].person.start = '#EFF3F6';
        res[i].person.end = '#EFF3F6';
        res[i].person.icon = '#eff3f6';
        if (i == res.length - 1) {
          res[i].person.end = '#fff'
        }
      }
      var dic = {
        name: res[i].person.name,
        start: res[i].person.start,
        end: res[i].person.end,
        icon: res[i].person.icon
      }
      processData.push(dic)
    }
    this.setData({
      processData: processData
    })

  },
  apply: function() {
    this.setData({
      hiddenModal: false
    })
  },
  //撤销理由
  input: function(e) {
    this.setData({
      textvalue: e.detail.value
    })
  },
  modalcancel: function() {
    this.setData({
      hiddenModal: true,
      textvalue: ''
    })
  },
  //确定撤销
  modalconfirm: function() {
    var that = this;
    lwx.request({
      url: "apply.type.update",
      data: {
        applyId: '',
        applyType: 'RETRACT',
        verifyResult: that.data.textvalue
      }
    }).then(res => {
      if (res.data.code == '0') {
        wx.showToast({
          title: '撤销成功',
        })
        wx.navigateBack({})
      } else {
        console.log('错误');
      }
    }).catch(err => {
      console.log('err' + err);
    })

    this.setData({
      hiddenModal: true
    })
  },

  zoomPic: function(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.pic, // 当前显示图片的http链接
      urls: this.data.detail.applyInfo // 需要预览的图片http链接列表
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