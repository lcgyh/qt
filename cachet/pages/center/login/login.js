import {
  _globle
} from '../../../utils/globle.js'
import {
  getOpenId,
  userLogin,
} from '../../../utils/userUtil.js'
import lwx from '../../../utils/lwx.js'
const app = getApp();
var util = require('../../../utils/util.js')
Page({
  data: {
    udid: '',
    session_key: '',
    out_time: 'none',
    counting: false,
    timeCountDownTop: '获取验证码',
    isdisables: false
  },
  onLoad: function (options) {
    // console.log(options.backUrl, options.backUrl === 'undefined')
    // if (options.backUrl && options.backUrl !== 'undefined') {
    //   this.backUrl = options.backUrl;
    // }
    if (!options) {
      this.setData({
        out_time: option.type
      })
      this.out_time = option.type
    }
  },
  bintusername: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  bintSmscode: function (e) {
    this.setData({
      smsCode: e.detail.value
    })
  },

  userNameInputEnd: function (e) {
    console.log(e)
    this._userName = e.detail.value

    if (!this._userName) {
      return;
    }
  },
  generateVerifyCode: function () {
    if (this._userName == '' || !this._userName) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
    } else if (!(/^1[34578]\d{9}$/.test(this._userName))) {
      wx.showToast({
        title: '手机号错误',
        icon: 'none'
      })
    } else {
      if (this.data.timeCountDown) {
        return;
      }
      wx.request({
        url: _globle.unLoginUrl + 'smsCode.htm',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          phone: this._userName,
        },
        success: res => {
          if (res.data.code == '0') {
            this.setData({
              timeCount: 60,
              timeCountDown: true
            })
            this._timeCounter = setInterval(() => {
              console.log(this.data.timeCount)
              if (this.data.timeCount > 1) {
                this.setData({
                  timeCount: --this.data.timeCount
                })
              } else {
                clearInterval(this._timeCounter)
                this.setData({
                  timeCount: --this.data.timeCount,
                  timeCountDown: false
                })
              }
            }, 1000)
          } else {
            wx.showModal({
              title: '提示',
              content: '不要频繁操作',
              confirmText: "好",
              showCancel: false,
              success: res => { }
            })
          }
        },
        fail: err => {
          console.log(err)
          throw err;
        }
      })
    }
  },
  onUnload: function () {
    clearInterval(this._timeCounter)
  },
  formSubmit: function (e) {
    console.log(e)
    let phone = e.detail.value.username
    let passwords = e.detail.value.password
    let smsCode = e.detail.value.smsCode
    if (!phone || phone == '') {
      wx.showToast({
        title: '用户名或者密码不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      wx.showToast({
        title: '用户名输入错误',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    wx.showLoading({
      title: '用户登录...',
      mask: true
    })
    new Promise((resoval, reject) => {
      getOpenId(res => {
        _globle.user.openId = res.openId;
        _globle.user.unionId = res.unionId || '';
        resoval();
      })
    }).then(res => {
      wx.request({
        url: _globle.unLoginUrl + 'app/login.htm',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: {
          username: phone,
          openId: _globle.user.openId,
          unionId: _globle.user.unionId,
          // openSms: smsCode,
          openSms: 'false'
        },
        success: res => {
          wx.hideLoading()
          if (res.data.code == '0') {
            wx.removeStorageSync('sessionid');
            wx.setStorageSync("sessionid", res.data.sessionId);
            _globle.user = res.data.party.person
            _globle.user.isLogin = true;
            wx.switchTab({
              url: '/pages/homePage/homePage/homePage'
            })
          } else {
            wx.showModal({
              title: '提示',
              content: res.data.message,
              confirmText: "好",
              showCancel: false,
              success: res => { }
            })
          }
        },
        fail: err => {
          console.log(err)
          throw err;
        }
      })


      // var data = {
      //   username: phone,
      //   openId: _globle.user.openId,
      //   unionId: _globle.user.unionId,
      //   openSms: smsCode,
      //   openSms: 'false'
      // };
      // lwx.request({
      //   url: "user.login",
      //   data: data,
      // }).then(res => {
      //   wx.hideLoading()
      //   if (res.data.code == '0') {
      //     console.log("登录成功")
      //     _globle.user.isLogin = true;
      //     wx.switchTab({
      //       url: '/pages/homePage/homePage/homePage'
      //     })
      //   } else {
      //     wx.showToast({
      //       title: res.data.message,
      //       icon: 'none',
      //       duration: 2000
      //     })
      //     return;
      //   }
      // }).catch(err => {
      //   wx.showToast({
      //     title: err,
      //     icon: 'none',
      //     duration: 2000
      //   })
      //   return;
      //   wx.hideLoading()
      // })
    })
  }
})