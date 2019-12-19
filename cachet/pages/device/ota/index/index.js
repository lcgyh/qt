import LPage from '../../../../utils/lpage.js'
import lwx from '../../../../utils/lwx.js'
import temCache from '../../../../utils/temCache.js'
import devices from '../../../../utils/devices.js'

LPage({
  data: {

  },
  onLoad: function(options){
    console.log(options)
    if(!options || !options.deviceCode || !options.currentVersion || !options.version || !options.deviceId){
      wx.showToast({
        title: '参数错误',
        mask: true,
        icon: 'none'
      })
      return ;
    }

    this.deviceCode = options.deviceCode
    this.deviceId = options.deviceId
    this.currentVersion = options.currentVersion
    this.version = options.version
    this._path = options.path
    this._devices = new devices(this.deviceCode)
    this._sign = options.sign
    this.setData({
      deviceCode: this.deviceCode,
      currentVersion: this.currentVersion,
      version: this.version
    })
  },
  onShow: function(){
    if(temCache && temCache.wifi){
      this.setData({
        ssid: temCache.wifi.ssid
      })
    }
  },
  onUnload: function () {
    if (this._devices) {
      this._devices.closeConnection()
    }
  },
  setPassword: function(e){
    console.log(e)
    let password = e.detail.value
    if(password){
      this.password = password
    }
  },
  submit: function(){
    wx.showLoading({
      title: '设备升级...',
      mask: true
    })

    if (!temCache || !temCache.wifi || !temCache.wifi.ssid){
      wx.showToast({
        title: '请选择wifi',
        mask: true,
        icon: 'none'
      })
      return ;
    }

    if (!this.password) {
      wx.showToast({
        title: '请选择wifi',
        mask: true,
        icon: 'none'
      })
      return;
    }
    let data = {
      ssid: temCache.wifi.ssid,
      password: this.password,
      url: this._path
    }

    wx.hideLoading()
    wx.showLoading({
      title: '读取状态...',
    })
    this._devices.getOperationStatus().then(res => {
      console.log(res)
      wx.hideLoading()
      if (res.operationStatus === 0) {
        wx.showLoading({
          title: '升级中...',
          mask: true
        })
        console.log(data, res)
        this._devices.setOperationCommand({
          type: 7,
          data: data,
          sign: this._sign,
          rand1: res.rand1,
          rand2: res.rand2
        }).then(res => {
          console.log(res)
          return this.getUpdateResult()
        }).then(res => {
          if (res === 2) {
            wx.hideLoading()
            this.updateError()
          } else {
            this.updateSuccess()
          }
        }).catch(err => {
          console.log(err)
          let errMsg = typeof err == 'string' ? err : '升级失败'
          wx.hideLoading()
          wx.showToast({
            title: errMsg || '升级失败',
            mask: true,
            icon: 'none'
          })
        })
      } else {
        wx.hideLoading()
        wx.showToast({
          title: res.operationStatus == 1 ? '设备繁忙，请稍后再试' : '设备锁定，请到印章详情解锁设备',
          mask: true,
          icon: 'none'
        })
      }
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      wx.showToast({
        title: '升级失败',
        mask: true,
        icon: 'none'
      })
    })
  },
  getUpdateResult: function(){
    return new Promise((resolve, reject) => {
      let oldTips = '升级中'

      let handler = () => {
        this._devices.getOperationStatus().then(res => {
          console.log('状态：', res)
          // 非busy则解锁完成
          if (res.operationStatus != 1) {
            resolve(res.operationStatus)
          } else {
            let tips = null
            switch (res.devicesStatus) {
              case 4:
                tips = '连接WiFi'
                break
              case 5:
                tips = '连接服务器'
                break
              case 6:
                tips = '进度20 %'
                break
              case 7:
                tips = '进度50 %'
                break
              case 8:
                tips = '进度80 %'
                break
              case 9:
                tips = '进度100 %'
                resolve(0)
                break
              case 10:
                tips = '固件升级错误'
                break
              default:
                tips = '升级错误'
            }
            if (tips && oldTips != tips) {
              oldTips = tips
              wx.hideLoading()
              wx.showLoading({
                title: tips,
                mask: true
              })
            }

            setTimeout(handler, 100)
          }
        })
      }
      setTimeout(handler, 100)
    })
  },
  updateSuccess: function(){
    lwx.request({
      url: '/devices/upgrade',
      data: {
        devicesId: this.deviceId,
        version: this.version
      }
    }).then(res => {
      wx.hideLoading()
      wx.showToast({
        title: '升级成功',
        mask: true
      })
      wx.navigateBack({})
    }).catch(err => {
      wx.showToast({
        title: typeof err == 'string' ? (err || '升级失败') : '升级失败',
        mask: true,
        icon: 'none'
      })
    })
  },
  updateError: function(){
    wx.showLoading({
      title: '读取错误信息',
      mask: true
    })
    this._devices.getErrorInfo().then(res => {
      wx.hideLoading()
      wx.showToast({
        title: res.mes || '未知原因',
        mask: true,
        icon: 'none'
      })
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      wx.showToast({
        title: '读取错误信息失败',
        mask: true,
        icon: 'none'
      })
    })
  }
})