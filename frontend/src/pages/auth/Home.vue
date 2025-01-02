<template>
  <v-app theme="dark">
    <v-main>
      <div :class="authPage.container">
        <h1 :class="authPage.h1">人狼殺</h1>
        <div class="form-wrapper">
          <v-btn
            class="bg-grey-darken-3"
            :class="[button.customButton, button.hoverButton]"
            @click="register"
            variant="outlined"
            color="white"
            dense
          >
            <v-icon left :class="button.customButtonIcon">mdi-login</v-icon>
            Register
          </v-btn>
          <v-btn
            class="bg-grey-darken-3"
            :class="[button.customButton, button.hoverButton]"
            @click="login"
            variant="outlined"
            color="white"
            dense
          >
            <v-icon left :class="button.customButtonIcon">mdi-logout</v-icon>
            Login
          </v-btn>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { useRouter } from 'vue-router'
import button from '../../styles/auth/button.module.css'
import authPage from '../../styles/auth/authPage.module.css'


const router = useRouter()

const register = () => {
  router.push('/register')
}

const login = () => {
  router.push('/login')
}
</script>

<style scoped>

.form-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px; 
}

</style>