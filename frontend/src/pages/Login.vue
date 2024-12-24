<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="login">
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required />
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required />
            </div>
            <button type="submit">Login</button>
        </form>
        <p v-if="error">{{ error }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
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