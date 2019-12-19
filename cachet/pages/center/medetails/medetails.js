import { _globle } from '../../../utils/globle.js'
import LPage from '../../../utils/lpage.js'
import lwx from '../../../utils/lwx.js'
import { getUserInfo } from '../../../utils/userUtil.js'

LPage({
  data: {
    genders: [{ name: '未知', key: '' }, {name: '男', key: 'MALE'},{name: '女', key: 'FEMALE'}],
    index: 0,
    sex:''
  },
  onLoad: function (options) {
    console.log(_globle.user)
    if (_globle.user.gender === 'MALE' || _globle.user.gender ==='FEMALE'){
      
      let index = 0
      let gender = null
      this.data.genders.map((item, idx) => {
        if (item.key === _globle.user.gender) {
          index = idx
          gender = item
        }
      })

      this.setData({
        party: {
          ..._globle.user,
        },
        gender: gender || {},
        index: index
      })
    }else{
      this.setData({
        party: {
          ..._globle.user,
        },
        gender: this.data.genders[0]
      })
    }
  },
  genderChange: function (e) {
    console.log(e)
    let index = e.detail.value;
    this.setData({
      index: index,
      gender: this.data.genders[index]
    })
  },
  onSubmit:function(e){

    let username = e.detail.value.usename
    let mobile = e.detail.value.iphone_num
    let email = e.detail.value.email
    let gender = this.data.gender
  
    if (!username){
      wx:wx.showToast({
        title: '名字不能为空',
        icon: 'none',
        mask: true
      }) 
      return;
    } 
    
    if (email && !(/^[A-Za-z0-9._%-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/.test(email))) {
      wx: wx.showToast({
        title: '邮箱不能为空',
        icon: 'none',
        mask: true
      })
      return;
    }
    if (mobile && !(/^1\d{10}$/.test(mobile))) {
      wx.showToast({
        title: '手机号输入错误',
        icon: 'none',
        mask: true
      })
      return;
    }

    wx.showLoading({
      title: '数据提交...',
      mask: true
    })
    lwx.request({
      url: '/user/setInfo',
      data: {
        [!username || 'name']: username,
        [!mobile || 'mobile']: mobile,
        [!email || 'email']: email,
        [!gender || 'gender']: gender.key
      }
    }).then(res => {
      wx.hideLoading()

      getUserInfo(() => {})

      wx.switchTab({
        url: '/pages/center/me/me',
      })
    }).catch(err => {
      console.log(res)
      wx.hideLoading()
      wx.showToast({
        title: '修改信息失败',
        mask: true,
        icon: 'none'
      })
    })
  }
})