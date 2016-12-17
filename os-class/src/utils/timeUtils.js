export const timeStringify = (timeNum) => {
  const time = [Math.floor(timeNum / 60), String(timeNum % 60)]
  let hour = time[0].length > 0 ? time[0] : '0' + time[0]
  let minute = time.length > 1 ? time[1].slice(0, 2) : '00'
  if (hour.length < 2) {
    hour = '0' + hour
  }
  if (minute.length < 2) {
    minute = '0' + minute
  }
  return [hour, minute].join(':')
}

export const timeParse = (timeStr) => {
  const time = timeStr.split(':')
  return parseInt(time[0], 10) * 60 + parseInt(time[1], 10)
}

const timeUtils = {
  timeStringify,
  timeParse
}

export default timeUtils
