import { _globle } from '../../../utils/globle.js'

export const getApplyDetail = function(data){

  let applyDetail = {
    partyName: data.partyName,
    portrait: _globle.user.portrait || '/images/people.png',
    statusName: data.statusName,
    status: data.status,
    color: getStatusColor(data.status),
    statusIcon: getStatusIcon(data.status),
    applyTypeName: data.applyTypeName,
    devicesName: data.alias,
    applyTime: data.times || null,
    takeTime: null,
    cause: data.cause || null,
    startTime: data.takeStartTime || null,
    endTime: data.takeEndTime || null,
    address: data.address || '',
    verifys: []
  }

  if (data.verifys){
    data.verifys.map(item => {
      applyDetail.verifys.push({
        partyName: item.partyName,
        result: item.statusName || '--',
        time: item.time || '--',
        remark: item.remark || null,
        portrait: item.portrait || '/images/people.png',
        color: getStatusColor(item.status),
        position: item.position
      })
    })
  }

  return applyDetail;
}

const getApplyTypeName = function(type){
  switch(type){
    case 'TEST_APPLY': 
      return '测试申请';
    case 'USED_APPLY':
      return '使用申请';
    case 'TAKE_APPLY':
      return '外带申请';
    case 'URGENT_APPLY':
      return '紧急申请';
    default:
      return '未知类型';
  }
}

const getStatusIcon = function(status){
  switch (status) {
    case 'PENDING':
      return null;
    case 'PASSED':
      return '/images/pass.png';
    case 'REJECT':
      return '/images/lose.png';
    default:
      return null;
  }
}

const getStatusColor = function (status){
  switch (status) {
    case 'PENDING':
      return 'colorgreen';
    case 'PASSED':
      return 'colororange';
    case 'REJECT':
      return 'colorred';
    default:
      return null;
  }
}