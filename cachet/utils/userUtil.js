import {
  _globle
} from './globle.js'
import lwx from '../utils/lwx.js'
export const isLogin = function() {
  return _globle.user.isLogin
}

export const userLogin = function(callback, backUrl) {
  let nabackUrl = backUrl
  new Promise((resoval, reject) => {
    if (!_globle.user.openId) {
      try {
        getOpenId(res => {
          _globle.user.openId = res.openId || '';
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
    })
  }).catch(err => {
    console.log(err)
  })
}

export const getOpenId = function(callback) {
  new Promise(function(resoval, reject) {
    wx.login({
      success: res => {
        resoval(res.code)
        console.log(res.code)
      },
      fail: err => {
        reject('wx login fail')
      }
    })
  }).then(res => {
    wx.request({
      url: _globle.unLoginUrl + 'wechat/getOpenId.htm',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        code: res,
      },
      success: result => {
        console.log('result' + JSON.stringify(result))
        if (result.data.code == '0') {
          callback({
            "openId": result.data.openIdVo.openid,
            "unionId": result.data.openIdVo.unionid
          })
        } else {
          // console.log('result' + JSON.stringify(res))
          throw new Error('get openId error')
        }
      },
      fail: err => {
        console.log(err)
        throw err;
      }
    })
  })
}

export const getUserInfo = function(callback) {
  new Promise(function(resoval, reject) {
    if (!isLogin()) {
      userLogin(resoval)
    } else {
      resoval()
    }
  }).then(res => {
    return lwx.request({
      url: '/party/info',
      data: {}
    })
  }).then(res => {
    console.log('哈哈哈哈哈哈哈' + JSON.stringify(res))
    _globle.user = {
      // ..._globle.user,
      name: res.partys.name,
      portrait: res.partys.portrait,
      loginName: res.partys.loginName,
      type: res.partys.type,
      partyId: res.partys.partyId,
      gender: res.partys.gender,
      mobile: res.partys.mobile,
      email: res.partys.email,
      companyId: res.partys.companyId,
      companyName: res.partys.companyName,
      isLogin: true
    }
    console.log('_globle.user', _globle.user)
    if (callback) {
      callback(res.partys)
    }
  }).catch(err => {
    console.log(err)
  })
}

export const logout = function() {

  lwx.request({
    url: 'user.logout',
  }).then(res => {
    if (res.data.code == '0') {
      console.log(res)

      _globle.user = {
        isLogin: false,
        type: null,
        name: null,
        portrait: null,
        loginName: null
      }
      wx.showToast({
        title: '退出成功',
        icon: 'none'
      })
    } else {
      wx.showToast({
        title: '退出失败',
        icon: 'none'
      })
    }
  }).catch(err => {


  })
}