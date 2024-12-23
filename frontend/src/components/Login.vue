<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="login">
            <div>
                <label for="email">Email:</label>
                <input type="email" v-model="email" required />
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" v-model="password" required />
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
        const token = sessionStorage.getItem('token')
        const response = await fetch('http://localhost:4000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
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
        router.push('/')
    } catch (err) {
        error.value = err.message
    }
}
</script>