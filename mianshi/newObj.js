function createNewObj(fn, ...arg){
    // 1. create a new object
    // 2. this point to the new object
    // 3. new object constructor point to this
    // 4. executor constructor
    // 5. return obj
    const obj = {}
    obj.__ptoto__ = fn.prototype
    let res = fn.apply(obj, arg)
    return typeof res === 'object' ? res: obj

    // or below code
    // const obj = Object.create(fn.prototype)
    // const res = fn.apply(obj, arg)

    // return typeof res ==='object' ? res : obj
}

function Person(name){
    this.name = name
}

// class Person{
//     constructor(name){
//         this.name= name
//     }
// }

const p = new Person('zs')

const pc = createNewObj(Person, 'zs')

console.log('p,,', p)
console.log('pc,,', pc)

export {
    createNewObj,
    p,
    pc
}

