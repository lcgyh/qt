import {
  _globle
} from './globle.js'
import {
  userLogin
} from './userUtil.js'
const lwx = {
  request(options) {
    if (!options) {
      throw new Error('options error');
    }
    if (!options.data) {
      options.data = {};
    }
    if (!options.style) {
      options.style = 'post';
    }
    var data = JSON.stringify(options.data);
    //将data 转换成json格式字符串 data：{data:"jason String"}
    return new Promise((resolve, reject) => {
      wx.request({
        url: _globle.getBaseUrl() + '?code=seals.api.client.' + options.url,
        method: options.method || options.style,
        header: {
          'content-type': 'application/x-www-form-urlencoded', 
          'cookie': wx.getStorageSync("sessionid")
        },
        data: {
          data: data
        },
        success: res => {
          if (res.data.code == '0') {
            resolve(res);
          } else if (res.data.code == 'E_300'){
            _globle.user.isLogin = false;
            wx.showToast({
              title: '账号未登录',
            })
            // 如果是
            wx.navigateTo({
              url: 'homePage',
            })
          }else{
            wx.showToast({
              title: '请求失败',
              icon: 'none',
            })
          }
        },
        fail: err => {
          reject(err)
        }
      })
    }).catch((e) => {
      reject(e)
    })
  },
  chooseImage: function(datas) {
    console.log(datas)
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        ...datas,
        success: function(res) {
          resolve(res)
        },
        fail: function(err) {
          reject(err)
        }
      })
    })
  },

  uploadFile: function(options) {
    if (!options || !options.url) {
      throw new Error('参数错误')
    }
    if (!options.datas) {
      options.datas = {}
    }
    return new Promise((resolve, reject) => {
      // console.log(_globle.unLoginUrl + options.url + ".htm")
      wx.uploadFile({
        url: _globle.unLoginUrl + options.url + ".htm",
        filePath: options.imgFile,
        name: 'imgFile',
        header: {
          "content-type": "multipart/form-data"
        },
        formData: {
          type: 'xiaochengxu',
        },
        success: function(res) {
          var data = JSON.parse(res.data)　
          if (data.code == '0') {
            resolve(data.result[0])
          } else {
            reject('上传图片失败')
          }
        },
        fail: function(err) {
          reject(err)
        }
      })
    })
  },
  uploadMultiImage: function(options) {

    if (!options || !options.url || !options.filePaths || options.filePaths.length < 1) {
      throw new Error('参数错误')
    }
    if (!options.datas) {
      options.datas = {}
    }
    if (!options.headers) {
      options.headers = {}
    }
    // return this.onceUpload(options, [])
  },
  onceUpload: function(options, resList) {
    console.log(options, resList)
    let filePath = options.filePaths.pop()
    return this.uploadFile({
      ...options,
      filePath: filePath
    }).then(res => {
      resList.push({ ...res,
        templateUrl: filePath
      })
      if (options.filePaths.length > 0) {
        return this.onceUpload(options, resList)
      } else {
        return new Promise((resolve, reject) => {
          resolve(resList)
        })
      }
    })
  }
}
export default lwx;



