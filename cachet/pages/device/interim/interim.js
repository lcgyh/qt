import { _globle } from '../../../utils/globle.js'
import { userLogin } from '../../../utils/userUtil.js'
import LPage from '../../../utils/lpage.js'
import lwx from '../../../utils/lwx.js'
import temCache from '../../../utils/temCache.js'
import { getDateFromStr, getStrFromDate } from '../../../utils/dateUtil.js'

LPage({

  data: {
    start: getStrFromDate(new Date()),
  },
  onLoad: function (options) {
    if(!options.sealId){
      wx.showToast({
        title: '参数错误',
        mask: true,
        icon: 'none'
      })
      return ;
    }
    this._sealId = options.sealId
    temCache.interim = {}
    this.setData({
      expireTime: '',
      editAble: false,
      releaseAble: false
    })

    this.loadData()
  },
  onShow: function(){
    this.setData({
      interim: temCache.interim
    })
  },
  changeTime: function (e) {
    let time = e.detail.value
    let name = e.currentTarget.dataset.name
    this.setData({
      [name]: time
    })
  },
  loadData: function(){
    wx.showLoading({
      title: '加载数据...',
      mask: true
    })

    lwx.request({
      url: '/devices/position',
      data: {
        sealId: this._sealId
      }
    }).then(res => {
      wx.hideLoading()
      if (res.positionType == 3){
        this.setData({
          interim: {
            partyName: res.partyName + '(外带)',
          },
          editAble: false,
          releaseAble: false,
          expireTime: res.expireTime
        })
      } else if (res.positionType == 2){
        temCache.interim.partyId = res.partyId
        temCache.interim.partyName = res.partyName
        this.setData({
          interim: {
            partyName: res.partyName,
          },
          editAble: true,
          releaseAble: true,
          expireTime: res.expireTime
        })
      }else{
        this.setData({
          editAble: true
        })
      }
    }).catch(err => {
      let errMsg = typeof err == 'string' ? (err || '') : '加载数据失败'
      wx.hideLoading()
      wx.showToast({
        title: errMsg,
        mask: true
      })
    })

  },
  fromCommit:function(e){
    wx.showLoading({
      title: '设置临时保管员',
      mask: true
    })

    if (!temCache.interim.partyId){
      throw new Error('请选择保管员')
    }
    if (!this.data.expireTime){
      throw new Error('请选择失效时间')
    }

    lwx.request({
      url: '/devices/setInterim',
      data: {
        sealId: this._sealId,
        partyId: temCache.interim.partyId,
        expireTime: this.data.expireTime
      }
    }).then(res => {
      wx.hideLoading()
      wx.navigateBack({})
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      wx.showToast({
        title: err,
        mask: true,
        icon: 'none'
      })
    })
  },
  release: function(){

    wx.showLoading({
      title: '解除临时授权',
      mask: true
    })

    lwx.request({
      url: '/devices/releaseInterim',
      data: {
        sealId: this._sealId
      }
    }).then(res => {

      wx.hideLoading()
      wx.showToast({
        title: '解除成功',
        mask: true
      })

      wx.navigateBack({})
    }).catch(err => {
      let errMsg = typeof err == 'string' ? (err || '') : '解除失败'
      wx.hideLoading()
      wx.showToast({
        title: errMsg,
        mask: true
      })
    })
  }
})