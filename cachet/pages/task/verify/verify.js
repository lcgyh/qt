import LPage from '../../../utils/lpage.js'
import { _globle } from '../../../utils/globle.js'
import lwx from '../../../utils/lwx.js'

LPage({

  data: {
  },
  onLoad: function (options) {
    if (options.type && options.verifyId){
      this._type = options.type;
      this._verifyId = options.verifyId;
      this.loadData();
    }
    this.setData({
      items: [
        { name: '同意', key: 'PASSED', checked: 'true' },
        { name: '拒绝', key: 'REJECT' },
      ],

      result: 'PASSED',
      text_why: ''
      })
  },
  onRadioChange: function (e) {
    this.setData({
      result: e.detail.value
    })
  },
  textareaValue:function(e){
    this.setData({
      text_why:e.detail.value
    })
  },
  onSubmit: function(e){
    if (!this.data.text_why && this.data.result === 'REJECT'){
      wx.showToast({
        title: '请输入拒绝理由',
        mask: true,
        icon:'none'
      })

      return ;
    }

    console.log(this.data.result, this.data.text_why)

    wx.showLoading({
      title: '审核提交...',
      mask: true
    })
    lwx.request({
      url: '/verify/verify',
      data: {
        verifyId: this._verifyId,
        applyId: this._applyId,
        result: this.data.result,
        remark: this.data.text_why || ''
      }
    }).then(res => {
      wx.hideLoading()
      wx.switchTab({
        url: '/pages/index/index',
      })
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: '提交失败',
        icon:'none'
      })
    })
  },
  loadData: function(){
    let that = this
    lwx.request({
      url: '/verify/detail',
      data: {
        verifyId: this._verifyId,
        type: this._type
      }
    }).then(res => {
      console.log(res)
      if (res.verifyInfo){
        that.setData({
          applyDetail: {
            portrait: res.verifyInfo.portrait || '/images/people.png',
            partyName: res.verifyInfo.applyPartyName || null,
            applyType: res.verifyInfo.applyTypeName,
            applyTime: res.verifyInfo.applyTime,
            sealName: res.verifyInfo.sealName,
            times: res.verifyInfo.times,
            cause: res.verifyInfo.cause,
            takeStartTime: res.verifyInfo.useStartTime,
            takeEndTime: res.verifyInfo.useEndTime,
            vouchers: res.verifyInfo.vouchers,
            address: res.verifyInfo.address
          }
        })
      }

    }).catch(err => {
      console.log(err)
      wx.showToast({
        title: '加载数据失败'
      })
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: this.data.applyDetail.vouchers
    })
  }
})