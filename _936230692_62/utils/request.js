const Domains = require('../config.js')
const {
  getUrl
} = require('./util.js')
const env = 'dev'

const request = (Domain, url, method, data, successCall, failCall) => {
  let _url = Domains[env][Domain] + url
  return new Promise((resolve, reject) => {
    let header = {
      'Accept': 'application/json',
      'content-type': "application/json",
    }
    const token = wx.getStorageSync('token')
    const spshopid = wx.getStorageSync('spShopId')
    const source = wx.getStorageSync('source')
    const version = wx.getStorageSync('version')


    header["accessToken"] = token
    header["spshopid"] = spshopid
    header["source"] = source
    header["version"] = version || '2.0.0'
    header["platform"] = 'applet'
    wx.request({
      url: _url,
      method: method,
      header: header,
      data: data,
      success(res) {
        resolve(res.data)
      },
      fail(error) {
        console.log('error', error)
        wx.showToast({
          title: error,
          icon: 'none',
          duration: 2000
        })
        reject(error)
      },
      complete(res) {
        // 加载完成
        const statusCode = res.statusCode
        const resData = res.data || {}
        const msg = resData.message || resData.errorMsg
        if (statusCode == 200) {
          if (resData.code == 200 && successCall) {
            successCall(resData)
          }
          if (resData.code != 200) {
            if (failCall) {
              failCall(resData)
            } else {
              wx.showToast({
                title: msg,
                icon: 'none',
                duration: 2000
              })
            }
          }
        } else {
          wx.showToast({
            title: msg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  })
}

/**
 * 小程序的promise没有finally方法，自己扩展下
 */
Promise.prototype.finally = function (callback) {
  var Promise = this.constructor;
  return this.then(
    function (value) {
      Promise.resolve(callback()).then(
        function () {
          return value;
        }
      );
    },
    function (reason) {
      Promise.resolve(callback()).then(
        function () {
          throw reason;
        }
      );
    }
  );
}

module.exports = {
  request
}