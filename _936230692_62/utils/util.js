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
//字符串查询某个字段并且赋值 带有&符号拼接(通用)
const getQuerybyString = (url, key) => {
  const strs = url.split("&")
  if (strs.length > 0) {
    for (var i = 0; i < strs.length; i++) {
      const index = strs[i].indexOf(`${key}`)
      if (index != "-1") {
        return strs[i].substring(index + key.length + 1, strs[i].length)
      }
    }
  }
  return null;
}
//字符串拼接
const obj2params = (obj) => {
  let result = '';
  let item;
  for (item in obj) {
    if ((obj[item] && String(obj[item])) || (String(obj[item]) == 'false')) {
      result += `&${item}=${obj[item]}`;
    }
  }
  if (result) {
    result = result.slice(1);
  }
  return result;
}

const getUrl = (baseurl, data) => {
  let url = baseurl
  if (data && obj2params(data)) {
    url = `${baseurl}?${obj2params(data)}`
  }
  return url
}

//数组后两位补0，超出四舍五入
function returnFloat(num) {
  if (num) {
    var f = parseFloat(num);
    if (isNaN(f)) {
      return null
    }

    var value = Math.round(parseFloat(f) * 100) / 100;
    var s = value.toString().split(".");
    if (s.length == 1) {
      value = value.toString() + ".00";
      return value;
    }
    if (s.length > 1) {
      if (s[1].length < 2) {
        value = value.toString() + "0";
      }
      return value;
    }
  } else {
    return null
  }

}


module.exports = {
  formatTime: formatTime,
  getQuerybyString: getQuerybyString,
  obj2params: obj2params,
  getUrl: getUrl,
  returnFloat: returnFloat
}