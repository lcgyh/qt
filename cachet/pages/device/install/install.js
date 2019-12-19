import LPage from '../../../utils/lpage.js'
import { startInstall, openDevices, confirmInstall } from './biz.js'
import lwx from '../../../utils/lwx.js'
import devices from '../../../utils/devices.js'

LPage({
  _startInstallSuccess: false,
  data: {
    loadSuccess: false,
    hasInstalled: false,
    confirmInstalled: false
  },
  onLoad: function (options) {
    console.log(options)
    if(!options.devicesId){
      wx.showToast({
        title: '参数获取失败',
        mask: true
      })
      return ;
    }
    this.setData({
      loadSuccess: false,
      hasInstalled: false
    })
    this._devicesId = options.devicesId
    this._sign = options.sign
    this.loadData()
  },
  onUnload: function () {
    if (this._devices) {
      this._devices.closeConnection()
    }
  },
  loadData: function(){
    wx.showLoading({
      title: '数据加载...',
      mask: true
    })
    lwx.request({
      url: '/devices/detail',
      data: {
        devicesId: this._devicesId
      }
    }).then(res => {
      wx.hideLoading()
      if (res.devicesInfo){
        this._deviceCode = res.devicesInfo.devicesCode
        this.setData({
          loadSuccess: true,
          devicesInfo: {
            iconText: res.devicesInfo.iconText,
            sealName: res.devicesInfo.sealName,
            expireDate: res.devicesInfo.expireDate,
            statusName: res.devicesInfo.statusName,
            devicesCode: res.devicesInfo.devicesCode,
            version: res.devicesInfo.model
          }
        })
      }else{
        throw new Error('加载数据失败')
      }
    }).catch(err => {
      wx.showToast({
        title: '加载数据失败',
        mask: true
      })
    })
  },
  onInstall: function(){
    wx.showLoading({
      title: '开始安装',
      mask: true
    })
    lwx.request({
      url: '/devices/startInstall',
      data: {
        devicesId: this._devicesId
      }
    }).then(res => {
      this._devices = new devices(this._deviceCode)
      wx.hideLoading()
      wx.showLoading({
        title: '读取状态',
        mask: true
      })
      this._devices.getDevicesInfo().then(res => {
        console.log(res)
        if (res.initialised === 0) {
          wx.hideLoading()
          wx.showLoading({
            title: '读取运行状态',
            mask: true
          })
          this._devices.getOperationStatus().then(res => {
            console.log(res)
            if (res.operationStatus === 0) {
              if (res.devicesStatus === 1){
                wx.hideLoading()
                this.setData({
                  hasInstalled: true
                })
                // this.syncStatus()
              }else{
                wx.showLoading({
                  title: '开始安装',
                  mask: true
                })
                this._devices.setOperationCommand({
                  type: 5,
                  sign: this._sign,
                  rand1: res.rand1,
                  rand2: res.rand2
                }).then(res => {
                  return new Promise((resolve, reject) => {
                    // 循环读取状态

                    wx.hideLoading()
                    wx.showLoading({
                      title: '获取结果',
                      mask: true
                    })

                    let handler = () => {
                      this._devices.getOperationStatus().then(res => {
                        // 空闲则是安装完成
                        if (res.operationStatus !== 1) {
                          resolve(res.operationStatus)
                        }else{
                          setTimeout(handler, 100)
                        }
                      })
                    }
                    setTimeout(handler, 100)
                  })
                }).then(res => {
                  console.log('=================>>>>>>', res)
                  wx.hideLoading()
                  if (res === 2) {
                    wx.showLoading({
                      title: '读取错误信息',
                      mask: true
                    })
                    this._devices.getErrorInfo().then(res => {
                      this._devices.closeConnection()
                      wx.hideLoading()
                      wx.showToast({
                        title: res.mes,
                        mask: true,
                        icon: 'none'
                      })
                    }).catch(err => {
                      this._devices.closeConnection()
                      console.log(err)
                      wx.hideLoading()
                      wx.showToast({
                        title: '读取错误信息失败',
                        mask: true,
                        icon: 'none'
                      })
                    })
                  } else {
                    this.setData({
                      hasInstalled: true
                    })
                    // this.syncStatus()
                  }
                }).catch(err => {
                  this._devices.closeConnection()
                  console.log(err)
                  wx.hideLoading()
                  wx.showToast({
                    title: '安装失败',
                    mask: true,
                    icon: 'none'
                  })
                })
              }
            } else {
              wx.hideLoading()
              wx.showToast({
                title: '设备繁忙，无法安装',
                mask: true,
                icon: 'none'
              })
            }
          }).catch(res => {
            console.log(err)
            wx.hideLoading()
            wx.showToast({
              title: '读取运行状态失败',
              mask: true
            })
          })
        } else {
          wx.hideLoading()
          wx.showModal({
            title: '设备已安装',
            content: '设备已安装，将同步状态到系统',
            showCancel: false,
            confirmText: '确认',
            success: res => {
              this.syncStatus()
            }
          })
        }
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
        wx.showToast({
          title: '读取状态失败',
          mask: true,
        icon: 'none'
        })
      })
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      wx.showToast({
        title: '安装失败',
        mask: true,
        icon: 'none'
      })
    })
  },
  confirmInstall: function(){
	
    wx.showLoading({
      title: '读取运行状态',
      mask: true
    })
    this._devices.getOperationStatus().then(res => {
      // if (res.devicesStatus === 1 && res.operationStatus === 0) {
        wx.hideLoading()
        wx.showLoading({
          title: '确认安装',
          mask: true
        })
        this._devices.setOperationCommand({
          type: 4,
          sign: this._sign,
          rand1: res.rand1,
          rand2: res.rand2
        }).then(res => {
          wx.hideLoading()
          wx.showLoading({
            title: '获取结果',
            mask: true
          })
          return new Promise((resolve, reject) => {
            let handler = () => {
              this._devices.getOperationStatus().then(res => {
                console.log('确认安装完成：', res)
                // 非busy则解锁完成
                if (res.operationStatus !== 1) {
                  resolve(res.operationStatus)
                }else{
                  setTimeout(handler, 100)
                }
              })
            }
            setTimeout(handler, 100)
          })
        }).then(res => {

          wx.hideLoading()
          if (res === 2) {
            wx.showLoading({
              title: '读取错误信息',
              mask: true
            })
            this._devices.getErrorInfo().then(res => {
              wx.hideLoading()
              wx.showToast({
                title: res.mes,
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
          } else {
            lwx.request({
              url: '/devices/installConfirm',
              data: {
                devicesId: this._devicesId
              }
            }).then(res => {
              wx.hideLoading()
              wx.showToast({
                title: '安装完成',
                mask: true
              })

              wx.redirectTo({
                url: '../detail/detail?devicesId=' + this._devicesId
              })

            }).catch(err => {
              console.log(err)
              wx.hideLoading()
              wx.showToast({
                title: err,
                mask: true,
                icon: "none"
              })
            })
          }
        })
      // } else {
      //   wx.hideLoading()
      //   wx.showToast({
      //     title: '设备不是正在安装状态',
      //     mask: true,
      //     icon: 'none'
      //   })
      // }
    }).catch(res => {
      console.log(err)
      wx.hideLoading()
      wx.showToast({
        title: '读取设备运行状态失败',
        mask: true,
        icon: 'none'
      })
    })
  },

  syncStatus: function(){

    wx.showLoading({
      title: '获取设备状态...',
      mask: true
    })
    // new Promise((resolve, reject) => {
    //   let timeout = 30000;
    //   let oncetime = 100
    //   let taketime = 0

    //   let handler = () => {
    //     if (taketime > timeout) {
    //       resolve(1000/*超时了*/)
    //     } else {
    //       taketime += oncetime
    //       console.log('==============>>>>>',taketime)
    //       this._devices.getDevicesInfo().then(res => {
    //         console.log('确认安装完成：', res)
    //         if (res.initialised == 1) {
    //           resolve(res.operationStatus)
    //         } else {
    //           setTimeout(handler, oncetime )
    //         }
    //       })
    //     }
    //   }

    //   setTimeout(handler, oncetime)

    // })
    this._devices.getDevicesInfo().then(res => {
      wx.hideLoading()
      if (res.initialised !== 1){
        wx.showModal({
          title: '安装提示',
          content: '检测到印章未完成安装，是否强制完成?',
          cancelText: '否',
          confirmText: '是',
          success: res => {
            if(res.confirm){
              this.confirmInstall()
            }
          }
        })
      }else{
        this.confirmInstall()       
      }
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: '确认安装失败',
        mask: true,
        icon: 'none'
      })
    })
  },

  installApply: function () {

    let type = this.data.devicesInfo.status == 'WAIT_INSTALL' ? 'INIT' : 'AGAIN';
    wx.showLoading({
      title: '提交申请...',
      mask: true
    })
    lwx.request({
      url: '/install/apply',
      data: {
        devicesId: this._devicesId,
        type: type
      }
    }).then(res => {
      wx.hideLoading()
      wx.showToast({
        title: '申请成功',
        mask: true
      })

      wx.redirectTo({
        url: '../detail/detail?devicesId' + this._devicesId
      })

    }).catch(err => {
      let errMsg = (typeof err == 'string') ? err : '申请失败'
      wx.hideLoading()
      wx.showToast({
        title: errMsg,
        mask: true,
        icon: 'none'
      })
    })
  }
})