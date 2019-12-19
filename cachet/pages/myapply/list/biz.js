
export const getApplyList = function(datas){
  let applyList = []

  if (datas && datas.length > 0){
    datas.map(item => {
      applyList.push({
        devicesName: item.alias || '未设置',
        applyId: item.applyId,
        statusName: item.statusName,
        color: item.status === 'REJECT' ? 'colorred' : 'colorgreen' && item.status === 'PENDING' ? 'colororange' : 'colorgreen' 
      })
    })
  }

  return applyList;
}