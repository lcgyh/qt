// pages/storeman/storeman.js
import { _globle } from '../../../utils/globle.js'
import { userLogin } from '../../../utils/userUtil.js'
import LPage from '../../../utils/lpage.js'
import lwx from '../../../utils/lwx.js'
LPage({
  data: {
    search_value: '',
    partyInfos: [],
    showlist: false,
    nobody: false,
    choseselect: '',
    number: ''
  },
  onLoad: function (options) {
    this.getlist()

  },
  getlist:function(){
    var that=this;
    lwx.request({
      url: '/workflow/search',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': _globle.token
      },
      data: {
        client_id: _globle.clientId
      }
    }).then(res => {
      if (res.result === 0) {
        console.log(res)
        let partyInfos=res.workflows;
        that.setData({
          partyInfos: partyInfos
        })
      } else if (res.result === -1) {
        wx.showToast({
          title: '获取失败',
          icon: 'none'
        })
      }
    }).catch(err => {
      throw err;
    })

  },
  searchvalue: function (e) {
    var search_value = e.detail.value;
    this.setData({
      search_value: search_value
    })
    console.log(search_value)
    if (search_value == '') {
      this.setData({
        showlist: false,
        nobody: false
      })
    }
  },
  searchList: function (e) {
    var that = this;
    let name = that.data.search_value;
    if (name !== '') {
      lwx.request({
        url: '/workflow/search',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'token': _globle.token
        },
        data: {
          client_id: _globle.clientId,
          name: name
        }
      }).then(res => {
        if (res.result === 0) {
          if (res.workflows == null) {
            that.setData({
              nobody: true,
              showlist: true
            })
          } else {
            let partyInfos = res.workflows
            that.setData({
              partyInfos: partyInfos,
              showlist: false,
              nobody: false
            })
          }
        } else if (res.result === -1) {
          wx.showToast({
            title: '获取失败',
            icon: 'none'
          })
        }
      }).catch(err => {
        throw err;
      })
    } else {
      wx.showToast({
        title: '搜索不能为空',
        icon: 'none'
      })
    }
  },
  chose_people: function (e) {
    let number = this.options.devicesId;
    this.setData({
      choseselect: e.currentTarget.dataset.id,
      number: number
    })
    console.log(number)
  },
  from_comit: function (e) {
    let that = this;
    let devicesId = that.data.number;
    let id = that.data.choseselect;
    if (id !== '' && devicesId !== '') {
      lwx.request({
        url: '/devices/setWorkflow',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'token': _globle.token
        },
        data: {
          client_id: _globle.clientId,
          devicesId: devicesId,
          workflowId: id
        }
      }).then(res => {
        if (res.result === 0) {
          wx.showToast({
            title: '提交成功',
            icon: 'success'
          })
          setTimeout(function () {
            wx.navigateTo({
              url: `../details/details?devicesId=${devicesId}`,
            })
          }, 1000)
        } else if (res.result === -1) {
          wx.showToast({
            title: '提交失败',
            icon: 'none'
          })

        }
      }).catch(err => {
        throw err;
      })
    } else {
      wx.showToast({
        title: '请选择流程',
        icon: 'none'
      })
    }
  },
  onShow: function () {
    this.setData({
      partyInfos: [],
      search_value: '',
      showlist: false,
      nobody: false,
      choseselect: ''
    })
  }
})