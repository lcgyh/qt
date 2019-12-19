// pages/device/applySealDetail/applySealDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {
      name: '柳依依',
      sealName: '财务章',
      type: "时段申请--内部使用",
      number: "5",
      starTime: "2019-12-12 12:20",
      overTime: "2019-12-14 13:20",
      applyReason: "办公",
      applyInfo: ["https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2531972538,559623921&fm=26&gp=0.jpg",
        "http://img4.imgtn.bdimg.com/it/u=3209370120,2008812818&fm=26&gp=0.jpg", "http://img4.imgtn.bdimg.com/it/u=2049330362,3886679334&fm=26&gp=0.jpg", "http://img1.imgtn.bdimg.com/it/u=1912429726,3650139079&fm=26&gp=0.jpg", "http://img4.imgtn.bdimg.com/it/u=2049330362,3886679334&fm=26&gp=0.jpg", "http://img4.imgtn.bdimg.com/it/u=2049330362,3886679334&fm=26&gp=0.jpg", "http://img4.imgtn.bdimg.com/it/u=2049330362,3886679334&fm=26&gp=0.jpg", "http://img4.imgtn.bdimg.com/it/u=2049330362,3886679334&fm=26&gp=0.jpg", "http://img4.imgtn.bdimg.com/it/u=2049330362,3886679334&fm=26&gp=0.jpg", "http://img4.imgtn.bdimg.com/it/u=2049330362,3886679334&fm=26&gp=0.jpg", 
      ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  zoomPic:function(e){
    wx.previewImage({
      current:e.currentTarget.dataset.pic, // 当前显示图片的http链接
      urls: this.data.detail.applyInfo // 需要预览的图片http链接列表
    })
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