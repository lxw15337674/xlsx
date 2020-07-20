import { get, post } from './axios.js';
import debounce from '@/directive/debounce';
export default {
    install(Vue) {
        Vue.prototype.$get = get;
        Vue.prototype.$post = post;
        Vue.use(debounce);
    },
};
