import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import {
    MessageBox
} from 'element-ui'

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
        requiresAuth: false,
    },

},
{
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
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
                })
                .catch(() => {
                    next({ name: "index" })
                });
        }
    } else if (to.matched.some(r => r.meta.requiresAuth)) {
        if (store.getters.getHasAuth) {
            next();
        } else {
            store.dispatch("loginByToken")
                .then(result => {
                    if (result === false) {
                        return false;
                    } else if (result.authority > 0) {
                        next();
                    } else {
                        MessageBox.alert('<span style="color: red">你没有权限进入！</span>', '提示', {
                            confirmButtonText: '使用其他账号登录',
                            cancelButtonText: '返回主页',
                            showCancelButton: true,
                            dangerouslyUseHTMLString: true
                        }).then(() => {
                            next({ name: "login" })
                        }).catch(() => {
                            next({ name: "index" })
                        });
                    }

                })
                .catch(() => {
                    next({ name: "index" })
                });


        }
    } else {
        next();
    }

});



export default router