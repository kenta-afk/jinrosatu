import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/auth/Login.vue'
import Top from '../pages/top/Top.vue'
import Register from '../pages/auth/Register.vue'
import Home from '../pages/auth/Home.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/top', component: Top, meta: { requiresAuth: true } },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const token = sessionStorage.getItem('token')

    if (requiresAuth && !token) {
        next('/login')
    } else {
        next()
    }
})



export default router