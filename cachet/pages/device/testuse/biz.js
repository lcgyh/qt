import lwx from '../../../utils/lwx.js'

export const useDevices = function(datas){
  return lwx.request({
    url: '/use/use',
    data: datas
  })
}

export const openDevices = function(){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}