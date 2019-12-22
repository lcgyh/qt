import {
  userLogin,
  getUserInfo
} from './utils/userUtil.js'
import {
  _globle
} from './utils/globle.js'

import lwx from './utils/lwx.js'
App({
  onLaunch: function() {
    // 展示本地存储能力
    var that = this;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.getLocation({
      success: res => {
        console.log(res)
        _globle.location = {
          latitude: res.latitude,
          longitude: res.longitude
        }
      },
      fail: err => {
        console.log(err)
        wx.showToast({
          title: '定位失败',
          mask: true,
          icon: 'none'
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    client_id: 'xiaochengxu',
    client_secret: 'xiaochengxu',
    grant_type: 'password',
  },
})

// {
//   "pagePath": "pages/task/list/list",
//     "text": "首页",
//       "iconPath": "/images/tarbar1.jpg",
//         "selectedIconPath": "/images/tarbar11.png"
// },