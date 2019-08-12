import Vue from 'vue'
import Vuex from 'vuex'
//plugins
import axios from 'axios'
import localStorage from 'localStorage'
Vue.prototype.$axios = axios;


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user: JSON.parse(localStorage.getItem('user')) || {},
        intents: [],
        loggingIn: false,
        loginError: null,
        loginSuccessful: false,
        snackbar: {
            text: 'snackbar!',
            active: false
        },
        toolbar: {
            drawerIcon: null,
        },
        overlay: false
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        setIntents(state, payload) {
            state.intents = payload;
        },
        logout(state) {
            state.status = '';
            state.token = '';
            state.loggingIn = false;
        },
        auth_success(state, {
            token,
            user
        }) {
            state.status = 'success';
            state.token = token;
            state.user = user;
            state.loggingIn = true;
        },
        auth_error(state) {
            state.status = 'error'
        },
        showSnackbar(state, text) {
            state.snackbar.text = text;
            state.snackbar.active = true;
        },
        initialLoad(state) {
            state.loggingIn = true;
            state.loggingIn = true;
        },
        showOverlay(state, status) {
            state.overlay = status;
        }

    },
    actions: {
        showSnackbar({
            commit
        }, text) {
            commit('showSnackbar', text);
        },
        showOverlay({
            commit
        }, status) {
            commit('showOverlay', status);
        },
        register({
            commit
        }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request');
                axios
                    .post("/api/register", {
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        password: user.password
                    })
                    .then(res => {
                        if (res.data.ok) {
                            resolve(res.data.message)
                        } else {
                            // error msg
                            console.error(res.data);
                        }
                    })
                    .catch(error => {
                        reject(error);
                        console.log(error);
                    });
            })
        },
        login({
            commit
        }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request');
                axios
                    .post("/api/login", {
                        email: user.email,
                        password: user.password
                    })
                    .then(res => {
                        if (res.data.ok) {
                            console.log(res.data);
                            const token = res.data.token;
                            const user = res.data.payload;
                            localStorage.setItem("token", token);
                            axios.defaults.headers.common['Authorization'] = token
                            commit('auth_success', {
                                token,
                                user
                            });
                            resolve(res.data.message);
                        }
                    })
                    .catch(err => {
                        commit('auth_error');
                        localStorage.removeItem('token')
                        if (err.response) {
                            console.error(err.response.data);
                            reject(err);
                        }
                    });
            })
        },
        setIntents({
            commit
        }, payload) {
            commit('setIntents', payload);
        },
        logout({
            commit
        }) {
            commit('logout');
            localStorage.removeItem('token');
            // delete axios.defaults.headers.common['Authorization'];
        },
        initialLoad({
            commit
        }) {
            commit('initialLoad');
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
    }
})