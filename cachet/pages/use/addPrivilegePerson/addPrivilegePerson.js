// pages/use/addPrivilegePerson/addPrivilegePerson.js
import lwx from '../../../utils/lwx.js'
import { _globle } from '../../../utils/globle.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    organizations: [],
    orgId:null,
    staffList:[],
    index: 0,
    staffindex:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getorganizations()
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
  //请求部门列表
  getorganizations:function(){
    const that = this
    lwx.request({
      url: "organization.list",
      data: {
        companyId: _globle.user.companyId
      }
    }).then(res => {
      const resData = res.data || {}
      console.log('resData', resData)
      if (resData.code == '0') {
        that.setData({
          organizations: resData.organizations || [],
          orgId: resData.organizations[0].organizationId
        },function(){
          that.getstaffs()
        })
      } else {
        console.log('错误');
      }
    }).catch(err => {
      console.log('err' + err);
    })
  },
  bindChange: function (e){
    console.log(e)
    var that = this;
    let index = e.detail.value;
    that.setData({
      index: index,
      orgId: e.target.dataset.organizationid
    },function(){
      that.getstaffs()
    })
  },

  //请求该部门下员工信息
  getstaffs:function(){
    const that = this
    lwx.request({
      url: "staff.list",
      data: {
        companyId: _globle.user.companyId,
        orgId: that.data.orgId
      }
    }).then(res => {
      const resData = res.data || {}
      console.log('resData', resData)
      if (resData.code == '0') {
        that.setData({
          staffList: resData.staffList || []
        })
      } else {
        console.log('错误');
      }
    }).catch(err => {
      console.log('err' + err);
    })
  },
  //员工change
  bindPickerChange: function (e) {
    var that = this;
    let index = e.detail.value;
    that.setData({
      staffindex: index,
      partyId: e.target.dataset.partyId
    })
  },
  //确认操作
  makeSure:function(){
    const that = this
    lwx.request({
      url: "installpeople.add",
      data: {
        companyId: _globle.user.companyId,
        partyId: that.data.partyId || 1
      }
    }).then(res => {
      const resData = res.data || {}
      console.log('resData', resData)
      if (resData.code == '0') {
        wx.showModal({
          title: '',
          content: '新增成功',
          confirmText: "是",
          success: res => {}
        })
      } else {
        console.log('错误');
      }
    }).catch(err => {
      console.log('err' + err);
    })
  }

})