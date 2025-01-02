<template>
    <v-btn 
    class="bg-grey-darken-3"
    :class="[styles.customButton, styles.hoverButton]"
    @click="logout"
    variant="outlined"
    color="white"
    dense
    >
        <v-icon left :class="styles.customButtonIcon">mdi-logout</v-icon>
        Logout
    </v-btn>
</template>

<script setup>
import { useRouter } from 'vue-router'
import styles from '../styles/button.module.css'

const router = useRouter()

const logout = () => {
    sessionStorage.removeItem('token')
    router.push('/login')
}
</script>


