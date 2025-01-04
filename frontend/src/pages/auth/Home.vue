<template>
  <v-app theme="dark">
    <v-main>
      <svg :class="background.blobCont"></svg>
      <div :class="authPage.container">
        <h1 :class="authPage.h1">人狼殺</h1>
        <div :class="background.HomeWrapper">
          <v-btn
            class="bg-grey-darken-3"
            :class="[button.customButton, button.hoverButton]"
            @click="login"
            variant="outlined"
            color="white"
            dense
          >
            <v-icon left :class="button.customButtonIcon">mdi-login</v-icon>
            ログイン
          </v-btn>
          <v-btn
            class="bg-grey-darken-3"
            :class="[button.customButton, button.hoverButton]"
            @click="register"
            variant="outlined"
            color="white"
            dense
          >
            <v-icon left :class="button.customButtonIcon">mdi-account-plus</v-icon>
            登録
          </v-btn>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import button from '../../styles/auth/button.module.css';
import authPage from '../../styles/auth/authPage.module.css';
import background from '../../styles/auth/background.module.css';
import { useRouter } from 'vue-router';

const router = useRouter()

const register = () => {
  router.push('/register')
}

const login = () => {
  router.push('/login')
}
</script>

<style scoped lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap');

</style>

