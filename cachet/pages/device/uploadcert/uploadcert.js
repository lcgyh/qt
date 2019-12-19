import { _globle } from '../../../utils/globle.js'
import lwx from '../../../utils/lwx.js'
import LPage from '../../../utils/lpage.js'

LPage({
  data: {
    loadSuccess: false,
    devicesInfo: {
      deviceId: null,
      alias: null
    }
  },
  onLoad: function (options) {
    console.log(options)
    if (!options.devicesId || !options.actId) {
      wx.showToast({
        title: '获取参数失败',
        mask: true,
        icon: 'none'
      })
    } else {
      this._devicesId = options.devicesId
      this._useId = options.useId
      this._actId = options.actId
      this._backUrl = options.backUrl
      this._type = options.type
      this.loadData()
    }
  },
  loadData: function () {
    wx.showLoading({
      title: '加载信息...',
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
          isUse: false,
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
      wx.hideLoading()
      wx.showToast({
        title: '加载信息失败',
        mask: true,
        icon: 'none'
      })
    })

  },
  onUpload: function () {
    let that = this
    lwx.chooseImage({
      count: 3
    }).then(res => {
      console.log(res)
      if (!res.tempFilePaths[0]) {
        throw new Error('未选择图片')
      }
      wx.showLoading({
        title: '图片上传...',
        mask: true
      })
      return lwx.uploadMultiImage({
        url: '/common/fileupload',
        filePaths: res.tempFilePaths,
        name: 'file',
      })
    }).then(res => {
      console.log(res)

      let fileIds = ''
      for (let i = 0; i < res.length; i++) {
        fileIds += res[i].id
        if (i !== res.length - 1) {
          fileIds += ','
        }
      }

      return lwx.request({
        url: '/use/uploadUseImg',
        data: {
          actId: this._actId,
          fileIds: fileIds
        }
      })
    }).then(res => {
      console.log(res)
      wx.hideLoading()
      wx.showToast({
        title: '上传凭证成功'
      })
      console.log(this._backUrl)
      if (this._backUrl){
        
        wx.switchTab({
          url: this._backUrl,
          success: res => {
            console.log('切换成功')
          },
          fail: err => {
            console.log(err)
            wx.redirectTo({
              url: `${this._backUrl}?type=${this._type}&useId=${this._actId}&devicesId=${this._devicesId}`
            })
          }
        })
      }else{
        wx.navigateBack({})
      }
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      wx.showToast({
        title: '上传凭证失败'
      })
    })
  }
})