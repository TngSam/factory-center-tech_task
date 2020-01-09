<template>
    <div class="main">
        <Header>
            <div class="header-title">
                <h2>Вопросы</h2>
                <router-link to="/question">
                    <button><span>+</span> Создать вопрос</button>
                </router-link>
            </div>
        </Header>

        <main>
            <ul>
                <li v-for="(question, index) in questions" :key="question.title">
                    <div>{{ question.title }}</div>
                    <div>{{ question.createdAt | toHumanDate }}</div>
                    <div>
                        <router-link v-if="question.answers" :to="`/question/${index}`">Ответы</router-link>
                        <span v-else>&dash;</span>
                    </div>
                </li>
            </ul>
        </main>
    </div>
</template>

<script>
import monthNames from '@/utils/monthNames'

import Header from '@/components/Header'

export default {
    name: 'main-page',
    components: {
        Header
    },
    data: () => ({
        questions: []
    }),
    created() {
        this.questions = this.$store.state.questions
    },
    filters: {
        toHumanDate(datestr) {
            const date = new Date(datestr)
            return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`
        }
    }
}
</script>

<style scoped lang="scss">
    .main {
        min-height: 90.5vh;

        .header-title {
            display: flex;
            align-items: center;

            button {
                margin-left: 1rem;
            }
        }

        main {
            ul {
                li {
                    font-size: .875rem;

                    div:first-child {
                        min-width: 40%;
                    }
                    div:nth-child(2) {
                        min-width: 10%;
                    }
                    div:last-child {
                        margin-left: 10%;
                    }
                    div:not(:last-child) {
                        margin-right: 1rem;
                    }

                    &:not(:last-child) {
                        margin-bottom: 1rem;
                    }
                }
            }
        }
    }
</style>
