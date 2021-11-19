const baseHandler = {
        get(target, key){
            // collection reflect
            const res = Reflect.get(target, key)
            track(target, key)
            return typeof res ==='object' ? reactive(res): res
        },
        set(target, key, val){
            const info = {
                oldValue: target[key],
                newValue: val
            }
            const res = Reflect.set(target, key, val)
            // trigger update
            trigger(target, key, info)
            return res
        }
}
const toProxy = new WeakMap()
const toRaw = new WeakMap()
function reactive(target){
    let observed =  toProxy.get(target)
    if(observed){
        return observed
    }
    const raw = toRaw.get(target)
    if (raw){
        return toRaw
    }
    
    observed= new Proxy(target, baseHandler)
    toProxy.set(target, observed)

    // const raw = 
    toRaw.set(observed, target)

    return observed
}

let targetMap = new WeakMap()
let effectStack = []

function effect(fn, options = {}){
    // console.log('diaoyong Effect fangfa ......')
    const e = createReactiveEffect(fn, options)
    if(!options.lazy){
        e()
    }
    console.log('effect returned e,,,', e)
    console.log('effect returned fn,,,', fn)
    return e
}

function createReactiveEffect(fn, options){
    const effect = function effect(...args){
        return run(effect, fn, args)
    }
    effect.deps = []
    effect.computed = options.computed
    effect.lazy = options.lazy
    // console.log('effect,,,', effect)
    // console.log('createReactiveEffect effect, deps,,', effect.deps)
    return effect
}

function run (effect, fn, args){
    // console.log('run,,,,function effect,,,', effect)
    // console.log('run,,,,function effectStack,,,,', effectStack)
    if(effectStack.indexOf(effect) === -1){
        try {
            effectStack.push(effect)
            // console.log('run, fn,,,', fn)
            return fn(...args)
        } finally {
            effectStack.pop()
        }
    }

}



function track(target, key){
    // console.log('diaoyong track fangfa ......')
    // console.log('diaoyong track fangfa key zhi shi.....', key)
    let effect = effectStack[effectStack.length -1]
    if(effect){
        let depsMap = targetMap.get(target)
        if(depsMap === undefined){
            depsMap = new Map()
            targetMap.set(target, depsMap)
        }
        let dep = depsMap.get(key)
        if(dep === undefined){
            dep = new Set()
            depsMap.set(key, dep)
        }
        if(!dep.has(effect)){
            dep.add(effect)
            // effect.deps.push(dep)
        }

    }
}

function trigger(target, key, val){

    // console.log('diaoyong trigger fangfa ' )
    // trigger update
    const depsMap = targetMap.get(target)
    if(depsMap === undefined){
        return
    }
    const effects = new Set()
    const computedRunners = new Set()
    if(key){
        let deps = depsMap.get(key)
        // console.log('trigger,, depsMap deps,,,', deps)
        deps.forEach(effect => {
            if(effect.computed){
                computedRunners.add(effect)
            }else{
                effects.add(effect) 
            }  
            
        });
    }

    effects.forEach(effect =>effect())
    computedRunners.forEach(effect =>effect())
}

function computed(fn){
    const runner = effect(fn, { computed: true, lazy: true})
    // console.log('aa value,,,', runner)
    // console.log('aa value,,,', runner())
    // let aa = runner()

    return {
        effect: runner,
        get value() {
            return runner()
        }
    }
}