import LPage from '../../../utils/lpage.js'
import lwx from '../../../utils/lwx.js'

LPage({
  data: {
  
  },
  onLoad: function (options) {

    this.scanCode()

    if(options.sealId){
      this._sealId = options.sealId
      this.getSeal()
    }else{
      this.setData({
        loadSuccess: true
      })
    }
  },
  getSeal: function(){
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
      console.log(res)
      wx.hideLoading()
      this.setData({
        loadSuccess: true,
        sealName: res.sealInfo.sealName
      })
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      wx.showToast({
        title: '加载数据失败',
        mask: true
      })
    })
  },
  scanCode: function(){
    wx.scanCode({
      success: res => {
        console.log(res)
        let content = JSON.parse(res.result)
        this.setData({
          code: content.code,
          model: content.model,
          version: content.version,
          productDate: content.productDate,
          expireDate: content.expireDate 
        })
      },
      fail: err => {
        console.log(err)
        wx.showModal({
          title: '扫码失败',
          content: '是否继续扫码',
          cancelText: '否',
          confirmText: '是',
          success: res => {
            if(res.confirm){
              this.scanCode()
            }else{
              wx.navigateBack({})
            }
          }
        })
      }
    })
  },
  formSubmit: function(e){
    let alias = e.detail.value.alias
    console.log(alias)
    if(!alias){
        wx.showToast({
          title: '请输入设备标识',
          mask: true,
          icon: 'none'
        })
        return ;
    }

    wx.showLoading({
      title: '添加设备...',
      mask: true
    })

    lwx.request({
      url: '/devices/add',
      data: {
        sealId: this._sealId,
        alias: alias,
        devicesCode: this.data.code,
        model: this.data.model,
        produceDate: this.data.productDate,
        expireDate: this.data.expireDate,
        devicesVersion: this.data.version
      }
    }).then(res => {
      wx.hideLoading()
      wx.showToast({
        title: '添加设备成功',
        mask: true
      })

      wx.redirectTo({
        url: `../../seal/detail/detail?sealId=${this._sealId}`,
      })
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      wx.showToast({
        title: '添加设备失败',
        mask: true,
        icon: 'none'
      })
    })
  }
})