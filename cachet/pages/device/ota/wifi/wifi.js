import LPage from '../../../../utils/lpage.js'
import temCache from '../../../../utils/temCache.js'

LPage({
  data: {
    wifiList: [
      
    ]
  },
  onLoad: function(options){
    this.searchWifi()
    temCache.wifi = {}
  },
  searchWifi : function(){
    wx.showLoading({
      title: 'wifi搜索...',
      mask: true
    })
    new Promise((resovel, reject) => {
      wx.startWifi({
        success: (res) => {
          console.log(res)
          resovel(res)
        },
        fail: (err) => {
          wx.showToast({
            title: '开启wifi失败',
            mask: true,
            icon: 'none'
          })
        }
      })
    }).then(res => {
      return new Promise((resovel, reject) => {
        wx.getWifiList({
          success: (res) => {
            console.log(res)
            resovel(res)
          },
          fail: (err) => {
            reject(err)
          }
        })
      })
    }).then(res => {
      wx.onGetWifiList((res) => {
        console.log(res)
        if (res && res.wifiList){
          let wifiList = []
          res.wifiList.map(item => {
            let signal = ''
            if (item.signalStrength > 80){
              signal = '很好'
            } else if (item.signalStrength > 50 && item.signalStrength <= 80){
              signal = '良好'
            } else if (item.signalStrength > 30 && item.signalStrength <= 50) {
              signal = '较弱'
            } else {
              signal = '较差'
            }
            wifiList.push({
              ssid: item.SSID,
              signal: signal
            })
          })

          this.setData({
            wifiList: wifiList,
            nodata: false
          })
        } else {
          this.setData({
            nodata: true,
            wifiList: []
          })
        }
        wx.hideLoading()
      })
    })
  },
  chooseWifi: function(e){
    console.log(e)
    let ssid = e.currentTarget.dataset.ssid
    temCache.wifi = {
      ssid: ssid
    }
    wx.navigateBack({})
  }
})