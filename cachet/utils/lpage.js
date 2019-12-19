import LPage_Module_Base from './base.js'
import { userLogin, getUserInfo, isLogin } from './userUtil.js'
import { _globle } from './globle.js'
import lwx from './lwx.js'

export default function LPage(options) {

  let pageData = {
    onLoad: function (args) {
      let ins = LPage.createInstance(options);
      for (let k in ins) {
        if (ins.hasOwnProperty(k)) {
          if (k == 'data') {
            this.data = ins[k];
            this.setData(ins[k]);
          } else if (
            k == '__lpage' ||
            k.indexOf('__') != 0 ||
            options.hasOwnProperty(k)) {
            this[k] = ins[k];
          }
        }
      }

      if (!isLogin()) {
        console.log('未登录')
        this._loginStatus = 'toLogin'
        userLogin(res => {
          this._loginStatus = 'hasLogin'
          getUserInfo(() => {
            this.selectCompany(args.companyId, () => this.onLoad(args))
          })
        }, '/' + this.route)
      } else {
        console.log('已登录')
        if (!_globle.user.name){
          getUserInfo(() => {
            this.selectCompany(args.companyId, () => this.onLoad(args))
          })
        }else{
          this.selectCompany(args.companyId, () => this.onLoad(args))
        }
      }
    },
    selectCompany: function(companyId, callback){
      if (companyId) {
        console.log('切换公司')
        lwx.request({
          url: '/company/switch',
          data: {
            companyId: companyId
          }
        }).then(res => {
          if (res && res.company) {
            _globle.user.companyId = companyId
            _globle.user.companyName = res.company.companyName
          }

          if (callback && typeof callback == 'function') {
            callback()
          }

        }).catch(err => {
          wx.showToast({
            title: '获取公司信息失败',
            mask: true,
            icon: 'none'
          })

          wx.navigateTo({
            url: '/pages/center/company/company',
          })
        })
      }else{
        if ((!_globle.user.companyId || !_globle.user.companyName) && this.route != 'pages/center/company/company') {
          wx.navigateTo({
            url: '/pages/center/company/company',
          })
        } else {
          if (callback && typeof callback == 'function') {
            callback()
          }
        }
      }
    }
  };

  if (options.onShow){
    pageData.onShow = options.onShow
  }

  if (options.onReachBottom && typeof options.onReachBottom === 'function'){
    pageData.onReachBottom = options.onReachBottom;
  }

  Page(pageData);
};

LPage.createInstance = function (options) {
  return new LPage_Module_Base(options);
};