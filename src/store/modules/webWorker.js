import webWorker from 'src/utils/webWorker';
export default {
    namespaced: true,
    state: {
        worker: new webWorker(),
    },
    mutations: {},
    getters: {},
    actions: {},
    modules: {},
};
