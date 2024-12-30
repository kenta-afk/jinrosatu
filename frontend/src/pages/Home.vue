
<template>
  <div class="container">
    <h1>人狼殺</h1>
    <v-row>
      <v-col>
        <v-btn 
        class="bg-grey-darken-3" 
        @click="register" 
        stacked
        variant="outlined"
        >
          <v-icon>mdi-login</v-icon>
          Register
        </v-btn>
      </v-col>
      <v-col>
        <v-btn 
        class="bg-grey-darken-3" 
        @click="login" 
        stacked
        variant="outlined"
        >
          <v-icon>mdi-logout</v-icon>
          Login
        </v-btn>
      </v-col>
    </v-row>
  </div>
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

.container {
  background-color: rgb(0, 0, 0);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

h1 {
  color: white;
  margin-bottom: 20px;
}

.v-btn:hover {
  background-color: #f64343 !important;
  transition: background-color 0.1s ease;
}


</style>

