// pages/device/workflowSetting/workflowSetting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switch1Checked: true,
    switch2Checked: false,
    switch3Checked: false,
    defaultData: {
      name: '默认流程',
      level: '4级审批',
      person: ['啊啊啊', '对对对', '日日日', '啦啦啦']
    },
    orderArrayData: {
      name: '顺序名字1',
      level: '4级审批',
      person: ['斯达' ]
    },
    specialData: {
      name: '默认流程1',
      level: '4级审批',
      person: ['王妃', '忽而我', '长大股']
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},
  switchChange: function(e) {
    var switch1Checked = this.data.switch1Checked;
    var switch2Checked = this.data.switch2Checked;
    var switch3Checked = this.data.switch3Checked;
    switch (e.currentTarget.dataset.name) {
      case '1':
        switch1Checked = e.detail.value;
        switch2Checked = false;
        this.setData({
          switch1Checked: switch1Checked,
          switch2Checked: switch2Checked,
        })
        return;
      case '2':
        switch1Checked = false;
        switch2Checked = e.detail.value;
        this.setData({
          switch1Checked: switch1Checked,
          switch2Checked: switch2Checked,
        })
        return;
      case '3':
        switch3Checked = e.detail.value;
        this.setData({
          switch3Checked: switch3Checked
        })
        return;
    }
    console.log('aaa')

  },
  //更换顺序流程
  changeWorkflow: function() {
    wx.navigateTo({
      url: '../orderWorkflow/orderWorkflow?select=1',
    })
  },
  //更换特批流程
  changeWorkflow2: function () {
    wx.navigateTo({
      url: '../specialWorkflow/specialWorkflow?select=0',
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
  onShow: function(options) {
    console.log(options)
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