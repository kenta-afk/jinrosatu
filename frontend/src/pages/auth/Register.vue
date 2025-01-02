<template>
  <v-app theme="dark">
    <v-main>
      <div :class="authPage.container">
        <h1 :class="authPage.h1">Register</h1>
        <v-form @submit.prevent="register" v-model="valid" :class="form.formWrapper">
          <v-text-field
            v-model="name"
            label="Name"
            required
            variant="outlined"
            color="white"
            dense
          ></v-text-field>
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
            :class="button.hoverButton"
            type="submit"
            variant="outlined"
            :disabled="!valid"
          >
            Register
          </v-btn>
        </v-form>
        <p v-if="error" :class="form.error-text">{{ error }}</p>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import button from '../../styles/button.module.css'
import authPage from '../../styles/authPage.module.css'
import form from '../../styles/form.module.css'


const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const valid = ref(false)
const router = useRouter()

const register = async () => {
  try {
    const response = await fetch('http://localhost:4000/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          mutation Register($name: String!, $email: String!, $password: String!) {
            register(name: $name, email: $email, password: $password)
          }
        `,
        variables: {
          name: name.value,
          email: email.value,
          password: password.value,
        },
      }),
    })
    const result = await response.json()
    if (result.errors) throw new Error(result.errors[0].message)
    const token = result.data.register
    sessionStorage.setItem('token', token)
    router.push('/top')
  } catch (err) {
    error.value = err.message
  }
}
</script>