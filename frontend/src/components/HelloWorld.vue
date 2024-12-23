<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

defineProps({
  msg: String,
})
const router = useRouter()

const logout = () => {
  sessionStorage.removeItem('token')
  router.push('/login')
}
</script>

<template>

  <h1>人狼殺</h1>

  <button type="button" @click="logout">Logout</button>

 
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
