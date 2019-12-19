// pages/papplydetails/details.js
import { _globle } from '../../../../utils/globle.js'
import { userLogin } from '../../../../utils/userUtil.js'
import lwx from '../../../../utils/lwx.js'
import LPage from '../../../../utils/lpage.js'
LPage({
  data: {
    detail:[]
  },
  onLoad: function (options) {
    if (!options.applyId) {
      wx.showToast({
        title: '获取参数失败'
      })
    }
    this._applyId = options.applyId;
    this.getdata();
  },
  getdata: function (options){
    var that=this;
    lwx.request({
      url: '/apply/detail',
      data: {
        client_id: _globle.clientId,
        applyId: that._applyId
      }
    }).then(res => {
      console.log(res)
      let detail = res.detail;
      that.setData({
        detail: detail
      })
      
    }).catch(err => {
      wx.showToast({
        title: '加载数据失败'
      })
    })
  }
})