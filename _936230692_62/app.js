App({
  onLaunch: function () {
    const _this = this;
    //获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        console.log('res', res)
        const model = res.model
        _this.globalData.system = res.system
        _this.globalData.statusBarHeight = res.statusBarHeight,
          _this.globalData.isIphoneX = model.indexOf("iPhone X") != '-1' || model.indexOf("iPhone 11") != '-1' ? true : false
        _this.globalData.windowWidth = res.windowWidth,
          _this.globalData.windowHeight = res.windowHeight;
      }
    })
    // 检测新版本
    const updateManager = wx.getUpdateManager()
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    /**
     * 初次加载判断网络情况
     * 无网络状态下根据实际情况进行调整
     */
    wx.getNetworkType({
      success(res) {
        const networkType = res.networkType
        if (networkType === 'none') {
          _this.globalData.isConnected = false
          wx.showToast({
            title: '当前无网络',
            icon: 'loading',
            duration: 2000
          })
        }
      }
    });


    /**
     * 监听网络状态变化
     * 可根据业务需求进行调整
     */
    wx.onNetworkStatusChange(function (res) {
      if (!res.isConnected) {
        _this.globalData.isConnected = false
        wx.showToast({
          title: '网络已断开',
          icon: 'loading',
          duration: 2000,
          complete: function () { }
        })
      } else {
        _this.globalData.isConnected = true
        wx.hideToast()
      }
    });
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })



  },
  onShow: function (o) {
    console.log(o);
  },
  onPageNotFound: function (o) {
    wx.switchTab({
      url: "/pages/home/home"
    });
  },
  globalData: {
    version: "2.0.0",
    isIphoneX: 0,
    windowWidth: 0,
    windowHeight: 0,
    statusBarHeight: 0,
    system: "",
    windowCityDic: {},
    homePopList: ["1"]
  }
});