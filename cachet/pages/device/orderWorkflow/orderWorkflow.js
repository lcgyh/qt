// pages/device/orderWorkflow/orderWorkflow.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [{
      name: '顺序名字1',
      level: '4级审批',
      person: ['王妃奥术大师大阿斯达', '王子', '忽而我', '长大股']
    }, {
      name: '顺序名字2',
      level: '4级审批',
      person: ['王妃', '王子', '忽而我', '长大股']
    }, {
      name: '顺序名字3',
      level: '4级审批',
      person: ['王妃', '王子', '忽而我', '长大股']
    }],
    select: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.defule(options)
  },
  defule: function(e) {
    this.data.array[e.select].check = true;
    this.setData({
      select: [e.select],
      array: this.data.array
    })
  },
  switchChange: function(e) {
    // console.log(array[e.currentTarget.dataset.index])

    var array = this.data.array;
    for (var i = 0; i < array.length; i++) {
      if (i == e.currentTarget.dataset.index) {
        array[i].check = true;
      } else {
        array[i].check = false;
      }
    }
    this.setData({
      array: array,
      select: e.currentTarget.dataset.index
    })
  },
  keepit: function() {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      orderArrayData: this.data.array[this.data.select]
    })
    wx.navigateBack({
      delta: 1,
    })
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