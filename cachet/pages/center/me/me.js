import {
  _globle
} from '../../../utils/globle.js'
import {
  userLogin,
  logout
} from '../../../utils/userUtil.js'
import LPage from '../../../utils/lpage.js'
import lwx from '../../../utils/lwx.js'


Page({
  data: {
    party: {},
    token: _globle.token,
    version: _globle.version,
    chose: false,
  },
  onLoad: function(options) {},
  onShow: function() {
    this.setData({
      party: _globle.user,
    })
    console.log("islogin", this.data.party)
  },
  login_out: function() {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定退出？',
      confirmText: "是",
      success: res => {
        if (res.confirm) {
          logout()
          _globle.user.isLogin = false;
          that.setData({
            party: _globle.user,
          })
        } else {
          console.log('取消了')
        }
      }
    })
  },
  goLogin:function(){
    var that = this;
    wx.showModal({
      title: '是否登录？',
      confirmText: "是",
      success: res => {
        if (res.confirm) {
          that.lonin();
        } else {
          console.log('取消了')
        }
      }
    })
  },
  lonin: function() {
    wx.navigateTo({
      url: '../login/login',
    })
  },
  myShare: function() {
    wx.navigateTo({
      url: '../myShare/myShare',
    })

  },
  helpCenter: function() {
    wx.navigateTo({
      url: '../contactUs/contactUs',
    })

  },
  feedback: function() {
    wx.navigateTo({
      url: '../feedback/feedback',
    })

  },

  //我的分享
  myShare: function() {
    wx.navigateTo({
      url: '../myShare/myShare',
    })
  },
  //个人信息
  goSetnews: function() {
    wx.navigateTo({
      url: '../changeMe/changeMe',
    })
  },
  onUpload: function() {
    let that = this;
    that.setData({
      chose: false
    })
    lwx.chooseImage({
      count: 1,
      sourceType: ['album', 'camera']
    }).then(res => {
      if (!res.tempFilePaths[0]) {
        throw new Error('未选择图片')
      }
      wx.showLoading({
        title: '图片上传...',
        mask: true
      })
      return lwx.uploadFile({
        url: 'app/upload',
        imgFile: res.tempFilePaths[0],
      })
    }).then(res => {
      wx.hideLoading()
      console.log('上传玩了', res)
      that.data.party.portrait = res;
      that.setData({
        party: that.data.party
      })
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  onGotUserInfo: function(e) {
    _globle.user.portrait = e.detail.userInfo.avatarUrl;
    this.setData({
        party: _globle.user,
        chose: false
      })
    // lwx.request({
    //   url: '/user/setPortrait',
    //   data: {
    //     clientId: _globle.clientId,
    //     imgUrl: _globle.user.portrait
    //   }
    // }).then(res => {
    //   wx.hideLoading()
    //   wx.showToast({
    //     title: '上传成功'
    //   })
    //   this.setData({
    //     party: _globle.user,
    //     chose: false
    //   })
    // }).catch(err => {
    //   console.log(err)
    //   wx.showToast({
    //     title: err,
    //     mask: true,
    //     icon: 'none'
    //   })
    // })

  },


  //初始化蓝牙
  showQRcode:function(){
   
  },

  chose_avatar: function() {
    this.setData({
      chose: true
    })
  },
  hide_chose: function() {
    this.setData({
      chose: false
    })
  }
})