// pages/center/register/register.js
import lwx from '../../../utils/lwx.js'
import {
  _globle
} from '../../../utils/globle.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSelect: false,
    array: ['选择部门', '销售', '财务', '技术', '后勤'],
    index: 0,
    registerSelect: '0',
    items: [{
        name: '男',
        value: 'MALE'
      },
      {
        name: '女',
        value: 'UNKNOWN'
      },
    ],
    idcardFront: "../../../images/add_photo.jpg",
    idcardBack: "../../../images/add_photo.jpg",
    businessLicence: '../../../images/add_photo.jpg',
    user: {
      legalPerson: '',
      idcard: '',
      idcardFront: '',
      idcardBack: '',
      userLoginId: '',
      passWord: '',
      passWordCode: '',
      gender: ''
    },
    companty: {
      companyName: '',
      creditCode: '',
      businessLicenseUrl: '',
      businessTermStart: '',
      businessTermEnd: '',
      businessScope: '',
      legalPerson: '',
      idcard: '',
      idcardFront: '',
      idcardBack: '',
      userLoginId: '',
      passWord: '',
      passWordCode: '',
      provinceId: '',
      cityId: '',
      areaId: '',
      inviteNumber: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  onUpload: function(e) {
    console.log(e)
    let that = this;
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
      // console.log('上传玩了', res)
      if (e.currentTarget.dataset.idcard == 'front') {
        that.data.user.idcardFront = res;
        that.data.companty.idcardFront = res;
        that.setData({
          idcardFront: res,
          user: that.data.user,
          companty: that.data.companty,
        })
      } else if (e.currentTarget.dataset.idcard == 'businessLicenseUrl') {
        that.data.companty.businessLicenseUrl = res;
        that.setData({
          businessLicence: res,
          user: that.data.user,
          companty: that.data.companty
        })
      } else {
        that.data.user.idcardBack = res;
        that.data.companty.idcardBack = res;
        that.setData({
          idcardBack: res,
          user: that.data.user,
          companty: that.data.companty
        })
      }
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  //性别选择
  checkboxChange: function(e) {
    this.data.user.gender = e.detail.value;
    this.setData({
      user: this.data.user
    })
  },

  selectArea: function(e) {
    this.parent();
    console.log('picker发送选择改变，携带值为', e.detail.value)
  },

  selectOpenTime(e) {},

  //个人名字
  usernameInput: function(e) {
    this.data.user.legalPerson = e.detail.value;
    this.setData({
      user: this.data.user
    })
  },
  //个人身份证号
  idcardInput: function(e) {
    this.data.user.idcard = e.detail.value;
    this.data.companty.idcard = e.detail.value;
    this.setData({
      user: this.data.user,
      companty: this.data.companty
    })
  },
  //登录账号
  userLoginIdInput: function(e) {
    this.data.user.userLoginId = e.detail.value;
    this.setData({
      user: this.data.user
    })
  },
  //密码
  passWordInput: function(e) {
    this.data.user.passWord = e.detail.value;
    this.data.companty.passWord = e.detail.value;
    this.setData({
      user: this.data.user,
      companty: this.data.companty
    })
  },
  //确认密码
  passWordCodeInput: function(e) {
    this.data.user.passWordCode = e.detail.value;
    this.data.companty.passWordCode = e.detail.value;
    this.setData({
      user: this.data.user,
      companty: this.data.companty
    })
  },
  //选择个人账户
  selectPersonal: function() {
    this.setData({
      isSelect: true,
      registerSelect: '2'
    })
  },
  //选择公司账户
  selectCompanty: function() {
    this.setData({
      isSelect: true,
      registerSelect: '1'
    })
  },

  ////////////////////公司数据
  //公司名字
  companyNameInput: function(e) {
    this.data.companty.companyName = e.detail.value;
    this.setData({
      user: this.data.companty
    })
  },
  //信用代码
  creditCodeInput: function(e) {
    this.data.companty.creditCode = e.detail.value;
    this.setData({
      user: this.data.companty
    })
  },
  //经营范围
  businessScopeInput: function(e) {
    this.data.companty.businessScope = e.detail.value;
    this.setData({
      user: this.data.companty
    })
  },
  //法人姓名
  legalPersonInput: function(e) {
    this.data.companty.legalPerson = e.detail.value;
    this.setData({
      user: this.data.companty
    })
  },

  //邀请码
  inviteNumberInput: function(e) {
    this.data.companty.inviteNumber = e.detail.value;
    this.setData({
      user: this.data.companty
    })
  },


  //公司用户提交注册
  submitCompanty: function() {
    console.log(this.data.companty)
  },

  //个人用户提交注册
  submitUser: function() {
    console.log(this.data.user)
    var that = this;
    wx.request({
      url: _globle.unLoginUrl + 'user/register.htm',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        legalPerson: that.data.user.legalPerson,
        idcard: that.data.user.idcard,
        idcardFront: that.data.user.idcardFront,
        idcardBack: that.data.user.idcardBack,
        userLoginId: that.data.user.userLoginId,
        passWord: that.data.user.passWord,
        passWordCode: that.data.user.passWordCode,
        gender: that.data.user.gender,
      },
      success: res => {
        if (res.data.code == '0') {
          wx.showModal({
            title: '提示',
            content: "注册成功",
            confirmText: "去登录",
            showCancel: false,
            success: res => {
              wx.navigateBack({})
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.message,
            confirmText: "好",
            showCancel: false,
            success: res => {}
          })
        }
      },
      fail: err => {
        console.log(err)
        throw err;
      }
    })
  },

  parent:function(){
    wx.request({
      url: _globle.unLoginUrl + 'index/geo.htm',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        parentId:'100000'
      },
      success: res => {
        if (res.data.code == '0') {
    
        } else {
         
        }
      },
      fail: err => {
        console.log(err)
        throw err;
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

  }
})