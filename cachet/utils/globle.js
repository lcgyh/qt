export const _globle = {
  user: {
    isLogin: true,
    openId: null,
    type: null,
    name: null,
    portrait: null,
    loginName: null,
    gender: null,
    mobile: null,
    email: null
  },
  token: null,
  // devUrl: 'http://192.168.1.6:8080',
  // devUrl: 'https://api.gzws-rcz.com',
  // devUrl: 'https://api.hui-seal.com',
  // devUrl: 'http://192.168.6.101:8086',
  devUrl: 'http://192.168.6.123:8080/appRest/apprest.htm', //测试地址登录后的
  // devUrl:'http://192.168.6.109:8086/apprest.htm',
  unLoginUrl: 'http://192.168.6.123:8080/appRest/', //测试地址登录前的
  env: 'dev',
  clientId: 'xiaochengxu',
  clientSecret: 'xiaochengxu',
  version: "1.0.7",
  getBaseUrl() {
    switch (this.env) {
      case 'dev':
        return this.devUrl;
      default:
        throw new Error('env error');
    }
  }
}