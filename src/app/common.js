export const isEmptyObj = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object; // 👈 constructor check
} 

export const randomInt = (maxNum) => {
  return Math.floor(Math.random(maxNum) * maxNum);
}