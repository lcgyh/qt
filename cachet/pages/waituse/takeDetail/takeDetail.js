
import LPage from '../../../utils/lpage.js'
import lwx from '../../../utils/lwx.js'
import { _globle } from '../../../utils/globle.js'

LPage({
  data: {

  },
  onLoad: function (options) {
    if (!options.id || !options.type) {
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
    this._id = options.id
    this._type = options.type
    this.loadData()
  },
  onShow: function (options) {
  },
  loadData: function () {
    wx.showLoading({
      title: '加载数据',
      mask: true
    })

    lwx.request({
      url: '/use/getWaitUseDetail',
      data: {
        id: this._id,
        type:this._type
      }
    }).then(res => {
      console.log(res)
      wx.hideLoading()
      this.setData({
        loadSuccess: true,
        sealInfo: {
          sealId: res.sealInfo.sealId,
          iconText: res.sealInfo.iconText,
          sealName: res.sealInfo.sealName,
          custosPartyName: res.sealInfo.custosPartyName,
          statusName: res.sealInfo.statusName
        },
        devicesInfo: {
          devicesId: res.devicesInfo.devicesId,
          statusName: res.devicesInfo.statusName,
          status: res.devicesInfo.status,
          devicesCode: res.devicesInfo.devicesCode
        },
        takeInfo: {
          startTime: res.startTime,
          expireTime: res.expireTime,
          statusName: res.statusName,
          status: res.status,
          takeId: res.id
        }
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
  navToApply: function(){
    wx.navigateTo({
      url: `/pages/apply/index/index?sealId=${this.data.sealInfo.sealId}&type=USED_APPLY&sealName=${this.data.sealInfo.sealName}&devicesId=${this.data.devicesInfo.devicesId}&fix=true`,
    })
  },
  returnSeal: function(){
    wx.showLoading({
      title: '归还印章...',
      mask: true
    })

    lwx.request({
      url: '/use/giveBack',
      data: {
        takeId: this.data.takeInfo.takeId,
        devicesId: this.data.devicesInfo.devicesId
      }
    }).then(res => {
      wx.hideLoading()
      this.loadData()
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: '归还印章失败',
        icon: 'none',
        mask: true
      })
    })

  }
})