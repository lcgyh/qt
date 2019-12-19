import LPage from '../../../utils/lpage.js'
import lwx from '../../../utils/lwx.js'


LPage({
  data: {
  
  },
  onLoad: function (options) {
    if(!options.devicesId){
      wx.showToast({
        title: '获取参数失败',
        mask: true,
        icon: 'none'
      })
      return ;
    }

    this._devicesId = options.devicesId
  },
  onShow: function(){
    this.loadData()
  },
  loadData: function(){

    wx.showLoading({
      title: '加载数据...',
      mask: true
    })

    lwx.request({
      url: '/use/acts',
      data: {
        devicesId: this._devicesId,
        type: 'all',
        applyType: 'TEST_APPLY'
      }
    }).then(res => {
      wx.hideLoading()
      console.log(res)

      let list = []

      res.actList.map(item => {
        list.push({
          actId: item.actId,
          useTime: item.useTime,
          sealName: item.sealName
        })
      })

      this.setData({
        actList: list
      })

    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: '加载数据失败',
        mask: true,
        icon: 'none'
      })
    })

  },
  toDetail: function(e){
    wx.navigateTo({
      url: '/pages/use/actdetail/actdetail?actId=' + e.currentTarget.dataset.actid,
    })
  }
})