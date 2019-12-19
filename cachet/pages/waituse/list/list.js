// pages/manage/newlist/newlist.js
import { _globle } from '../../../utils/globle.js'
import { userLogin } from '../../../utils/userUtil.js'
import LPage from '../../../utils/lpage.js'
import lwx from '../../../utils/lwx.js'
LPage({
  pageNo: 10,
  hasMore: true,
  data: {
    type: 'USED_APPLY',
    loadSuccess: false
  },
  onLoad: function (options) {
    wx.getSystemInfo({
      success: res => {
        this.setData({
          scrollHeight: res.windowHeight
        });
      }
    })
  },
  onShow: function(){
    this.loadData()
  },
  loadData: function () {

    wx.showLoading({
      title: '加载数据...',
      mask: true
    })

    lwx.request({
      url: '/use/getWaitUseList',
      data: {
        applyType: this.data.type
      }
    }).then(res => {
      wx.hideLoading()
      console.log(res)
      let sealList = []

      res.datas.map(item => {

        sealList.push({
          iconText: item.iconText,
          sealName: item.sealName,
          custos: item.custos,
          id: item.id,
          total: item.total,
          surplus: item.surplus,
          statusName: item.statusName,
          url: this.getNavUrl(item)
        })

      })

      this.hasMore = sealList.length === this.pageNo
      console.log(sealList)
      this.setData({
        sealList: sealList,
        loadSuccess: true,
        nodata: !this.hasMore
      })

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
  switchType: function(e){
    let type = e.currentTarget.dataset.type
    this.setData({
      type: type,
      loadSuccess: false,
      sealList: []
    })

    this.loadData()
  },
  getNavUrl: function(sealInfo){
    let url = `../detail/detail?id=${sealInfo.id}&type=${this.data.type}`
    if (sealInfo.status === 'WAIT_RETURN'){
      url = `../takeDetail/takeDetail?id=${sealInfo.id}&type=${this.data.type}`
    }
    console.log(url)
    return url
  },
  
})