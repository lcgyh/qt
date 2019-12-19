import lwx from '../../../utils/lwx.js'
import LPage from '../../../utils/lpage.js'
import temCache from '../../../utils/temCache.js'


LPage({
  _loginName: null,
  data: {
    showlist: false,
    nobody: false,
    choseselect: '',
    name: '',
    partyInfos:[],
    datatimes:''
  },
  onLoad: function (options) {
    this.loadData();    
  },
  loadData: function () {
    wx.showLoading({
      title: '加载数据...',
      mask: true
    })

    lwx.request({
      url: '/party/search',
      data: {
        // isSystem: 'N',
        [!this._loginName || 'loginName']: this._loginName
      }
    }).then(res => {
      console.log(res)
      wx.hideLoading()
      this.setData({
        partyInfos: this.getPartyList(res.partyInfos) || [],
        noDatas: !res.partyInfos
      })
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      wx.showToast({
        title: '搜索员工失败',
        mask: true,
        icon: 'none'
      })
    })
  },
  searchValue: function (e) {
    this._loginName = e.detail.value;
  },
  search:function(){
    this.loadData()

  },
  selectParty: function (e) {
    if(!temCache.assessorList){
      temCache.assessorList = []
    }
    let party = e.target.dataset.party

    if (party.selected){
      wx.showToast({
        title: `${party.name}已经被选择`,
        mask: true,
        icon: 'none'
      })
      return ;
    }

    temCache.assessorList.push({
      id: party.partyId,
      name: party.name
    })
    wx.navigateBack({})
  },
  getPartyList: function (partyInfos){

    if (!temCache.assessorList || !partyInfos){
      return partyInfos
    }

    partyInfos.map(pitem => {
      temCache.assessorList.map(titem => {
        if (pitem.partyId === titem.id){
          pitem.selected = true
          return
        }
      })
    })
    return partyInfos
  }
})