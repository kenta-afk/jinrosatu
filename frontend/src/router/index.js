import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import HelloWorld from '../pages/HelloWorld.vue'
import Register from '../pages/Register.vue'

const routes = [
    { path: '/', component: HelloWorld },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router