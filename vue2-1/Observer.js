import dep from './Dep.js'
export default class Observer{
    constructor(data){
       this.traverse(data) 
    }
    //遍历data里的所有属性
    traverse(data){
        if(!data || typeof data !== Object){
            return
        }

        Object.keys(data).forEach(key =>{
            this.defineReactive(data, key, data[key])
        })

    }
    //给传入的数据设置getter/setter
    defineReactive(obj, key, val){
        const that = this
        this.traverse(val)

        const dep = new dep()
        Object.defineProperty(obj, key, {
            get(){
               if(Dep.target && dep.addSub(Dep.target)){
                   return val
               }
            },set(newValue){
                if(newValue === val){
                    return
                }
                val = newValue
                that.traverse(newValue)
                dep.notifiy()
            }
        })
    }
}