import LPage from '../../../utils/lpage.js'
import { _globle } from '../../../utils/globle.js'
import lwx from '../../../utils/lwx.js'

LPage({

  data: {
  },
  onLoad: function (options) {
    if (!options.verifyId){
      wx.showModal({
        title: '参数错误',
        content: '参数错误',
        showCancel: false,
        confirmText: '返回',
        success: function(){
          wx.navigateBack({})
        }
      })
    }
    this._verifyId = options.verifyId;
    this.loadData();
  },
  loadData: function(){
    wx.showLoading({
      title: '加载数据...',
      mask: true
    })
    lwx.request({
      url: '/install/verifyDetail',
      data: {
        installId: this._verifyId
      }
    }).then(res => {
      wx.hideLoading()
      if (res.result == 0){
        this.setData({
          ...res
        })
      }else{
        throw new Error('')
      }
    }).catch(err => {
      console.log(err)
      wx.showToast({
        title: '加载数据失败',
        mask: true,
        icon: 'none'
      })
    })
  },
  verify: function(e){
    let result = e.target.dataset.result

    wx.showLoading({
      title: '提交数据...',
      mask: true
    })

    lwx.request({
      url: '/install/verify',
      data: {
        installId: this._verifyId,
        result: result
      }
    }).then(res => {
      wx.hideLoading()
      wx.showToast({
        title: '审核成功',
        maks: true
      })
      wx.navigateBack({})
    }).catch(err => {
      wx.hideLoading()
      let errMsg = typeof err == 'string' ? err : '请求失败'
      wx.showToast({
        title: errMsg || '请求失败',
        mask: true,
        icon: 'none'
      })

    })

  }
})