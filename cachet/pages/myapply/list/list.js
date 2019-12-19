import LPage from '../../../utils/lpage.js'
import { _globle } from '../../../utils/globle.js'
import { userLogin } from '../../../utils/userUtil.js'
import { getApplyList } from './biz.js'
import lwx from '../../../utils/lwx.js'

LPage({
  pageNo: 1,
  pageSize: 10,
  hasMore: true,
  statusKey: null,
  data: {
    applyList: [],
    noMore: false
  },
  onLoad: function(options){
    this.setData({
      navbar: [
        { name: '全部', selected: true },
        { name: '已审核', key: 'PASSED', selected: false },
        { name: '待审核', key: 'PENDING', selected: false },
        { name: '已拒绝', key: 'REJECT', selected: false },
        { name: '已撤回', key: 'RETRACT', selected: false }
      ]
    })
  },
  onShow: function(){
    this.pageNo = 1
    this.loadData()
  },
  swichNav(e) {
    this.statusKey = e.currentTarget.dataset.key;
    console.log(this.statusKey)
    this.pageNo = 1;
    this.hasMore = true;
    this.loadData()
    this.data.navbar.map(item => {
      if (item.selected) {
        item.selected = false;
      }
      if (this.statusKey === item.key) {
        item.selected = true;
      }
    })
    this.setData({
      navbar: this.data.navbar,
      applyList: [],
      noMore: false
    })
  },
  onReachBottom: function () {
    if (!this.data.noMore){
      this.loadData();
    }
  },
  loadData: function () {

    wx.showLoading({
      title: '加载数据',
      mask: true
    })

    lwx.request({
      url: '/apply/record',
      data: {
        pageNo: this.pageNo,
        [!this.statusKey || 'status']: this.statusKey || ''
      }
    }).then(res => {
      console.log(res)
      wx.hideLoading()
      if (res.applys){
        let applyList = getApplyList(res.applys);
        applyList = this.pageNo === 1 ? applyList : [...this.data.applyList, ...applyList]
        this.hasMore = applyList.length === this.pageSize;
        this.pageNo++;
        this.setData({
          applyList: applyList,
          noMore: applyList.length < this.pageSize
        })
      }else{
        this.setData({
          ...this.data,
          noMore: true
        })
      }
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      wx.showToast({
        title: '加载失败',
        mask: true,
        icon: 'none'
      })
    })
  }
})