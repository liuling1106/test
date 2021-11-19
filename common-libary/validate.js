function IsFun(obj){
   // return typeof obj === 'function'
   duixiang, shuzu
    return Object.prototype.toString.call(obj) === '[Object Function]'
}

module.exports = {
    IsFun
}