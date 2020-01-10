const { request } = require('../utils/request.js')


//获取门店列表
const getSoreList = (data) => {
  return request('sso', '/shops', 'get',data)
}

module.exports = {
  getSoreList
}