
export const getDateFromStr = function(str){
  let dateArray = str.split("-")
  if (dateArray.length != 3) {
    return null;
  }
  let newDate = new Date();
  newDate.setFullYear(dateArray[0], dateArray[1] - 1, dateArray[2])
  newDate.setHours(0, 0, 0)
  return newDate
}

export const getStrFromDate = function(date){
  if (!date || typeof date !== 'object'){
    return null
  }
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}