const { request } = require('../utils/request.js')


//获取门店列表
const getSoreList = (data) => {
  return request('sso', '/shops', 'get',data)
}

//获取门店信息
const getSoresIn = (data, successCall, failCall) => {
  return request('sso', '/shops', 'post', data,successCall, failCall)
}


module.exports = {
  getSoreList,
  getSoresIn
}