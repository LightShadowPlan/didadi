import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: 'home'
},
{
    path: '/home',
    name: 'home',
    component: () => import('@/modules/home/home.vue'),
    meta: {
        requiresLogin: true,
    },

},
{
    path: '/music',
    name: 'music',
    component: () => import('@/modules/music/music.vue'),
    meta: {
        requiresLogin: true,
    },

},
{
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    beforeEach: () => {
        store.dispatch("logout")
    }
},
{
    path: '/notFound',
    name: 'notFound',
    component: () => import('@/views/notFound.vue'),
},
{
    path: '*',
    redirect: 'home'
}
]

const router = new VueRouter({
    routes,
    mode: 'history',
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requiresLogin)) {
        if (store.getters.getHasLogin) {
            next();
        } else {
            store.dispatch("loginByToken")
                .then(result => {
                    if (result) {
                        next();
                    }
                    else {
                        next({ name: "login" })
                    }
                })
                .catch(() => {
                    next({ name: "login" })
                });
        }
    } else {
        next();
    }

});



export default router