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
  loadData: function () {
    wx.showLoading({
      title: '加载数据...',
    })
    lwx.request({
      url: 'company.list'
    }).then(res => {
      const resdata = res.data || {}
      wx.hideLoading()
      if (resdata.code == '0') {
        this.setData({
          companyList: resdata.icompany
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
  switchCompany: function (e) {
    console.log(e)
    let id = e.currentTarget.dataset.id

    wx.showLoading({
      title: '切换公司...'
    })

    lwx.request({
      url: 'company.switch',
      data: {
        companyId: id
      }
    }).then(res => {
      console.log('res', res)
      const resData = res.data || {}
      if (resData.code == '0') {
        const icompany = resData.icompany || {}
        _globle.user.companyId = icompany.companyId
        _globle.user.companyName = icompany.companyName
        lwx.request({
          url: 'user.info',
          data: {}
        }).then(res => {
          const useresData = res.data || {}
          console.log('useresData', useresData)
          if (useresData.code == '0') {
            _globle.user = useresData.partys;
            _globle.user.isLogin = true;
            wx.showModal({
              title: '提示',
              content: '操作成功',
              confirmText: "好",
              showCancel: false,
              success: res => { }
            })
          } else {
            wx.showToast({
              title: useresData.code,
              icon: 'none',
              duration: 2000
            })
          }
        })
      } else {
        wx.showToast({
          title: resData.code,
          icon: 'none',
          duration: 2000
        })
      }
      wx.hideLoading()
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