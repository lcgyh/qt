export const getTaskData = function(data){
  let taskData = []

  if(data){
    data.map(item => {
      item && taskData.push({
        name: item.name || '未设置',
        statusName: item.statusName || null,
        type: item.applyType,
        description: item.description,
        verifyId: item.verifyId
      })
    })
  }

  return taskData;
}

const getTypeName = function(type){
  switch (type){
    case 'VERIFY' :
      return '审核待办';
    default :
      return '未知类型';
  }
}