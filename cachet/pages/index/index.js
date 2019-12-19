//获取应用实例
import {
  _globle
} from '../../utils/globle.js'
import LPage from '../../utils/lpage.js'
var navdata = require('/data/data.js')
import {
  getTaskData
} from './biz.js'
import lwx from '../../utils/lwx.js'

Page({
  _islogin: false,
  _pageNo: 1,
  _pageSize: 5,
  _hasMore: true,
  data: {
    imgUrls: [{
      url: '/images/index_banner.jpg'
    }],
    dot: 1,
    party: null,
    taskList: [],
    noMore: false,
    type: 'remain',
    selectStatus: false,
    pmanagementList: {
      title: '印章管理',
      management: [{
        name: '全部'
      }, {
        name: '待发货'
      }, {
        name: '已发货'
      }, {
        name: '已绑定'
      }, {
        name: '已失效'
      }]
    },
    number: {
      total: 30,
      dai: 18,
      yi: 15,
      bang: 10,
      shi: 5
    },
  },
  onLoad: function() {
    this.setData({
      party: _globle.user,
      nav: this.getNav(),
    })
     // this.loadVerifyList()
    wx.getSystemInfo({
      success: res => {
        // console.log(res)
        this.setData({
          windowHeight: res.windowHeight
        })
      },
    })
  },
  onShow: function() {
    this._pageNo = 1
    // getUserInfo(() => {
    // this.loadData()
    this.setData({
      party: _globle.user,
      nav: this.getNav(),
      _islogin: _globle.user.isLogin
    })
    // wx.setNavigationBarTitle({
    //   title: _globle.user.companyName //修改title
    // })
    // })
  },
  getNav: function() {
    let nav = []
    var sealArray = [];
    var pmArray = [];
    const type = _globle.user.roles;
    if (type){
      for (let val of type) {
        if (navdata.hasOwnProperty(val)) {
          navdata[val].forEach(item => {
            if (item.title == '印章管理') {
              sealArray = sealArray.concat(item.navlist);
            } else if (item.title == '人员管理') {
              pmArray = item.navlist;
            }
          })
        }
      }
    }
   
    function unique(arr) {
      return Array.from(new Set(arr))
    }
    if (pmArray.length === 0) {
      nav = [{
        "title": "印章管理",
        navlist: unique(sealArray)
      }]
    } else {
      nav = [{
        "title": "印章管理",
        navlist: unique(sealArray)
      }, {
        "title": "人员管理",
        navlist: pmArray
      }];
    }
    return nav
  },

  lower: function() {
    if (!this.data.noMore) {
      this.loadData();
    }
  },
  loadData: function() {
    this.loadVerifyList()
  },
  loadVerifyList: function() {
    console.log('加载待审核列表', res);
    lwx.request({
      url: 'seal.search',
    }).then(res => {
      console.log('加载待审核列表', res)
      if (res.result === 0) {
        console.log(res)
        let taskList = getTaskData(res.verifyInfos)
        this.setData({
          taskList: this._pageNo === 1 ? taskList : [...this.data.taskList, ...taskList],
          noMore: taskList.length < this._pageSize,
          baseUrl: '/pages/task/verify/verify'
        })
        this._pageNo++;
        console.log(this.data.taskList)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  loadInstallVerify: function() {
    lwx.request({
      url: '/install/waitVerify',
      data: {
        pageNo: this._pageNo,
        pageSize: this._pageSize
      }
    }).then(res => {
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

        this.setData({
          taskList: this._pageNo === 1 ? taskList : [...this.data.taskList, ...taskList],
          noMore: taskList.length < this._pageSize,
          baseUrl: '/pages/task/installverify/installverify'
        })
        this._pageNo++;
        console.log(this.data.taskList)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  switchStatus: function() {
    var selectStatus = !this.data.selectStatus;
    var name = this.data.selectStatus ? "办公" : "发货";
    this.setData({
      selectStatus: selectStatus,
    })
    wx.setTabBarItem({
      index: 1,
      text: name,
    })
  },
  //去登录
  goLogin: function() {
    wx.navigateTo({
      url: '../center/login/login',
    })
  }
})