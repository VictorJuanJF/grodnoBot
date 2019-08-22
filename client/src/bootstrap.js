import axios from 'axios'

window.axios = axios;
window.axios.defaults.timeout = 10000;


window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('auth_token');