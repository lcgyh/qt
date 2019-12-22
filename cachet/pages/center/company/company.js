import { _globle } from '../../../utils/globle.js'
import LPage from '../../../utils/lpage.js'
import lwx from '../../../utils/lwx.js'
import { getUserInfo } from '../../../utils/userUtil.js'

LPage({

  data: {

  },
  onLoad: function (options) {
    console.log(_globle.user)
    this.loadData()
  },
  loadData: function(){

    wx.showLoading({
      title: '加载数据...',
    })

    lwx.request({
      url: '/company/list'
    }).then(res => {
      wx.hideLoading()
      if (res.companyList){
        this.setData({
          companyList: res.companyList
        })
      }
    }).catch(err => {
      console.log(err)
      wx.showToast({
        title: err,
        mask: true,
        icon: 'none'
      })
    })
  },
  switchCompany: function(e){
    console.log(e)
    let id = e.currentTarget.dataset.id

    wx.showLoading({
      title: '切换公司...'
    })

    lwx.request({
      url: '/company/switch',
      data: {
        companyId: id
      }
    }).then(res => {
      wx.hideLoading()
      getUserInfo(() => {
        wx.navigateBack({
          
        })
      })
    }).catch(err => {
      console.log(err)
      wx.hideLoading()      
      wx.showToast({
        title: err,
        mask: true,
        icon: 'none'
      })
    })

  }
})