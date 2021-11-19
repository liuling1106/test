
// const promise = require('./promise1013')
const { expect } = require('@jest/globals')
const sum = require('./test')
const Promise = require('./promise1013')
const vali = require('../common-libary/validate')
const fun = require('./co')

// test('sum 1+2=3', () => {
//     expect(sum(1,3)).toBe(4)
    
// })

// test('promise then', () =>{
//    let promise = new Promise((resolve, reject) =>{
//         resolve(111)
//     })
    
//     promise.then(res =>{
//         expect(res).toBe(111)
//     })
// })

// test('promise async', () =>{
//     let promise = new Promise((resolve, reject) =>{
//         setTimeout(() => {
//           resolve(111)
//         }, 1000);
//      })
     
//      promise.then(res =>{
//          expect(res).toBe(111)
//      })
//  })

//  test('promise then function', () =>{
//     let promise = new Promise((resolve, reject) =>{
//         setTimeout(() => {
//           resolve(111)
//         }, 1000);
//      })
//      let testVal = undefined
//      const resolveThenRes = promise.then(res =>{
//          return 222
//      }).then(res =>{
//          testVal =res
//          console.log('then finished.....')
//          expect(res).toBe(222)
//          expect(testVal).toBe(222)
//         })
//     //  expect(vali.IsFun(resolveThenRes)).toBe(true)
//     //  expect(testVal).toBe(222)
//     })

    test('generator', ()=>{
        const test = fun()
        console.log(test)
        expect(test).toBe(1)
    })
