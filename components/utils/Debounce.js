/**
 * 在指定的时间内，若函数被多次触发
 * 则只会调用最新的一次，避免不必要的性能开销
 * 调用时间： 最后一次触发 + 设定的等待时间
 * @param  {Function} func 要延时的函数
 * @param  {Number}   wait 延迟时间/ms
 * @return {Function}      延迟后的函数
 */
const debounce = (func, wait) => {
  let timeout, timeStamp

  return (...args) => {
    timeStamp = new Date()

    let later = () => {
      let last = (new Date()) - timeStamp
      if (last < wait) {
        timeout = setTimeout(later, wait - last)
      } else {
        timeout = null
        func.apply(this, args)
      }
    }

    if (!timeout) {
      timeout = setTimeout(later, wait)
    }
  }
}

module.exports = debounce
