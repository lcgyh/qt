import LPage from '../../../utils/lpage.js'
import lwx from '../../../utils/lwx.js'


LPage({

  data: {

  },
  onLoad: function (options) {
    console.log(options)
    if (!options.sealId || !options.useId || !options.type) {
      wx.showToast({
        title: '获取参数失败',
        mask: true,
        icon: 'none'
      })
      return;
    }
    this._useId = options.useId
    this._sealId = options.sealId
    this._type = options.type
    this.setData({
      sealId: this._sealId,
      useId: this._useId,
      type: this._type
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
      url: '/seal/detail',
      data: {
        sealId: this._sealId
      }
    }).then(res => {
      console.log(res.sealInfo)
      if (!res.sealInfo) {
        wx.hideLoading()
        throw new Error('加载数据错误')
      }
      this.setData({
        sealId: this._sealId,
        sealInfo: {
          iconText: res.sealInfo.iconText,
          name: res.sealInfo.sealName,
          partyName: res.sealInfo.custosPartyName
        }
      })

      return lwx.request({
        url: '/devices/list',
        data: {
          sealId: this._sealId,
          pageNo: 1,
          pageSize: 10000,
          devicesStatus: 'ACTIVATE'
        }
      })
    }).then(res => {

      wx.hideLoading()
      if (!res.datas) {
        throw new Error('加载设备列表失败')
      }

      let devicesList = []
      res.datas.map(item => {
        devicesList.push({
          devicesId: item.devicesId,
          alias: item.alias,
          expireDate: item.expireDate,
          devicesStatus: item.statusName
        })
      })
      this.setData({
        loadSuccess: true,
        devicesList: devicesList
      })
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: '加载数据失败',
        mask: true
      })
    })
  }
})