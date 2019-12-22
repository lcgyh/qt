import {
  _globle
} from '../../../utils/globle.js'
import lwx from '../../../utils/lwx.js'
const date = new Date()
const years = []
const months = []
const days = []
const hours = []
for (let i = 1990; i <= date.getFullYear() + 1; i++) {
  years.push(i)
}
for (let i = 1; i <= 12; i++) {
  months.push(i)
}
for (let i = 1; i <= 31; i++) {
  days.push(i)
}
for (let i = 1; i <= 24; i++) {
  hours.push(i)
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sealid: '',
    name: '',
    sealName: '请选择印章',
    type: "USED_APPLY",
    typeStr: "常规申请",
    times: '',
    starTime: "",
    overTime: "",
    selectStart: '',
    cause: "",
    applyInfo: "../../../images/add_photo.jpg",
    items: [{
        name: '内部使用',
        value: 1
      },
      {
        name: '外带使用',
        value: 2
      },
    ],
    periodType: 1,
    outSideAddress: '',
    isSelect: false,
    isOutSide: false,
    //  时间选择
    years: years,
    year: date.getFullYear(),
    startyear: date.getFullYear(),
    overyear: date.getFullYear(),
    months: months,
    month: 1,
    startmonth: 1,
    overmonth: 1,
    days: days,
    day: 1,
    startday: 1,
    overday: 1,
    hours: hours,
    hour: 1,
    starthour: 1,
    overhour: 1,
    value: [9999, 1, 1],
    isShowPicker: false,
    useSpecial:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      name: _globle.user.name
    })
  },
  selectSeal: function() {
    wx.navigateTo({
      url: '../sealList/sealList',
    })
  },

  //提交
  save: function() {
    var that = this;
    var applyInfo = that.data.applyInfo;
    if (applyInfo == '../../../images/add_photo.jpg'){
      applyInfo == ''
    }
    var data = {
      companyId: _globle.user.companyId,
      partyId: _globle.user.partyId,
      sealId: that.data.sealid,
      times: that.data.times,
      type: that.data.type,
      takeStartTime: that.data.startyear + '-' + that.data.startmonth + '-' + that.data.startday + '-' + that.data.starthour + ':00',
      takeEndTime: that.data.overyear + '-' + that.data.overmonth + '-' + that.data.overday + '-' + that.data.overhour + ':00',
      periodType: that.data.periodType,
      voucherUrls:[applyInfo],
      cause: that.data.cause,
      take_destination: that.data.outSideAddress,
      useSpecial: that.data.useSpecial
    }
    lwx.request({
      url: 'apply.save',
      data: data
    }).then(res => {
      console.log(res.data)
      if (res.data.code == '0') {
        wx.showToast({
          title: '提交成功',
          icon: 'none',  
        })
       wx.navigateBack({
       })
      } else {
        wx.showToast({
          title: res.data.message,
          mask: true,
          icon: 'none'
        })
      }
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      wx.showToast({
        title: '加载数据失败',
        mask: true,
        icon: 'none'
      })
    })
  },
  times: function(e) {
    this.setData({
      times: e.detail.value
    })
  },
  cause: function(e) {
    this.setData({
      cause: e.detail.value
    })
  },
  onUpload: function(e) {
    let that = this;
    // if (e.currentTarget.dataset.index === 0) {
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
      that.setData({
        applyInfo: res
      })
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
    // } 
    // else {
    //   var array = [that.data.applyInfo];
    //   wx.previewImage({
    //     current: that.data.applyInfo, // 当前显示图片的http链接
    //     urls: array // 需要预览的图片http链接列表
    //   })
    // }
  },
  changeType: function() {
    var isSelect = !this.data.isSelect;
    var typeStr = isSelect ? '时段申请' : '常规申请';
    var type = isSelect ? 'TIME_APPLY' : 'USED_APPLY';
    if (!isSelect) {
      this.data.isOutSide = false;
    }
    this.setData({
      type: type,
      typeStr: typeStr,
      isSelect: isSelect,
      isOutSide: this.data.isOutSide
    })
  },
  checkboxChange: function(e) {
    // this.data.useType = e.detail.value;
    var isOutSide = false;
    if (e.detail.value == '1') {
      var isOutSide = true;
    } else {
      this.data.outSideAddress = '';
    }
    this.setData({
      outSideAddress: this.data.outSideAddress,
      isOutSide: isOutSide,
      periodType: e.detail.value
    })
  },
  outSideAddress: function(e) {
    this.setData({
      outSideAddress: e.detail.value,
      
    })
  },
  bindChange: function(e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
      hour: this.data.hours[val[3]]
    })
  },
  changeStartTime: function(e) {
    var str = e.currentTarget.dataset.start;
    console.log(str)
    this.setData({
      isShowPicker: true,
      selectStart: str
    })
  },
  removeDateSelectView: function() {
    this.setData({
      isShowPicker: false
    })
  },
  makerSureTime: function() {

    if (this.data.selectStart == 'start') {
      this.setData({
        isShowPicker: false,
        startyear: this.data.year,
        startmonth: this.data.month,
        startday: this.data.day,
        starthour: this.data.hour
      })
    } else {
      this.setData({
        isShowPicker: false,
        overyear: this.data.year,
        overmonth: this.data.month,
        overday: this.data.day,
        overhour: this.data.hour
      })
    }
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
    var that = this;
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1]; //当前页
    if (currPage.data.sealid) {
      that.setData({
        sealid: currPage.data.sealid,
        sealName: currPage.data.sealName
      })
    }
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