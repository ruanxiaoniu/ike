/*
  把日期转化成字符串
 * @Author: lan 
 * @Date: 2019-10-16 18:02:00 
 * @Last Modified by: lan
 * @Last Modified time: 2019-10-16 18:04:01
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
  return null
  }
  const format = cFormat || '{y}-{m}-{d}'
  let date
  if (typeof time === 'object') {
  date = time
  } else {
  if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
  time = parseInt(time)
  }
  if ((typeof time === 'number') && (time.toString().length === 10)) {
  time = time * 1000
  }
  date = new Date(time)
  }
  const formatObj = {
  y: date.getFullYear(),
  m: date.getMonth() + 1,
  d: date.getDate(),
  h: date.getHours(),
  i: date.getMinutes(),
  s: date.getSeconds(),
  a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
  let value = formatObj[key]
  // Note: getDay() returns 0 on Sunday
  if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
  if (result.length > 0 && value < 10) {
  value = '0' + value
  }
  return value || 0
  })
  return time_str
  }