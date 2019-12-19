// pages/use/privilegePerson/privilegePerson.js
import {
  _globle
} from '../../../utils/globle.js'
import lwx from '../../../utils/lwx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    index: 0,
    inputShowed: true,
    inputVal: "",
    cellArray: [],
    type:'1'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options', options)
    const type = options.type
    const types = [{
      type: '1',
      url: '',
      text: "特权人员"
    }, {
      type: '2',
      url: '',
      text: "法务人员"
    }, {
      type: '3',
      url: '',
      text: "新装人员"
    }]
    if (type=='1'){
      this.getDepartmentList()
    }
    if (type == '2') {
      this.getlegalList()
    }
    if (type == '3') {
      this.getinstallpeopleList()
    }
    wx.setNavigationBarTitle({
      title: types[Number(type) - 1].text
    })
    this.setData({
      type: type || '1'
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    
    // this.getDepartmentList();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //查询特权人员列表
  getDepartmentList: function () {
    const _this = this
    lwx.request({
      url: "installpeople.list",
      // data:{
      //   // companyId: _globle.companyId
      // },
      style: 'get'
    }).then(res => {
      if (res.data.code == '0') {
        console.log(res)
        const appInstallPeopleList = res.data.appInstallPeopleList || []
        _this.setData({
          cellArray: appInstallPeopleList
        })
      } else {
        console.log('333333');
      }
    }).catch(err => {
      console.log('err' + err);
    })
  },
  //查询法务人员列表
  getlegalList: function () {
    const _this = this
    lwx.request({
      url: "legalpeople.list",
      // data:{
      //   // companyId: _globle.companyId
      // },
      style: 'get'
    }).then(res => {
      if (res.data.code == '0') {
        console.log(res)
        const legalPeopleList = res.data.legalPeopleList || []
        _this.setData({
          cellArray: legalPeopleList
        })
      } else {
        console.log('333333');
      }
    }).catch(err => {
      console.log('err' + err);
    })
  },

  //查询新装人员列表
  getinstallpeopleList: function () {
    const _this = this
    lwx.request({
      url: "installpeople.list",
      // data:{
      //   // companyId: _globle.companyId
      // },
      style: 'get'
    }).then(res => {
      if (res.data.code == '0') {
        console.log(res)
        const appInstallPeopleList = res.data.appInstallPeopleList || []
        _this.setData({
          cellArray: appInstallPeopleList
        })
      } else {
        console.log('333333');
      }
    }).catch(err => {
      console.log('err' + err);
    })
  },

  //跳转详情
  checkDetail: function (e) {
    console.log('e', e)
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../privilegePersonDetail/privilegePersonDetail?privilegedPeopleId=${id}&type=${this.data.type}`,
    })
  },
  //新增用户
  add: function (e) {
    wx.navigateTo({
      url: '../addPrivilegePerson/addPrivilegePerson?type=${this.data.type}',
    })
  },
})