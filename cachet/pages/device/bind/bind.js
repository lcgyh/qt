import { _globle } from '../../../utils/globle.js'
import { userLogin } from '../../../utils/userUtil.js'
import LPage from '../../../utils/lpage.js'
import lwx from '../../../utils/lwx.js'
import temCache from '../../../utils/temCache.js'

LPage({

  data: {
    people:'',
    custosPartyId:'',
    isForcedPhoto:'Y',
    sealName:''
  },
  onLoad: function (options) {

    if(!options.devicesId){
      wx.showToast({
        title: '参数错误',
        mask: true,
        icon: 'none'
      })
      return ;
    }
    this._devicesId = options.devicesId
    temCache.sealInfo = {}
    temCache.assessorList = []
    temCache.special = {}
  },
  onShow: function(){
    this.setData({
      sealInfo: temCache.sealInfo,
      assessorList: temCache.assessorList,
      special: temCache.special
    })
  },
  switch1Change: function (e) {
    if (e.detail.value ===false){
      temCache.sealInfo.isForcedPhoto = 'N'
    }else{
      temCache.sealInfo.isForcedPhoto = 'Y'
    }
  },
  setName:function(e){
    temCache.sealInfo.name = e.detail.value
  },
  setLimit: function(e){
    let limit = parseInt(e.detail.value)
    if (!limit || limit < 1){
      wx.showToast({
        title: '请输入大于0的整数',
        mask: true,
        icon: 'none'
      })
      return ;
    }
    temCache.sealInfo.limit = limit
  },
  selectParty: function () {
    wx.navigateTo({
      url: '../assessor/assessor',
    })
  },
  delateParty: function (e) {
    console.log(e)
    let index = e.currentTarget.dataset.id;
    temCache.assessorList.splice(index, 1)
    this.setData({
      assessorList: temCache.assessorList
    })

  },
  fromCommit:function(e){
    wx.showLoading({
      title: '绑定印章...',
      mask: true
    })

    if(!temCache.sealInfo.name){
      throw new Error('请输入印章名称')
    }

    if(!temCache.sealInfo.partyId){
      throw new Error('请选择保管员')
    }
    if (!temCache.sealInfo.limit){
      throw new Error('请输入正确的次数')
    }

    if (!temCache.assessorList || temCache.assessorList.length <= 0){
      throw new Error('请选择审核人员')
    }

    if (!temCache.special || !temCache.special.id) {
      throw new Error('请选择特批人员')
    }


    let partyIds = ''
    temCache.assessorList.map(item => {
      if(item){
        partyIds += item.id + ";"
      }
    })

    lwx.request({
      url: '/devices/bind',
      data: {
        devicesId: this._devicesId,
        custosPartyId: temCache.sealInfo.partyId,
        sealName: temCache.sealInfo.name,
        alias: temCache.sealInfo.name,
        isForcedPhoto: temCache.sealInfo.isForcedPhoto || 'N',
        limitUrgentApply: temCache.sealInfo.limit,
        partyIds: partyIds,
        specialPartyId: temCache.special.id
      }
    }).then(res => {
      wx.hideLoading()
      console.log(res)
      wx.redirectTo({
        url: '../list/list',
      })
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      wx.showToast({
        title: err,
        mask: true,
        icon: 'none'
      })
    })
  }
})