<template>
  <v-app theme="dark">
    <v-main>
      <div class="container">
        <LogoutButton />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import LogoutButton from '../components/LogoutButton.vue'

export default {
  components: {
    LogoutButton
  }
}
</script>

<style scoped>

.container {
  display: flex;
  background-color: #000;
}

</style>