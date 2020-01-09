<template>
  <div class="auth">
    <button @click="login">Войти</button>
  </div>
</template>

<script>
import { LOGIN, FETCH_QUESTIONS } from '@/store/names'

export default {
  name: 'auth',
  methods: {
    async login() {
      await this.$store.dispatch(LOGIN)
      await this.$store.dispatch(FETCH_QUESTIONS)

      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="scss">
  .auth {
    width: 100%;
    height: 90.5vh;
  
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
