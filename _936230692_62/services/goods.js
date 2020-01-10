const { request } = require('../utils/request.js')


//根据关键字搜索商品
const searchGoodsbyword = (data, successCall, failCall) => {
  return request('sso', '/products/searchByPage', 'get', data, successCall, failCall)
}
//根据商品id查询商品详情
const getGoodsInfo = (data, successCall, failCall)=>{
  return request('sso', 'products/search', 'get', data, successCall, failCall)
}

module.exports = {
  searchGoodsbyword,
  getGoodsInfo
}