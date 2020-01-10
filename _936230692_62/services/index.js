const storeApi = require('./store.js')
const userApi = require('./user.js')
const publicApi = require('./public.js')
const goodsApi = require('./goods.js')
module.exports = {
  ...storeApi,
  ...userApi,
  ...publicApi,
  ...goodsApi,
}