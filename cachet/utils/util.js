const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatDay = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

function json2Form(json){
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
}

function decimalToBinary(decimal, bitNum) {
  if(decimal == null){
    throw new Error('decimal is null')
  }

  let result = [];
  while (decimal > 0) {
    let rem = decimal % 2;
    result.push(rem);
    decimal = Math.floor(decimal / 2);
  }
  console.log(result)
  let fillFactor = []
  result = result.reverse()
  if (bitNum && result.length < bitNum){
    let length = result.length;
    for (let i = 0; i < bitNum - length; i++){
      fillFactor.push(0)
    }
  }

  return [...fillFactor, ...result].reverse();
}
function binaryToDecimal(binaryArray){
  if (!binaryArray){
    throw new Error('binaryArray is null')
  } 
  let result = 0
  for (let i = 0; i < binaryArray.length; i++){
    result += binaryArray[i]*Math.pow(2, i)
  }

  return result
}
function countDown(that, count) {
  if (count == 0) {
    that.setData({
      timeCountDownTop: '获取验证码',
      counting: false,
      isdisables: false
    })
    return;
  }
  that.setData({
    counting: true,
    timeCountDownTop: count + '秒',
    isdisables: true
  })
  setTimeout(function () {
    count--;
    countDown(that, count);
  }, 1000);
}

function stringToUint8Array(str){

  if(!str){
    throw new Error('illegal string')
  }

  let val = ""
  for (let i = 0; i < str.length; i++) {
    if (val === '') {
      val = str.charCodeAt(i).toString(16)
    } else {
      val += ',' + str.charCodeAt(i).toString(16)
    }
  }
  // 将16进制转化为ArrayBuffer
  return new Uint8Array(val.match(/[\da-f]{2}/gi).map(function (h) {
    return parseInt(h, 16)
  }))
}

function hexString2Bytes(str) {
  var pos = 0;
  var len = str.length;
  if (len % 2 != 0) {
    return null;
  }
  len /= 2;
  var arrBytes = new Array();
  for (var i = 0; i < len; i++) {
    var s = str.substr(pos, 2);
    var v = parseInt(s, 16);
    arrBytes.push(v);
    pos += 2;
  }
  return arrBytes;
}

function stringToBuffer(str) {
  return stringToUint8Array(str).buffer
}

function copyArray(from, to, start){

  if(!from || !to ){
    throw new Error('illegal args')
  }

  for(let i = 0; i < from.length; i++){
    to[start++] = from[i]
  }
}

module.exports = {
  formatTime: formatTime,
  json2Form: json2Form,
  formatDay: formatDay,
  decimalToBinary: decimalToBinary,
  binaryToDecimal: binaryToDecimal,
  countDown: countDown,
  stringToUint8Array,
  stringToBuffer,
  copyArray,
  hexString2Bytes
}
