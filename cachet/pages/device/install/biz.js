import lwx from '../../../utils/lwx.js'

export const startInstall = function(devicesId){
  return lwx.request({
    url: '/devices/startInstall',
    data: {
      devicesId: devicesId
    }
  })
}

export const openDevices = function(){
  return new Promise((resolve, reject) => {
    // 开启印章
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}

export const confirmInstall = function(devicesId){
  return lwx.request({
    url: '/devices/complateInstall',
    data: {
      devicesId: devicesId
    }
  })
}