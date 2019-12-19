import LPage from '../../../utils/lpage.js'
import lwx from '../../../utils/lwx.js'

LPage({
  data: {
    isIos: false
  },
  onLoad: function(e) {
    console.log(this.data)
    wx.getSetting({
      success: res => {
        console.log(res)
        let camera = res.authSetting['scope.camera']
        if (!camera) {
          wx.getSystemInfo({
            success: res => {
              console.log(res)
              let system = res.system
              let cameraAuthorized = res.cameraAuthorized
              if (!cameraAuthorized) {
                this.setData({
                  isIos: true
                })
              } else {
                this.scanAcode()
              }
            },
            fail: () => {
              this.scanAcode()
            }
          })
        } else {
          this.scanAcode()
        }
      },
      fail: () => {
        this.scanAcode()
      }
    })
  },
  onShow: function() {

  },
  scanAcode: function() {
    wx.scanCode({
      onlyFromCamera: true,
      scanType: 'qrCode',
      success: res => {
        console.log(res)
        this.successHandle(res)
      },
      fail: err => {
        console.log(err)
        this.failHandle()
      }
    })
  },
  failHandle: function() {
    wx.showModal({
      title: '扫描失败',
      content: '无效二维码，是否从新扫描',
      confirmText: "是",
      success: res => {
        if (res.confirm) {
          this.scanAcode()
        } else {
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      }
    })
  },
  binderror: function(res) {
    console.log(res)
    wx.showModal({
      title: '授权失败',
      content: '您拒绝了相机使用授权，返回上级页面',
      confirmText: "是",
      success: res => {
        wx.navigateBack({})
      }
    })
  },
  successHandle: function(res) {

    try {
      let json = JSON.parse(res.result)
      if (!json.key || !json.value) {
        throw new Error('无效二维码')
      }
      lwx.request({
        url: '/use/checkScan',
        data: {
          key: json.key,
          value: json.value
        }
      }).then(res => {
        if (!res.devicesId) {
          console.log(`../deviceList/deviceList?useId=${res.useId}&sealId=${res.sealId}&type=${res.type}`)
          wx.redirectTo({
            url: `../deviceList/deviceList?useId=${res.useId}&sealId=${res.sealId}&type=${res.type}`,
          })
        } else {
          console.log(`../deviceDetail/deviceDetail?useId=${res.useId}&devicesId=${res.devicesId}&type=${res.type}`)
          wx.redirectTo({
            url: `../deviceDetail/deviceDetail?useId=${res.useId}&devicesId=${res.devicesId}&type=${res.type}`,
          })
        }
      }).catch(err => {
        console.log(err)
        this.failHandle()
      })
    } catch (err) {
      console.log(err)
      this.failHandle()
    }
  }
})