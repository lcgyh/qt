import { _globle } from '../../../utils/globle.js'
import LPage from '../../../utils/lpage.js'
import lwx from '../../../utils/lwx.js'

Page({
  onLoad: function (options) {

    if (!options.sealId || !options.sealName) {
      wx.showToast({
        title: '参数错误',
        mask: true,
        icon: 'none'
      })
      return;
    }
    this._sealId = options.sealId
    this._sealName = options.sealName
    this.setData({
      sealName: this._sealName
    })
  },
  setName: function(e){
    this._sealName = e.detail.value
  },
  submit: function(){

    if(!this._sealName){
      wx.showToast({
        title: '请输入印章名称',
        mask: true,
        icon: 'none'
      })
      return ;
    }

    wx.showLoading({
      title: '提交信息',
      mask: true
    })

    lwx.request({
      url: '/devices/edit',
      data: {
        sealId : this._sealId,
        name: this._sealName
      }
    }).then(res => {
      wx.hideLoading()
      wx.showToast({
        title: '修改成功',
        mask: true
      })
      wx.navigateBack({})
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: '修改失败',
        mask: true,
        icon: 'none'
      })
    })

  }
})