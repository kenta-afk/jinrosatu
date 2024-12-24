<template>
    <h1>人狼殺</h1>
    <button @click="register">register</button>
    <button @click="login">login</button>
</template>
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const register = () => {
    router.push('/register')
}

const login = () => {
    router.push('/login')
}
</script>
<style scoped>
</style>