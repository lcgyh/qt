import lwx from '../../../utils/lwx.js'
import LPage from '../../../utils/lpage.js'

LPage({
  data: {
    tempFilePaths: []
  },
  onLoad: function(options){

    if(!options.useId){
      wx.showToast({
        title: '参数错误',
        mask: true,
        icon: 'none'
      })
      return ;
    }
    console.log(options)
    this._useId = options.useId
    this.loadData()
    if (options.devicesId){
      this.setData({
        devicesId: options.devicesId
      })
    }
  },

  loadData: function(){

    wx.showLoading({
      title: '加载数据...',
      mask: true
    })

    lwx.request({
      url: '/use/recordDetail',
      data: {
        id: this._useId
      }
    }).then(res => {
      wx.hideLoading()
      if (!res.useId){
        throw new Error()
      }

      this.setData({
        loadSuccess: true,
        ...res
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
  chosePhoto: function(){

    wx.showToast({
      title: '请选择图片',
      content: '使用凭证限制上传1-3张',
      icon: 'none'
    })

    lwx.chooseImage({
      count: 3
    }).then(res => {
      console.log(res)
      if (res.tempFilePaths.length < 1) {
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
      for(let i = 0 ;i < res.length; i++){
        fileIds += res[i].id
        if(i !== res.length - 1){
          fileIds += ','
        }
      }

      return lwx.request({
        url: '/use/uploadUseImg',
        data: {
          useId: this._useId,
          fileIds: fileIds
        }
      })

    }).then(res => {
      console.log(res)
      wx.hideLoading()
      wx.showToast({
        title: '上传凭证成功',
        mask: true
      })

      this.loadData()
    }).catch(err => {
      console.log(err)
      wx.showToast({
        title: '请选择使用凭证图片',
        mask: true,
        icon: 'none'
      })
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: this.data.voucherList
    })
  },
  previewApplyImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: this.data.applyVoucherList
    })
  },
  censor: function(){

    wx.showLoading({
      title: '核查提交...',
      mask: true
    })
    
    lwx.request({
      url: '/use/censor',
      data: {
        useId: this._useId
      }
    }).then(res => {

      wx.hideLoading()
      wx.showToast({
        title: '核查提交成功',
        mask: true
      })
      this.setData({
        devicesId: ''
      })
      this.loadData()
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      wx.showToast({
        title: '核查提交失败',
        mask: true,
        icon: 'none'
      })
    })

  }
})