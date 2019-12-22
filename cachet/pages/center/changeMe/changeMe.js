// pages/center/changeMe/changeMe.js
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
    registerSelect: '2',
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
      businessLicenseUrl: '',
      userLoginId: '',
      passWord: '',
      passWordCode: '',
      gender: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('_globle.user', _globle.user)
    this.setData({
      user: _globle.user
    })
  },
  onUpload: function(e) {
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
        that.setData({
          idcardFront: res,
          user: that.data.user
        })
      } else if (e.currentTarget.dataset.idcard == 'businessLicenseUrl') {
        that.data.user.businessLicenseUrl = res;
        that.setData({
          businessLicence: res,
          user: that.data.user
        })
      } else {
        that.data.user.idcardBack = res;
        that.setData({
          idcardBack: res,
          user: that.data.user
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
    console.log('picker发送选择改变，携带值为', e.detail.value)
  },

  selectOpenTime(e) {},

  //个人名字
  legalPersonInput: function(e) {
    this.data.user.legalPerson = e.detail.value;
    this.setData({
      user: this.data.user
    })
  },
  //个人身份证号
  idcardInput: function(e) {
    this.data.user.idcard = e.detail.value;
    this.setData({
      user: this.data.user
    })
  },


  //个人用户提交注册
  submitUser: function() {

  
    // wx.request({
    //   url: _globle.unLoginUrl + 'user/register.htm',
    //   method: 'POST',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   data: {
    //     legalPerson: "王老",
    //     idcard: "2181230192398172548",
    //     idcardFront: "http://127.0.0.1:23278/images/add_photo.jpg",
    //     idcardBack: "http://127.0.0.1:23278/images/add_photo.jpg",
    //     userLoginId: "1888881234",
    //     passWord: "1111",
    //     passWordCode: "1111",
    //     gender: "MALE"
    //   },
    //   success: res => {
    //     if (res.data.code == '0') {
    //       wx.showModal({
    //         title: '提示',
    //         content: "注册成功",
    //         confirmText: "好",
    //         showCancel: false,
    //         success: res => {}
    //       })
    //     } else {
    //       wx.showModal({
    //         title: '提示',
    //         content: res.data.message,
    //         confirmText: "好",
    //         showCancel: false,
    //         success: res => {}
    //       })
    //     }
    //   },
    //   fail: err => {
    //     console.log(err)
    //     throw err;
    //   }
    // })
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