import LPage from '../../../utils/lpage.js'
import lwx from '../../../utils/lwx.js'

LPage({
  _pageNo: 1,
  _pageSize: 10,
  _hasMore: true,
  data: {

  },
  onShow: function () {
    this._pageNo = 1
    this.loadData()
  },
  loadData: function(){
    wx.showLoading({
      title: '加载数据...',
      mask: true
    })

    lwx.request({
      url: '/install/waitVerify',
      data: {
        pageNo: this._pageNo,
        pageSize: this._pageSize
      }
    }).then(res => {
      wx.hideLoading()
      if (res.result === 0) {
        console.log(res)
        let taskList = []

        if (res.verifys) {
          res.verifys.map(item => {
            if (item) {
              taskList.push({
                name: item.sealName,
                statusName: item.typeName,
                description: item.partyName + '申请' + item.typeName,
                verifyId: item.id
              })
            }
          })
        }
        this._hasMore = taskList.length == this._pageSize
        this.setData({
          taskList: this._pageNo === 1 ? taskList : [...this.data.taskList, ...taskList],
          noMore: taskList.length < this._pageSize,
          baseUrl: '/pages/task/installverify/installverify'
        })
        this._pageNo++;
        console.log(this.data.taskList)
      }
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: '加载数据失败',
        mask: true,
        icon: 'none'
      })
    })
  },
  onReachBottom: function(){
    console.log('onReachBottom')
    if (this._hasMore){
      this.loadData()
    }
  }
})