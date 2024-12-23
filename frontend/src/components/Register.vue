<template>
    <div>
        <h1>Register</h1>
        <form @submit.prevent="register">
            <div>
                <label for="email">Email:</label>
                <input type="email" v-model="email" required />
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" v-model="password" required />
            </div>
            <button type="submit">Register</button>
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

const register = async () => {
    try {
        const response = await fetch('http://localhost:4000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
          mutation Register($email: String!, $password: String!) {
            register(email: $email, password: $password)
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
        const token = result.data.register
        sessionStorage.setItem('token', token)
        router.push('/login')
    } catch (err) {
        error.value = err.message
    }
}
</script>