const forNav = {
  sealInstal: {
    iconPath: "../../images/icon_index_6.png",
    text: "印章新装",
    url: "../device/deviceInstall/deviceInstall"
  },
  sealList: {
    iconPath: "../../images/icon_index_6.png",
    text: "印章列表",
    url: "../device/list/list"
  },
  applyUse: {
    iconPath: "../../images/icon_index_6.png",
    text: "申请使用",
    url: "../apply/index/index"
  },
  waitThings: {
    iconPath: "../../images/icon_index_6.png",
    text: "待办事项",
    url: "../device/waitingDeal/waitingDeal"
  },
  law: {
    iconPath: "../../images/icon_index_6.png",
    text: "法务审批",
    url: "../use/legalPersonApproval/legalPersonApproval"
  },
  myRecordList: {
    iconPath: "../../images/icon_index_6.png",
    text: "我的记录",
    url: "../device/myRecordList/myRecordList"
  },
  makeSureList: {
    iconPath: "../../images/icon_index_6.png",
    text: "核查记录",
    url: "../use/inspectRecordList/inspectRecordList"
  },
  privilegeUse: {
    iconPath: "../../images/icon_index_6.png",
    text: "特权使用",
    url: "../device/usePrivilegeList/usePrivilegeList"
  },
  privilegeRecordList: {
    iconPath: "../../images/icon_index_6.png",
    text: "特权记录",
    url: "../device/usePrivilegeRecord/usePrivilegeRecord"
  },
};

const pmList = {
  "title": "人员管理",
  navlist: [{
    iconPath: "../../images/icon_index_6.png",
    text: "特权人员",
    url: "../use/privilegePerson/privilegePerson"
  },
  {
    iconPath: "../../images/icon_index_6.png",
    text: "法务人员",
    url: "../use/legalPerson/legalPerson"
  },
  {
    iconPath: "../../images/icon_index_6.png",
    text: "新装人员",
    url: "../use/newInstall/newInstall"
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
  legalPerson: legalPerson,
  sonManager: sonManager,
  privilegePerson: privilegePerson,
  lawPerson: lawPerson,
  installPerson: installPerson,
  worker: worker,
  storeKeeper: storeKeeper,
}