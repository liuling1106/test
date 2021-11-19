class Promise{
    PromiseStatus = {
        Pending: 'Pending',
        Fullfilled: 'Fullfilled',
        Reject:'Reject'
    }

    status = this.PromiseStatus.Pending
    value = undefined
    reason = undefined
    resolveFnArray = []
    rejectFnArray = []
    
    constructor(executor){
        let resolve = (res) =>{
            if (this.status === this.PromiseStatus.Pending){
                this.resolveFnArray.forEach(fn =>{
                    fn()
                    this.value = res
                    this.status = this.PromiseStatus.Fullfilled
                })
            }
        }
        let reject = (res) =>{
            if (this.status ===this.PromiseStatus.Pending){
                this.rejectFnArray.forEach(fn =>{
                    fn()
                    this.reason = res
                    this.status = this.PromiseStatus.Reject
                })
            }
        }
        try {
            executor(resolve, reject)
        } catch (error) {
            this.reject(error)
        }
    }
    then = function(onSuccessCallBack, onFailedCallBack){

        const promise2 = new Promise((resolve, reject) =>{
            try {
                if(this.status === this.PromiseStatus.Pending){
                    this.resolveFnArray.push(onSuccessCallBack)
                    this.rejectFnArray.push(onFailedCallBack)
                }
                if(this.status === this.PromiseStatus.Fullfilled){
                    const res = onSuccessCallBack(this.value)
                    resolve(res)
                }
                if(this.status === this.PromiseStatus.Reject){
                    const res = onSuccessCallBack(this.value)
                    resolve(res)
                }
            } catch (e) {
                reject(e)
            }
        })
        return promise2
    }
    
}
module.exports = Promise