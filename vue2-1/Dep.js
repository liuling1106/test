export default class Dep{
    constructor(){
        this.subs = []
    }

    addSub(watcher){
        if(watcher && watcher.update){
            this.subs.push(watcher)
        }
    }

    notifiy(){
        this.subs.forEach(watcher=>{
            watcher.update()
        })
    }

}