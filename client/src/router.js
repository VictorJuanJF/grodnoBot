import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        component: require('./views/dashboard.vue').default,
        children: [{
            path: '/intenciones',
            name: 'intent',
            component: require('./views/intent.vue').default
        }, {
            path: '/intenciones/:id',
            name: 'updateIntent',
            component: require('./views/updateIntent.vue').default
        }]
    }]
})