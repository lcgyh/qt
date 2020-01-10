// function e(e) {

//     var o = getCurrentPages(), n = o[o.length - 1].selectComponent(e);
//     console.log('o',o)
//     return n || (console.error("无法找到对应的组件，请按文档说明使用组件"), null);
// }
// function n() {
//   getCom("#data-loading").showLoading();
// }
// function o(o) {
//     var n = o.selector;
//     e(void 0 === n ? "#toast" : n).handleShow(o);
// }
// o.hide = function() {
//     e(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "#toast").handleHide();
// }

//获取当前页页面引用的组件
const getCom=id=>{
  const currentPage = getCurrentPages()
  const currentCom = currentPage[currentPage.length - 1].selectComponent(id);
  return currentCom
}
//开始loading
const $Loading = () => {
  getCom("#data-loading").showLoading();
}
//结束loading
const $Loading_hide = () => {
  getCom("#data-loading").hideLoading();
}

//开启toast
const $Toast=(data)=>{
  getCom("#toast").handleShow(data);
}

//关闭toast
const $Toast_hide=()=>{
  getCom("#toast").handleHide();
}

const $Message =(o)=>{
  getCom("#message").handleShow(o);
}

module.exports = {
  $Toast,
  $Toast_hide,
  $Message,
  $Loading,
  $Loading_hide,
};