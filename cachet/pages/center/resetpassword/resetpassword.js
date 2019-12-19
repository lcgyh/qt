import lwx from '../../../utils/lwx.js'

Page({
  data: {

  },
  bintusername: function (e) {
    this.setData({
      username: e.detail.value,
      timeCountDown: false,
      timeCount: 0
    })
    this._userName = e.detail.value
  },
  generateVerifyCode: function () {
    if (this._userName == '' || !this._userName) {
      wx.showToast({
        title: '手机号不能为空',
        mask: true,
        icon: 'none'
      })
      return ;
    }
    
    if (!(/^1[34578]\d{9}$/.test(this._userName))) {
      wx.showToast({
        title: '手机号错误',
        mask: true,
        icon: 'none'
      })
      return ''
    }
    
    if (this.data.timeCountDown) {
      wx.showToast({
        title: '请不要频繁发送验证码',
        mask: true,
        icon: 'none'
      })
      return ;
    }

    wx.showLoading({
      title: '发送验证码...',
      mask: true
    })

    lwx.request({
      url: '/send/sms',
      data: {
        phone: this._userName,
        type: 'resetpassword'
      }
    }).then(res => {
      wx.hideLoading()
      wx.showToast({
        title: '发送成功',
        mask: true
      })
      this.setData({
        timeCount: 60,
        timeCountDown: true
      })
      
      this._timeCounter = setInterval(() => {
        if (this.data.timeCount > 1) {
          this.setData({
            timeCount: this.data.timeCount - 1
          })
        } else {
          clearInterval(this._timeCounter)
          this.setData({
            timeCount: this.data.timeCount - 1,
            timeCountDown: false
          })
        }
      }, 1000)
    }).catch(err => {
      wx.hideLoading()
      let errMsg = typeof err == 'string' && err ? err : '发送验证码失败'
      wx.showToast({
        title: errMsg,
        mask: true,
        icon: 'none'
      })
    })
    
  },
  formSubmit: function (e) {
    let username = e.detail.value.username
    let password = e.detail.value.password
    let password1 = e.detail.value.password1
    let smsCode = e.detail.value.smsCode

    if (!username) {
      wx.showToast({
        title: '手机号不能为空',
        mask: true,
        icon: 'none'
      })
      return;
    }

    if (!(/^1[34578]\d{9}$/.test(username))) {
      wx.showToast({
        title: '手机号错误',
        mask: true,
        icon: 'none'
      })
      return ''
    }

    if (!password){
      wx.showToast({
        title: '请输入新密码',
        mask: true,
        icon: 'none'
      })
      return ''
    }
    console.log(password1)
    console.log(password)

    if (!password1 || password1 !== password) {
      wx.showToast({
        title: '请输入正确的确认新密码',
        mask: true,
        icon: 'none'
      })
      return ''
    }

    if (!smsCode) {
      wx.showToast({
        title: '请输入验证码',
        mask: true,
        icon: 'none'
      })
      return ''
    }

    let ip = wx.getStorageSync('ip') || '127.0.0.1';
    wx.showLoading({
      title: '密码重置...',
      mask: true
    })
    
    lwx.request({
      url: '/party/resetPassword',
      data: {
        phone: username,
        password: password,
        smsCode: smsCode
      },
      needResult: true
    }).then(res => {
      console.log(res)
      wx.hideLoading()
      if(res.result == 0){
        wx.showToast({
          title: '重置密码成功',
          mask: true
        })

        wx.redirectTo({
          url: '../login/login',
        })

      }else{
        wx.showToast({
          title: res.errorMsg || '重置密码错误',
          mask: true,
          icon: 'none'
        })
      }

    }).catch(err => {
      wx.hideLoading()
      let errMsg = typeof err == 'string' && err ? err : '重置密码错误'
      wx.showToast({
        title: errMsg,
        mask: true,
        icon: 'none'
      })
    })
  }
})