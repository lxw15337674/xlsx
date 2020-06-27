import { get, post } from './axios.js';
import tip from './Vtip';
export default {
    install(Vue) {
        Vue.prototype.$get = get;
        Vue.prototype.$post = post;
        Vue.use(tip, { directiveName: 'tip', theme: 'dark' });
    },
};
