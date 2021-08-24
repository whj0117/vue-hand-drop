import handDrop from './lib/main.vue'
import _Vue from 'vue'

handDrop.install = Vue => {
    if(!Vue){
        window.Vue = Vue = _Vue
    }
    Vue.component(handDrop.name,handDrop)
}

export default handDrop
