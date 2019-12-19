// pages/device/myRecordList/myRecordList.js
import {
  _globle
} from '../../../utils/globle.js'
import lwx from '../../../utils/lwx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: [{
        name: '待批准',
        selected: false,
        applyStatus: 'PENDING',
        ensorStatus: "",
      },
      {
        name: '已批准',
        selected: true,
        color: 'red',
        applyStatus: 'PASSED',
        ensorStatus: ''
      },
      {
        name: '待核查',
        selected: false,
        applyStatus: '',
        ensorStatus: 'WAIT'
      }, {
        name: '已核查',
        selected: false,
        applyStatus: '',
        ensorStatus: 'CHECKED'
      }, {
        name: '已拒绝',
        selected: false,
        applyStatus: 'REJECT',
        ensorStatus: ''
      },
      {
        name: '已撤销',
        selected: false,
        applyStatus: 'RETRACT',
        ensorStatus: ''
      },
    ],
    selectIndex: 1,
    censorStatus: '',
    applyStatus: 'PASSED',
    list: [],
    name: '已批准'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},
  loadData: function() {
    var that = this;
    var data = {
      partyId: _globle.user.partyId,
      companyId: _globle.user.companyId,
      censorStatus: that.data.censorStatus,
      applyStatus: that.data.applyStatus,
    }
    if (that.data.applyStatus == 'PENDING'){
      data.pendingStatus = 'PENDINGOR';
      data.applyStatus = ''
    }
    lwx.request({
      url: "applys.list",
      data: data
    }).then(res => {
      if (res.data.code == '0') {
        that.setData({
          list: res.data.applys
        })
      } else {
        console.log('错误');
      }
    }).catch(err => {
      console.log('err' + err);
    })

  },
  //详情
  checkDetail: function(e) {
    switch (this.data.name) {
      case '待批准':
        wx.navigateTo({
          url: "../atifyDeatil/atifyDeatil?title=待批准&id=" + e.currentTarget.dataset.id,
        })
        break;
      case '已批准':
        wx.navigateTo({
          url: "../atifyDeatil/atifyDeatil?title=已批准&id=" + e.currentTarget.dataset.id,
        })
        break;
      case '待核查':
        console.log('待核查')
        wx.navigateTo({
          url: "../atifyDeatil/atifyDeatil?title=待核查&devicesId=" + e.currentTarget.dataset.devicesid + "&status='WAIT'",
        })
        break;
      case '已核查':
        wx.navigateTo({
          url: "../atifyDeatil/atifyDeatil?title=已核查&devicesId=" + e.currentTarget.dataset.devicesid + "&status='CHECKED'",
        })
        break;
      case '已拒绝':
        console.log('已拒绝')
        wx.navigateTo({
          url: "../atifyDeatil/atifyDeatil?title=已拒绝&id=" + e.currentTarget.dataset.id,
        })
        break;
      case '已撤销':
        wx.navigateTo({
          url: "../atifyDeatil/atifyDeatil?title=已撤销&id=" + e.currentTarget.dataset.id,
        })
        break;
      default:
        console.log('啥也不是')
    }
  },
  tapBar: function(e) {
    var navbar = this.data.navbar;
    var name;
    for (var i = 0; i < navbar.length; i++) {
      if (i == e.currentTarget.dataset.index) {
        navbar[i].color = 'red';
        name = navbar[i].name
      } else {
        navbar[i].color = '#999';
      }
    }
    this.setData({
      navbar: navbar,
      name: name,
      selectIndex: e.currentTarget.dataset.index,
      applyStatus: navbar[e.currentTarget.dataset.index].applyStatus,
      ensorStatus: navbar[e.currentTarget.dataset.index].ensorStatus,
    })
    this.loadData();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.loadData();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})