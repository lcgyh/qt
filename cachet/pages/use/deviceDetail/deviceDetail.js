
import LPage from '../../../utils/lpage.js'
import lwx from '../../../utils/lwx.js'
import devices from '../../../utils/devices.js'
import { _globle } from '../../../utils/globle.js'

LPage({

  data: {

  },
  onLoad: function (options) {
    console.log(options)
    console.log(_globle.location)
    if (!options.useId || !options.type || !options.devicesId) {
      wx.showModal({
        title: '参数错误',
        content: '获取参数错误',
        showCancel: false,
        confirmText: '确定',
        success: res => {
          wx.navigateBack({})
        }
      })
      return ;
    }
    this._type = options.type
    this._actId = options.useId
    this._devicesId = options.devicesId
    this.loadData()
  },
  onUnload: function () {
    if (this._devices) {
      this._devices.closeConnection()
    }
  },
  loadData: function () {
    wx.showLoading({
      title: '加载数据',
      mask: true
    })

    lwx.request({
      url: '/use/getWaitUseDetail',
      data: {
        id: this._actId,
        type: this._type,
        devicesId: this._devicesId
      }
    }).then(res => {
      console.log(res)
      wx.hideLoading()
      
      this._partyId = res.partyId
      this._devicesCode = res.devicesInfo.devicesCode
      this.setData({
        apply: res.apply,
        devicesInfo: res.devicesInfo,
        sealInfo: res.sealInfo,
        total: res.total,
        surplus: res.surplus,
        loadSuccess: true,
        startTime: res.startTime,
        expireTime: res.expireTime
      })
      if (res.sealInfo.sealStatus != 'ENABLE'){
        wx.showToast({
          title: '设备被禁用',
          mask: true,
          icon: 'none'
        })
      }
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      wx.showToast({
        title: '加载数据失败',
        mask: true
      })
    })
  },
  use: function(){
    if (this._type === 'TAKE_APPLY') {
      wx.showLoading({
        title: '领取设备...',
        mask: true
      })
      lwx.request({
        url: '/use/use',
        data: {
          id: this._actId,
          partyId: this._partyId,
          devicesId: this._devicesId,
          type: this._type,
          latitude: _globle.location.latitude,
          longitude: _globle.location.longitude
        }
      }).then(res => {
        wx.hideLoading()
        wx.showToast({
          title: '领取成功',
          mask: true
        })
        wx.switchTab({
          url: '/pages/index/index',
        })
      }).catch(err => {
        wx.hideLoading()
        console.log(err)
      })
    }else{
      if (!this._devices){
        this._devices = new devices(this._devicesCode)
      }
      // 读取设备状态
      let errMsg = '使用失败'
      let rand1 = 0
      let rand2 = 0
      this._devices.getOperationStatus().then(res => {
        return new Promise((resolve, reject) => {
          console.log(res)
          if (res.operationStatus === 0) {
            rand1 = res.rand1
            rand2 = res.rand2
            resolve(res.operationStatus)
          } else if (res.operationStatus === 1){
            reject('设备繁忙,请稍后再试')
          }else{
            reject('设备已锁定，请先到设备详情解锁')
          }
        })
      }).then(res => {
        wx.hideLoading()
        wx.showLoading({
          title: '使用印章',
          mask: true
        })
        let latitude = ''
        let longitude = ''
        if (_globle.location){
          latitude = _globle.location.latitude || ''
          longitude = _globle.location.longitude || ''
        }
        return lwx.request({
          url: '/use/use',
          data: {
            id: this._actId,
            partyId: this._partyId,
            devicesId: this._devicesId,
            type: this._type,
            latitude: latitude,
            longitude: longitude
          }
        })
      }).then(res => {
        this._usedId = res.useId
        wx.hideLoading()
        wx.showLoading({
          title: '解锁设备...',
          mask: true
        })
        // 解锁设备
        return this._devices.setOperationCommand({
          type: 2,
          sign: this.data.devicesInfo.sign,
          rand1: rand1,
          rand2: rand2
        })
      }).then(res => {
        return new Promise((resolve, reject) => {
          let devicesStatus = 0
          let msg = '获取状态...'
          wx.hideLoading()
          wx.showLoading({
            title: msg,
            mask: true
          })

          let handler = () => {
            this._devices.getOperationStatus().then(res => {
              console.log(res)
              if (res.operationStatus == 1) {
                if (res.devicesStatus != devicesStatus) {
                  devicesStatus = res.devicesStatus
                  switch (devicesStatus) {
                    case 2: msg = '正在敲章'; break
                    case 11: msg = '印章已按下'; break
                    case 12: msg = '印章已返回'; break
                  }
                  wx.hideLoading()
                  wx.showLoading({
                    title: msg,
                    mask: true
                  })
                }
                setTimeout(handler, 100)
              } else {
                resolve(res.operationStatus)
              }
            })
          }
          setTimeout(handler, 100)
        })
      }).then(res => {
        console.log(res)
        wx.hideLoading()
        if (res === 0) {
          this.useSuccess()
        } else {
          this.useError()
        }
      }).catch(err => {
        console.log(err)
        errMsg = typeof err === 'string' ? err : errMsg
        wx.showToast({
          title: errMsg,
          mask: true,
          icon: 'none'
        })
      })
    }
  },
  useSuccess: function(){
    wx.showToast({
      title: '设备解锁成功',
      mask: true
    })
    this.nextStep()
  },
  useError: function(){
    if (!this._devices) {
      this._devices = new devices(this._deviceCode)
    }
    this._devices.getErrorInfo().then(res => {

      let times = null
      if (res.errorType == 4){
        times = res.errorData
      }
      let errMsg = res.mes
      lwx.request({
        url: '/use/rollback',
        data: {
          actId: this._actId,
          latitude: _globle.location.latitude || '',
          longitude: _globle.location.longitude || '',
          cause: errMsg ? errMsg : '其他原因',
          times: times || ''
        }
      }).then(res => {
        console.log('记录使用失败成功')
      }).catch(err => {
        console.log('记录使用失败失败')
      })

      wx.showModal({
        title: '使用失败',
        content: (errMsg ? ('使用失败【' + errMsg + '】') : '') + '设备锁定' +  ',解锁设备?',
        cancelText: '取消',
        confirmText: '解锁',
        success: res => {
          if (res.confirm) {
            this.releaseError()
          }else{
            wx.showToast({
              title: '请到设备详情解锁设备才能继续使用',
              mask: true,
              icon: 'none'
            })
          }
        }
      })
    }).catch(err => {
      wx.showModal({
        title: '使用失败',
        content: '使用失败【原因未知】设备锁定,解锁设备?',
        cancelText: '取消',
        confirmText: '解锁',
        success: res => {
          if (res.confirm) {
            this.releaseError()
          }else{
            wx.showToast({
              title: '请到设备详情解锁设备才能继续使用',
              mask: true,
              icon: 'none'
            })
          }
        }
      })
    })
  },
  releaseError: function(){
    if (!this._devices) {
      this._devices = new devices(this._deviceCode)
    }
    wx.hideLoading()
    wx.showLoading({
      title: '读取状态...',
      mask: true
    })

    this._devices.getOperationStatus().then(res => {
      if (res.operationStatus === 2) {
        wx.hideLoading()
        wx.showLoading({
          title: '解除锁定',
          mask: true
        })
        this._devices.setOperationCommand({
          type: 3,
          sign: this.data.devicesInfo.sign,
          rand1: res.rand1,
          rand2: res.rand2
        }).then(res => {
          return new Promise((resolve, reject) => {
            wx.hideLoading()
            wx.showLoading({
              title: '获取结果...',
              mask: true
            })
            // 循环读取状态
            let statusInterval = setInterval(() => {
              this._devices.getOperationStatus().then(res => {
                // 空闲则是安装完成
                if (res.operationStatus !== 1) {
                  clearInterval(statusInterval)
                  resolve(res.operationStatus)
                }
              })
            }, 100)
          })
        }).then(res => {
          wx.hideLoading()
          if (res === 2) {
            wx.showToast({
              title: '解除错误锁定失败',
              mask: true,
              icon: 'none'
            })
          } else {
            wx.showToast({
              title: '解除成功',
              mask: true
            })
            this.nextStep()
          }
        }).catch(err => {
          console.log(err)
          wx.hideLoading()
          wx.showToast({
            title: '解除操作失败',
            mask: true,
            icon: 'none'
          })
        })
      } else {
        wx.hideLoading()
        wx.showToast({
          title: '设备正常，无错误信息',
          mask: true,
          icon: 'none'
        })
      }
    }).catch(res => {
      wx.hideLoading()
      wx.showToast({
        title: '获取运行状态失败',
        mask: true,
        icon: 'none'
      })
    })
  },
  nextStep: function(){
    let backUrl = '/pages/index/index'
    if (this.data.surplus > 1) {
      this.loadData()
      wx.showModal({
        title: '使用成功',
        content: '是否继续用章',
        cancelText: '否',
        confirmText: '是',
        success: res => {
          if (res.confirm) {
            this.use()
          } else {
            wx.redirectTo({
              url: `/pages/use/actdetail/actdetail?actId=${this._actId}`
            })
          }
        },
        fail: err => {
          wx.redirectTo({
            url: `/pages/use/actdetail/actdetail?actId=${this._actId}`
          })
        }
      })
    } else {
      wx.redirectTo({
        url: `/pages/use/actdetail/actdetail?actId=${this._actId}`
      })
    }
  },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    let urls = []
    this.data.apply.vouchers.map(item => {
      if (item) {
        urls.push(item.url)
      }
    })
    wx.previewImage({
      current: current,
      urls: urls
    })
  }
})