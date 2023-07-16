export const isEmptyObj = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object; // 👈 constructor check
} 

export const randomInt = (maxNum) => {
  return Math.floor(Math.random(maxNum) * maxNum);
}

export const ts2ddFmtHour = (ts) => `00${new Date(ts).getHours()}`.slice(-2)

export const debounce = (func, delay) => {
  let timer = null
  return function(...args) {
    if (timer !== null) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func(...args)
      timer = null
    }, delay)
  }
}