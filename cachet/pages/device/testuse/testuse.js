import { _globle } from '../../../utils/globle.js'
import lwx from '../../../utils/lwx.js'
import LPage from '../../../utils/lpage.js'
import { useDevices, openDevices } from './biz.js'
import devices from '../../../utils/devices.js'


LPage({
  data: {
    loadSuccess: false,
    devicesInfo: {
      deviceId: null,
      alias: null
    }
  },
  onLoad: function (options) {

    if(!options.devicesId){
      wx.showToast({
        title: '获取参数失败',
        mask: true,
        icon: 'none'
      })
    }else{
      this._devicesId = options.devicesId
      this.loadData()
    }
  },
  onUnload: function(){
    if(this._devices){
      this._devices.closeConnection()
    }
  },
  onReady: function(){
  },
  loadData: function(){
    wx.showLoading({
      title: '加载信息...',
      mask: true
    })
    lwx.request({
      url: '/use/getWaitUseList',
      data: {
        devicesId: this._devicesId,
        applyType: 'TEST_APPLY'
      }
    }).then(res => {
      console.log(res)
      if (!res.datas || res.datas.length < 1){
        wx.showToast({
          title: '无带使用记录',
          mask: true
        })
        throw new Error('加载待使用记录失败')
      }else{
        this._id = res.datas[0].id
        this._type = res.datas[0].type
      }
      return lwx.request({
        url: '/devices/detail',
        data: {
          devicesId: this._devicesId
        }
      })
    }).then(res => {
      console.log(res)
      wx.hideLoading()
      if (res.devicesInfo) {
        this.setData({
          isUse: false,
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
      } else {
        throw new Error('加载数据失败')
      }
    }).catch(err => {
      let errmsg = (typeof err == 'string') ? err : '加载信息失败'
      wx.hideLoading()
      wx.showToast({
        title: errmsg || '加载信息失败',
        mask: true,
        icon: 'none'
      })
    })

  },
  onUseTest: function () {
    this._devices = new devices(this.data.devicesInfo.devicesCode)
    // 读取设备状态
    this._devices.getOperationStatus().then(res => {
      console.log('初始状态：', res)
      return new Promise((resolve, reject) => {
        if (res.operationStatus === 0) {
          resolve(res)
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
      return useDevices({
        id: this._id,
        partyId: _globle.user.partyId,
        devicesId: this._devicesId,
        type: 'TEST_APPLY'
      })
    }).then(res => {
      console.log(res)
      this._useId = res.useId
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
        wx.hideLoading()
        wx.showLoading({
          title: '获取状态...',
          mask: true
        })
        // 循环读取状态
        let statusInterval = setInterval(() => {
          this._devices.getOperationStatus().then(res => {
            console.log('使用状态：', res)
            // 非busy则解锁完成
            if (res.operationStatus !== 1) {
              clearInterval(statusInterval)
              resolve(res.operationStatus)
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
        console.log(`../uploadcert/uploadcert?devicesId=${this._devicesId}&actId=${this._id}`)
        wx.redirectTo({
          url: `../uploadcert/uploadcert?devicesId=${this._devicesId}&actId=${this._id}`,
        })
      } else {
        this._devices.getErrorInfo().then(res => {
          wx.showToast({
            title: res.errorType === 1 ? '设备未安装或未初始化' : '用户无安装权限',
            mask: true,
            icon: 'none'
          })
          this._devices.setOperationCommand({
            type: 3
          })
        })

        lwx.request({
          url: '/use/rollback',
          data: {
            devicesUsedId: this._useId
          }
        }).then(res => {
          console.log('回退使用成功')
        })
      }
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  }
})