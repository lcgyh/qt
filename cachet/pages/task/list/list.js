import { _globle } from '../../../utils/globle.js'
import { getOpenId } from '../../../utils/userUtil.js'

Page({
  
  data: {
    imgUrls: [
      { url: '/images/banner02.jpg' }
    ],
    heightimg:null,
    dot:1,
    LoadSuccess: true
  },
  onLoad: function (options) {
    var that=this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          heightimg: res.windowHeight
        })
      },
    })
    console.log(_globle.user)
    if (_globle.user.isLogin){
      wx.switchTab({
        url: '/pages/index/index'
      })
    }else{
      new Promise((resoval, reject) => {
        if (!_globle.user.openId) {
          try {
            getOpenId(res => {
              _globle.user.openId = res.openId;
              _globle.user.unionId = res.unionId || '';
              resoval();
            })
          } catch (err) {
            throw err;
          }
        } else {
          resoval();
        }
      }).then(res => {
        return new Promise((resoval, reject) => {
          // wx.request({
          //   url: _globle.getBaseUrl() + '/oauth/token',
          //   method: 'POST',
          //   header: {
          //     'content-type': 'application/x-www-form-urlencoded'
          //   },
          //   data: {
          //     client_id: _globle.clientId,
          //     client_secret: _globle.clientSecret,
          //     ip: '127.0.0.1',
          //     openId: _globle.user.openId,
          //     unionId: _globle.user.unionId,
          //     grant_type: 'password',
          //     smsCode: ''
          //   },
          //   success: res => {
          //     resoval(res)
          //   },
          //   fail: err => {
          //     reject(err)
          //   }
          // })
        })
      }).then(res => {
        if (res.data.access_token) {
          _globle.token = res.data.access_token
          _globle.user.isLogin = true
          wx.switchTab({
            url: '/pages/index/index',
          })
        }else{
          this.setData({
            LoadSuccess: true
          })
        }
      }).catch(err => {
        this.setData({
          LoadSuccess: true
        })
      })
    }
  },
  
  switchNav:function(e){
    let type = e.currentTarget.dataset.type
    this.setData({
      type: type
    })

  },

 
  
  getCurrent: function (e) {
    var current = e.detail.current;
    this.setData({
      dot: current + 1
    })
  }
})