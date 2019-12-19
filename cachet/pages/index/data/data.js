const forNav = {
  sealInstal: {
    iconPath: "../../images/xinzhuang.png",
    text: "印章新装",
    url: "../device/deviceInstall/deviceInstall"
  },
  sealList: {
    iconPath: "../../images/yinzhangliebiao.png",
    text: "印章列表",
    url: "../device/list/list"
  },
  applyUse: {
    iconPath: "../../images/zhang.png",
    text: "申请使用",
    url: "../apply/index/index"
  },
  waitThings: {
    iconPath: "../../images/daiban.png",
    text: "待办事项",
    url: "../device/waitingDeal/waitingDeal"
  },
  law: {
    iconPath: "../../images/fawu.png",
    text: "法务审批",
    url: "../use/legalPersonApproval/legalPersonApproval"
  },
  myRecordList: {
    iconPath: "../../images/icon_index_6.png",
    text: "我的记录",
    url: "../device/myRecordList/myRecordList"
  },
  makeSureList: {
    iconPath: "../../images/hechajilu.png",
    text: "核查记录",
    url: "../use/inspectRecordList/inspectRecordList"
  },
  privilegeUse: {
    iconPath: "../../images/zhiwen.png",
    text: "特权使用",
    url: "../device/usePrivilegeList/usePrivilegeList"
  },
  privilegeRecordList: {
    iconPath: "../../images/tequanjilu.png",
    text: "特权记录",
    url: "../device/usePrivilegeRecord/usePrivilegeRecord"
  },
};

const pmList = {
  "title": "人员管理",
  navlist: [{
    iconPath: "../../images/tequanrenyuan.png",
    text: "特权人员",
    url: "../use/privilegePerson/privilegePerson?type=1"
  },
  {
    iconPath: "../../images/fawurenyuan.png",
    text: "法务人员",
    url: "../use/privilegePerson/privilegePerson?type=2"
  },
  {
    iconPath: "../../images/anzhuangrenyuan.png",
    text: "新装人员",
    url: "../use/privilegePerson/privilegePerson?type=3"
  }],
};
//法人
const legalPerson = [{
  "title": "印章管理",
  navlist: [forNav.sealInstal, forNav.sealList, forNav.applyUse, forNav.waitThings, forNav.myRecordList, forNav.privilegeRecordList, forNav.makeSureList]
}, pmList];
//子管理
const sonManager = [{
  "title": "印章管理",
  navlist: [forNav.sealList, forNav.makeSureList, forNav.applyUse, forNav.waitThings, forNav.myRecordList]
}];
//特权人员
const privilegePerson = [{
  "title": "印章管理",
  navlist: [forNav.applyUse, forNav.myRecordList, forNav.waitThings, forNav.privilegeUse, forNav.privilegeRecordList]
}];
//法务人员    
const lawPerson = [{
  "title": "印章管理",
  navlist: [forNav.applyUse, forNav.myRecordList, forNav.waitThings, forNav.law]
}];
//新装人员
const installPerson = [{
  "title": "印章管理",
  navlist: [forNav.sealInstal, forNav.applyUse, forNav.myRecordList, forNav.waitThings]
}];
//普通员工
const worker = [{
  "title": "印章管理",
  navlist: [forNav.applyUse, forNav.myRecordList, forNav.waitThings]
}];
//保管员
const storeKeeper = [{
  "title": "印章管理",
  navlist: [forNav.sealList, forNav.applyUse, forNav.myRecordList, forNav.waitThings, forNav.makeSureList, forNav.privilegeRecordList]
}];


module.exports = {
  LEGAL_PERSON: legalPerson,
  ADMIN: sonManager,
  PRIVILEGE: privilegePerson,
  LEGING: lawPerson,
  INSTALL_PERSON: installPerson,
  STAFF: worker,
  CUSTODY : storeKeeper,
}