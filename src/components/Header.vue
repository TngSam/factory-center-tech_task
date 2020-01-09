<template>
    <header>
        <div>
            <slot></slot>
        </div>
        <div>
            <a href="#" @click.prevent="exit">Выйти</a>
        </div>
    </header>
</template>

<script>
import { MUTATION_UNAUTHENTICATE_USER } from '@/store/names'

export default {
    name: 'Header',
    methods: {
        exit() {
            this.$store.commit(MUTATION_UNAUTHENTICATE_USER)
            this.$router.go('/login')
        }
    }
}
</script>

<style scoped lang="scss">
    header {
        display: flex;
        align-items: center;
        justify-content: space-between; 
        a {
            font-size: 1.25rem;
        }
    }
</style>