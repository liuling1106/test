function isPrime(num){
for(let i = 2; i<= Math.sqrt(num); i++){
    if(num %i ===0){
        return false
    }
}
return true
}

function returnPrime(){
    let num = 1
    return () =>{
        while(true){
            num++
            if(isPrime(num)){
                return num
            }
        }
    }
}

// var test = returnPrime()
// console.log('test,', test())
// console.log('test,', test())
// console.log('test,', test())
// console.log('test,', test())
// console.log('test,', test())

likeArray={
    0: 'a',
    1: 'b',
    length: 2
}

likeArray[Symbol.iterator] = function(){
    let index = 0
   return {
       next: () =>{
            return {value: this[index], done: index++ === this.length}
       }
   }
}

// likeArray[Symbol.iterator] = function* (){
//     let index = 0
//     while(index !== this.length){
//         yield this[index++]
//     }
// }


console.log([...likeArray])