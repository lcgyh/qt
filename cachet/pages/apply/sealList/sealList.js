import LPage from '../../../utils/lpage.js'
import lwx from '../../../utils/lwx.js'
import temCache from '../../../utils/temCache.js'

Page({
  data: {
    seals: []
  },
  onLoad: function(options) {
    this.loadData();
  },
  loadData: function() {
    var that = this;
    lwx.request({
      url: 'seal.search',
      data: {
        devicesStatus: 'ACTIVATE'
      }
    }).then(res => {
      console.log(res.data)
      if (res.data.code == '0') {
        var array = res.data.seals;
        for(var i = 0;i < array.length;i++){
          array[i].iconText = array[i].sealName.substring(0, 2);
        }
        that.setData({
          seals: array
        })
      } else {
        wx.showToast({
          title: res.data.message,
          mask: true,
          icon: 'none'
        })
      }
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      wx.showToast({
        title: '加载数据失败',
        mask: true,
        icon: 'none'
      })
    })
  },
  navToApply:function(e){
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      sealid: e.currentTarget.dataset.id,
      sealName:e.currentTarget.dataset.sealname,
      useSpecial: e.currentTarget.dataset.usespecial
    })
    wx.navigateBack({
      delta: 1,
    })
  }
})