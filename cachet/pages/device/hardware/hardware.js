
import LPage from '../../../utils/lpage.js'
import lwx from '../../../utils/lwx.js'
import { _globle } from '../../../utils/globle.js'
import devices from '../../../utils/devices.js'

LPage({

  data: {},
  onLoad: function (options) {
    if (!options.devicesCode || !options.devicesId || !options.devicesStatus){
      wx.showModal({
        title: '参数错误',
        content: '获取参数错误',
        showCancel: false,
        confirmText: '确定',
        success: res => {
          wx.navigateBack({})
        }
      })
    }

    this._devicesStatus = options.devicesStatus
    this._devicesCode = options.devicesCode
    this._devicesId = options.devicesId
    this._sign = options.sign
    this.setData({
      devicesCode: this._devicesCode,
      hasUpdate: false,
      needSync: false
    })

    this.loadData()
  },
  onUnload: function () {
    if (this._devices) {
      console.log('断开连接')
      this._devices.closeConnection()
    }
  },
  loadData: function(){

    if (!this._devices){
      this._devices = new devices(this._devicesCode)
    }

    wx.showLoading({
      title: '读取设备信息',
      mask: true
    })
    this._devices.getDevicesInfo().then(res => {
      console.log(res)
      this.setData({
        devicesInfo: res
      })

      let initialised = res.initialised

      wx.hideLoading()
      wx.showLoading({
        title: '读取状态信息',
        mask: true
      })
      return this._devices.getOperationStatus()
    }).then(res => {
      console.log(res)
      this.setData({
        operationStatus: {
            operationStatus: res.operationStatus === 0 ? '空闲' : (res.operationStatus === 1 ? '繁忙' : '异常'),
            devicesStatus: res.devicesStatus === 1 ? '安装中' : '其他'
          }
      })
      wx.hideLoading()
      wx.showLoading({
        title: '读取异常信息',
        mask: true
      })
		  return this._devices.getErrorInfo()
	  }).then(res => {
      console.log(res)
      wx.hideLoading()
      this.setData({
        errorInfo: res,
        loadSuccess: true
      })

      this.checkUpdate()
      this.needSync()
	  }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: '读取数据失败',
        mask: true,
        icon: 'none'
      })
    })
  },
  checkUpdate: function(){
    let currentVersion = `${this.data.devicesInfo.majorVersion}.${this.data.devicesInfo.subVersion}.${this.data.devicesInfo.minorVersion}`

    wx.showLoading({
      title: '检查更新',
      mask: true
    })

    lwx.request({
      url: '/ota/checkUpdate',
      data: {
        deviceId: this._devicesId
      }
    }).then(res => {
      console.log(res)
      wx.hideLoading()
      if (res && res.path){
        this.setData({
          hasUpdate: true
        })

        this._path = res.path
        this._version = res.version

        // this._path = 'http://gzws.oss-cn-hangzhou.aliyuncs.com/devices/04141.bin'
        // this._version = '1.0.1'
      }else{
        wx.showToast({
          title: '已是最新版本'
        })
      }
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      wx.showToast({
        title: '请求失败',
        mask: true,
        icon: 'none'
      })
    })

  },
  update: function(){

    if (this._devices) {
      console.log('断开连接')
      this._devices.closeConnection()
    }

    let currentVersion = `${this.data.devicesInfo.majorVersion}.${this.data.devicesInfo.subVersion}.${this.data.devicesInfo.minorVersion}`
    wx.navigateTo({
      url: `../ota/index/index?deviceCode=${this._devicesCode}&currentVersion=${currentVersion}&version=${this._version}&path=${this._path}&deviceId=${this._devicesId}&sign=${this._sign}`,
    })
  },
  releaseError: function(e){
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
          sign: this._sign,
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
                console.log('使用状态：', res)
                // 空闲则是安装完成
                if (res.operationStatus === 0) {
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
            this.loadData()
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
      console.log(res)
      console.log(err)
      wx.hideLoading()
      wx.showToast({
        title: '获取运行状态失败',
        mask: true,
        icon: 'none'
      })
    })
  },
  needSync: function (){

    let needSync = false
    switch(this._devicesStatus){
      case 'ACTIVATE': 
      case 'RESET_INSTALL_VERIFY':
        if (this.data.devicesInfo.initialised != 1){
          needSync = true
          this._needStatus = 'WAIT_INSTALL'
        } 
        break
      default : 
        if (this.data.devicesInfo.initialised == 1) {
          needSync = true
          this._needStatus = 'ACTIVATE'
        } 
    }
    this.setData({
      needSync: needSync
    })
  },
  syncStatus: function(){

    wx.showLoading({
      title: '同步状态...',
      mask: true
    })
    lwx.request({
      url: '/devices/syncStatus',
      data: {
        devicesId: this._devicesId,
        status: this._needStatus
      }
    }).then(res => {
      wx.hideLoading()
      wx.showToast({
        title: '同步成功',
        mask: true
      })
      this.setData({
        needSync: false
      })
      this.loadData()
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: '同步失败',
        mask: true,
        icon: 'none'
      })
    })

  }
})