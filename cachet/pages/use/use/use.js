import Lpage from '../../../utils/lpage.js'
import { _globle } from '../../../utils/globle.js'
import lwx from '../../../utils/lwx.js'
import devices from '../../../utils/devices.js'

Lpage({

  _useId: 5,
  data: {
    loadComplate: false,
    isUse: false,
    showMask: false
  },
  onLoad: function (options) {
    this._actId = options.id
    this._type = options.type

    console.log(_globle.user)
    if (_globle.user && _globle.user.type === 1){
      this.loadData()
    }else{
      wx.showToast({
        title: '没有权限访问'
      })
    }
  },
  loadData: function(){
    let that = this
    wx.showLoading({
      title: '数据加载...'
    })
    lwx.request({
      url: '/use/useDetail',
      data: {
        id: this._actId,
        type: this._type
      }
    }).then(res => {
      console.log(res)
      if(res){
        this._id = res.id
        this._partyId = res.partyId
        this._devicesId = res.devicesId
        this._devicesNo = res.devicesNo
        this.setData({
          devicesName: res.devicesName,
          total: res.total,
          surplus: res.surplus,
          expireTime: res.expireTime || null,
          loadComplate: true
        })
        wx.hideLoading()
      }else{
        throw new Error("invalid res")
      }

    }).catch(err => {
      wx.hideLoading()      
      wx.showToast({
        title: '获取数据失败'
      })
    })
  },
  use: function(){
    let that = this
    this.showMask()
    wx.showLoading({
      title: '开始使用...'
    })
    new Promise((resolve, reject) => {
      lwx.request({
        url: '/use/use',
        data: {
          id: that._id,
          partyId: that._partyId,
          devicesId: that._devicesId
        }
      }).then(res => {
        this._useId = res.useId
        resolve()
      }).catch( err => {
        reject(err)
      })
    }).then(res => {
      this._devices = new devices(this._devicesNo)
      wx.hideLoading()
      wx.showLoading({
        title: '设备连接...',
        mask: true
      })

      this._devices.init(() => {
        wx.hideLoading()
        wx.showLoading({
          title: '获取状态...',
          mask: true
        })
        // 读取设备状态
        this._devices.getOperationStatus().then(status => {
          console.log('初始状态：', status)
          return new Promise((resolve, reject) => {
            if (status === 0) {
              resolve(status)
            } else {
              wx.showToast({
                title: '设备状态错误',
                mask: true,
                icon: 'none'
              })
              reject('设备状态错误')
            }
          })
        }).then(res => {
          wx.hideLoading()
          wx.showLoading({
            title: '解锁设备...',
            mask: true
          })
          // 解锁设备
          return this._devices.setOperationCommand({
            type: 2
          })
        }).then(res => {
          console.log(res)
          return new Promise((resolve, reject) => {
            // 循环读取状态
            let statusInterval = setInterval(() => {
              this._devices.getOperationStatus().then(status => {
                console.log('使用状态：', status)
                // 非busy则解锁完成
                if (status !== 1) {
                  clearInterval(statusInterval)
                  resolve(status)
                }
              })
            }, 100)
          })
        }).then(res => {
          wx.hideLoading()
          console.log('解锁结果：', res)
          // 根据解锁结果显示结果
          if (res === 0) {
            wx.showToast({
              title: '设备解锁成功',
              mask: true
            })
          } else {
            this._devices.getErrorInfo.then(res => {
              wx.showToast({
                title: res.errorType === 1 ? '设备未安装或未初始化' : '用户无安装权限',
                mask: true,
                icon: 'none'
              })
              this._devices.setOperationCommand({
                type: 3
              })
            })
          }
        }).catch(err => {
          wx.hideLoading()
          console.log(err)
        })
      })
    }).catch(err => {
      this.hideMask()
      wx.showToast({
        title: '使用失败'
      })
      console.log(err)
    })
  },
  showMask: function(){
    this.setData({
      showMask: true
    })
  },
  hideMask: function(){
    this.setData({
      showMask: false
    })
  },
  upload: function(){
    let that = this
    new Promise((resolve, reject) => {
      wx.chooseImage({
        count: 1,
        sourceType: ['camera'],
        success: function (res) {
          if (res.tempFilePaths[0]){
            resolve(res.tempFilePaths[0])
          }else{
            reject('未选择图片')
          }
        },
        fail: function (res) {
          wx.showToast({
            title: '获取图片失败'
          })
        }
      })
    }).then(res => {
      console.log(res)
      this.showMask()
      wx.showLoading({
        title: '图片上传中',
      })
      return  new Promise((resolve, reject) => {
        wx.uploadFile({
          url: _globle.getBaseUrl() + '/common/fileupload',
          header: {
            token: _globle.token
          },
          filePath: res,
          name: 'file',
          success: function(res){
            res = JSON.parse(res.data)
            console.log(res)
            if(res.result === 0){
              resolve(res.id)
            }else{
              reject('上传图片失败')
            }
          },
          fail: function(err){
            reject(err)
          }
        })
      })
    }).then(res => {
      console.log({
        useId: that._useId,
        fileId: res
      })
      return lwx.request({
        url: '/use/uploadUseImg',
        data: {
          useId: that._useId,
          fileId: res
        }
      })
    }).then(res => {
      that.hideMask()
      wx.hideLoading()
      console.log(res)
      if(res.result === 0){
        wx.showToast({
          title: '上传凭证成功'
        })
        wx.redirectTo({
          url: '/pages/index/index'
        })
      }
    }).catch(err => {
      that.hideMask()
      wx.hideLoading()
      console.log(err)
      wx.showToast({
        title: '上传凭证失败'
      })
    })
  }
})