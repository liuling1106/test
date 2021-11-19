const { run } = require("jest-cli")

let toProxy = new WeakMap()
let toRaw = new WeakMap()
baseHandler= {
    get(target, key){
        const res = Reflect.get(target, key)
        track(target, key)
        return typeof res === 'object' ? reactive(res) : res
    },
    set(target, key, val){
        let baseInfo = {}
        const oldValue = Reflect.get(target,key)
        const res = Reflect.set(target, key, val)
        baseInfo.newVal = res
        baseInfo.oldValue = oldValue
        trigger(target, key, val)
        return res
    }
}
function reactive(target){
    
    let observed = toProxy.get(target)
    if(observed)
    {
        return observed
    }
    
    const res = new Proxy(target, baseHandler)
    toProxy.set(target, res)
    toRaw.set(res, target)
    
    return res
}

function effect(fn){
    const e = createReactiveEffect(fn, ...args)
    e()
    return e
}

function createReactiveEffect(fn, args){
    const effect = function effect(fn){
        return run(effect, fn, args)
    }
    effect.deps = []
    return effect
}

let depMap = new WeakMap()
let effectStack = []
function run(effect, fn, args){
    const effect = effectStack[effectStack.length - 1]
    if(effect){
        
    }
}


