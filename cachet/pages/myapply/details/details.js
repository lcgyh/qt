import LPage from '../../../utils/lpage.js'
import { _globle } from '../../../utils/globle.js'
import { getApplyDetail } from './biz.js'
import lwx from '../../../utils/lwx.js'

LPage({
  applyId: null,
  data: {
    applyDetail: {}
  },
  onLoad: function (options) {
    if (options.applyId){
      this.applyId = options.applyId;
      this.loadData();
    }else{
      wx.showToast({
        title: '参数错误',
        mask: true,
        icon: 'none'
      })
      return ;
    }
  },
  loadData: function(){
    wx.showLoading({
      title: '数据加载',
      mask: true
    })

    lwx.request({
      url: '/apply/detail',
      data: {
        applyId: this.applyId
      }
    }).then(res => {
      console.log(res.data)
      wx.hideLoading()
      let applyDetail = getApplyDetail(res.detail);

      if (applyDetail) {
        this.setData({
          applyDetail
        })
      }
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: '加载失败',
        mask: true,
        icon: 'none'
      })
    })
  },
  edit: function(){
    wx.navigateTo({
      url: `/pages/apply/index/index?fix=ture&applyId=${this.applyId}`,
    })
  },
  retract: function(){
    wx.showLoading({
      title: '撤销申请',
      mask: true
    })

    lwx.request({
      url: '/apply/retract',
      data: {
        "applyId": this.applyId
      }
    }).then(res => {
      wx.hideLoading()
      wx.showToast({
        title: '撤销成功',
        mask: true
      })

      this.loadData()
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: '撤销失败',
        mask: true,
        icon: 'none'
      })
    })
  }
})