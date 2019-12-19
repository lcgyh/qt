// pages/storeman/storeman.js
import { _globle } from '../../../utils/globle.js'
import { userLogin } from '../../../utils/userUtil.js'
import LPage from '../../../utils/lpage.js'
import lwx from '../../../utils/lwx.js'
import temCache from '../../../utils/temCache.js'



LPage({

  data: {
    search_value:'',
    showlist:false,
    nobody:false,
    choseselect:'',
    name:''
  },
  onLoad:function(options){
    console.log(options)
    if(!options.sealId){
      wx.showModal({
        title: '参数错误',
        showCancel: false,
        confirmText: '返回',
        success: function(res){
          wx.navigateBack({})
        }
      })
    }
    this._sealId = options.sealId
    if(options.partyId){
      this._partyId = options.partyId
    }

    if (options.partyName) {
      this._partyName = options.partyName
    }
  },
  onShow: function () {
    this.setData({
      partyInfos: [],
      search_value: '',
      showlist: false,
      nobody: false,
      choseselect: ''
    })
  },
  searchvalue:function(e){
     var search_value = e.detail.value;
     this.setData({
       search_value: search_value
     })
    if (search_value==''){
      this.setData({
        showlist: true,
        nobody:false
      })
     }
  },
  searchList: function (e) {
    var that = this;
    let loginName = that.data.search_value;
    if (loginName!==''){
      lwx.request({
        url: '/party/search',
        data: {
          client_id: _globle.clientId,
          loginName: loginName,
          // isSystem: 'N'
        }
      }).then(res => {
        console.log(res)
        if (res.result === 0) {
            if (res.partyInfos == null) {
              that.setData({
                nobody: true,
                showlist: true
              })
            } else {
              let partyInfos = []
              res.partyInfos.map(item => {
                console.log(item.partyId)
                console.log(this._partyId)
                console.log(item.partyId != this._partyId)
                if (item.partyId != this._partyId){
                  partyInfos.push(item)
                }
              })
              that.setData({
                partyInfos: partyInfos,
                showlist: true,
                nobody:false
              })
            }
        } else if(res.result === -1){
            wx.showToast({
              title: '获取失败',
              icon:'none'
             })
          }
      }).catch(err => {
        throw err;
      })
    }else{
      wx.showToast({
        title: '搜索不能为空',
        icon:'none'
      })
    }
  },
  chosePeople:function(e){
    let partyId = e.currentTarget.dataset.partyid
    
    wx.showLoading({
      title: '修改管理员...',
      mask: true
    })

    lwx.request({
      url: '/devices/setCust',
      data: {
        sealId: this._sealId,
        partyId: partyId
      }
    }).then(res => {
      wx.hideLoading()
      wx.showToast({
        title: '修改成功',
        mask: true
      })
      wx.navigateBack({
        delta: 2
      })
    }).catch(err => {
      let errMsg = '修改失败'
      if(typeof err === 'string'){
        errMsg = err
      }

      wx.showToast({
        title: errMsg,
        mask: true,
        icon: 'none'
      })
    })
  }
})