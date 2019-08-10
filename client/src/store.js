import Vue from 'vue'
import Vuex from 'vuex'
//plugins
import axios from 'axios'
Vue.prototype.$axios = axios;


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        intents: []
    },
    mutations: {
        setIntents(state, payload) {
            state.intents = payload;
        }

    },
    actions: {
        setIntents({
            commit
        }, payload) {
            commit('setIntents', payload);
        }
    }
})