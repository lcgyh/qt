// pages/manage/newlist/newlist.js
import { _globle } from '../../../utils/globle.js'
import { userLogin } from '../../../utils/userUtil.js'
import LPage from '../../../utils/lpage.js'
import lwx from '../../../utils/lwx.js'
LPage({

  pageNo: 1,
  hasMore: true,
  data: {
    seals:'',
    nodata: false,
    sealName:''
  },
  onLoad: function (options) {
    this._purpose = options.purpose
    wx.getSystemInfo({
      success: res => {
        this.setData({
          scrollHeight: res.windowHeight
        });
      }
    })
    console.log(_globle.user.type)
    this.setData({
      userType: _globle.user.type
    })

    this.loadData();
  },
  searchvalue: function (e) {
    this.setData({
      sealName:e.detail.value
    })
    console.log(e.detail.value)
  },
  loadData:function(){
    wx.showLoading({
      title: '加载数据...',
      mask: true
    })
    lwx.request({
      url: '/seal/list',
      data: {
        pageNo: this.pageNo,
        purpose: this._purpose,
        sealName: this.data.sealName || ''
      }
    }).then(res => {
      wx.hideLoading()
      console.log(res)
      let sealslist = res.seals
      let seals = this.pageNo === 1 ? sealslist : [...this.data.seals, ...sealslist]
      this.hasMore = !(sealslist && sealslist.length < 10);
      this.pageNo++;
      this.setData({
        seals: seals,
        nodata: !sealslist || sealslist.length < 10
      })
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })

  },
  onScrollLower: function () {
    if (this.hasMore) {
      this.getdata()
    }
  },
  searchList:function(){
    this.getdata();
  },
  
})