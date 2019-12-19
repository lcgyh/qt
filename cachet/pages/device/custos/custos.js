// pages/storeman/storeman.js
import { _globle } from '../../../utils/globle.js'
import { userLogin } from '../../../utils/userUtil.js'
import LPage from '../../../utils/lpage.js'
import lwx from '../../../utils/lwx.js'
import temCache from '../../../utils/temCache.js'



LPage({

  data: {
    search_value:'',
    showlist:false,
    nobody:false,
    choseselect:'',
    name:''
  },
  searchvalue:function(e){
     var search_value = e.detail.value;
     this.setData({
       search_value: search_value
     })
    if (search_value==''){
      this.setData({
        showlist: true,
        nobody:false
      })
     }
  },
  searchList: function (e) {
    var that = this;
    let loginName = that.data.search_value;
    if (loginName!==''){
      lwx.request({
        url: '/party/search',
        data: {
          client_id: _globle.clientId,
          loginName: loginName,
          // isSystem: 'N'
        }
      }).then(res => {
        if (res.result === 0) {
            if (res.partyInfos == null) {
              that.setData({
                nobody: true,
                showlist: true
              })
            } else {
              let partyInfos = res.partyInfos
              that.setData({
                partyInfos: partyInfos,
                showlist: true,
                nobody:false
              })
            }
        } else if(res.result === -1){
            wx.showToast({
              title: '获取失败',
              icon:'none'
             })
          }
      }).catch(err => {
        throw err;
      })
    }else{
      wx.showToast({
        title: '搜索不能为空',
        icon:'none'
      })
    }
  },
  chosePeople:function(e){
    console.log(e.currentTarget.dataset)
    temCache.sealInfo.partyId = e.currentTarget.dataset.partyid
    temCache.sealInfo.partyName = e.currentTarget.dataset.name
    wx.navigateBack({})
  },
  onShow: function () {
    this.setData({
      partyInfos: [],
      search_value: '',
      showlist: false,
      nobody: false,
      choseselect: ''
    })
  }
})