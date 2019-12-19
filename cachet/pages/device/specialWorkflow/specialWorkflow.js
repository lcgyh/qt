// pages/device/specialWorkflow/specialWorkflow.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [{
      name: '特批名字1',
      person: '王妃卡是假的好就'
    }, {
      name: '特批名字2',
      person: '忽而我奥术大师大',
    }, {
      name: '特批名字3',
      person: '长大股阿萨斯大多奥术大师大'
    }],
    select:0
  },
  keepit: function () {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      specialData: this.data.array[this.data.select]
    })
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.defule(options)
  },
  defule: function (e) {
    this.data.array[e.select].check = true;
    this.setData({
      select: [e.select],
      array: this.data.array
    })
  },
  switchChange: function(e) {
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