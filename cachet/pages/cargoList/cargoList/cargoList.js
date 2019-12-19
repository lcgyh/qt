// pages/cargoList/cargoList/cargoList.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: [{
        name: '全部',
        selected: true,
        color:'red'
      },
      {
        name: '待发货',
        selected: false
      },
      {
        name: '已发货',
        selected: false
      },
      {
        name: '已绑定',
        selected: false
      },
      {
        name: '已失效',
        selected: false
      }
    ],
    lineLeft: 0,
    selectIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  loadData: function() {

  },
  tapBar: function(e) {
    var lineLeft = e.currentTarget.dataset.index / 5*100 +'%';
    var navbar = this.data.navbar;
    for (var i = 0; i < navbar.length; i++)
    {
      if (i == e.currentTarget.dataset.index){
        navbar[i].color = 'red';
      }else{
        navbar[i].color = '##999';
      }
    }
    this.setData({
      lineLeft: lineLeft,
      navbar: navbar,
      selectIndex: e.currentTarget.dataset.index
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