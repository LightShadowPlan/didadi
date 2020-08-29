

import Vue from 'vue'
import ElementUI from 'element-ui';
import App from './App.vue';
import store from '@/store';
import router from '@/router';
import i18n from '@/i18n'

import 'element-ui/lib/theme-chalk/index.css';
import '../theme/index.css'
import '@/assets/styles/base.scss';

Vue.use(ElementUI);


Vue.config.productionTip = false

new Vue({
    store,
    router,
    i18n,
    render: h => h(App),
}).$mount('#app')
