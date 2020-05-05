export function parseTime(time) {
  let newdate = new Date(time);
  let year = newdate.getFullYear()
  let month = newdate.getMonth()+1
  let date = newdate.getDate()
  let hour = newdate.getHours()
  let minute = newdate.getMinutes()
  let seconds = newdate.getSeconds()
  if(month < 10){
    month = '0' + month
  }
  if(date < 10){
    date = '0' + date
  }
  if(hour < 10){
    hour = '0' + hour
  }
  if(minute < 10){
    minute = '0' + minute
  }
  if(seconds < 10){
    seconds = '0' + seconds
  }

  return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + seconds
}