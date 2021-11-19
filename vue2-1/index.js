import Vue from './Vue.js'

const vm = new Vue({
    el: '#app',
    methods:{
        handler(){
            console.log('test method')
        }
    },
    data:{
        msg: 'Hello Vue'
    }
})

console.log(vm)