<template>
  <button type="button" @click="logout">Logout</button>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'LogoutButton',
  setup() {
    const router = useRouter()

    const logout = () => {
      sessionStorage.removeItem('token')
      router.push('/login')
    }

    return {
      logout
    }
  }
}
</script>
