const { request } = require('../utils/request.js')

//获取首页信息
const getIndexInfo = () => {
  return request('sso', '/homePage/content', 'get')
}
//获取进入首页弹窗
const getIndexPop =()=>{
  return request('sso', '/popup', 'get')
}
//首页主题精选tab切换请求数据
const getIndexTabList = (data) => {
  return request('sso', `/homePage/pdFlowSpu/${data.pdFlowTabId}`, 'get')
}

module.exports = {
  getIndexInfo,
  getIndexPop,
  getIndexTabList
}