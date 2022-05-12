import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import Notifications from '@kyvg/vue3-notification'
import { store, key } from './store'
import './styles/styles.scss'
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App).use(router).use(store, key).use(Notifications).use(VueAxios, axios)

app.directive('click-outside', {
    mounted(el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
            if (!(el === event.target || el.contains(event.target))) {
                binding.value(event, el);
            }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
    }
})

app.mount('#app')
