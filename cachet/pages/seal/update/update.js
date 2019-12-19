import { _globle } from '../../../utils/globle.js'
import { userLogin } from '../../../utils/userUtil.js'
import LPage from '../../../utils/lpage.js'
import lwx from '../../../utils/lwx.js'
import temCache from '../../../utils/temCache.js'

LPage({

  data: {
    people: '',
    custosPartyId: '',
    isForcedPhoto: 'Y',
    sealName: ''
  },
  onLoad: function (options) {
    this._sealId = options.sealId
    this.getdata();
  },
   onShow: function () {
     if (temCache.sealInfo){
      this.setData({
        sealInfo: temCache.sealInfo
      })
    }
  },
  getdata: function () {
    lwx.request({
      url: '/seal/detail',
      data: {
        sealId: this._sealId
      }
    }).then(res => {
      wx.hideLoading()
      if (!res.sealInfo) {
        throw new Error('加载数据错误')
      }
      this.setData({
        sealInfo: {
          partyId: res.sealInfo.custosPartyId,
          partyName: res.sealInfo.custosPartyName,
          limit: res.sealInfo.limitUrgentApply,
          name: res.sealInfo.sealName
        }
      })
      let sealInfo = this.data.sealInfo;
      temCache.sealInfo = sealInfo;
      console.log(temCache.sealInfo)
    })
  },
  switch1Change: function (e) {
    if (e.detail.value === false) {
      temCache.sealInfo.isForcedPhoto = 'N'
    } else {
      temCache.sealInfo.isForcedPhoto = 'Y'
    }
  },
  setName: function (e) {
    temCache.sealInfo.name = e.detail.value
  },
  setLimit: function (e) {
    let limit = parseInt(e.detail.value)
    if (!limit || limit < 1) {
      wx.showToast({
        title: '请输入大于0的整数',
        mask: true,
        icon: 'none'
      })
      return;
    }
    temCache.sealInfo.limit = limit
  },
  fromCommit: function (e) {

    if (!temCache.sealInfo.name) {
      wx.showToast({
        title: '请输入印章名称',
        mask: true,
        icon: 'none'
      })
      return;
    }

    if (!temCache.sealInfo.partyName) {
      wx.showToast({
        title: '请选择保管员',
        mask: true,
        icon: 'none'
      })
      return;
    }
    if (!temCache.sealInfo.limit) {
      wx.showToast({
        title: '请输入正确的次数',
        mask: true,
        icon: 'none'
      })
      return;
    }

    wx.showLoading({
      title: '提交数据...',
      mask: true
    })
    lwx.request({
      url: '/seal/update',
      data: {
        custosPartyId: temCache.sealInfo.partyId,
        sealName: temCache.sealInfo.name,
        isForcedPhoto: temCache.sealInfo.isForcedPhoto || 'N',
        limitUrgentApply: temCache.sealInfo.limit,
        sealId: this._sealId
      }
    }).then(res => {
      wx.hideLoading()
      console.log(res)
      wx.redirectTo({
        url: `../detail/detail?sealId=${this._sealId}`,
      })
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      wx.showToast({
        title: '添加印章失败',
        mask: true,
        icon: 'none'
      })
    })

  }
})