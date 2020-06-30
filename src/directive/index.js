import { get, post } from './axios.js';
import tip from './Vtip';
import debounce from '@/directive/debounce';
export default {
    install(Vue) {
        Vue.prototype.$get = get;
        Vue.prototype.$post = post;
        Vue.use(debounce);
        Vue.use(tip, { directiveName: 'tip', theme: 'dark' });
    },
};
