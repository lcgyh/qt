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
    hiddenModal: true,
    textvalue: '',
    applyId: '',
    devicesId: '',
    title: '',
    items: [{
      name: '法务审批',
      value: 'useLegal',
      disabled: false
    },
    {
      name: '重大事项审批',
      value: 'useBigissues',
      disabled: false,
    },
    ],
    applyInfo: ["../../../images/add_photo.jpg"],
    useBigissues: 'N',
    useLegal: 'N',
    //法务
    iwLegalNames: [],
    //顺序
    processData: [],
    //重大事项
    bigissueg: [],
    //特批
    special: [],
    applyImageUrl:[],
    hechaImageUrl:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    var title = options.title;
    that.setData({
      title: options.title
    })
    wx.setNavigationBarTitle({
      title: title,
    })
    if (title == '待批准' || title == '已批准' || title == '已撤销') {
      that.setData({
        applyId: options.id,
      })
      that.loadDetail(options.id);
    } else if (title == '常规申请') {
      that.setData({
        applyId: options.applyId,
        applyVerifyId: options.applyVerifyId
      })
      that.loadData(options.applyId, options.applyVerifyId);
    } else if (title == '时段申请') {
      that.setData({
        applyId: options.applyId,
        applyVerifyId: options.applyVerifyId
      })
      that.loadData(options.applyId, options.applyVerifyId);
    } else if (title == '已拒绝') {
      that.setData({
        applyId: options.id,
      })
      that.loadJujueData(options.id);
    } else if (title == '待核查' || title == '已核查') {
      that.setData({
        devicesId: options.devicesId,
      })
      that.loadDaihechaData(options.devicesId, options.status);
    } else if (title == '法务审批') {
      var items = [{
        name: '重大事项审批',
        value: 'useBigissues',
        disabled: false,
      },]
      that.setData({
        applyId: options.applyId,
        applyVerifyId: options.applyVerifyId,
        items: items
      })
      that.loadData(options.applyId);
    } else if (title == '重大事项审批') {
      var items = []
      that.setData({
        applyId: options.applyId,
        applyVerifyId: options.applyVerifyId,
        items: items
      })
      that.loadData(options.applyId);
    }
  },
  // 重大事项审批勾选
  checkboxChange: function (e) {
    console.log(e)
    var useBigissues = 'N';
    var useLegal = 'N';
    for (var i = 0; i < e.detail.value.length; i++) {
      if (e.detail.value[i] == 'useBigissues') {
        useBigissues = 'Y';
      } else if (e.detail.value[i] == 'useLegal') {
        useLegal = 'Y';
      }
    }
    this.setData({
      useBigissues: useBigissues,
      useLegal: useLegal
    });
  },
  //同意
  agree: function () {
    var that = this;
    console.log('applyVerifyId=====' + that.data.applyVerifyId)
    // console.log(that.data.useLegal
    lwx.request({
      url: "verify.update",
      data: {
        applyVerifyId: that.data.applyVerifyId,
        verifyStatus: 'PASSED',
        useBigissues: that.data.useBigissues,
        useLegal: that.data.useLegal,
        partyId: _globle.user.partyId,
        companyId: _globle.user.companyId
      }
    }).then(res => {
      console.log(res)
      if (res.data.code == '0') {
        wx.showToast({
          title: '已同意',
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1,
          })
        }, 1000)
      } else {
        console.log('错误');
      }
    }).catch(err => {
      console.log('err' + err);
    })
  },
  //拒绝
  refuse: function () {
    var that = this;
    lwx.request({
      url: "verify.update",
      data: {
        applyVerifyId: that.data.applyVerifyId,
        verifyStatus: 'REJECT',
        useBigissues: '',
        useLegal: '',
        partyId: _globle.user.partyId,
        companyId: _globle.user.companyId
      }
    }).then(res => {
      console.log(res)
      if (res.data.code == '0') {
        wx.showToast({
          title: '已拒绝',
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1,
          })
        }, 1000)
      } else {
        console.log('错误');
      }
    }).catch(err => {
      console.log('err' + err);
    })
  },
  //法务审批决绝
  fawuRefuse: function () {
    var that = this;
    lwx.request({
      url: "egalStatus.update",
      data: {
        applyVerifyId: that.data.applyVerifyId,
        verifyStatus: 'REJECT',
        useBigissues: '',
        useLegal: '',
        partyId: _globle.user.partyId,
        companyId: _globle.user.companyId
      }
    }).then(res => {
      console.log(res)
      if (res.data.code == '0') {
        wx.showToast({
          title: '已拒绝',
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1,
          })
        }, 1000)
      } else {
        console.log('错误');
      }
    }).catch(err => {
      console.log('err' + err);
    })
  },
  // 法务审批同意
  fawuAgree: function () {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否移交给其他法务进行审批',
      confirmText: "是",
      cancelText: '否',
      success: res => {
        var legalStatus = '0'
        if (res.confirm) {
          legalStatus = '1';
        } else {
          legalStatus = '0';
        }
        lwx.request({
          url: "legalStatus.update",
          data: {
            applyVerifyId: that.data.applyVerifyId,
            verifyStatus: 'PASSED',
            useBigissues: that.data.useBigissues,
            legalStatus: legalStatus,
            partyId: _globle.user.partyId,
            companyId: _globle.user.companyId
          }
        }).then(res => {
          console.log(res)
          if (res.data.code == '0') {
            wx.showToast({
              title: '已同意',
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 1,
              })
            }, 1000)
          } else {
            console.log('错误');
          }
        }).catch(err => {
          console.log('err' + err);
        })
      }
    })
  },

  //重大事项拒绝
  zhongdaRefuse: function () {
    var that = this;
    lwx.request({
      url: "biguess.update",
      data: {
        applyVerifyId: that.data.applyVerifyId,
        verifyStatus: 'REJECT',
        partyId: _globle.user.partyId,
        companyId: _globle.user.companyId
      }
    }).then(res => {
      console.log(res)
      if (res.data.code == '0') {
        wx.showToast({
          title: '已拒绝',
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1,
          })
        }, 1000)
      } else {
        console.log('错误');
      }
    }).catch(err => {
      console.log('err' + err);
    })
  },
  // 重大事项同意
  zhongdaAgree: function () {
    var that = this;
    lwx.request({
      url: "biguess.update",
      data: {
        applyVerifyId: that.data.applyVerifyId,
        verifyStatus: 'PASSED',
        partyId: _globle.user.partyId,
        companyId: _globle.user.companyId
      }
    }).then(res => {
      console.log(res)
      if (res.data.code == '0') {
        wx.showToast({
          title: '已同意',
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1,
          })
        }, 1000)
      } else {
        console.log('错误');
      }
    }).catch(err => {
      console.log('err' + err);
    })
  },

  //待批准已批准已撤销
  loadDetail: function (applyId) {
    var that = this;
    lwx.request({
      url: "apply.finddetails.info",
      data: {
        applyId: applyId,
      }
    }).then(res => {
      if (res.data.code == '0') {
        var iwLegalNames = [];
        var processData = [];
        var special = [];
        var bigissueg = [];
        if (res.data.ilegal) {
          iwLegalNames = that.reloadPerson(res.data.ilegal);
        }
        if (res.data.sequence) {
          processData = that.reloadPerson(res.data.sequence);
        }
        if (res.data.special) {
          special = that.reloadPerson(res.data.special);
        }
        if (res.data.bigissueg) {
          bigissueg = that.reloadPerson(res.data.bigissueg);
        }
        that.setData({
          processData: processData,
          iwLegalNames: iwLegalNames,
          bigissueg: bigissueg,
          special: special,
          detail: res.data.applys,
          applyImageUrl: res.data.upfile.fileurl || []
        })
      } else {
        console.log('错误');
      }
    }).catch(err => {
      console.log('err' + err);
    })
  },
  //申请详情
  loadData: function (applyId, applyVerifyId) {
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
        var applyImageUrl = [];
        for (var i = 0; i < res.data.iapply.upfileDtos.length;i++){
          var dic = res.data.iapply.upfileDtos[i];
          applyImageUrl.push(dic.fileUrl)
        }
        console.log(applyImageUrl)
        that.setData({
          detail: res.data.iapply,
          applyImageUrl: applyImageUrl
        })
        if (res.data.iworkflow){
          that.reloadApplyPeson(res.data.iworkflow.settings);
        }
        if (res.data.iwLegal){
          that.reloadiwLegalPeson(res.data.iwLegal.name);
        }
      } else {
        console.log('错误');
      }
    }).catch(err => {
      console.log('err' + err);
    })
  },
  //已拒绝详情
  loadJujueData: function (applyId) {
    var that = this;
    lwx.request({
      url: "apply.find.info",
      data: {
        applyId: applyId,
      }
    }).then(res => {
      console.log(res)
      if (res.data.code == '0') {
        that.setData({
          detail: res.data.applys,
          applyImageUrl: res.data.upfile.fileurl || []
        })
      } else {
        console.log('错误');
      }
    }).catch(err => {
      console.log('err' + err);
    })
  },
  //待核查和已核查
  loadDaihechaData: function (devicesId, status) {
    var that = this;
    lwx.request({
      url: "apply.inspdetails.info",
      data: {
        devicesActId: devicesId,
        censorStatus: status,
      }
    }).then(res => {
      if (res.data.code == '0') {
        const hechaImageUrl = res.data.iApply.fileurl || []
        hechaImageUrl.unshift(that.data.applyInfo[0])
        that.setData({
          detail: res.data.devicesAct,
          applyImageUrl: res.data.upfile.fileurl,
          hechaImageUrl: hechaImageUrl
        })
      } else {
        console.log('错误');
      }
    }).catch(err => {
      console.log('err' + err);
    })
  },
  onUpload: function (e) {
    let that = this;
    console.log(e)
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
        var array = that.data.applyInfo;
        array.push(res);
        console.log(array);
        that.setData({
          applyInfo: array
        })
      }).catch(err => {
        applyInfo
        console.log(err)
        wx.hideLoading()
      })
    } else {
      var array = that.data.applyInfo;
      wx.previewImage({
        current: that.data.applyInfo[e.currentTarget.dataset.index], // 当前显示图片的http链接
        urls: array // 需要预览的图片http链接列表
      })
    }
  },
  // processData: [{
  //   name: '李大国',
  //   start: '#fff',
  //   end: '#EFF3F6',
  //   icon: 'red'
  // }],
  //待批准已批准已拒绝lodo状态
  reloadPerson: function (res) {
    var processData = [];
    for (var i = 0; i < res.length; i++) {
      if (res[i].verifyStatus == 'PASSED') {
        res[i].start = 'red';
        res[i].end = '#EFF3F6';
        res[i].icon = 'red';
      } else {
        res[i].start = '#EFF3F6';
        res[i].end = '#EFF3F6';
        res[i].icon = '#eff3f6';
      }
      if (i == res.length - 1) {
        res[i].end = '#fff'
      }
      if (i == 0) {
        res[i].start = '#fff'
      }
      var dic = {
        name: res[i].name,
        start: res[i].start,
        end: res[i].end,
        icon: res[i].icon
      }
      processData.push(dic)
    }
    console.log('processData' + processData)
    return processData;
    // this.setData({
    //   processData: processData
    // })
  },
  reloadApplyPeson: function (res) {
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
      }
      if (i == res.length - 1) {
        res[i].person.end = '#fff'
      }
      if (i == 0) {
        res[i].person.start = '#fff'
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
  // 法务审批列表
  reloadiwLegalPeson: function (res) {
    var iwLegalNames = [];
    for (var i = 0; i < res.length; i++) {
      var dic = {};
      dic.start = 'red';
      dic.end = 'red';
      dic.icon = 'red';
      if (i == res.length - 1) {
        dic.end = '#fff'
      }
      if (i == 0) {
        dic.start = '#fff'
      }
      dic.name = res[i];
      iwLegalNames.push(dic)
    }
    this.setData({
      iwLegalNames: iwLegalNames
    })
  },


  apply: function () {
    this.setData({
      hiddenModal: false
    })
  },
  //撤销理由
  input: function (e) {
    this.setData({
      textvalue: e.detail.value
    })
  },
  modalcancel: function () {
    this.setData({
      hiddenModal: true,
      textvalue: ''
    })
  },
  //确定撤销
  modalconfirm: function () {
    var that = this;
    lwx.request({
      url: "apply.type.update",
      data: {
        applyId: this.data.applyId,
        applyStatus: 'RETRACT',
        verifyResult: that.data.textvalue
      }
    }).then(res => {
      if (res.data.code == '0') {
        wx.showToast({
          title: '撤销成功',
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1,
          })
        }, 1000)
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
  // 保存
  save: function () {
    const _this = this
    const applyInfo = this.data.applyInfo || []
    console.log('applyInfo', applyInfo)
    const iupfile = []
    for (var i = 0; i < applyInfo.length; i++) {
      if (i != 0) {
        iupfile.push({
          fileUrl: applyInfo[i],
          fileType: 'jpeg'
        })
      }
    }
    console.log('iupfile--', iupfile)
    const data = {
      applyId: _this.data.detail.applyId,
      iupfile: iupfile
    }

    lwx.request({
      url: "upfile.save",
      data: data
    }).then(res => {
      console.log(res)
      if (res.data.code == '0') {
        wx.showToast({
          title: '提交成功',
          icon: 'none',
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1,
          })
        }, 1000)
      } else {
        console.log('错误');
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