import lwx from '../../../utils/lwx.js'

export const applyTest = function(devicesId){
  return lwx.request({
    url: '/apply/apply',
    data: {
      devicesId: devicesId,
      times: 1,
      type: 'TEST_APPLY',
      cause: '安装申请测试'
    }
  })
}

export const getTestTimes = function(){
  return lwx.request({
    url: '/use/getWaitUseList',
    data: {}
  })
}