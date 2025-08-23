/**
 * 转换时间成字符串
 */
export function parseTime(time: Date | string | number, cFormat?: string): string {
  if (arguments.length === 0 || !time) {
    return ''
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'

  let date: Date = new Date(time)
  if (typeof time === 'object') {
    date = time
  }
  if (typeof time === 'string') {
    if (/^\d+$/.test(time)) {
      time = Number.parseInt(time)
    }
    else if (time.length === 28 && /\.000\+0000/.test(time)) {
      time = +new Date(time.slice(0, 19).replace(/T/g, ' ').replace(/-/g, '/')) + 8 * 3600 * 1000
    }
    else if (/^\d{4}-\d{2}-\d{2}$|^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/.test(time)) {
      time = time.replace(/-/g, '/')
    }
  }
  if (typeof time === 'number') {
    if (time.toString().length === 10) {
      time = time * 1000
    }
  }
  date = new Date(time)
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  return format.replace(/\{([ymdhisa])+\}/g, (result, key: keyof typeof formatObj) => {
    let value: string | number = formatObj[key]
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = `0${value}`
    }
    return `${value || 0}`
  })
}
