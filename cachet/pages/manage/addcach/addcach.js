// pages/addcach/addcach.js
import { _globle } from '../../../utils/globle.js'
import { userLogin } from '../../../utils/userUtil.js'
import lwx from '../../../utils/lwx.js'
import LPage from '../../../utils/lpage.js'
LPage({
  data: {
    number:''
  },
  onLoad: function (options) {
    this.getnumber()
  },
  getnumber:function(options){
    var that=this;
    let number = that.options.devicesId;
    that.setData({
      number:number
    })
  },
  formSubmit:function(e){
    var that=this;
    let devicesId = e.detail.value.devicesId;
    let alias = e.detail.value.alias;
    if (alias==''){
      wx.showToast({
        title: '名称不能为空',
        icon: 'none',
        duration: 2000
      })
    }else{
      lwx.request({
        url: '/devices/bind',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'token': _globle.token
        },
        data: {
          client_id: _globle.clientId,
          devicesId: devicesId,
          alias: alias
        }
      }).then(res => {
        if (res.result === 0) {
          wx.showToast({
            title: '绑定成功',
            icon: 'succes',
            duration: 1000
          })
          setTimeout(function () {
            wx.redirectTo({
              url: `../details/details?devicesId=${devicesId}`,
            })
          }, 1000)
        } else if ((res.result === -1)) {
          wx.showToast({
            title: '绑定失败',
            icon: 'none'
          })
        }
      }).catch(err => {
        throw err;
      })
    }
  }
})