import {
  get,
  post
} from './axios.js';
export default {
  install(Vue) {
    Vue.prototype.$get = get;
    Vue.prototype.$post = post;
  },
};
