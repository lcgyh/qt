// pages/device/sealDetail/sealDetail.js
import lwx from '../../../utils/lwx.js'
import {
  _globle
} from '../../../utils/globle.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: [{
        name: '待使用记录',
        selected: true,
        color: 'red'
      },
      {
        name: '印章详情',
        selected: false
      }
    ],
    selectIndex: 0,
    devicesList: [],
    detail: {},
    sealid: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      sealid: options.sealid
    })
    this.loadData();
    this.loadList();
  },
  loadList: function() {
    var that = this;
    lwx.request({
      url: "deviceAct.list",
      data: {
        sealId: that.data.sealid
      }
    }).then(res => {
      console.log(res)
      if (res.data.code == '0') {
        that.setData({
          devicesList: res.data.sealDeviceActs
        })
      } else {
        wx.showToast({
          title: res.data.message,
        })
      }
    }).catch(err => {
      console.log('err' + err);
    })
    let devicesList = []
    this.setData({
      devicesList: devicesList,
    })
  },
  loadData: function() {
    var that = this;
    lwx.request({
      url: "devices.info",
      data: {
        sealId: that.data.sealid
      }
    }).then(res => {

      if (res.data.code == '0') {
        const resData = res.data || {}
        const seal = resData.seal || {}
        const sealPrivileges = seal.sealPrivileges || []
        const workflowTypes = seal.workflowTypes || []
        const sealPrivilegesArr = sealPrivileges.map((item)=>{
          return item.name
        })
        const workflowTypesArr = workflowTypes.map((item) => {
          return item.workflowTypeStr
        })
        seal.sealPrivilegesStr = sealPrivilegesArr.join("/")
        seal.workflowTypesStr = workflowTypesArr.join("/")
        that.setData({
          detail: seal
        })
      } else {
        wx.showToast({
          title: res.data.message,
        })
      }
    }).catch(err => {
      console.log('err' + err);
    })
  },
  select: function(e) {
    var navbar = this.data.navbar;
    for (var i = 0; i < navbar.length; i++) {
      if (i == e.currentTarget.dataset.index) {
        navbar[i].color = 'red';
        navbar[i].borderColor = '#999';
      } else {
        navbar[i].color = '#999';
        navbar[i].borderColor = '#f7f7f7';
      }
    }
    this.setData({
      navbar: navbar,
      selectIndex: e.currentTarget.dataset.index
    })
  },
  //申请重装
  applyRestart: function() {
    wx: wx.navigateTo({
      url: '../applyRestartDevice/applyRestartDevice',
    })
  },
  sealDetail: function(e) {
    // e.currentTarget.dataset.sealid
    wx.navigateTo({
      url: '../applySealDetail/applySealDetail',
    })
  },
  disable: function(e) {
    var message = '冻结之后该印章将不能使用，确定冻结？';
    if (e.currentTarget.dataset.disable == 'ENABLE') {
      var message = '解结之后该印章将继续使用，确定解结？';
    }
    wx.showModal({
      title: message,
      confirmText: "确定",
      success: res => {
        if (res.confirm) {
          var that = this;
          lwx.request({
            url: "seal.disable",
            data: {
              sealId: that.data.sealid,
              sealStatus: e.currentTarget.dataset.disable
            }
          }).then(res => {
            console.log(res)
            if (res.data.code == '0') {
              wx.showToast({
                title: res.data.message,
                icon: 'none',
              })
              that.loadData();
            } else {
              wx.showToast({
                title: res.data.message,
                icon: 'none',
              })
            }
          }).catch(err => {
            console.log('err' + err);
          })
        } else {

        }
      }
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

  },

  // 锁定状态变更
  lockStateUpdate:function(e){
    console.log(e)
  }
})
