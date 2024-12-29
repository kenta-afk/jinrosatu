<template>
    <h1>人狼殺</h1>
    <v-btn @click="register" class="button">
      <v-icon>mdi-login</v-icon>
      Register
    </v-btn>
    <v-btn @click="login" class="button">
      <v-icon>mdi-logout</v-icon>
      Login
    </v-btn>
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

