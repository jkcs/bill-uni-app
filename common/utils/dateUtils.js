export function getNow() {
  return new Date()
}

export function dateFormat(time = new Date(), format = '{y}-{m}-{d} {h}:{i}:{s}') {
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
  return format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
}

export function isToday(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0)
  const now = new Date()
  now.setHours(0, 0, 0)
  const diff = Math.floor((now - d) / 1000)
  if (diff === 0) {
    return [true, '今天']
  }

  return [false, dateFormat(d, '{y}-{m}-{d}')]
}
