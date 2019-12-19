

export const getDevicesData = function (devicesList) {
  let list = [];
  devicesList.map(item => {
    let statusName = '';
    switch (item.devicesStatus) {
      case 'ACTIVATE':
        statusName = '已激活';
        break;
      case 'WAIT_BIND':
        statusName = '待绑定';
        break;
      case 'INSTALLED':
        statusName = '已安装';
        break;
      default:
        statusName = '待安装'
    }

    list.push({
      name: item.alias || '未设置',
      devicesId: item.devicesId || '未知',
      expireTime: item.expireDate || '未设置',
      statusName: statusName || '未知',
      color: item.devicesStatus === 'ACTIVATE' || item.devicesStatus === 'INSTALLED' ? 'colorgreen' : 'colorred'
    })
  })
  return list;
}