// pages/addcach/addcach.js
import { _globle } from '../../../utils/globle.js'
import { userLogin } from '../../../utils/userUtil.js'
import lwx from '../../../utils/lwx.js'
import LPage from '../../../utils/lpage.js'
LPage({
  data: {
    
  },
  formSubmit: function (e) {
    var that = this;
    let oldpassword = e.detail.value.oldpassword;
    let newpassword = e.detail.value.newpassword;
    if (oldpassword == '' || newpassword =='') {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 2000
      })
    } else {
      lwx.request({
        url: '/user/setPwd',
        data: {
          client_id: _globle.clientId,
          oldPwd: oldpassword,
          newPwd: newpassword
        }
      }).then(res => {
        if (res.result === 0) {
          console.log(res)
          wx.showToast({
            title: '修改成功',
            icon: 'succes',
            duration: 1000
          })
          setTimeout(function () {
            wx.redirectTo({
              url: `../../login/login`,
            })
          }, 1000)
        } else if ((res.result === -1)) {
          wx.showToast({
            title: '绑定失败',
            icon: 'none'
          })
        }
      }).catch(err => {
        throw err;
      })
    }
  }
})