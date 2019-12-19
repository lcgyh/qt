import { _globle } from '../../../utils/globle.js'
import { userLogin } from '../../../utils/userUtil.js'
import lwx from '../../../utils/lwx.js'
import LPage from '../../../utils/lpage.js'
LPage({

  data: {
    cash_detil:[],
    imagesrc:''
  },
  onLoad: function (options) {

    if(!options.id || !options.type){
      wx.showToast({
        title: '参数错误',
        mask: true,
        icon: 'none'
      })
      return ;
    }

    this._id = options.id
    this._type = options.type
  },
  onShow: function(){
    this.loadData();
  },
  loadData: function (){
    wx.showLoading({
      title: '加载数据...',
      mask: true
    })
    lwx.request({
      url: '/use/getWaitUseDetail',
      data: {
        id: this._id,
        type: this._type
      }
    }).then(res => {
      wx.hideLoading()
      console.log(res)
      this.setData({
        sealName: res.sealInfo.sealName,
        total: res.total,
        surplus: res.surplus,
        imagesrc: _globle.getBaseUrl() + `/use/qrcode?id=${this._id}&type=${this._type}&token=${_globle.token}`,
        loadSuccess: true,
        type: this._type,
        startTime: res.startTime,
        endDate: res.endDate || ''
      })

      return lwx.request({
        url: '/devices/position',
        data: {
          sealId: res.sealInfo.sealId
        }
      })
    }).then(res => {
      console.log(res)
      let custOs = res.partyName

      switch (res.positionType){
        case 2 : custOs += '(临时)'; break
        case 3: custOs += '(外带)'; break
      }
      this.setData({
        custOs: custOs
      })

    }).catch(err => {
      wx.hideLoading()
      console.log(err)
      wx.showToast({
        title: '加载数据失败',
        mask: true,
        icon: 'none'
      })
    })
  },
  getScanStatus: function(){
    new Promise((resolve, reject) => {

      setInterval(() => {
        lwx.request({
          url: '/use/getScanStatus',
          data: {
            useId: this._id
          }
        }).then(res => {
          resolve()
        })
      }, 1000)
    }).then(res => {
      wx.showToast({
        title: '扫描成功',
        mask: true
      })
    }).catch(err => {
      console.log(err)
    })
  },
  selfUse: function(){
    wx.hideLoading()
    wx.showLoading({
      title: '识别二维码...',
      mask: true
    })
    lwx.request({
      url: '/use/getScanStatus',
      data: {
        useId: this._id
      }
    }).then(res => {
      console.log('识别成功')
      console.log(res)
      let cryptograph = JSON.parse(res.value)
      console.log(cryptograph)
      return lwx.request({
        url: '/use/checkScan',
        data: {
          key: cryptograph.key,
          value: cryptograph.value
        }
      })
    }).then(res => {
      console.log(res)
      wx.hideLoading()
      wx.showToast({
        title: '识别成功...',
        mask: true
      })
      if (!res.devicesId) {
        console.log(`../../use/deviceList/deviceList?useId=${res.useId}&sealId=${res.sealId}&type=${res.type}`)
        wx.navigateTo({
          url: `../../use/deviceList/deviceList?useId=${res.useId}&sealId=${res.sealId}&type=${res.type}`,
        })
      } else {
        console.log(`../../use/deviceDetail/deviceDetail?useId=${res.useId}&devicesId=${res.devicesId}&type=${res.type}`)
        wx.navigateTo({
          url: `../../use/deviceDetail/deviceDetail?useId=${res.useId}&devicesId=${res.devicesId}&type=${res.type}`,
        })
      }
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      wx.showToast({
        title: '无效二维码',
        mask: true,
        icon: 'none'
      })
    })
  }
})