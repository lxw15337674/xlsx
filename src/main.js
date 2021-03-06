import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import directive from 'src/directive'; // 引入自定义指令
import './plugins/element.js';
import './assets/css/reset.css';
import tip from 'v-directive-tooltip';
import contextMenu from '@lxw15337674/v-context-menu';
Vue.config.productionTip = false;
Vue.use(directive);
Vue.use(tip, { directiveName: 'tip', theme: 'dark' });
Vue.use(contextMenu);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
