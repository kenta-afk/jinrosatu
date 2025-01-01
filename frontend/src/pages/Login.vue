<template>
  <v-app theme="dark">
    <v-main>
      <div class="container">
        <h1>Login</h1>
        <v-form @submit.prevent="login" v-model="valid" class="form-wrapper">
          <v-text-field
            v-model="email"
            label="Email"
            required
            type="email"
            variant="outlined"
            color="white"
            dense
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            required
            type="password"
            variant="outlined"
            color="white"
            dense
          ></v-text-field>
          <v-btn
            class="bg-grey-darken-3"
            type="submit"
            variant="outlined"
            :disabled="!valid"
          >
            Login
          </v-btn>
        </v-form>
        <p v-if="error" class="error-text">{{ error }}</p>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const valid = ref(false)
const router = useRouter()

const login = async () => {
  try {
    const response = await fetch('http://localhost:4000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query Login($email: String!, $password: String!) {
            login(email: $email, password: $password)
          }
        `,
        variables: {
          email: email.value,
          password: password.value,
        },
      }),
    })
    const result = await response.json()
    if (result.errors) {
      throw new Error(result.errors[0].message)
    }
    const token = result.data.login
    sessionStorage.setItem('token', token)
    router.push('/top')
  } catch (err) {
    error.value = err.message
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #000;
}

h1 {
  color: #fff;
  margin-bottom: 20px;
  text-align: center;
}

.form-wrapper {
  width: 300px;
}


:deep(.v-text-field .v-field-label) {
  color: #fff !important;
}
:deep(.v-text-field .v-field-input input) {
  color: #fff !important;
}
:deep(.v-text-field .v-field-outline__notch) {
  border-color: #fff !important;
}

.error-text {
  color: red;
  margin-top: 10px;
}

.v-btn:hover {
  background-color: #f64343 !important;
  transition: background-color 0.1s ease;
}
</style>