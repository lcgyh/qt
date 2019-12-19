import LPage from '../../../utils/lpage.js'
import { applyTest, getTestTimes} from './biz.js'
import lwx from '../../../utils/lwx.js'

LPage({
  data: {
    loadSuccess: false
  },
  onLoad: function (options) {
    if (!options.devicesId){
      wx.showToast({
        title: '获取参数失败',
        mask: true
      })
    }else{
      this._devicesId = options.devicesId
      this.loadData()
    }
  },
  loadData: function(){
    wx.showLoading({
      title: '数据加载...',
      mask: true
    })
    lwx.request({
      url: '/devices/detail',
      data: {
        devicesId: this._devicesId
      }
    }).then(res => {
      wx.hideLoading()
      if (res.devicesInfo) {
        this.setData({
          loadSuccess: true,
          devicesInfo: {
            iconText: res.devicesInfo.iconText,
            sealName: res.devicesInfo.sealName,
            expireDate: res.devicesInfo.expireDate,
            statusName: res.devicesInfo.statusName,
            devicesCode: res.devicesInfo.devicesCode,
            version: res.devicesInfo.model
          }
        })
      } else {
        throw new Error('加载数据失败')
      }
    }).catch(err => {
      wx.showToast({
        title: '加载数据失败',
        mask: true
      })
    })
  },
  formSubmit: function(e){
    let times = parseInt(e.detail.value.times)
    console.log(times)
    if (!times || times < 1){
      wx.showToast({
        title: '请输入正确的申请次数',
        mask: true,
        icon: "none"
      })
      return ;
    }
    
    wx.showLoading({
      title: '提交申请...',
      mask: true
    })

    lwx.request({
      url: '/apply/apply',
      data: {
        devicesId: this._devicesId,
        times: times,
        type: 'TEST_APPLY',
        cause: '印章测试申请'
      }
    }).then(res => {
      wx.hideLoading()
      wx.showToast({
        title: '申请成功',
        mask: true
      })
      wx.redirectTo({
        url: '../detail/detail?devicesId=' + this._devicesId
      })
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: '申请失败',
        mask: true,
        icon: 'none'
      })
    })
  }
})