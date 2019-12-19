export default class LPage_Module_Base {
  constructor(options) {
    let c = 0;
    for (let key in options) {
      if (options.hasOwnProperty(key)) {
        switch (key) {
          case 'onLoad':
          case 'onReady':
          case 'onShow':
          case 'onHide':
          case 'onUnload':
            this['__' + key] = options[key];
            break;
          default:
            this[key] = options[key];
            break;
        }
      }
    }
    wrapLifeCycle(this, 'onLoad', true);
    wrapLifeCycle(this, 'onReady', false);
    wrapLifeCycle(this, 'onShow', false);
    wrapLifeCycle(this, 'onHide', false);
    wrapLifeCycle(this, 'onUnload', true);
  };
};

function wrapLifeCycle(lpage, type, isOnce) {
  let __type = '__' + type;
  let fn = lpage[type];
  let invoked = false;
  lpage[type] = function() {
    let args = Array.prototype.slice.call(arguments, 0);
    if (!isOnce || isOnce && !invoked) {
      invoked = true;
      if (type == 'onLoad') {
        lpage.__page = this;
        this.__lpage = lpage;
      }
      fn && fn.apply(lpage, args);
    }
    lpage[__type] && lpage[__type].apply(this, args);
  };
}