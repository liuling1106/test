import observer from './Observer.js'
import compiler from './Complier'
export default class Vue {
    constructor(config = {}){

        this.$options = config
        this.$data = config.data
        this.$methods = config.methods

        this.initRootElement(config)

        this._proxyData(this.$data)

        new observer(this.$data)

        new compiler(this)
    }
    
    _proxyData(data){
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                get(){
                    console.log(this)
                    return data[key]
                },
                set(newValue){
                    if(data[key] === newValue){
                        return
                    }
                    data[key] = newValue
                }
            })
        })
    }

    initRootElement(config){
        if(typeof config.el === 'string'){
            this.$el = document.querySelector(config.el)
        } else if(config.el instanceof HTMLElement){
            this.$el = config.el
        }

        if(!this.$el){
            throw new Error('传入的el不合法，请传入css selector 或者HTMLElement')
        }
    }

}