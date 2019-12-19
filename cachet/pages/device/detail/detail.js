
import LPage from '../../../utils/lpage.js'
import lwx from '../../../utils/lwx.js'
import { _globle } from '../../../utils/globle.js'
import devices from '../../../utils/devices.js'

LPage({

  data: {
  
  },
  onLoad: function (options) {
    console.log(options)
    if(!options.devicesId){
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

    this._devicesId = options.devicesId
    this.setData({
      userType: _globle.user.type
    })
  },
  onShow: function (options){
    console.log('onshow')
    console.log(this._devicesId)
    
    this.loadData()
  },

  onUnload: function () {
    if (this._devices) {
      console.log('断开连接')
      this._devices.closeConnection()
    }
  },
  loadData: function(){
    wx.showLoading({
      title: '加载数据',
      mask: true
    })
    lwx.request({
      url: '/devices/detail',
      data: {
        devicesId: this._devicesId,
        applyType: 'TEST_APPLY'
      }
    }).then(res => {
      console.log(res)
      wx.hideLoading()
      this._deviceCode = res.devicesInfo.devicesCode
      this.setData({
        loadSuccess: true,
        devicesInfo: {
          devicesId: this._devicesId,
          iconText: res.devicesInfo.iconText,
          sealId: res.devicesInfo.sealId,
          sealName: res.devicesInfo.sealName,
          sealStatus: res.devicesInfo.sealStatus,
          expireDate: res.devicesInfo.expireDate,
          statusName: res.devicesInfo.statusName,
          status: res.devicesInfo.status,
          devicesCode: res.devicesInfo.devicesCode,
          model: res.devicesInfo.model,
          surplusTestNum: res.devicesInfo.surplusTestNum,
          images: this.getUseImage(res.devicesInfo.userDetails),
          waitUploadUseId: this.getWaitUploadUseId(res.devicesInfo.userDetails),
          interimPartyId: res.devicesInfo.interimPartyId,
          interimPartyName: res.devicesInfo.interimPartyName,
          isInterim: res.devicesInfo.interimPartyId === _globle.user.partyId,
          waitUploadActId: res.devicesInfo.waitUploadActId,
          partyId: res.devicesInfo.partyId,
          partyName: res.devicesInfo.partyName,
          sign: res.devicesInfo.sign || '',
          version: res.devicesInfo.version,
          isForcedPhoto: res.devicesInfo.isForcePhoto
        },
        testAbled: this.getTestAbled(res.devicesInfo.status)
      })
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      wx.showToast({
        title: '加载数据失败',
        mask: true
      })
    })
  },
  toInstall: function(){
    wx.navigateTo({
      url: `../install/install?devicesId=${this._devicesId}&sign=${this.data.devicesInfo.sign}`,
    })
  },
  toNavUrl: function (devicesInfo){
    let navUrl = null
    if (this.data.devicesInfo.waitUploadActId){
      navUrl = `../uploadcert/uploadcert?devicesId=${this._devicesId}&actId=${this.data.devicesInfo.waitUploadActId}`
    }else{
      navUrl = this.data.devicesInfo.surplusTestNum === 0 ? `../testapply/testapply?devicesId=${this._devicesId}` : `../testuse/testuse?devicesId=${this._devicesId}`
    }
    console.log(navUrl)
    wx.navigateTo({
      url: navUrl,
    })
  },
  getUseImage: function (userDetails){
    let images = []
    if (!userDetails || userDetails.length < 1) {
      return images;
    }
    userDetails.map(item => {
      if (item.voucherUrl) {
        images.push(item.voucherUrl)
      }
    })
    return images
  },
  getWaitUploadUseId: function (userDetails){
    if (!userDetails || userDetails.length < 1){
      return null;
    }
    let useId = null
    userDetails.map(item => {
      if (!item.voucherUrl){
        useId = item.useId
        return 
      }
    })
    return useId
  },
  getTestAbled: function(status){
    if (status === 'WAIT_TEST' || status === 'WAIT_UPLOAD_VOUCHER' || status === 'WAIT_ACTIVATE'){
      return true
    }
    return false
  },
  resetInstall: function(){
    if (!this._devices){
      this._devices = new devices(this._deviceCode)
    }
    wx.hideLoading()
    wx.showLoading({
      title: '读取状态...',
      mask: true
    })
    this._devices.getDevicesInfo().then(res => {
      if (res.initialised === 1) {
        wx.hideLoading()
        wx.showLoading({
          title: '读取运行状态...',
          mask: true
        })
        this._devices.getOperationStatus().then(res => {
          if (res.operationStatus === 0) {
            wx.hideLoading()
            wx.showLoading({
              title: '重置安装...',
              mask: true
            })
            this._devices.setOperationCommand({
              type: 6,
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
                  url: '/devices/resetStatus',
                  data: {
                    devicesId: this._devicesId
                  }
                }).then(res => {
                  this._devices.closeConnection()
                  wx.hideLoading()
                  wx.navigateTo({
                    "url": `../install/install?devicesId=${this._devicesId}&sign=${this.data.devicesInfo.sign}`
                  })
                })
              }
            }).catch(err => {
              console.log(err)
              wx.hideLoading()
              wx.showToast({
                title: '重置失败',
                mask: true,
                icon: 'none'
              })
            })
          } else {
            wx.hideLoading()
            wx.showToast({
              title: '设备繁忙，无法重置',
              mask: true,
              icon: 'none'
            })
          }
        }).catch(res => {
          console.log(err)
          wx.hideLoading()
          wx.showToast({
            title: '获取运行状态失败',
            mask: true,
            icon: 'none'
          })
        })
      } else {
        wx.hideLoading()
        wx.showToast({
          title: '设备未安装，无法重置',
          mask: true,
          icon: 'none'
        })
      }
    }).catch(err => {
		  console.log(err)
		  wx.hideLoading()
      wx.showToast({
        title: '获取状态失败',
        mask: true,
        icon: 'none'
      })
    })
  },
  installApply: function(){

    let type = this.data.devicesInfo.status == 'WAIT_INSTALL' ? 'INIT' : 'AGAIN';

    wx.showModal({
      title: '申请安装',
      content: '您正在申请【' + (type == 'AGAIN' ? '重新': '') + '安装】,是否要继续?',
      cancelText: '取消',
      confirmText: '继续',
      success: res => {

        if (res.confirm){
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
            this.loadData()
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
      }
    })
  },
  switchRunStatus: function(){
    let title = devicesInfo.sealStatus === 'ENABLE' ? '禁用印章' : '启用印章'
    wx.showLoading({
      title: title + '...',
      mask: true
    })

    lwx.request({
      url: '/devices/switchRunStatus',
      data: {
        devicesId: this._devicesId
      }
    }).then(res => {
      wx.hideLoading()
      wx.showToast({
        title: title + '成功',
        mask: true
      })
      this.loadData()
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: title + '失败',
        mask: true,
        icon: 'none'
      })
    })
  }
})